import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Button, Input, Select, Badge, Modal } from '../../../components/ui';
import { useToast } from '../../../contexts/ToastContext';
import {
  getAutoApplyProfiles,
  createAutoApplyProfile,
  updateAutoApplyProfile,
  deleteAutoApplyProfile,
  getCreditUsage,
} from '../../../services/api';
import { LoadingCard } from '../../../components/ui/Loading';
import { PageErrorState } from '../../../components/QueryStateViews';
import { queryKeys } from '@/lib/query-keys';
import { CREDIT_COSTS } from '@/lib/constants';
import type { AutoApplyProfile } from '../../../types';

export default function AutoApplyPage() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'profiles' | 'create'>('profiles');
  const [editingProfile, setEditingProfile] = useState<AutoApplyProfile | null>(null);
  const [activationConfirm, setActivationConfirm] = useState<AutoApplyProfile | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    minSalary: '',
    locations: '',
    jobTypes: [] as string[],
    requiredSkills: '',
    skillMatchThreshold: '70',
    jobBoards: [] as string[],
    excludeCompanies: '',
    excludeKeywords: '',
    dailyApplyLimit: '50',
    applySchedule: 'daily' as 'daily' | 'weekly' | 'custom',
  });

  const { data: profiles, isLoading, isError } = useQuery({
    queryKey: queryKeys.autoApplyProfiles,
    queryFn: getAutoApplyProfiles,
  });

  const { data: creditUsage } = useQuery({
    queryKey: queryKeys.creditUsage,
    queryFn: getCreditUsage,
  });

  const createMutation = useMutation({
    mutationFn: createAutoApplyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.autoApplyProfiles });
      showToast('Auto-apply profile created successfully!', 'success');
      setActiveTab('profiles');
      resetForm();
    },
    onError: () => {
      showToast('Failed to create profile. Please try again.', 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AutoApplyProfile> }) =>
      updateAutoApplyProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.autoApplyProfiles });
      showToast('Profile updated successfully!', 'success');
      setEditingProfile(null);
      resetForm();
    },
    onError: () => {
      showToast('Failed to update profile. Please try again.', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAutoApplyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.autoApplyProfiles });
      showToast('Profile deleted successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to delete profile. Please try again.', 'error');
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      minSalary: '',
      locations: '',
      jobTypes: [],
      requiredSkills: '',
      skillMatchThreshold: '70',
      jobBoards: [],
      excludeCompanies: '',
      excludeKeywords: '',
      dailyApplyLimit: '50',
      applySchedule: 'daily',
    });
  };

  const handleEdit = (profile: AutoApplyProfile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      minSalary: profile.minSalary.toString(),
      locations: profile.locations.join(', '),
      jobTypes: profile.jobTypes,
      requiredSkills: profile.requiredSkills.join(', '),
      skillMatchThreshold: profile.skillMatchThreshold.toString(),
      jobBoards: profile.jobBoards,
      excludeCompanies: profile.excludeCompanies.join(', '),
      excludeKeywords: profile.excludeKeywords.join(', '),
      dailyApplyLimit: profile.dailyApplyLimit.toString(),
      applySchedule: profile.applySchedule,
    });
    setActiveTab('create');
  };

  const handleSubmit = () => {
    if (!formData.name || formData.name.length < 2) {
      showToast('Profile name is required (min 2 characters)', 'error');
      return;
    }

    if (!formData.skillMatchThreshold) {
      showToast('Skill match threshold is required', 'error');
      return;
    }

    if (!formData.dailyApplyLimit || !/^\d+$/.test(formData.dailyApplyLimit)) {
      showToast('Daily apply limit must be a valid number', 'error');
      return;
    }

    const profileData = {
      name: formData.name,
      isActive: false,
      minSalary: parseInt(formData.minSalary) || 0,
      locations: formData.locations.split(',').map((l) => l.trim()).filter(Boolean),
      jobTypes: formData.jobTypes,
      requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      skillMatchThreshold: parseInt(formData.skillMatchThreshold),
      jobBoards: formData.jobBoards,
      excludeCompanies: formData.excludeCompanies.split(',').map((c) => c.trim()).filter(Boolean),
      excludeKeywords: formData.excludeKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      dailyApplyLimit: parseInt(formData.dailyApplyLimit),
      applySchedule: formData.applySchedule,
    };

    if (editingProfile) {
      updateMutation.mutate({ id: editingProfile.id, data: profileData });
    } else {
      createMutation.mutate(profileData);
    }
  };

  const handleToggleProfile = (profile: AutoApplyProfile) => {
    if (profile.isActive) {
      updateMutation.mutate({
        id: profile.id,
        data: { isActive: false },
      });
      return;
    }

    const remaining = creditUsage?.remaining ?? 0;
    if (remaining < CREDIT_COSTS.AUTO_APPLY) {
      showToast(
        `Not enough credits to activate auto-apply. Each application costs ${CREDIT_COSTS.AUTO_APPLY} credits.`,
        'error',
      );
      return;
    }

    setActivationConfirm(profile);
  };

  const confirmActivation = () => {
    if (!activationConfirm) return;
    updateMutation.mutate(
      {
        id: activationConfirm.id,
        data: { isActive: true },
      },
      {
        onSuccess: () => setActivationConfirm(null),
      },
    );
  };

  const activationPreview = activationConfirm
    ? {
        dailyLimit: activationConfirm.dailyApplyLimit,
        costPerApply: CREDIT_COSTS.AUTO_APPLY,
        maxDailyCost: activationConfirm.dailyApplyLimit * CREDIT_COSTS.AUTO_APPLY,
        remaining: creditUsage?.remaining ?? 0,
      }
    : null;

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Auto-Apply</h1>
          <p className="section-subtitle">Automate your job applications</p>
        </div>
        <LoadingCard />
      </div>
    );
  }

  if (isError) {
    return (
      <PageErrorState
        title="Failed to load auto-apply profiles"
        onRetry={() => queryClient.invalidateQueries({ queryKey: queryKeys.autoApplyProfiles })}
      />
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Auto-Apply</h1>
          <p className="section-subtitle">Create automated job application profiles</p>
        </div>
        <Button onClick={() => { setActiveTab('create'); setEditingProfile(null); resetForm(); }}>
          Create Profile
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('profiles')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'profiles'
              ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Profiles ({profiles?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'create'
              ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          {editingProfile ? 'Edit Profile' : 'Create Profile'}
        </button>
      </div>

      {activeTab === 'profiles' && (
        <div className="space-y-4">
          {profiles && profiles.length > 0 ? (
            profiles.map((profile) => (
              <Card key={profile.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {profile.name}
                      </h3>
                      <Badge variant={profile.isActive ? 'success' : 'default'}>
                        {profile.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="info">{profile.appliedCount} applied</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">Min Salary:</span> ₹{profile.minSalary.toLocaleString('en-IN')}
                      </div>
                      <div>
                        <span className="font-medium">Locations:</span> {profile.locations.length}
                      </div>
                      <div>
                        <span className="font-medium">Skill Match:</span> {profile.skillMatchThreshold}%
                      </div>
                      <div>
                        <span className="font-medium">Daily Limit:</span> {profile.dailyApplyLimit}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {profile.jobBoards.map((board) => (
                        <Badge key={board} variant="info" className="text-[10px]">
                          {board}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.isActive}
                        onChange={() => handleToggleProfile(profile)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 dark:peer-focus:ring-gray-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-100"></div>
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(profile)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this profile?')) {
                          deleteMutation.mutate(profile.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <div className="text-center py-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  No auto-apply profiles yet. Create one to get started!
                </p>
                <Button onClick={() => setActiveTab('create')}>Create Profile</Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Profile Settings
            </h2>
            <div className="space-y-4">
              <Input
                label="Profile Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Frontend Developer - Remote"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Minimum Salary (₹)"
                  type="number"
                  value={formData.minSalary}
                  onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                  placeholder="1000000"
                />
                <Input
                  label="Daily Apply Limit"
                  type="number"
                  value={formData.dailyApplyLimit}
                  onChange={(e) => setFormData({ ...formData, dailyApplyLimit: e.target.value })}
                  placeholder="50"
                />
              </div>

              <Input
                label="Locations (comma-separated)"
                value={formData.locations}
                onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                placeholder="Remote, Bangalore, Mumbai"
              />

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employment Types
                </label>
                <div className="flex flex-wrap gap-2">
                  {['full-time', 'part-time', 'contract', 'internship'].map((type) => (
                    <label key={type} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.jobTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, jobTypes: [...formData.jobTypes, type] });
                          } else {
                            setFormData({
                              ...formData,
                              jobTypes: formData.jobTypes.filter((t) => t !== type),
                            });
                          }
                        }}
                        className="w-3 h-3 rounded border-gray-300 dark:border-gray-700"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                        {type.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label="Required Skills (comma-separated)"
                value={formData.requiredSkills}
                onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                placeholder="React, TypeScript, Node.js"
              />

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Skill Match: {formData.skillMatchThreshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={formData.skillMatchThreshold}
                  onChange={(e) =>
                    setFormData({ ...formData, skillMatchThreshold: e.target.value })
                  }
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Boards
                </label>
                <div className="flex flex-wrap gap-2">
                  {['LinkedIn', 'Indeed', 'Naukri', 'Glassdoor', 'Monster', 'Shine', 'TimesJobs'].map(
                    (board) => (
                      <label key={board} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.jobBoards.includes(board.toLowerCase())}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                jobBoards: [...formData.jobBoards, board.toLowerCase()],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                jobBoards: formData.jobBoards.filter((b) => b !== board.toLowerCase()),
                              });
                            }
                          }}
                          className="w-3 h-3 rounded border-gray-300 dark:border-gray-700"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{board}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <Input
                label="Exclude Companies (comma-separated)"
                value={formData.excludeCompanies}
                onChange={(e) => setFormData({ ...formData, excludeCompanies: e.target.value })}
                placeholder="Company A, Company B"
              />

              <Input
                label="Exclude Keywords (comma-separated)"
                value={formData.excludeKeywords}
                onChange={(e) => setFormData({ ...formData, excludeKeywords: e.target.value })}
                placeholder="keyword1, keyword2"
              />

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Apply Schedule
                </label>
                <Select
                  value={formData.applySchedule}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applySchedule: e.target.value as 'daily' | 'weekly' | 'custom',
                    })
                  }
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'custom', label: 'Custom' },
                  ]}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={handleSubmit}
                isLoading={createMutation.isPending || updateMutation.isPending}
              >
                {editingProfile ? 'Update Profile' : 'Create Profile'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab('profiles');
                  setEditingProfile(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
      <Modal
        isOpen={activationConfirm != null}
        onClose={() => setActivationConfirm(null)}
        title="Activate auto-apply profile?"
        footer={
          <>
            <Button variant="outline" onClick={() => setActivationConfirm(null)} disabled={updateMutation.isPending}>
              Cancel
            </Button>
            <Button onClick={confirmActivation} isLoading={updateMutation.isPending}>
              Activate Profile
            </Button>
          </>
        }
      >
        {activationPreview && (
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Activating <span className="font-medium text-gray-900 dark:text-gray-100">{activationConfirm?.name}</span>{' '}
              will allow automated applications up to your daily limit.
            </p>
            <ul className="space-y-1">
              <li>Daily apply limit: {activationPreview.dailyLimit} applications</li>
              <li>Cost per application: {activationPreview.costPerApply} credits</li>
              <li>Max daily credit cost: {activationPreview.maxDailyCost} credits</li>
              <li>Your remaining credits: {activationPreview.remaining}</li>
            </ul>
            {activationPreview.remaining < activationPreview.maxDailyCost && (
              <p className="text-orange-700 dark:text-orange-300">
                Your balance may not cover a full day at the daily limit. Auto-apply will stop when credits run out.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
