import { Badge } from './Badge';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  'applied': 'info',
  'interview-scheduled': 'warning',
  'interview-completed': 'info',
  'offer': 'success',
  'rejected': 'danger',
  'draft': 'default',
  'published': 'success',
  'archived': 'default',
  'active': 'success',
  'suspended': 'danger',
};

export const StatusBadge = ({ status, variant }: StatusBadgeProps) => {
  const badgeVariant = variant || statusVariantMap[status] || 'default';
  const formattedStatus = status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return <Badge variant={badgeVariant}>{formattedStatus}</Badge>;
};
