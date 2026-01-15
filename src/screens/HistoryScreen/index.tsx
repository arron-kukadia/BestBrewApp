import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/hooks/useTheme'
import { useCoffeeStore } from '@/stores/coffeeStore'
import { RootStackParamList } from '@/types'
import { SearchBar } from '@/components/common/SearchBar'
import { FilterChips } from '@/components/common/FilterChips'
import { CoffeeCard } from '@/components/common/CoffeeCard'
import { EmptyState } from '@/components/common/EmptyState'
import { Coffee } from '@/types'
import { createStyles } from './styles'

const sortOptions = [
  { label: 'Recent', value: 'recent' as const },
  { label: 'Top Rated', value: 'rating' as const },
  { label: 'Saved', value: 'saved' as const },
]

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const HistoryScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation<NavigationProp>()

  const coffees = useCoffeeStore((state) => state.coffees)
  const searchQuery = useCoffeeStore((state) => state.searchQuery)
  const setSearchQuery = useCoffeeStore((state) => state.setSearchQuery)
  const toggleFavorite = useCoffeeStore((state) => state.toggleFavorite)
  const sortBy = useCoffeeStore((state) => state.sortBy)
  const setSortBy = useCoffeeStore((state) => state.setSortBy)

  const filteredCoffees = React.useMemo(() => {
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

    if (sortBy === 'saved') {
      filtered = filtered.filter((coffee) => coffee.isFavorite)
    }

    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'saved':
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [coffees, searchQuery, sortBy])

  const renderCoffeeCard = ({ item }: { item: Coffee }) => (
    <CoffeeCard
      coffee={item}
      onPress={() => navigation.navigate('CoffeeDetail', { coffeeId: item.id })}
      onFavoritePress={() => toggleFavorite(item.id)}
    />
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Your coffee journey</Text>
      </View>

      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search coffees..."
        />
        <FilterChips
          options={sortOptions}
          selectedValue={sortBy}
          onSelect={(value) => setSortBy(value || 'recent')}
        />
      </View>

      {filteredCoffees.length > 0 ? (
        <FlashList
          data={filteredCoffees}
          renderItem={renderCoffeeCard}
          estimatedItemSize={120}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            icon="coffee"
            title={searchQuery ? 'No matches found' : 'No coffees explored yet'}
            description={
              searchQuery
                ? 'Try adjusting your search or filters'
                : 'Start tracking your coffee journey and receive personalized recommendations by adding your first entry'
            }
            actionLabel={searchQuery ? 'Clear filters' : 'Start Your Journey'}
            onAction={() => {
              if (searchQuery) {
                setSearchQuery('')
              } else {
                navigation.navigate('AddEntry')
              }
            }}
          />
        </View>
      )}
    </SafeAreaView>
  )
}
