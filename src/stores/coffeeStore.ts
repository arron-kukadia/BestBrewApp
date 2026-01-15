import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Coffee } from '@/types'

interface CoffeeState {
  coffees: Coffee[]
  isLoading: boolean
  searchQuery: string
  selectedRoastLevel: Coffee['roastLevel'] | null
  sortBy: 'recent' | 'rating' | 'name' | 'saved'
  addCoffee: (coffee: Coffee) => void
  updateCoffee: (id: string, updates: Partial<Coffee>) => void
  deleteCoffee: (id: string) => void
  toggleFavorite: (id: string) => void
  setSearchQuery: (query: string) => void
  setSelectedRoastLevel: (level: Coffee['roastLevel'] | null) => void
  setSortBy: (sort: 'recent' | 'rating' | 'name' | 'saved') => void
  getFilteredCoffees: () => Coffee[]
}

export const useCoffeeStore = create<CoffeeState>()(
  persist(
    (set, get) => ({
      coffees: [],
      isLoading: false,
      searchQuery: '',
      selectedRoastLevel: null,
      sortBy: 'recent',

      addCoffee: (coffee) =>
        set((state) => ({
          coffees: [coffee, ...state.coffees],
        })),

      updateCoffee: (id, updates) =>
        set((state) => ({
          coffees: state.coffees.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        })),

      deleteCoffee: (id) =>
        set((state) => ({
          coffees: state.coffees.filter((c) => c.id !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          coffees: state.coffees.map((c) =>
            c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
          ),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedRoastLevel: (level) => set({ selectedRoastLevel: level }),

      setSortBy: (sort) => set({ sortBy: sort }),

      getFilteredCoffees: () => {
        const { coffees, searchQuery, selectedRoastLevel, sortBy } = get()

        let filtered = [...coffees]

        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(
            (c) =>
              c.name.toLowerCase().includes(query) ||
              c.brand.toLowerCase().includes(query) ||
              c.origin.toLowerCase().includes(query)
          )
        }

        if (selectedRoastLevel) {
          filtered = filtered.filter((c) => c.roastLevel === selectedRoastLevel)
        }

        switch (sortBy) {
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
          case 'recent':
          default:
            filtered.sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        }

        return filtered
      },
    }),
    {
      name: 'coffee-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ coffees: state.coffees }),
    }
  )
)
