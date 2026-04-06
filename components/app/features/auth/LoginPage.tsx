import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';
import { Spinner } from '../../components/Spinner';

export default function LoginPage() {
  const router = useRouter();
  const { login, initialized, authenticated } = useAuth();
  const [redirectFailed, setRedirectFailed] = useState(false);

  useEffect(() => {
    if (initialized && authenticated) {
      router.replace('/app/dashboard');
    }
  }, [initialized, authenticated, router]);

  useEffect(() => {
    if (!initialized || authenticated) {
      return;
    }
    try {
      login();
    } catch {
      setRedirectFailed(true);
    }
  }, [initialized, authenticated, login]);

  if (!initialized) {
    return <Spinner />;
  }

  if (authenticated) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-6">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
            Hiring Journey
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign in with your organization account (Keycloak)
          </p>
        </div>

        <div className="card p-6">
          <div className="space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirecting you to Keycloak to sign in securely...
            </p>
            <div className="flex items-center justify-between">
              <Link
                href="/app/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="button" className="w-full" onClick={login}>
              Sign in with Keycloak
            </Button>
            {redirectFailed && (
              <p className="text-xs text-red-600 dark:text-red-400">
                Redirect failed. Use the button to try again.
              </p>
            )}

            <p className="text-center text-xs text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/app/signup"
                className="text-gray-900 dark:text-gray-100 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
