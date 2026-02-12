"use client";

import { Search, MapPin, Briefcase } from "lucide-react";

const departments = ["All", "Engineering", "Design", "Marketing", "Product", "Sales"];
const locations = ["All", "Remote", "Bangalore", "Mumbai", "Delhi", "Hyderabad"];

interface CareersFiltersProps {
  selectedDepartment: string;
  onDepartmentChange: (dept: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CareersFilters({
  selectedDepartment,
  onDepartmentChange,
  selectedLocation,
  onLocationChange,
  searchQuery,
  onSearchChange,
}: CareersFiltersProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => onDepartmentChange(dept)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedDepartment === dept
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => onLocationChange(location)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedLocation === location
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
