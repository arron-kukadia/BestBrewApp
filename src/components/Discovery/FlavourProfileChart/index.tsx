import React from 'react'
import { View, Text } from 'react-native'
import { RadarChart } from 'react-native-gifted-charts'
import { useTheme } from '@/hooks/useTheme'
import { SectionHeader } from '@/components/common/SectionHeader'
import { createStyles } from './styles'

interface FlavourProfile {
  data: number[]
  labels: string[]
}

interface FlavourProfileChartProps {
  data: FlavourProfile
}

export const FlavourProfileChart: React.FC<FlavourProfileChartProps> = ({ data }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  if (data.data.length < 3) return null

  return (
    <View style={styles.section}>
      <SectionHeader title="Your Flavour Profile" />
      <Text style={styles.chartDescription}>Based on your highest-rated coffees (4+ stars)</Text>
      <View style={styles.radarContainer}>
        <RadarChart
          data={data.data}
          isAnimated
          animationDuration={300}
          maxValue={100}
          chartSize={200}
          hideAsterLines
          startAngle={90}
          labels={data.labels}
          labelsPositionOffset={5}
          gridConfig={{
            fill: theme.colors.surface,
            gradientColor: theme.colors.surface,
            opacity: 0.2,
            strokeWidth: 0.2,
          }}
          polygonConfig={{
            fill: theme.colors.primary + '40',
            stroke: theme.colors.primary,
            strokeWidth: 2,
            isAnimated: true,
            animationDuration: 300,
          }}
          labelConfig={{
            fontSize: 11,
            fontWeight: 'bold',
            stroke: theme.colors.primary,
          }}
        />
      </View>
    </View>
  )
}
