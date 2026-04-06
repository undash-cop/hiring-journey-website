import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLegalDocuments, validateLegalDocument } from '../../../services/api';
import { Card, Button, StatusBadge } from '../../../components/ui';
import type { LegalDocument } from '../../../types';

export default function LegalReadinessPage() {
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['legal-documents'],
    queryFn: getLegalDocuments,
  });

  const validateMutation = useMutation({
    mutationFn: validateLegalDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal-documents'] });
    },
  });

  const handleValidate = (docId: number) => {
    validateMutation.mutate(docId);
  };

  if (isLoading) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Legal Readiness</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Validate your legal documents before accepting offers</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upload Document</h2>
          <Button>Upload New Document</Button>
        </div>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="legal-upload"
          />
          <label htmlFor="legal-upload" className="cursor-pointer">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF, DOC, DOCX (MAX. 10MB)</p>
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Documents</h2>
        <div className="space-y-3">
          {documents?.map((doc: LegalDocument) => (
            <div
              key={doc.id}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer"
              onClick={() => setSelectedDocument(selectedDocument === doc.id ? null : doc.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{doc.type.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={doc.status} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleValidate(doc.id);
                    }}
                    isLoading={validateMutation.isPending && selectedDocument === doc.id}
                  >
                    Validate
                  </Button>
                </div>
              </div>
              {selectedDocument === doc.id && doc.issues && doc.issues.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Issues Found:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {doc.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Document Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['offer-letter', 'employment-contract', 'nda', 'non-compete'].map((type) => (
            <div key={type} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 capitalize mb-2">
                {type.replace('-', ' ')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {type === 'offer-letter' && 'Review salary, benefits, and start date'}
                {type === 'employment-contract' && 'Check terms, notice period, and clauses'}
                {type === 'nda' && 'Verify confidentiality terms and scope'}
                {type === 'non-compete' && 'Validate duration and geographic restrictions'}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
