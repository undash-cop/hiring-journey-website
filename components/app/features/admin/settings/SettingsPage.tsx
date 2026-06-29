'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPlatformSettings, updatePlatformSettings } from '../../../services/api';
import { Card, Button, Input } from '../../../components/ui';
import { PageErrorState } from '../../../components/QueryStateViews';
import { useToast } from '../../../contexts/ToastContext';
import { adminQueryKeys } from '@/lib/admin-query-keys';
import type { PlatformSettings } from '../../../types';

type SettingsFormState = {
  platformDisplayName: string;
  supportEmail: string;
  defaultCandidateCredits: string;
  linkedinIntegrationEnabled: boolean;
  indeedIntegrationEnabled: boolean;
};

function settingsToForm(settings: PlatformSettings): SettingsFormState {
  return {
    platformDisplayName: settings.platformDisplayName,
    supportEmail: settings.supportEmail,
    defaultCandidateCredits: String(settings.defaultCandidateCredits),
    linkedinIntegrationEnabled: settings.linkedinIntegrationEnabled,
    indeedIntegrationEnabled: settings.indeedIntegrationEnabled,
  };
}

function SettingsForm({ settings }: { settings: PlatformSettings }) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<SettingsFormState>(() => settingsToForm(settings));

  const saveMutation = useMutation({
    mutationFn: () =>
      updatePlatformSettings({
        platformDisplayName: formData.platformDisplayName,
        supportEmail: formData.supportEmail,
        defaultCandidateCredits: parseInt(formData.defaultCandidateCredits, 10),
        linkedinIntegrationEnabled: formData.linkedinIntegrationEnabled,
        indeedIntegrationEnabled: formData.indeedIntegrationEnabled,
      }),
    onSuccess: () => {
      showToast('Platform settings saved.', 'success');
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.settings });
    },
    onError: () => {
      showToast('Failed to save settings.', 'error');
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveMutation.mutate();
      }}
    >
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">General</h2>
        <div className="space-y-4">
          <Input
            label="Platform Display Name"
            value={formData.platformDisplayName}
            onChange={(e) => setFormData({ ...formData, platformDisplayName: e.target.value })}
            required
          />
          <Input
            label="Support Email"
            type="email"
            value={formData.supportEmail}
            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
            required
          />
          <Input
            label="Default Candidate Credits"
            type="number"
            value={formData.defaultCandidateCredits}
            onChange={(e) => setFormData({ ...formData, defaultCandidateCredits: e.target.value })}
            required
          />
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Integrations</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.linkedinIntegrationEnabled}
              onChange={(e) =>
                setFormData({ ...formData, linkedinIntegrationEnabled: e.target.checked })
              }
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">LinkedIn integration</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.indeedIntegrationEnabled}
              onChange={(e) =>
                setFormData({ ...formData, indeedIntegrationEnabled: e.target.checked })
              }
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Indeed integration</span>
          </label>
        </div>
      </Card>

      <div className="flex justify-end mt-6">
        <Button type="submit" isLoading={saveMutation.isPending}>
          Save Settings
        </Button>
      </div>
    </form>
  );
}

export default function SettingsPage() {
  const { data: settings, isLoading, isError, refetch } = useQuery({
    queryKey: adminQueryKeys.settings,
    queryFn: getPlatformSettings,
  });

  if (isLoading) {
    return <div className="p-4 sm:p-6">Loading settings...</div>;
  }

  if (isError || !settings) {
    return (
      <PageErrorState
        title="Failed to load settings"
        message="We could not load platform settings. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold gradient-text">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage platform settings</p>
      </div>

      <SettingsForm key={settings.updatedAt} settings={settings} />
    </div>
  );
}
