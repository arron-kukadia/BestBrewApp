import React from 'react'
import { View, Text, Pressable, Platform, Image, Linking } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface RecommendationCardProps {
  title: string
  subtitle: string
  reason: string
  matchScore?: number
  imageUrl?: string | null
  purchaseUrl?: string | null
  purchaseSource?: string | null
  priceRange?: string | null
  onPress?: () => void
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  subtitle,
  reason,
  matchScore,
  imageUrl,
  purchaseUrl,
  purchaseSource,
  priceRange,
  onPress,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const handleBuyPress = async () => {
    if (purchaseUrl) {
      const canOpen = await Linking.canOpenURL(purchaseUrl)
      if (canOpen) {
        await Linking.openURL(purchaseUrl)
      }
    }
  }

  const content = (
    <View style={styles.container}>
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.productImage} resizeMode="cover" />
        ) : (
          <View style={styles.iconContainer}>
            <MaterialIcons name="auto-awesome" size={20} color={theme.colors.primary} />
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
          {priceRange && (
            <Text style={styles.priceRange} numberOfLines={1}>
              {priceRange}
            </Text>
          )}
        </View>
        {matchScore !== undefined && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{matchScore}%</Text>
          </View>
        )}
      </View>
      <Text style={styles.reason} numberOfLines={2}>
        {reason}
      </Text>
      <View style={styles.footer}>
        {purchaseUrl && (
          <Pressable
            onPress={handleBuyPress}
            style={({ pressed }) => [styles.buyButton, pressed && styles.buyButtonPressed]}
          >
            <MaterialIcons name="shopping-cart" size={14} color={theme.colors.textInverse} />
            <Text style={styles.buyButtonText}>
              {purchaseSource ? `Buy on ${purchaseSource}` : 'Buy Now'}
            </Text>
          </Pressable>
        )}
        {onPress && (
          <Pressable onPress={onPress} style={styles.detailsLink}>
            <Text style={styles.ctaText}>Details</Text>
            <MaterialIcons name="chevron-right" size={16} color={theme.colors.primary} />
          </Pressable>
        )}
      </View>
    </View>
  )

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: Platform.OS === 'ios' ? 0.7 : 1 }]}
      disabled={!onPress}
    >
      {content}
    </Pressable>
  )
}
