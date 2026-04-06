import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../store/authStore';
import { Card, Input, Button } from '../../../components/ui';
import { useToast } from '../../../contexts/ToastContext';
import { validateForm, type ValidationRule } from '../../../utils/validation';
import { getUserProfile, updateUserProfile } from '../../../services/api';
import { LoadingCard } from '../../../components/ui/Loading';

export default function ProfilePage() {
  const { user, login } = useAuthStore();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    bio: profile?.bio || '',
    linkedinUrl: profile?.linkedinUrl || '',
    githubUrl: profile?.githubUrl || '',
    portfolioUrl: profile?.portfolioUrl || '',
    experience: profile?.experience || '',
    education: profile?.education || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      login({ token: useAuthStore.getState().token || '', user: updatedUser });
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to update profile. Please try again.', 'error');
    },
  });

  const handleSave = () => {
    const rules: Record<string, ValidationRule> = {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { pattern: /^[\d\s\-\+\(\)]+$/, custom: (value) => {
        if (value && value.length < 10) return 'Phone number must be at least 10 digits';
        return null;
      }},
      linkedinUrl: { pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/ },
      githubUrl: { pattern: /^(https?:\/\/)?(www\.)?github\.com\/.+/ },
    };

    const validationErrors = validateForm(formData, rules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      linkedinUrl: profile?.linkedinUrl || '',
      githubUrl: profile?.githubUrl || '',
      portfolioUrl: profile?.portfolioUrl || '',
      experience: profile?.experience || '',
      education: profile?.education || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Profile</h1>
          <p className="section-subtitle">Manage your account information</p>
        </div>
        <LoadingCard />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Profile</h1>
          <p className="section-subtitle">Manage your account information and preferences</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {/* Profile Overview */}
      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 text-lg font-semibold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {user?.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{user?.email}</p>
            {profile?.resumeScore && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Resume Score:</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  {profile.resumeScore}%
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
            disabled={!isEditing}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            disabled={!isEditing}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            error={errors.phone}
            disabled={!isEditing}
            placeholder="+91 98765 43210"
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            disabled={!isEditing}
            placeholder="City, State"
          />
        </div>
        {isEditing && (
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} isLoading={updateMutation.isPending}>
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </Card>

      {/* Bio & Links */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Bio & Links
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Tell us about yourself..."
            />
          </div>
          <Input
            label="LinkedIn URL"
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => {
              setFormData({ ...formData, linkedinUrl: e.target.value });
              if (errors.linkedinUrl) setErrors({ ...errors, linkedinUrl: '' });
            }}
            error={errors.linkedinUrl}
            disabled={!isEditing}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          <Input
            label="GitHub URL"
            type="url"
            value={formData.githubUrl}
            onChange={(e) => {
              setFormData({ ...formData, githubUrl: e.target.value });
              if (errors.githubUrl) setErrors({ ...errors, githubUrl: '' });
            }}
            error={errors.githubUrl}
            disabled={!isEditing}
            placeholder="https://github.com/yourusername"
          />
          <Input
            label="Portfolio URL"
            type="url"
            value={formData.portfolioUrl}
            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
            disabled={!isEditing}
            placeholder="https://yourportfolio.com"
          />
        </div>
      </Card>

      {/* Experience & Education */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Experience & Education
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Experience
            </label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              disabled={!isEditing}
              rows={4}
              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Describe your work experience..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Education
            </label>
            <textarea
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="List your educational background..."
            />
          </div>
        </div>
      </Card>

      {/* Stats */}
      {profile && (profile.applicationsCount !== undefined || profile.interviewsCount !== undefined) && (
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Activity Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.applicationsCount !== undefined && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Applications</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {profile.applicationsCount}
                </p>
              </div>
            )}
            {profile.interviewsCount !== undefined && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Interviews</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {profile.interviewsCount}
                </p>
              </div>
            )}
            {profile.resumeScore !== undefined && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Resume Score</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {profile.resumeScore}%
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {new Date(profile.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
