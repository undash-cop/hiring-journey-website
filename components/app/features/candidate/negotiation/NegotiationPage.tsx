import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNegotiationFrameworks } from '../../../services/api';
import { Card, Button, Badge } from '../../../components/ui';
import { formatIndianCurrency, formatIndianCurrencyRange } from '../../../utils/currency';
import type { NegotiationFramework } from '../../../types';

const mockMarketData = {
  averageSalary: 1250000,
  yourOffer: 1200000,
  marketRange: { min: 1100000, max: 1400000 },
};

export default function NegotiationPage() {
  const [selectedFramework, setSelectedFramework] = useState<number | null>(null);

  const { data: frameworks, isLoading } = useQuery({
    queryKey: ['negotiation-frameworks'],
    queryFn: getNegotiationFrameworks,
  });
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Offer & Negotiation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Get insights and tips for salary negotiation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Market Salary</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatIndianCurrency(mockMarketData.averageSalary)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Offer</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatIndianCurrency(mockMarketData.yourOffer)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Range</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            {formatIndianCurrencyRange(mockMarketData.marketRange.min, mockMarketData.marketRange.max)}
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Negotiation Frameworks</h2>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading frameworks...</div>
        ) : (
          <div className="space-y-4">
            {frameworks?.map((framework: NegotiationFramework) => (
              <div
                key={framework.id}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer"
                onClick={() => setSelectedFramework(selectedFramework === framework.id ? null : framework.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{framework.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{framework.description}</p>
                    {selectedFramework === framework.id && (
                      <div className="mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Steps:</h4>
                          <ol className="list-decimal list-inside space-y-1">
                            {framework.steps.map((step, idx) => (
                              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tips:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {framework.tips.map((tip, idx) => (
                              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">{tip}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Templates:</h4>
                          <div className="flex flex-wrap gap-2">
                            {framework.templates.map((template, idx) => (
                              <Button key={idx} variant="outline" size="sm">
                                {template}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Badge variant="info">{framework.steps.length} Steps</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Market Insights</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Your position vs market average</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {mockMarketData.yourOffer < mockMarketData.averageSalary ? 'Below' : 'Above'} Average
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full"
                style={{ width: `${(mockMarketData.yourOffer / mockMarketData.marketRange.max) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 Based on your skills and experience, you could potentially negotiate up to{' '}
              <strong>{formatIndianCurrency(mockMarketData.marketRange.max)}</strong>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
