export function cn(...values) {
  return values.filter(Boolean).join(' ');
}

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);
