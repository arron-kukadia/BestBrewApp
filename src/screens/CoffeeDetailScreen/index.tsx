import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useTheme } from '@/hooks/useTheme'
import { ButtonWithIcon } from '@/components/common/ButtonWithIcon'
import { StarRating } from '@/components/common/StarRating'
import { DetailItem } from '@/components/CoffeeDetail/DetailItem'
import { FlavourNotesDisplay } from '@/components/CoffeeDetail/FlavourNotesDisplay'
import { PurchaseInfoSection } from '@/components/CoffeeDetail/PurchaseInfoSection'
import { RootStackParamList } from '@/types'
import { ROAST_LEVEL_LABELS, GRIND_TYPE_LABELS, PROCESS_METHOD_LABELS } from '@/constants/coffee'
import { formatFullDate } from '@/helpers/date'
import { createStyles } from './styles'
import { useCoffeeDetail } from './useCoffeeDetail'

type CoffeeDetailRouteProp = RouteProp<RootStackParamList, 'CoffeeDetail'>

export const CoffeeDetailScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const route = useRoute<CoffeeDetailRouteProp>()
  const { coffeeId } = route.params

  const { coffee, handleToggleFavorite, handleDelete, handleEdit, handleGoBack } =
    useCoffeeDetail(coffeeId)

  if (!coffee) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <ButtonWithIcon onPress={handleGoBack} iconName="arrow-back" />
        </View>
        <View style={styles.notFound}>
          <MaterialIcons name="error-outline" size={48} color={theme.colors.textTertiary} />
          <Text style={styles.notFoundText}>Coffee not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <ButtonWithIcon onPress={handleGoBack} iconName="arrow-back" />
        <View style={styles.headerActions}>
          <ButtonWithIcon onPress={handleEdit} iconName="edit" testID="edit-button" />
          <ButtonWithIcon
            onPress={handleToggleFavorite}
            iconName={coffee.isFavorite ? 'favorite' : 'favorite-border'}
            color={coffee.isFavorite ? theme.colors.error : undefined}
            testID="favorite-button"
          />
          <ButtonWithIcon
            onPress={handleDelete}
            iconName="delete-outline"
            color={theme.colors.error}
            testID="delete-button"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {coffee.imageUrl && (
          <Image source={{ uri: coffee.imageUrl }} style={styles.heroImage} resizeMode="cover" />
        )}

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
            <DetailItem icon="place" label="Origin" value={coffee.origin} />
            <DetailItem
              icon="local-fire-department"
              label="Roast Level"
              value={ROAST_LEVEL_LABELS[coffee.roastLevel]}
            />
            <DetailItem
              icon="grain"
              label="Grind Type"
              value={GRIND_TYPE_LABELS[coffee.grindType]}
            />
            {coffee.processMethod && (
              <DetailItem
                icon="science"
                label="Process"
                value={PROCESS_METHOD_LABELS[coffee.processMethod]}
              />
            )}
          </View>
        </View>

        {coffee.flavourNotes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Flavour Notes</Text>
            <FlavourNotesDisplay notes={coffee.flavourNotes} />
          </View>
        )}

        <PurchaseInfoSection coffee={coffee} />

        {coffee.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{coffee.notes}</Text>
          </View>
        )}

        <View style={styles.metadata}>
          <Text style={styles.metadataText}>Added {formatFullDate(coffee.createdAt)}</Text>
          {coffee.updatedAt !== coffee.createdAt && (
            <Text style={styles.metadataText}>Updated {formatFullDate(coffee.updatedAt)}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
