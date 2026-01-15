import { create } from 'zustand'
import { Coffee } from '@/types'

interface CoffeeState {
  searchQuery: string
  selectedRoastLevel: Coffee['roastLevel'] | null
  sortBy: 'recent' | 'rating' | 'name' | 'saved'
  setSearchQuery: (query: string) => void
  setSelectedRoastLevel: (level: Coffee['roastLevel'] | null) => void
  setSortBy: (sort: 'recent' | 'rating' | 'name' | 'saved') => void
}

export const useCoffeeStore = create<CoffeeState>()((set) => ({
  searchQuery: '',
  selectedRoastLevel: null,
  sortBy: 'recent',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedRoastLevel: (level) => set({ selectedRoastLevel: level }),
  setSortBy: (sort) => set({ sortBy: sort }),
}))
