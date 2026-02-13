import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { PurchaseInfoItem } from '@/components/CoffeeDetail/PurchaseInfoItem'
import { BAG_SIZE_LABELS } from '@/constants/coffee'
import { formatFullDate } from '@/helpers/date'
import { formatPrice } from '@/helpers/currency'
import { Coffee } from '@/types'
import { createStyles } from './styles'

interface PurchaseInfoSectionProps {
  coffee: Coffee
}

export const PurchaseInfoSection: React.FC<PurchaseInfoSectionProps> = ({ coffee }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const hasPurchaseInfo =
    coffee.price || coffee.bagSize || coffee.roastDate || coffee.purchaseLocation
  if (!hasPurchaseInfo) return null

  const priceDisplay =
    coffee.price && coffee.currency ? formatPrice(coffee.price, coffee.currency) : null

  const bagSizeDisplay = coffee.bagSize
    ? coffee.bagSize === 'other' && coffee.customBagSize
      ? coffee.customBagSize
      : BAG_SIZE_LABELS[coffee.bagSize]
    : null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Info</Text>
      <View style={styles.grid}>
        {priceDisplay && <PurchaseInfoItem label="Price" value={priceDisplay} />}
        {bagSizeDisplay && <PurchaseInfoItem label="Bag Size" value={bagSizeDisplay} />}
        {coffee.roastDate && (
          <PurchaseInfoItem label="Roast Date" value={formatFullDate(coffee.roastDate)} />
        )}
        {coffee.purchaseLocation && (
          <PurchaseInfoItem label="Purchased From" value={coffee.purchaseLocation} />
        )}
      </View>
    </View>
  )
}
