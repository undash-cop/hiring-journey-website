import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAdminContactSubmissions } from '../../../services/api';
import {
  Button,
  Card,
  LoadingTable,
  Pagination,
  SearchBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui';
import type { ContactSubmission } from '../../../types';
import { adminQueryKeys } from '@/lib/admin-query-keys';

export default function ContactSubmissionsPage() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: submissions, isLoading, isError } = useQuery({
    queryKey: adminQueryKeys.contactSubmissions,
    queryFn: () => getAdminContactSubmissions(200),
  });

  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];
    const query = searchText.trim().toLowerCase();
    if (!query) return submissions;
    return submissions.filter((item: ContactSubmission) =>
      `${item.name} ${item.email} ${item.subject} ${item.message}`.toLowerCase().includes(query),
    );
  }, [submissions, searchText]);

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubmissions.slice(start, start + itemsPerPage);
  }, [filteredSubmissions, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / itemsPerPage));

  const handleExportCsv = () => {
    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const headers = ['id', 'created_at', 'name', 'email', 'subject', 'message'];
    const rows = filteredSubmissions.map((item) => [
      String(item.id),
      item.createdAt,
      item.name,
      item.email,
      item.subject,
      item.message,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact-submissions.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="section-title">Contact Submissions</h1>
          <p className="section-subtitle">Messages sent from the marketing contact form</p>
        </div>
        <Button variant="outline" onClick={handleExportCsv} disabled={filteredSubmissions.length === 0}>
          Export CSV
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <SearchBar
            placeholder="Search by name, email, or subject..."
            onSearch={setSearchText}
          />
        </div>

        {isLoading ? (
          <LoadingTable rows={5} />
        ) : isError ? (
          <p className="text-sm text-red-600 dark:text-red-400">Failed to load contact submissions.</p>
        ) : filteredSubmissions.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">No contact submissions yet.</p>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Received</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Subject</TableHeader>
                  <TableHeader>Message</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSubmissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${item.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                        {item.email}
                      </a>
                    </TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell className="max-w-md truncate">
                      <span title={item.message}>{item.message}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
