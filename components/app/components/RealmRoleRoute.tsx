import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { keycloak } from '@/lib/keycloak';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './Spinner';

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

  if (!allowed) return null;

  return <>{children}</>;
}
