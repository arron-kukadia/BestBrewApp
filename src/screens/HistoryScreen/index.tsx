import React, { useCallback } from 'react'
import { View, Text, RefreshControl } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/hooks/useTheme'
import { useAnimationConfig } from '@/hooks/useAnimationConfig'
import { useAuthStore } from '@/stores/authStore'
import { useCoffeeStore } from '@/stores/coffeeStore'
import { useCoffees, useToggleFavorite } from '@/api/useCoffees'
import { RootStackParamList } from '@/types'
import { SearchBar } from '@/components/common/SearchBar'
import { FilterChips } from '@/components/common/FilterChips'
import { CoffeeCard } from '@/components/common/CoffeeCard'
import { EmptyState } from '@/components/common/EmptyState'
import { Loader } from '@/components/common/Loader'
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
  const { entering } = useAnimationConfig()
  const navigation = useNavigation<NavigationProp>()

  const user = useAuthStore((state) => state.user)
  const { data: coffees = [], isLoading, refetch, isRefetching } = useCoffees(user?.id)

  const searchQuery = useCoffeeStore((state) => state.searchQuery)
  const setSearchQuery = useCoffeeStore((state) => state.setSearchQuery)
  const sortBy = useCoffeeStore((state) => state.sortBy)
  const setSortBy = useCoffeeStore((state) => state.setSortBy)

  const toggleFavoriteMutation = useToggleFavorite()

  const onRefresh = useCallback(() => {
    refetch()
  }, [refetch])

  const handleToggleFavorite = useCallback(
    (coffee: Coffee) => {
      if (user?.id) {
        toggleFavoriteMutation.mutate({
          id: coffee.id,
          userId: user.id,
          isFavorite: !coffee.isFavorite,
        })
      }
    },
    [user?.id, toggleFavoriteMutation]
  )

  const filteredCoffees = React.useMemo(() => {
    let filtered = [...coffees]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (coffee) =>
          coffee.name.toLowerCase().includes(query) ||
          coffee.brand.toLowerCase().includes(query) ||
          coffee.origin.toLowerCase().includes(query)
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
        filtered.sort((a, b) => {
          const dateCompare = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          return dateCompare !== 0 ? dateCompare : Number(b.id) - Number(a.id)
        })
    }

    return filtered
  }, [coffees, searchQuery, sortBy])

  const renderCoffeeCard = ({ item, index }: { item: Coffee; index: number }) => {
    const delay = index * 50
    return (
      <Animated.View entering={entering(400, delay)}>
        <CoffeeCard
          coffee={item}
          onPress={() => navigation.navigate('CoffeeDetail', { coffeeId: item.id })}
          onFavoritePress={() => handleToggleFavorite(item)}
        />
      </Animated.View>
    )
  }

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

      {isLoading ? (
        <Loader />
      ) : filteredCoffees.length > 0 ? (
        <FlashList
          data={filteredCoffees}
          renderItem={renderCoffeeCard}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
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
