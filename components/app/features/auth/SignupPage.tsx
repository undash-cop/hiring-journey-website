import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';
import { Spinner } from '../../components/Spinner';
import { redirectToRegister } from '@/lib/keycloak';

export default function SignupPage() {
  const router = useRouter();
  const { initialized, authenticated } = useAuth();
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
    void redirectToRegister().catch(() => {
      setRedirectFailed(true);
    });
  }, [initialized, authenticated]);

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
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-0.5">Hiring Journey</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Create your account with Keycloak</p>
        </div>

        <div className="card p-6">
          <div className="space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirecting you to Keycloak to create your account securely...
            </p>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                void redirectToRegister().catch(() => {
                  // keep user on screen if redirect fails
                });
              }}
            >
              Sign up with Keycloak
            </Button>
            {redirectFailed && (
              <p className="text-xs text-red-600 dark:text-red-400">
                Redirect failed. Use the button to try again.
              </p>
            )}

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/app/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
