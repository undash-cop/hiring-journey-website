import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  const appPaths = paths[0] === 'app' ? paths.slice(1) : paths;

  if (appPaths.length === 0 || appPaths[0] === 'dashboard') return null;

  const breadcrumbs = appPaths.map((path, index) => {
    const href = '/app/' + appPaths.slice(0, index + 1).join('/');
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    return { href, label };
  });

  const homePath = appPaths[0] === 'admin' ? '/app/admin/dashboard' : '/app/dashboard';

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <Link href={homePath} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
        Home
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-2">
          <span className="text-gray-300 dark:text-gray-700">/</span>
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 dark:text-gray-100 font-semibold">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};
