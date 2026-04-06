import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './Spinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { initialized, authenticated, login } = useAuth();

  useEffect(() => {
    if (initialized && !authenticated) {
      login();
    }
  }, [initialized, authenticated, login]);

  if (!initialized) {
    return <Spinner />;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
