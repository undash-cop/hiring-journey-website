/**
 * Format number as Indian currency (INR)
 * @param amount - The amount to format
 * @returns Formatted string with ₹ symbol and Indian number format
 */
export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number as Indian currency with decimals
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted string with ₹ symbol and Indian number format
 */
export const formatIndianCurrencyWithDecimals = (amount: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);
};

/**
 * Format number range as Indian currency
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @returns Formatted string like "₹1,00,000 - ₹2,00,000"
 */
export const formatIndianCurrencyRange = (min: number, max: number): string => {
  return `${formatIndianCurrency(min)} - ${formatIndianCurrency(max)}`;
};
