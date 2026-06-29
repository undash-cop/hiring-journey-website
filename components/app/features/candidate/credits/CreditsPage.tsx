'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  confirmBillingCheckout,
  getBillingInvoices,
  getBillingPlans,
  getBillingSubscription,
  getCreditUsage,
  retryBillingPayment,
  startBillingCheckout,
  updateBillingSubscription,
} from '../../../services/api';
import { Card, Button, LoadingCard, Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../../components/ui';
import { PageErrorState } from '../../../components/QueryStateViews';
import { useToast } from '../../../contexts/ToastContext';
import { queryKeys, billingMutationInvalidations } from '@/lib/query-keys';
import { formatPaiseAsInr } from '../../../utils/currency';
import { openRazorpayCheckout } from '../../../utils/razorpay';
import type { BillingPlan } from '../../../types';
import { analytics } from '@/lib/analytics';

export default function CreditsPage() {
  const searchParams = useSearchParams();
  const preselectedPlanId = searchParams.get('plan');
  const initialPlanId = (() => {
    if (!preselectedPlanId) return null;
    const id = Number(preselectedPlanId);
    return Number.isNaN(id) ? null : id;
  })();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutPlanId, setCheckoutPlanId] = useState<number | null>(initialPlanId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.creditUsage,
    queryFn: getCreditUsage,
  });

  const { data: plans } = useQuery({
    queryKey: queryKeys.billingPlans,
    queryFn: getBillingPlans,
  });

  const { data: subscription } = useQuery({
    queryKey: queryKeys.billingSubscription,
    queryFn: getBillingSubscription,
  });

  const { data: invoices } = useQuery({
    queryKey: queryKeys.billingInvoices,
    queryFn: getBillingInvoices,
  });

  const invalidateBilling = () => {
    for (const key of billingMutationInvalidations) {
      void queryClient.invalidateQueries({ queryKey: key });
    }
  };

  const handleCheckoutSuccess = () => {
    invalidateBilling();
    setCheckoutPlanId(null);
    showToast('Subscription updated successfully.', 'success');
    analytics.subscriptionStarted(subscription?.planName ?? 'plan');
  };

  const checkoutMutation = useMutation({
    mutationFn: async (plan: BillingPlan) => {
      const session = await startBillingCheckout(plan.id, billingCycle);
      if (session.free) {
        handleCheckoutSuccess();
        return;
      }
      if (!session.invoiceId) {
        throw new Error('Checkout session missing.');
      }
      if (session.mock) {
        await confirmBillingCheckout(session.invoiceId, `pay_mock_${session.invoiceId}`, 'mock');
        handleCheckoutSuccess();
        return;
      }
      if (!session.orderId || !session.keyId) {
        throw new Error('Payment gateway is not configured.');
      }
      await openRazorpayCheckout({
        keyId: session.keyId,
        amount: session.amount,
        currency: session.currency,
        orderId: session.orderId,
        planName: session.planName ?? plan.name,
        onSuccess: async (paymentId, signature) => {
          try {
            await confirmBillingCheckout(session.invoiceId!, paymentId, signature);
            handleCheckoutSuccess();
          } catch {
            showToast('Payment succeeded but confirmation failed. Contact support if credits do not update.', 'error');
          }
        },
        onDismiss: () => showToast('Checkout cancelled.', 'info'),
      });
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Checkout failed. Please try again.', 'error');
    },
  });

  const retryMutation = useMutation({
    mutationFn: async () => {
      const session = await retryBillingPayment();
      if (!session.invoiceId) {
        throw new Error('Retry session missing.');
      }
      if (session.mock) {
        await confirmBillingCheckout(session.invoiceId, `pay_mock_${session.invoiceId}`, 'mock');
        handleCheckoutSuccess();
        return;
      }
      if (!session.orderId || !session.keyId) {
        throw new Error('Payment gateway is not configured.');
      }
      await openRazorpayCheckout({
        keyId: session.keyId,
        amount: session.amount,
        currency: session.currency,
        orderId: session.orderId,
        planName: session.planName ?? 'Subscription',
        onSuccess: async (paymentId, signature) => {
          await confirmBillingCheckout(session.invoiceId!, paymentId, signature);
          handleCheckoutSuccess();
        },
      });
    },
    onError: () => showToast('Could not retry payment. Please try again or contact support.', 'error'),
  });

  const cancelMutation = useMutation({
    mutationFn: () => updateBillingSubscription('cancel'),
    onSuccess: () => {
      invalidateBilling();
      showToast('Subscription will cancel at the end of the billing period.', 'success');
    },
    onError: () => showToast('Failed to cancel subscription.', 'error'),
  });

  const resumeMutation = useMutation({
    mutationFn: () => updateBillingSubscription('resume'),
    onSuccess: () => {
      invalidateBilling();
      showToast('Subscription renewed.', 'success');
    },
    onError: () => showToast('Failed to resume subscription.', 'error'),
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Credits & Billing</h1>
          <p className="section-subtitle">Manage your AI credits and subscription</p>
        </div>
        <LoadingCard />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <PageErrorState
        title="Failed to load credits"
        message={error instanceof Error ? error.message : 'Please try again later'}
        onRetry={() => queryClient.invalidateQueries({ queryKey: queryKeys.creditUsage })}
      />
    );
  }

  const usagePercentage = data.total > 0 ? (data.used / data.total) * 100 : 0;
  const isPastDue = subscription?.status === 'past_due';

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Credits & Billing</h1>
        <p className="section-subtitle">Manage your AI credits and subscription</p>
      </div>

      {isPastDue && (
        <Card className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-100">Payment failed</h2>
              <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                Your last payment did not go through. Retry to restore full access, or contact support if the issue persists.
              </p>
            </div>
            <Button onClick={() => retryMutation.mutate()} isLoading={retryMutation.isPending}>
              Retry Payment
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Remaining Credits</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{data.remaining}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Credits</p>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">{data.total}</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Usage</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {data.used} / {data.total}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 dark:bg-gray-100 transition-all duration-300"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Subscription</h2>
          {subscription ? (
            <div className="space-y-3">
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{subscription.planName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {subscription.billingCycle} · {subscription.status.replace('_', ' ')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
                {subscription.cancelAtPeriodEnd && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    Cancels at period end
                  </p>
                )}
                {subscription.pendingPlanName && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Downgrades to {subscription.pendingPlanName} next cycle
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {subscription.cancelAtPeriodEnd ? (
                  <Button size="sm" variant="outline" onClick={() => resumeMutation.mutate()} isLoading={resumeMutation.isPending}>
                    Resume
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => cancelMutation.mutate()} isLoading={cancelMutation.isPending}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No active subscription. Choose a plan below to get started.
            </p>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Usage Breakdown</h2>
        <div className="space-y-2">
          {[
            ['Resume Optimization', data.breakdown.resumeOptimization],
            ['Interview Prep', data.breakdown.interviewPrep],
            ['Auto-Apply', data.breakdown.autoApply],
            ['Negotiation', data.breakdown.negotiation],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
              <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{value}</span>
            </div>
          ))}
        </div>
      </Card>

      {plans && plans.length > 0 && (
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Plans</h2>
            <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                  billingCycle === 'monthly' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                  billingCycle === 'yearly' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {plans.map((plan) => {
              const amount = billingCycle === 'yearly' ? plan.yearlyPrice : plan.price;
              const isCurrent = subscription?.planId === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`rounded-lg border p-4 ${
                    checkoutPlanId === plan.id
                      ? 'border-primary-500 ring-1 ring-primary-500'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{plan.description}</p>
                  <p className="text-xl font-bold text-primary-600 dark:text-primary-400 mt-3">
                    {plan.isFree ? 'Free' : formatPaiseAsInr(amount)}
                    {!plan.isFree && (
                      <span className="text-xs font-normal text-gray-500">/{billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{plan.creditLimit} credits/month</p>
                  <Button
                    className="w-full mt-4"
                    size="sm"
                    variant={isCurrent ? 'outline' : 'primary'}
                    disabled={isCurrent}
                    isLoading={checkoutMutation.isPending && checkoutPlanId === plan.id}
                    onClick={() => {
                      setCheckoutPlanId(plan.id);
                      checkoutMutation.mutate(plan);
                    }}
                  >
                    {isCurrent ? 'Current Plan' : plan.isFree ? 'Activate Free' : 'Subscribe'}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {invoices && invoices.length > 0 && (
        <Card padding="none">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Billing History</h2>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Invoice</TableHeader>
                <TableHeader>Plan</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Date</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-xs">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.planName}</TableCell>
                  <TableCell>{formatPaiseAsInr(invoice.amount)}</TableCell>
                  <TableCell className="capitalize">{invoice.status}</TableCell>
                  <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
