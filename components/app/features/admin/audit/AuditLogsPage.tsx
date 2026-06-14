import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAdminAuditLogs } from '../../../services/api';
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
import type { AdminAuditLog } from '../../../types';

export default function AuditLogsPage() {
  const [actionFilter, setActionFilter] = useState('');
  const [resourceFilter, setResourceFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [exportRangeDays, setExportRangeDays] = useState<'all' | '7' | '30' | '90'>('all');
  const itemsPerPage = 10;

  const { data: logs, isLoading, isError } = useQuery({
    queryKey: ['admin-audit-logs'],
    queryFn: () => getAdminAuditLogs(100),
  });

  const filteredLogs = useMemo(() => {
    if (!logs) return [];
    return logs.filter((log: AdminAuditLog) => {
      if (actionFilter && log.action !== actionFilter) return false;
      if (resourceFilter && log.resourceType !== resourceFilter) return false;
      if (searchText && !`${log.actorSub} ${log.resourceId}`.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [logs, actionFilter, resourceFilter, searchText]);

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredLogs.slice(start, end);
  }, [filteredLogs, currentPage]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const handleExportCsv = () => {
    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const now = Date.now();
    const days = exportRangeDays === 'all' ? null : Number(exportRangeDays);
    const exportLogs = filteredLogs.filter((log) => {
      if (!days) return true;
      const ageMs = now - new Date(log.createdAt).getTime();
      return ageMs <= days * 24 * 60 * 60 * 1000;
    });
    const headers = [
      'id',
      'created_at',
      'actor_sub',
      'action',
      'resource_type',
      'resource_id',
      'old_value',
      'new_value',
    ];
    const rows = exportLogs.map((log) => [
      String(log.id),
      log.createdAt,
      log.actorSub,
      log.action,
      log.resourceType,
      log.resourceId,
      log.oldValue || '',
      log.newValue || '',
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.map(escapeCsv).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-audit-logs-${exportRangeDays}d-${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Audit Logs</h1>
          <p className="section-subtitle">Track all admin actions</p>
        </div>
        <LoadingTable rows={6} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <div className="card p-8 text-center">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Failed to load audit logs
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="section-title">Audit Logs</h1>
          <p className="section-subtitle">Track all admin actions with actor and value changes</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={exportRangeDays}
            onChange={(e) => setExportRangeDays(e.target.value as 'all' | '7' | '30' | '90')}
            className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="all">All time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <Button variant="outline" onClick={handleExportCsv} disabled={filteredLogs.length === 0}>
            Export CSV
          </Button>
        </div>
      </div>

      <SearchBar
        placeholder="Search by actor or resource id..."
        onSearch={(value) => setSearchText(value)}
        filters={[
          {
            label: 'Action',
            key: 'action',
            options: [
              { value: '', label: 'All Actions' },
              { value: 'publish_job', label: 'Publish Job' },
              { value: 'update_credits', label: 'Update Credits' },
              { value: 'update_candidate_status', label: 'Candidate Status' },
              { value: 'update_application_status', label: 'Application Status' },
              { value: 'update_job_status', label: 'Job Status' },
            ],
          },
          {
            label: 'Resource',
            key: 'resource',
            options: [
              { value: '', label: 'All Resources' },
              { value: 'candidate', label: 'Candidate' },
              { value: 'application', label: 'Application' },
              { value: 'job', label: 'Job' },
            ],
          },
        ]}
        onFilterChange={(key, value) => {
          if (key === 'action') setActionFilter(value);
          if (key === 'resource') setResourceFilter(value);
        }}
      />

      <Card padding="none">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Time</TableHeader>
              <TableHeader>Actor</TableHeader>
              <TableHeader>Action</TableHeader>
              <TableHeader>Resource</TableHeader>
              <TableHeader>From</TableHeader>
              <TableHeader>To</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                <TableCell className="text-xs">{log.actorSub}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  {log.resourceType}:{log.resourceId}
                </TableCell>
                <TableCell>{log.oldValue || '-'}</TableCell>
                <TableCell>{log.newValue || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredLogs.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
