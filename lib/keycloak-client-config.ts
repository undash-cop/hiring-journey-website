/** Keycloak-js `url` is the server root before `/realms/{realm}` (no trailing slash). */
export function getKeycloakJsConfig(): { url: string; realm: string; clientId: string } {
  return {
    url: (process.env.NEXT_PUBLIC_KEYCLOAK_URL ?? "").replace(/\/$/, ""),
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM ?? "",
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? "",
  };
}
