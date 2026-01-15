export type ProcessMethod = 'washed' | 'natural' | 'honey' | 'anaerobic' | 'other'

export type BagSize = '250g' | '500g' | '1kg' | 'other'

export interface FlavourNote {
  name: string
  intensity: 1 | 2 | 3
}

export type Currency = 'GBP' | 'USD' | 'EUR'

export interface Coffee {
  id: string
  userId: string
  brand: string
  name: string
  origin: string
  roastLevel: 'light' | 'medium' | 'medium-dark' | 'dark'
  grindType: 'whole-bean' | 'ground'
  processMethod?: ProcessMethod
  rating: number
  notes: string
  imageUrl?: string
  flavourNotes: FlavourNote[]
  price?: number
  currency?: Currency
  bagSize?: BagSize
  customBagSize?: string
  roastDate?: string
  purchaseLocation?: string
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export interface CoffeeFormData {
  brand: string
  name: string
  origin: string
  roastLevel: Coffee['roastLevel'] | null
  grindType: Coffee['grindType'] | null
  processMethod: ProcessMethod | null
  rating: number
  notes: string
  flavourNotes: FlavourNote[]
  price: string
  bagSize: BagSize | null
  customBagSize: string
  currency: Currency
  roastDate: string
  purchaseLocation: string
  imageUri?: string
}

export interface User {
  id: string
  email: string
  name?: string
  displayName?: string
  avatarUrl?: string
  subscriptionStatus: 'free' | 'premium'
  createdAt: string
}

export interface PalateProfile {
  acidity: number
  bitterness: number
  sweetness: number
  body: number
  fruitiness: number
  nuttiness: number
}

export interface Recommendation {
  id: string
  coffee: Coffee
  reason: string
  matchScore: number
}

export interface FeedbackQuestion {
  id: string
  coffeeId: string
  brightness: 'flat' | 'crisp'
  mouthfeel: 'watery' | 'heavy'
  aftertaste: 'quick' | 'lingering'
  submittedAt: string
}

export type RootStackParamList = {
  MainTabs: undefined
  AddEntry: { coffeeId?: string } | undefined
  CoffeeDetail: { coffeeId: string }
  Auth: undefined
  Login: undefined
  Register: undefined
}

export type MainTabParamList = {
  Home: undefined
  History: undefined
  Add: undefined
  Discovery: undefined
  Settings: undefined
}
