import { useQuery } from '@tanstack/react-query';
import { getPlans } from '../../../services/api';
import { Card, Button, Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../../components/ui';
import { formatIndianCurrency } from '../../../utils/currency';
import type { Plan } from '../../../types';

export default function PlansPage() {
  const { data: plans, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
  });

  if (isLoading) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">Plans & Credits</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Manage subscription plans and credit limits</p>
        </div>
        <Button className="w-full sm:w-auto">Create New Plan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans?.map((plan: Plan) => (
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
                  style={{ width: `${(plan.usage / plan.creditLimit) * 100}%` }}
                ></div>
              </div>
            </div>
            <Button variant="outline" className="w-full">Edit Plan</Button>
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
            {plans?.map((plan: Plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{plan.name}</TableCell>
                <TableCell>{plan.creditLimit}</TableCell>
                <TableCell>{plan.usage}</TableCell>
                <TableCell>{plan.creditLimit - plan.usage}</TableCell>
                <TableCell>{((plan.usage / plan.creditLimit) * 100).toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
