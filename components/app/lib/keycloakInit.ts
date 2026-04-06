import keycloak from './keycloak';
import { getAppOAuthRedirectUri, getSilentCheckSsoAbsoluteUrl } from '@/lib/keycloak-oauth-redirect';

let initPromise: Promise<boolean> | null = null;

/**
 * Single init promise so React StrictMode / remounts do not call keycloak.init twice.
 */
export function ensureKeycloakInit(): Promise<boolean> {
  if (!initPromise) {
    initPromise = keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      responseMode: 'query',
      redirectUri: getAppOAuthRedirectUri(),
      silentCheckSsoRedirectUri: getSilentCheckSsoAbsoluteUrl(),
    });
  }
  return initPromise;
}
