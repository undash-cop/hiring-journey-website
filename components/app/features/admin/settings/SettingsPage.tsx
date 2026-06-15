import { Card } from '../../../components/ui';
import { PageEmptyState } from '../../../components/QueryStateViews';

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold gradient-text">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage platform settings</p>
      </div>

      <Card>
        <PageEmptyState
          title="Platform settings are deployment-managed"
          description="Integrations (LinkedIn, Indeed), security policies, and platform branding are configured via environment variables and Keycloak for this release. Editable admin settings will ship with billing and platform configuration APIs in a later phase."
        />
      </Card>
    </div>
  );
}
