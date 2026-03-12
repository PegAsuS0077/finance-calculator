// lib/utils/format.ts

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatCompactCurrency(value: number): string {
  return compactCurrencyFormatter.format(value)
}

export function formatNumber(value: number, decimals = 1): string {
  return value.toFixed(decimals)
}
