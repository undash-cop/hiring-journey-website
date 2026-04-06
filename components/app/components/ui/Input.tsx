import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, size = 'md', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const sizeClasses = {
      sm: 'px-2 py-1 text-[10px]',
      md: 'px-2.5 py-1.5 text-xs',
    };
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={`block font-medium text-gray-700 dark:text-gray-300 mb-1 ${
            size === 'sm' ? 'text-[10px]' : 'text-xs'
          }`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full ${sizeClasses[size]} bg-white dark:bg-gray-900 border rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className={`mt-1 text-red-600 dark:text-red-400 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
