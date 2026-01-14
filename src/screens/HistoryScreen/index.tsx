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

const roastOptions = [
  { label: 'Light', value: 'light' as const },
  { label: 'Medium', value: 'medium' as const },
  { label: 'Med-Dark', value: 'medium-dark' as const },
  { label: 'Dark', value: 'dark' as const },
]

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const HistoryScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation<NavigationProp>()

  const searchQuery = useCoffeeStore((state) => state.searchQuery)
  const setSearchQuery = useCoffeeStore((state) => state.setSearchQuery)
  const selectedRoastLevel = useCoffeeStore((state) => state.selectedRoastLevel)
  const setSelectedRoastLevel = useCoffeeStore((state) => state.setSelectedRoastLevel)
  const toggleFavorite = useCoffeeStore((state) => state.toggleFavorite)
  const getFilteredCoffees = useCoffeeStore((state) => state.getFilteredCoffees)

  const coffees = getFilteredCoffees()

  const renderCoffeeCard = ({ item }: { item: Coffee }) => (
    <CoffeeCard coffee={item} onPress={() => {}} onFavoritePress={() => toggleFavorite(item.id)} />
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
          options={roastOptions}
          selectedValue={selectedRoastLevel}
          onSelect={setSelectedRoastLevel}
        />
      </View>

      {coffees.length > 0 ? (
        <FlashList
          data={coffees}
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
                setSelectedRoastLevel(null)
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
