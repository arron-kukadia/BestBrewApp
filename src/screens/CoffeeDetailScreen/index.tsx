import React from 'react'
import { View, Text, ScrollView, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/hooks/useTheme'
import { useCoffeeStore } from '@/stores/coffeeStore'
import { BackButton } from '@/components/common/BackButton'
import { StarRating } from '@/components/common/StarRating'
import { Chip } from '@/components/common/Chip'
import { RootStackParamList } from '@/types'
import {
  INTENSITY_LEVELS,
  ROAST_LEVEL_LABELS,
  GRIND_TYPE_LABELS,
  PROCESS_METHOD_LABELS,
  BAG_SIZE_LABELS,
} from '@/constants/coffee'
import { createStyles } from './styles'

type CoffeeDetailRouteProp = RouteProp<RootStackParamList, 'CoffeeDetail'>
type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const CoffeeDetailScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const route = useRoute<CoffeeDetailRouteProp>()
  const navigation = useNavigation<NavigationProp>()
  const { coffeeId } = route.params

  const coffee = useCoffeeStore((state) => state.coffees.find((coffee) => coffee.id === coffeeId))
  const toggleFavorite = useCoffeeStore((state) => state.toggleFavorite)
  const deleteCoffee = useCoffeeStore((state) => state.deleteCoffee)

  const handleDelete = () => {
    Alert.alert(
      'Delete Coffee',
      `Are you sure you want to delete "${coffee?.name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCoffee(coffeeId)
            navigation.goBack()
          },
        },
      ]
    )
  }

  if (!coffee) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.notFound}>
          <MaterialIcons name="error-outline" size={48} color={theme.colors.textTertiary} />
          <Text style={styles.notFoundText}>Coffee not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatPrice = () => {
    if (!coffee.price) return null
    const symbol = coffee.currency === 'GBP' ? '£' : coffee.currency === 'EUR' ? '€' : '$'
    return `${symbol}${coffee.price.toFixed(2)}`
  }

  const getBagSizeDisplay = () => {
    if (!coffee.bagSize) return null
    if (coffee.bagSize === 'other' && coffee.customBagSize) {
      return coffee.customBagSize
    }
    return BAG_SIZE_LABELS[coffee.bagSize]
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.headerActions}>
          <Pressable
            onPress={() => navigation.navigate('AddEntry', { coffeeId: coffee.id })}
            hitSlop={8}
            style={styles.headerButton}
          >
            <MaterialIcons name="edit" size={24} color={theme.colors.text} />
          </Pressable>
          <Pressable
            onPress={() => toggleFavorite(coffee.id)}
            hitSlop={8}
            style={styles.headerButton}
          >
            <MaterialIcons
              name={coffee.isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={coffee.isFavorite ? theme.colors.error : theme.colors.text}
            />
          </Pressable>
          <Pressable onPress={handleDelete} hitSlop={8} style={styles.headerButton}>
            <MaterialIcons name="delete-outline" size={24} color={theme.colors.error} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.brand}>{coffee.brand}</Text>
          <Text style={styles.name}>{coffee.name}</Text>
          <View style={styles.ratingContainer}>
            <StarRating rating={coffee.rating} size={24} readonly />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <MaterialIcons name="place" size={20} color={theme.colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Origin</Text>
                <Text style={styles.detailValue}>{coffee.origin}</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="local-fire-department" size={20} color={theme.colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Roast Level</Text>
                <Text style={styles.detailValue}>{ROAST_LEVEL_LABELS[coffee.roastLevel]}</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="grain" size={20} color={theme.colors.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Grind Type</Text>
                <Text style={styles.detailValue}>{GRIND_TYPE_LABELS[coffee.grindType]}</Text>
              </View>
            </View>
            {coffee.processMethod && (
              <View style={styles.detailItem}>
                <MaterialIcons name="science" size={20} color={theme.colors.primary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Process</Text>
                  <Text style={styles.detailValue}>
                    {PROCESS_METHOD_LABELS[coffee.processMethod]}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {coffee.flavourNotes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Flavour Notes</Text>
            <View style={styles.flavourNotesContainer}>
              {coffee.flavourNotes.map((note) => (
                <View key={note.name} style={styles.flavourNoteItem}>
                  <Chip label={note.name} selected />
                  <View style={styles.intensityDots}>
                    {INTENSITY_LEVELS.map((level) => (
                      <View
                        key={level}
                        style={[
                          styles.intensityDot,
                          level <= note.intensity && styles.intensityDotActive,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {(coffee.price || coffee.bagSize || coffee.roastDate || coffee.purchaseLocation) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Purchase Info</Text>
            <View style={styles.purchaseGrid}>
              {formatPrice() && (
                <View style={styles.purchaseItem}>
                  <Text style={styles.purchaseLabel}>Price</Text>
                  <Text style={styles.purchaseValue}>{formatPrice()}</Text>
                </View>
              )}
              {getBagSizeDisplay() && (
                <View style={styles.purchaseItem}>
                  <Text style={styles.purchaseLabel}>Bag Size</Text>
                  <Text style={styles.purchaseValue}>{getBagSizeDisplay()}</Text>
                </View>
              )}
              {coffee.roastDate && (
                <View style={styles.purchaseItem}>
                  <Text style={styles.purchaseLabel}>Roast Date</Text>
                  <Text style={styles.purchaseValue}>{formatDate(coffee.roastDate)}</Text>
                </View>
              )}
              {coffee.purchaseLocation && (
                <View style={styles.purchaseItem}>
                  <Text style={styles.purchaseLabel}>Purchased From</Text>
                  <Text style={styles.purchaseValue}>{coffee.purchaseLocation}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {coffee.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{coffee.notes}</Text>
          </View>
        )}

        <View style={styles.metadata}>
          <Text style={styles.metadataText}>Added {formatDate(coffee.createdAt)}</Text>
          {coffee.updatedAt !== coffee.createdAt && (
            <Text style={styles.metadataText}>Updated {formatDate(coffee.updatedAt)}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
