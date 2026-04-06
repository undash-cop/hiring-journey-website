import Keycloak from 'keycloak-js';
import { getKeycloakJsConfig } from '@/lib/keycloak-client-config';

const keycloak = new Keycloak(getKeycloakJsConfig());

export default keycloak;
