import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getResumeData, optimizeResumeForRole, parseResume, analyzeResume, getResumeVersions, getResumeTemplates, getResumeBuilderData, getContentSuggestions, exportResume } from '../../../services/api';
import { Card, Button, Badge, Input, LoadingCard } from '../../../components/ui';
import { PageEmptyState, PageErrorState } from '../../../components/QueryStateViews';
import { useToast } from '../../../contexts/ToastContext';
import { useInvalidateResumeData } from '../../../hooks/invalidateCandidateQueries';
import { MOCK_API_ENABLED } from '@/lib/candidate-features';
import { queryKeys } from '@/lib/query-keys';
import type { ResumeVersion, ResumeTemplate } from '../../../types';

export default function ResumePage() {
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [showRoleOptimization, setShowRoleOptimization] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'analysis' | 'builder' | 'templates' | 'versions'>('upload');
  const [isParsing, setIsParsing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const invalidateResumeData = useInvalidateResumeData();

  const { data: resumeData, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.resumeData,
    queryFn: getResumeData,
  });

  const { data: analysis, refetch: refetchAnalysis } = useQuery({
    queryKey: ['resume-analysis', targetRole],
    queryFn: () => analyzeResume(targetRole),
    enabled: false,
  });

  const { data: versions = [] as ResumeVersion[] } = useQuery({
    queryKey: queryKeys.resumeVersions,
    queryFn: getResumeVersions,
    enabled: MOCK_API_ENABLED,
  });

  const { data: templates } = useQuery({
    queryKey: queryKeys.resumeTemplates,
    queryFn: getResumeTemplates,
    enabled: MOCK_API_ENABLED,
  });

  const { data: builderData } = useQuery({
    queryKey: queryKeys.resumeBuilder,
    queryFn: () => getResumeBuilderData(),
    enabled: MOCK_API_ENABLED && activeTab === 'builder',
  });

  const roleOptimizeMutation = useMutation({
    mutationFn: () => optimizeResumeForRole(targetRole),
    onSuccess: (result) => {
      invalidateResumeData();
      setShowRoleOptimization(false);
      showToast(`Resume optimized for ${targetRole}! Score: ${result.roleSpecificScore}`, 'success');
    },
    onError: (err: unknown) => {
      const status =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      showToast(
        status === 402
          ? 'Not enough credits. Visit Credits to review your balance.'
          : 'Failed to optimize resume. Please try again.',
        'error',
      );
    },
  });

  const parseMutation = useMutation({
    mutationFn: parseResume,
    onSuccess: () => {
      setIsParsing(false);
      showToast('Resume parsed successfully!', 'success');
      setActiveTab('builder');
      queryClient.invalidateQueries({ queryKey: ['resume-builder'] });
    },
    onError: () => {
      setIsParsing(false);
      showToast('Failed to parse resume. Please try again.', 'error');
    },
  });

  const exportMutation = useMutation({
    mutationFn: exportResume,
    onSuccess: (result) => {
      window.open(result.url, '_blank');
      showToast('Resume exported successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to export resume. Please try again.', 'error');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
        showToast('Please upload a PDF file', 'error');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        showToast('File size must be less than 5MB', 'error');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      setIsParsing(true);
      parseMutation.mutate(file);
    }
  };

  const handleAnalyze = () => {
    if (!targetRole) {
      showToast('Please enter a target role', 'error');
      return;
    }
    refetchAnalysis();
    setActiveTab('analysis');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    showToast(`Template "${templates?.find((t) => t.id === templateId)?.name}" selected`, 'success');
    setActiveTab('builder');
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">AI Resume Builder & Enhancer</h1>
          <p className="section-subtitle">Build, parse, analyze, and optimize your resume with AI</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingCard />
          <LoadingCard />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <PageErrorState
        title="Failed to load resume"
        message={error instanceof Error ? error.message : 'Please try again later'}
        onRetry={() => queryClient.invalidateQueries({ queryKey: queryKeys.resumeData })}
      />
    );
  }

  if (!resumeData) return null;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">AI Resume Builder & Enhancer</h1>
          <p className="section-subtitle">Build, parse, analyze, and optimize your resume with AI-powered insights</p>
        </div>
        {builderData && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => exportMutation.mutate('pdf')}
              isLoading={exportMutation.isPending}
            >
              Export PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => exportMutation.mutate('docx')}
              isLoading={exportMutation.isPending}
            >
              Export DOCX
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'upload'
              ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Upload & Parse
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'templates'
              ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'builder'
              ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Resume Builder
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'analysis'
              ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Analysis & Insights
        </button>
        <button
          onClick={() => setActiveTab('versions')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'versions'
              ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Versions
        </button>
      </div>

      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Upload Resume
            </h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
                disabled={isParsing}
              />
              <label
                htmlFor="resume-upload"
                className={`cursor-pointer flex flex-col items-center ${isParsing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {file ? file.name : isParsing ? 'Parsing resume...' : 'Click to upload or drag and drop'}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-500">
                  PDF only (Max 5MB)
                </span>
              </label>
            </div>
            {file && !isParsing && (
              <div className="mt-3 flex items-center gap-2">
                {MOCK_API_ENABLED ? (
                  <>
                    <Button onClick={handleUpload} size="sm" className="flex-1">
                      Parse Resume
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFile(null);
                        const input = document.getElementById('resume-upload') as HTMLInputElement;
                        if (input) input.value = '';
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    PDF parsing is coming soon. Use Optimize for Role to improve your score today.
                  </p>
                )}
              </div>
            )}
            {isParsing && (
              <div className="mt-3 text-center">
                <div className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Parsing resume...
                </div>
              </div>
            )}
          </Card>

          {/* Current Score */}
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Resume Score
            </h2>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${(resumeData.score / 100) * 264} 264`}
                    className="text-gray-900 dark:text-gray-100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {resumeData.score}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">Overall Score</p>
              
              {resumeData.atsScore && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">ATS Score</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {resumeData.atsScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-gray-900 dark:bg-gray-100 h-1.5 rounded-full"
                      style={{ width: `${resumeData.atsScore}%` }}
                    />
                  </div>
                </div>
              )}

              {resumeData.keywordMatch && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Keyword Match</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {resumeData.keywordMatch}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-gray-900 dark:bg-gray-100 h-1.5 rounded-full"
                      style={{ width: `${resumeData.keywordMatch}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                size="sm"
                className="mt-4"
                onClick={() => setShowRoleOptimization(true)}
              >
                Optimize for Role
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'templates' && (
        !MOCK_API_ENABLED ? (
          <PageEmptyState
            title="Templates coming soon"
            description="Resume templates will be available in a future release."
          />
        ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Choose a Resume Template
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select a professional template optimized for ATS systems
            </p>
          </div>

          {templates && templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template: ResumeTemplate) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-gray-900 dark:ring-gray-100'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="aspect-[8.5/11] bg-gray-100 dark:bg-gray-800 rounded mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-20 bg-white dark:bg-gray-700 rounded mx-auto mb-2"></div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{template.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                        {template.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {template.isPopular && (
                      <Badge variant="success" className="text-[10px]">Popular</Badge>
                    )}
                    {template.atsFriendly && (
                      <Badge variant="info" className="text-[10px]">ATS Friendly</Badge>
                    )}
                    <Badge variant="default" className="text-[10px] capitalize">
                      {template.category}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <LoadingCard />
          )}
        </div>
        )
      )}

      {activeTab === 'builder' && (
        !MOCK_API_ENABLED ? (
          <PageEmptyState
            title="Resume builder coming soon"
            description="The visual resume builder will be available in a future release."
          />
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Resume Sections
              </h3>
              <div className="space-y-2">
                {builderData?.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                      editingSection === section.id
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (targetRole) {
                      handleAnalyze();
                    } else {
                      showToast('Enter target role first', 'info');
                    }
                  }}
                >
                  Check ATS Score
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowRoleOptimization(true)}
                >
                  Optimize for Role
                </Button>
              </div>
            </Card>
          </div>

          {/* Builder Editor */}
          <div className="lg:col-span-2 space-y-4">
            {editingSection && builderData && (
              <Card>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Edit {builderData.sections.find((s) => s.id === editingSection)?.title}
                </h3>
                {editingSection === 'summary' && (
                  <div className="space-y-3">
                    <textarea
                      value={builderData.summary}
                      rows={6}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
                      placeholder="Write a compelling professional summary..."
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          if (!targetRole) {
                            showToast('Enter target role for AI suggestions', 'info');
                            return;
                          }
                          const suggestions = await getContentSuggestions('summary', targetRole);
                          showToast(`Suggestion: ${suggestions[0]}`, 'info');
                        }}
                      >
                        Get AI Suggestion
                      </Button>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">
                        {builderData.summary.length} characters
                      </span>
                    </div>
                  </div>
                )}
                {editingSection === 'personal' && builderData.personalInfo && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Full Name"
                      value={builderData.personalInfo.name}
                      size="sm"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={builderData.personalInfo.email}
                      size="sm"
                    />
                    <Input
                      label="Phone"
                      value={builderData.personalInfo.phone}
                      size="sm"
                    />
                    <Input
                      label="Location"
                      value={builderData.personalInfo.location}
                      size="sm"
                    />
                    <Input
                      label="LinkedIn"
                      value={builderData.personalInfo.linkedin}
                      size="sm"
                    />
                    <Input
                      label="GitHub"
                      value={builderData.personalInfo.github}
                      size="sm"
                    />
                  </div>
                )}
                {editingSection === 'experience' && (
                  <div className="space-y-4">
                    {builderData.experience.map((exp, index) => (
                      <Card key={index} className="p-3">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Input label="Company" value={exp.company} size="sm" />
                          <Input label="Title" value={exp.title} size="sm" />
                          <Input label="Duration" value={exp.duration} size="sm" />
                          <Input label="Location" value={exp.location} size="sm" />
                        </div>
                        <textarea
                          value={exp.description}
                          rows={3}
                          className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md"
                          placeholder="Job description..."
                        />
                      </Card>
                    ))}
                  </div>
                )}
                {editingSection === 'skills' && builderData.skills && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Technical Skills
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {builderData.skills.technical.map((skill, idx) => (
                          <Badge key={idx} variant="info">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Soft Skills
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {builderData.skills.soft.map((skill, idx) => (
                          <Badge key={idx} variant="default">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {!editingSection && (
              <Card>
                <div className="text-center py-12">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                    Select a section from the sidebar to start editing
                  </p>
                  <Button onClick={() => setEditingSection('summary')}>
                    Start Building
                  </Button>
                </div>
              </Card>
            )}

            {/* Preview */}
            <Card>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Live Preview
              </h3>
              <div className="aspect-[8.5/11] bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4 overflow-auto">
                <div className="space-y-3 text-xs">
                  {builderData?.personalInfo && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {builderData.personalInfo.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {builderData.personalInfo.email} • {builderData.personalInfo.phone}
                      </p>
                    </div>
                  )}
                  {builderData?.summary && (
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Summary</h5>
                      <p className="text-gray-600 dark:text-gray-400">{builderData.summary}</p>
                    </div>
                  )}
                  {builderData?.experience && builderData.experience.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Experience</h5>
                      {builderData.experience.map((exp, idx) => (
                        <div key={idx} className="mb-2">
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {exp.title} at {exp.company}
                          </p>
                          <p className="text-gray-500 dark:text-gray-500 text-[10px]">
                            {exp.duration} • {exp.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
        )
      )}

      {activeTab === 'analysis' && (
        !MOCK_API_ENABLED ? (
          <PageEmptyState
            title="Resume analysis coming soon"
            description="Deep ATS analysis will be available in a future release."
          />
        ) : (
        <div className="space-y-6">
          {/* Analysis Input */}
          <Card>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  label="Target Role for Analysis"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <Button onClick={handleAnalyze} disabled={!targetRole}>
                Analyze Resume
              </Button>
            </div>
          </Card>

          {analysis && (
            <>
              {/* Score Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Overall Score</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {analysis.overallScore}%
                  </p>
                </Card>
                <Card>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">ATS Score</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {analysis.atsScore}%
                  </p>
                </Card>
                <Card>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Formatting</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {analysis.formattingScore}%
                  </p>
                </Card>
                <Card>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Content</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {analysis.contentScore}%
                  </p>
                </Card>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Recommendations */}
              <Card>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  AI Recommendations
                </h3>
                <div className="space-y-3">
                  {analysis.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-200 dark:border-gray-800 rounded-md"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              rec.priority === 'high'
                                ? 'danger'
                                : rec.priority === 'medium'
                                ? 'warning'
                                : 'default'
                            }
                            className="text-[10px]"
                          >
                            {rec.priority.toUpperCase()}
                          </Badge>
                          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                            {rec.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">{rec.suggestion}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-500">
                        Impact: {rec.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Missing Keywords */}
              {analysis.missingKeywords.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="info" className="text-[10px]">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    Add these keywords to improve your ATS score
                  </p>
                </Card>
              )}

              {/* Skills Gap */}
              {analysis.skillsGap.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Skills Gap Analysis
                  </h3>
                  <div className="space-y-2">
                    {analysis.skillsGap.map((skill: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        <span className="text-xs text-gray-700 dark:text-gray-300">{skill}</span>
                        <Badge variant="warning" className="text-[10px]">Missing</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}

          {!analysis && (
            <Card>
              <div className="text-center py-8">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Enter a target role and click &ldquo;Analyze Resume&rdquo; to get AI-powered insights
                </p>
              </div>
            </Card>
          )}
        </div>
        )
      )}

      {activeTab === 'versions' && (
        !MOCK_API_ENABLED ? (
          <PageEmptyState
            title="Resume versions coming soon"
            description="Multiple resume versions will be available in a future release."
          />
        ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Resume Versions
            </h2>
            <Button size="sm" onClick={() => setShowRoleOptimization(true)}>
              Create Version
            </Button>
          </div>

          {versions && versions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {versions.map((version: ResumeVersion) => (
                <Card key={version.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                        {version.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                        {version.targetRole}
                      </p>
                    </div>
                    {version.isDefault && (
                      <Badge variant="success" className="text-[10px]">Default</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">Score</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {version.score}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">Created</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(version.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                  No resume versions yet. Create one to get started!
                </p>
                <Button size="sm" onClick={() => setShowRoleOptimization(true)}>
                  Create Version
                </Button>
              </div>
            </Card>
          )}
        </div>
        )
      )}

      {/* Role Optimization Modal */}
      {showRoleOptimization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Optimize for Role
            </h3>
            <Input
              label="Target Role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Senior Frontend Developer"
            />
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => {
                  if (targetRole) {
                    roleOptimizeMutation.mutate();
                  } else {
                    showToast('Please enter a target role', 'error');
                  }
                }}
                isLoading={roleOptimizeMutation.isPending}
                className="flex-1"
              >
                Optimize
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRoleOptimization(false);
                  setTargetRole('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
