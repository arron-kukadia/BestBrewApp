export interface Coffee {
  id: string;
  userId: string;
  brand: string;
  name: string;
  origin: string;
  roastLevel: 'light' | 'medium' | 'medium-dark' | 'dark';
  grindType: 'whole-bean' | 'ground';
  rating: number;
  notes: string;
  imageUrl?: string;
  flavorNotes: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeeFormData {
  brand: string;
  name: string;
  origin: string;
  roastLevel: Coffee['roastLevel'];
  grindType: Coffee['grindType'];
  rating: number;
  notes: string;
  flavorNotes: string[];
  imageUri?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  subscriptionStatus: 'free' | 'premium';
  createdAt: string;
}

export interface PalateProfile {
  acidity: number;
  bitterness: number;
  sweetness: number;
  body: number;
  fruitiness: number;
  nuttiness: number;
}

export interface Recommendation {
  id: string;
  coffee: Coffee;
  reason: string;
  matchScore: number;
}

export interface FeedbackQuestion {
  id: string;
  coffeeId: string;
  brightness: 'flat' | 'crisp';
  mouthfeel: 'watery' | 'heavy';
  aftertaste: 'quick' | 'lingering';
  submittedAt: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  AddEntry: undefined;
  CoffeeDetail: { coffeeId: string };
  Auth: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Discovery: undefined;
  Settings: undefined;
};
