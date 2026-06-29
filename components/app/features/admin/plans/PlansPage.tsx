'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPlan, getPlans, updatePlan } from '../../../services/api';
import { Card, Button, Input, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Modal } from '../../../components/ui';
import { PageEmptyState, PageErrorState } from '../../../components/QueryStateViews';
import { adminQueryKeys } from '@/lib/admin-query-keys';
import { formatIndianCurrency } from '../../../utils/currency';
import { useToast } from '../../../contexts/ToastContext';
import type { Plan } from '../../../types';

type PlanFormState = {
  name: string;
  creditLimit: string;
  price: string;
};

const emptyPlanForm: PlanFormState = {
  name: '',
  creditLimit: '',
  price: '',
};

export default function PlansPage() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<PlanFormState>(emptyPlanForm);

  const { data: plans, isLoading, isError, refetch } = useQuery({
    queryKey: adminQueryKeys.plans,
    queryFn: getPlans,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      createPlan({
        name: formData.name,
        creditLimit: parseInt(formData.creditLimit, 10),
        price: parseInt(formData.price, 10),
      }),
    onSuccess: () => {
      showToast('Plan created.', 'success');
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.plans });
      setIsCreateOpen(false);
      setFormData(emptyPlanForm);
    },
    onError: () => showToast('Failed to create plan.', 'error'),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updatePlan(editingPlan!.id, {
        name: formData.name,
        creditLimit: parseInt(formData.creditLimit, 10),
        price: parseInt(formData.price, 10),
      }),
    onSuccess: () => {
      showToast('Plan updated.', 'success');
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.plans });
      setEditingPlan(null);
      setFormData(emptyPlanForm);
    },
    onError: () => showToast('Failed to update plan.', 'error'),
  });

  const openEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      creditLimit: String(plan.creditLimit),
      price: String(plan.price),
    });
  };

  const closeModal = () => {
    setIsCreateOpen(false);
    setEditingPlan(null);
    setFormData(emptyPlanForm);
  };

  if (isLoading) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  if (isError) {
    return (
      <PageErrorState
        title="Failed to load plans"
        message="We could not load subscription plans. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  if (!plans?.length) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">Plans & Credits</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Manage subscription plans and credit limits
          </p>
        </div>
        <PageEmptyState
          title="No plans configured"
          description="Create a subscription plan to get started."
        />
        <Button onClick={() => setIsCreateOpen(true)}>Create New Plan</Button>
      </div>
    );
  }

  const isModalOpen = isCreateOpen || editingPlan != null;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">Plans & Credits</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Manage subscription plans and credit limits</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setIsCreateOpen(true)}>
          Create New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan: Plan) => (
          <Card key={plan.id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{plan.name}</h3>
              <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">{formatIndianCurrency(plan.price)}</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Credit Limit</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{plan.creditLimit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Usage</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{plan.usage}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${plan.creditLimit ? (plan.usage / plan.creditLimit) * 100 : 0}%` }}
                />
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => openEdit(plan)}>
              Edit Plan
            </Button>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Plan Usage Overview</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Plan Name</TableHeader>
              <TableHeader>Credit Limit</TableHeader>
              <TableHeader>Usage</TableHeader>
              <TableHeader>Remaining</TableHeader>
              <TableHeader>Usage %</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan: Plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{plan.name}</TableCell>
                <TableCell>{plan.creditLimit}</TableCell>
                <TableCell>{plan.usage}</TableCell>
                <TableCell>{plan.creditLimit - plan.usage}</TableCell>
                <TableCell>
                  {plan.creditLimit ? ((plan.usage / plan.creditLimit) * 100).toFixed(1) : '0.0'}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPlan ? 'Edit Plan' : 'Create Plan'}
        footer={
          <>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              isLoading={isSaving}
              onClick={() => {
                if (editingPlan) {
                  updateMutation.mutate();
                } else {
                  createMutation.mutate();
                }
              }}
            >
              {editingPlan ? 'Save Changes' : 'Create Plan'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Plan Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Credit Limit"
            type="number"
            value={formData.creditLimit}
            onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
            required
          />
          <Input
            label="Price (₹)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
      </Modal>
    </div>
  );
}
