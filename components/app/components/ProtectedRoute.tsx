import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAuthStore } from '../store/authStore';
import { Spinner } from './Spinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { initialized, authenticated, login } = useAuth();
  const storedToken = useAuthStore((state) => state.token);

  useEffect(() => {
    if (initialized && !authenticated && !storedToken) {
      login();
    }
  }, [initialized, authenticated, storedToken, login]);

  if (!initialized) {
    return <Spinner />;
  }

  if (!authenticated && !storedToken) {
    return null;
  }

  return <>{children}</>;
}
