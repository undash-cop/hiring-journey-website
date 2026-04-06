import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { Logo } from '@/components/logo';

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  group?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  onLogout: () => void;
}

export const Sidebar = ({ items, onLogout }: SidebarProps) => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? 'v1.0.0';
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, SidebarItem[]> = {};
    items.forEach((item) => {
      const group = item.group || 'Main';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
    });
    return groups;
  }, [items]);

  // Filter items based on search
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupedItems;
    const filtered: Record<string, SidebarItem[]> = {};
    Object.entries(groupedItems).forEach(([group, items]) => {
      const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[group] = filteredItems;
      }
    });
    return filtered;
  }, [groupedItems, searchQuery]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-150"
      >
        <svg className="w-4 h-4 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen fixed lg:sticky top-0 transition-all duration-300 ease-out z-40 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'w-16' : 'w-72'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            {!isCollapsed && (
              <Logo
                width={28}
                height={28}
                variant="monochrome"
                showText
                textClassName="text-base font-semibold text-gray-900 dark:text-gray-100"
                className="h-7"
              />
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search */}
          {!isCollapsed && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 pl-8 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
              />
              <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {Object.entries(filteredGroups).map(([group, groupItems]) => (
            <div key={group}>
              {!isCollapsed && group !== 'Main' && (
                <div className="px-2 py-1.5 mb-1">
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{group}</p>
                </div>
              )}
              <div className="space-y-0.5">
                {groupItems.map((item) => {
                  const isActive =
                    pathname === item.path ||
                    (item.path !== '/app/dashboard' &&
                      item.path !== '/app/admin/dashboard' &&
                      pathname?.startsWith(`${item.path}/`));
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 relative ${
                        isActive
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      {isActive && !isCollapsed && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-gray-900 dark:bg-gray-100 rounded-r-full" />
                      )}
                      <span className="flex-shrink-0 flex items-center justify-center w-4 h-4">{item.icon}</span>
                      {!isCollapsed && (
                        <span className="text-sm truncate flex-1">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-md bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 text-xs font-medium flex-shrink-0">
              {(user?.name?.charAt(0) ?? "U").toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name ?? "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email ?? ""}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-150"
              title="Logout"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
          {!isCollapsed && (
            <p className="px-1 pt-1 text-[11px] text-gray-400 dark:text-gray-500">Version {appVersion}</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
