export const INTENSITY_LEVELS = [1, 2, 3] as const

export const ROAST_OPTIONS = [
  { label: 'Light', value: 'light' as const },
  { label: 'Medium', value: 'medium' as const },
  { label: 'Med-Dark', value: 'medium-dark' as const },
  { label: 'Dark', value: 'dark' as const },
]

export const GRIND_OPTIONS = [
  { label: 'Whole Bean', value: 'whole-bean' as const },
  { label: 'Ground', value: 'ground' as const },
]

export const PROCESS_OPTIONS = [
  { label: 'Washed', value: 'washed' as const },
  { label: 'Natural', value: 'natural' as const },
  { label: 'Honey', value: 'honey' as const },
  { label: 'Anaerobic', value: 'anaerobic' as const },
  { label: 'Other', value: 'other' as const },
]

export const BAG_SIZE_OPTIONS = [
  { label: '250g', value: '250g' as const },
  { label: '500g', value: '500g' as const },
  { label: '1kg', value: '1kg' as const },
  { label: 'Other', value: 'other' as const },
]

export const FLAVOUR_OPTIONS = [
  'Fruity',
  'Floral',
  'Nutty',
  'Chocolate',
  'Caramel',
  'Citrus',
  'Berry',
  'Earthy',
  'Spicy',
  'Sweet',
]

export const ROAST_LEVEL_LABELS: Record<string, string> = {
  light: 'Light',
  medium: 'Medium',
  'medium-dark': 'Medium-Dark',
  dark: 'Dark',
}

export const GRIND_TYPE_LABELS: Record<string, string> = {
  'whole-bean': 'Whole Bean',
  ground: 'Ground',
}

export const PROCESS_METHOD_LABELS: Record<string, string> = {
  washed: 'Washed',
  natural: 'Natural',
  honey: 'Honey',
  anaerobic: 'Anaerobic',
  other: 'Other',
}

export const BAG_SIZE_LABELS: Record<string, string> = {
  '250g': '250g',
  '500g': '500g',
  '1kg': '1kg',
  other: 'Custom',
}
