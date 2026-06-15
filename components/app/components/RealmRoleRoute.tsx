import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { keycloak } from '@/lib/keycloak';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './Spinner';
import { Card } from './ui';

export default function RealmRoleRoute({ roles, children }: { roles: string[]; children: ReactNode }) {
  const { initialized, authenticated } = useAuth();
  const router = useRouter();

  const realmRoles = keycloak.tokenParsed?.realm_access?.roles ?? [];
  const allowed = roles.length === 0 || roles.some((r) => realmRoles.includes(r));

  useEffect(() => {
    if (initialized && authenticated && !allowed) {
      router.replace('/app/dashboard');
    }
  }, [allowed, authenticated, initialized, router]);

  if (!initialized) {
    return <Spinner />;
  }

  if (!authenticated) {
    return null;
  }

  if (!allowed) {
    return (
      <div className="p-6 sm:p-8">
        <Card className="max-w-lg mx-auto text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Access denied</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You need admin permissions to view this area. Redirecting to your dashboard…
          </p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
