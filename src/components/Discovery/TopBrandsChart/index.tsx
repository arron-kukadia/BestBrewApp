import React from 'react'
import { View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { useTheme } from '@/hooks/useTheme'
import { SectionHeader } from '@/components/common/SectionHeader'
import { createStyles } from './styles'

interface BrandData {
  value: number
  label: string
  frontColor: string
}

interface TopBrandsChartProps {
  data: BrandData[]
}

const TopBrandsChartComponent: React.FC<TopBrandsChartProps> = ({ data }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  if (data.length === 0) return null

  return (
    <View style={styles.section}>
      <SectionHeader title="Your Top Brands" />
      <View style={styles.chartCard}>
        <BarChart
          data={data}
          isAnimated
          animationDuration={300}
          barWidth={40}
          barBorderRadius={6}
          frontColor={theme.colors.primary}
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          noOfSections={3}
          maxValue={Math.max(...data.map((brand) => brand.value)) + 1}
          xAxisLabelTextStyle={styles.chartLabel}
          yAxisTextStyle={styles.chartLabel}
          height={120}
          spacing={24}
        />
      </View>
    </View>
  )
}

export const TopBrandsChart = React.memo(TopBrandsChartComponent, (prevProps, nextProps) => {
  const prevData = prevProps.data
  const nextData = nextProps.data

  if (prevData.length !== nextData.length) return false

  return prevData.every((brand, index) => {
    const nextBrand = nextData[index]
    return brand.value === nextBrand.value && brand.label === nextBrand.label
  })
})
