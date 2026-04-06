import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  filters?: {
    label: string;
    key: string;
    options: { value: string; label: string }[];
  }[];
  onFilterChange?: (key: string, value: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  filters = [],
  onFilterChange,
  className = '',
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(key, value);
  };

  const clearFilters = () => {
    setActiveFilters({});
    filters.forEach((filter) => onFilterChange?.(filter.key, ''));
  };

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full px-2.5 py-1.5 pl-7 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
          />
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-1.5 text-xs border rounded-md transition-colors ${
              activeFilterCount > 0
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100'
                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        )}
      </div>

      {showFilters && filters.length > 0 && (
        <div className="card p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Filters</span>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                  {filter.label}
                </label>
                <select
                  value={activeFilters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
                >
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
