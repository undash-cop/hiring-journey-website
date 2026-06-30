import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAdminNewsletterSubscribers } from '../../../services/api';
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
import type { NewsletterSubscriber } from '../../../types';
import { adminQueryKeys } from '@/lib/admin-query-keys';

export default function NewsletterSubscribersPage() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: subscribers, isLoading, isError } = useQuery({
    queryKey: adminQueryKeys.newsletterSubscribers,
    queryFn: () => getAdminNewsletterSubscribers(200),
  });

  const filteredSubscribers = useMemo(() => {
    if (!subscribers) return [];
    const query = searchText.trim().toLowerCase();
    if (!query) return subscribers;
    return subscribers.filter((item: NewsletterSubscriber) =>
      `${item.email} ${item.source}`.toLowerCase().includes(query),
    );
  }, [subscribers, searchText]);

  const paginatedSubscribers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubscribers.slice(start, start + itemsPerPage);
  }, [filteredSubscribers, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredSubscribers.length / itemsPerPage));

  const handleExportCsv = () => {
    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const headers = ['id', 'created_at', 'email', 'source'];
    const rows = filteredSubscribers.map((item) => [
      String(item.id),
      item.createdAt,
      item.email,
      item.source,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'newsletter-subscribers.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="section-title">Newsletter Subscribers</h1>
          <p className="section-subtitle">Emails collected from the marketing site footer</p>
        </div>
        <Button variant="outline" onClick={handleExportCsv} disabled={filteredSubscribers.length === 0}>
          Export CSV
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <SearchBar placeholder="Search by email or source..." onSearch={setSearchText} />
        </div>

        {isLoading ? (
          <LoadingTable rows={5} />
        ) : isError ? (
          <p className="text-sm text-red-600 dark:text-red-400">Failed to load newsletter subscribers.</p>
        ) : filteredSubscribers.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">No newsletter subscribers yet.</p>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Subscribed</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Source</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSubscribers.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <a href={`mailto:${item.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                        {item.email}
                      </a>
                    </TableCell>
                    <TableCell>{item.source}</TableCell>
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
