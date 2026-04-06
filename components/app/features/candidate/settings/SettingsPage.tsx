import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Button, Input, Select } from '../../../components/ui';
import { useToast } from '../../../contexts/ToastContext';
import { getUserSettings, updateUserSettings, changePassword } from '../../../services/api';
import { LoadingCard } from '../../../components/ui/Loading';
import { validatePassword } from '../../../utils/validation';

export default function SettingsPage() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['user-settings'],
    queryFn: getUserSettings,
  });

  const [localSettings, setLocalSettings] = useState({
    emailNotifications: settings?.emailNotifications ?? true,
    smsNotifications: settings?.smsNotifications ?? false,
    marketingEmails: settings?.marketingEmails ?? false,
    autoApplyEnabled: settings?.autoApplyEnabled ?? false,
    skillMatchThreshold: settings?.skillMatchThreshold ?? 70,
    preferredLocations: settings?.preferredLocations ?? [],
    preferredJobTypes: settings?.preferredJobTypes ?? [],
    theme: settings?.theme ?? 'system',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  const updateSettingsMutation = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-settings'] });
      showToast('Settings saved successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to save settings. Please try again.', 'error');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
      showToast('Password changed successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to change password. Please check your current password.', 'error');
    },
  });

  const handleSaveSettings = () => {
    updateSettingsMutation.mutate(localSettings);
  };

  const handleChangePassword = () => {
    const errors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    const passwordError = validatePassword(passwordData.newPassword);
    if (passwordError) {
      errors.newPassword = passwordError;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors({});
    changePasswordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="section-subtitle">Manage your preferences and account settings</p>
        </div>
        <LoadingCard />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Manage your preferences and account settings</p>
      </div>

      {/* Notification Preferences */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Email Notifications</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Receive email updates about your applications and interviews
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.emailNotifications}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, emailNotifications: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 dark:peer-focus:ring-gray-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-100"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">SMS Notifications</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Receive SMS updates for important notifications
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.smsNotifications}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, smsNotifications: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 dark:peer-focus:ring-gray-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-100"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Marketing Emails</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Receive updates about new features and tips
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.marketingEmails}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, marketingEmails: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 dark:peer-focus:ring-gray-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-100"></div>
            </label>
          </div>
        </div>
        <Button onClick={handleSaveSettings} className="mt-4" isLoading={updateSettingsMutation.isPending}>
          Save Notification Settings
        </Button>
      </Card>

      {/* Auto-Apply Preferences */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Auto-Apply Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Enable Auto-Apply</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Automatically apply to jobs matching your criteria
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.autoApplyEnabled}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, autoApplyEnabled: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 dark:peer-focus:ring-gray-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-100"></div>
            </label>
          </div>
          {localSettings.autoApplyEnabled && (
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Skill Match Threshold: {localSettings.skillMatchThreshold}%
              </label>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={localSettings.skillMatchThreshold}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, skillMatchThreshold: parseInt(e.target.value) })
                }
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          )}
        </div>
        <Button onClick={handleSaveSettings} className="mt-4" isLoading={updateSettingsMutation.isPending}>
          Save Auto-Apply Settings
        </Button>
      </Card>

      {/* Change Password */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Change Password
        </h2>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => {
              setPasswordData({ ...passwordData, currentPassword: e.target.value });
              if (passwordErrors.currentPassword) {
                setPasswordErrors({ ...passwordErrors, currentPassword: '' });
              }
            }}
            error={passwordErrors.currentPassword}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => {
              setPasswordData({ ...passwordData, newPassword: e.target.value });
              if (passwordErrors.newPassword) {
                setPasswordErrors({ ...passwordErrors, newPassword: '' });
              }
            }}
            error={passwordErrors.newPassword}
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => {
              setPasswordData({ ...passwordData, confirmPassword: e.target.value });
              if (passwordErrors.confirmPassword) {
                setPasswordErrors({ ...passwordErrors, confirmPassword: '' });
              }
            }}
            error={passwordErrors.confirmPassword}
            placeholder="Confirm new password"
          />
          <Button
            onClick={handleChangePassword}
            isLoading={changePasswordMutation.isPending}
            className="w-full md:w-auto"
          >
            Change Password
          </Button>
        </div>
      </Card>

      {/* Theme Preferences */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Appearance
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <Select
              value={localSettings.theme}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, theme: e.target.value as 'light' | 'dark' | 'system' })
              }
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
            />
          </div>
        </div>
        <Button onClick={handleSaveSettings} className="mt-4" isLoading={updateSettingsMutation.isPending}>
          Save Appearance Settings
        </Button>
      </Card>
    </div>
  );
}
