import type { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: TableProps) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </table>
    </div>
  );
};

export const TableHead = ({ children }: { children: ReactNode }) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      {children}
    </thead>
  );
};

export const TableBody = ({ children }: { children: ReactNode }) => {
  return (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) => {
  return (
    <tr
      className={`${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''} transition-smooth ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <th className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell ${className}`}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <td className={`px-3 sm:px-6 py-4 text-sm text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </td>
  );
};
