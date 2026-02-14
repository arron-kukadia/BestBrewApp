/* eslint-disable-next-line no-control-regex */
const CONTROL_CHAR_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

const MAX_LENGTHS: Record<string, number> = {
  brand: 100,
  name: 100,
  origin: 100,
  notes: 1000,
  purchaseLocation: 200,
  customBagSize: 50,
  flavourNoteName: 50,
}

export const sanitizeString = (value: string, maxLength: number = MAX_LENGTHS.name): string => {
  if (!value) return ''
  return value.replace(CONTROL_CHAR_REGEX, '').trim().slice(0, maxLength)
}

export const sanitizeFormField = (field: keyof typeof MAX_LENGTHS, value: string): string => {
  return sanitizeString(value, MAX_LENGTHS[field])
}

export const getMaxLength = (field: string): number => {
  return MAX_LENGTHS[field] ?? 100
}

const SAFE_ID_REGEX = /^[a-zA-Z0-9_-]+$/

export const isValidId = (value: string): boolean => {
  return SAFE_ID_REGEX.test(value) && value.length > 0 && value.length <= 128
}

export const sanitizePrice = (value: string): number | undefined => {
  const parsed = parseFloat(value)
  if (isNaN(parsed) || parsed < 0 || parsed > 99999) return undefined
  return Math.round(parsed * 100) / 100
}

export const sanitizeRating = (value: number): number => {
  const clamped = Math.round(value)
  if (clamped < 1 || clamped > 5) return 0
  return clamped
}
