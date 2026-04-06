import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { publishJob } from '../../../services/api';
import { Card, Button, Input, Select } from '../../../components/ui';

export default function PublishJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    employmentType: '',
    publishTo: [] as string[],
  });

  const publishMutation = useMutation({
    mutationFn: publishJob,
    onSuccess: (data) => {
      alert(`Job published successfully! LinkedIn: ${data.externalPostingIds?.linkedin || 'N/A'}, Indeed: ${data.externalPostingIds?.indeed || 'N/A'}`);
      setFormData({
        title: '',
        description: '',
        skills: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        employmentType: '',
        publishTo: [],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    publishMutation.mutate({
      title: formData.title,
      description: formData.description,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      location: formData.location,
      salaryRange: {
        min: parseInt(formData.salaryMin),
        max: parseInt(formData.salaryMax),
      },
      employmentType: formData.employmentType as any,
      publishTo: formData.publishTo as any,
    });
  };

  const handlePublishToChange = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      publishTo: prev.publishTo.includes(platform)
        ? prev.publishTo.filter(p => p !== platform)
        : [...prev.publishTo, platform],
    }));
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold gradient-text">Publish Job</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Create and publish a new job posting</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Details</h2>
          <div className="space-y-4">
            <Input
              label="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Senior Frontend Developer"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Job description..."
              />
            </div>
            <Input
              label="Required Skills (comma-separated)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              required
              placeholder="React, TypeScript, Node.js"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="San Francisco, CA or Remote"
              />
              <Select
                label="Employment Type"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                required
                options={[
                  { value: '', label: 'Select type' },
                  { value: 'full-time', label: 'Full-time' },
                  { value: 'part-time', label: 'Part-time' },
                  { value: 'contract', label: 'Contract' },
                  { value: 'internship', label: 'Internship' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Salary Min (₹)"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                required
                placeholder="1000000"
              />
              <Input
                label="Salary Max (₹)"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                required
                placeholder="1500000"
              />
            </div>
          </div>
        </Card>

        <Card className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Publish To</h2>
          <div className="space-y-3">
            {['internal', 'linkedin', 'indeed'].map((platform) => (
              <label key={platform} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.publishTo.includes(platform)}
                  onChange={() => handlePublishToChange(platform)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </Card>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline">Save as Draft</Button>
          <Button type="submit" isLoading={publishMutation.isPending}>
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  );
}
