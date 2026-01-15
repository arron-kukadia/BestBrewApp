import { Currency } from '@/types'

export const getCurrencySymbol = (currency: Currency): string => {
  switch (currency) {
    case 'GBP':
      return '£'
    case 'EUR':
      return '€'
    case 'USD':
    default:
      return '$'
  }
}

export const formatPrice = (price: number, currency: Currency): string => {
  const symbol = getCurrencySymbol(currency)
  return `${symbol}${price.toFixed(2)}`
}
