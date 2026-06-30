import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import type { KeycloakProfile } from 'keycloak-js';
import { keycloak } from '@/lib/keycloak';
import { clearAuthSession, ensureKeycloakInit } from '@/lib/keycloak-init';
import { redirectToLogin } from '@/lib/keycloak';
import { getLogoutRedirectUri } from '@/lib/keycloak-oauth-redirect';
import { reportAuthError } from '@/lib/auth-errors';
import { setMonitoringUser } from '@/lib/monitoring';
import { analytics } from '@/lib/analytics';
import { useAuthStore } from '../store/authStore';
import type { User, UserRole } from '../types';

const AUTH_ENTRY_PATHS = new Set([
  '/app/login',
  '/app/signup',
  '/app/forgot-password',
]);

function isAuthEntryPath(pathname: string | null): boolean {
  return pathname != null && AUTH_ENTRY_PATHS.has(pathname);
}

const REFRESH_INTERVAL_MS = 50_000;
const TOKEN_MIN_VALIDITY_SEC = 60;

function profileToUser(profile: KeycloakProfile, tokenSub: string | undefined): User {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles ?? [];
  const role: UserRole = realmRoles.includes('admin') ? 'admin' : 'candidate';
  const name =
    [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim() ||
    profile.username ||
    profile.email ||
    'User';
  const idRaw = profile.id ?? tokenSub ?? '0';
  const id = /^\d+$/.test(idRaw) ? Number(idRaw) : 0;

  return {
    id,
    name,
    email: profile.email ?? profile.username ?? '',
    role,
  };
}

export interface AuthContextType {
  authenticated: boolean;
  token: string | undefined;
  userInfo: Record<string, unknown> | undefined;
  login: () => void;
  logout: () => void;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<Record<string, unknown> | undefined>(
    undefined,
  );
  const storeHydrated = useSyncExternalStore(
    (onStoreChange) => {
      const finishHydration = useAuthStore.persist.onFinishHydration(onStoreChange);
      onStoreChange();
      return finishHydration;
    },
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
  const storedToken = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!storeHydrated) return;

    if (isAuthEntryPath(pathname)) {
      // Auth entry routes redirect to Keycloak; skip SSO init.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- short-circuit before async Keycloak init
      setAuthenticated(false);
      setUserInfo(undefined);
      setInitialized(true);
      return;
    }

    let cancelled = false;

    void ensureKeycloakInit()
      .then(async (ok) => {
        if (cancelled) {
          return;
        }
        setAuthenticated(ok);
        if (!ok) {
          setUserInfo(undefined);
          useAuthStore.getState().logout();
          return;
        }
        try {
          const profile = await keycloak.loadUserProfile();
          if (cancelled) {
            return;
          }
          setUserInfo({ ...profile } as Record<string, unknown>);
          useAuthStore.getState().login({
            token: keycloak.token ?? '',
            refreshToken: keycloak.refreshToken,
            user: profileToUser(profile, keycloak.tokenParsed?.sub),
          });
          setMonitoringUser({
            id: keycloak.tokenParsed?.sub ?? profile.id ?? 'unknown',
            email: profile.email ?? undefined,
            username: profile.username ?? undefined,
          });
        } catch {
          if (cancelled) {
            return;
          }
          setUserInfo(
            keycloak.tokenParsed
              ? ({ ...keycloak.tokenParsed } as Record<string, unknown>)
              : undefined,
          );
          useAuthStore.getState().login({
            token: keycloak.token ?? '',
            refreshToken: keycloak.refreshToken,
            user: {
              id: 0,
              name:
                (keycloak.tokenParsed?.preferred_username as string | undefined) ?? 'User',
              email: (keycloak.tokenParsed?.email as string | undefined) ?? '',
              role: (keycloak.tokenParsed?.realm_access?.roles ?? []).includes('admin')
                ? 'admin'
                : 'candidate',
            },
          });
          setMonitoringUser({
            id: (keycloak.tokenParsed?.sub as string | undefined) ?? 'unknown',
            email: keycloak.tokenParsed?.email as string | undefined,
            username: keycloak.tokenParsed?.preferred_username as string | undefined,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuthenticated(false);
          setUserInfo(undefined);
          useAuthStore.getState().logout();
        }
      })
      .finally(() => {
        if (!cancelled) {
          setInitialized(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, storeHydrated]);

  useEffect(() => {
    if (!initialized || !authenticated) {
      return;
    }

    if (!keycloak.refreshToken) {
      return;
    }

    const id = window.setInterval(() => {
      void keycloak
        .updateToken(TOKEN_MIN_VALIDITY_SEC)
        .then((refreshed) => {
          if (refreshed && keycloak.token) {
            const { user } = useAuthStore.getState();
            if (user) {
              useAuthStore.setState({
                token: keycloak.token,
                refreshToken: keycloak.refreshToken ?? null,
              });
            }
          }
        })
        .catch(() => {
          reportAuthError("session_expired");
          clearAuthSession();
          window.location.assign(getLogoutRedirectUri());
        });
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(id);
    };
  }, [initialized, authenticated]);

  const login = useCallback(() => {
    void redirectToLogin().catch(() => {
      // no-op: UI can remain on login screen if redirect fails
    });
  }, []);

  const logout = useCallback(() => {
    analytics.logout();
    setMonitoringUser(null);
    clearAuthSession();
    if (typeof keycloak.logout === 'function') {
      void keycloak.logout({ redirectUri: getLogoutRedirectUri() });
      return;
    }
    window.location.assign(getLogoutRedirectUri());
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      authenticated: authenticated || !!storedToken,
      token: keycloak.token ?? storedToken ?? undefined,
      userInfo,
      login,
      logout,
      initialized: initialized && storeHydrated,
    }),
    [authenticated, initialized, login, logout, storeHydrated, storedToken, userInfo],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
