import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { SectionHeader } from '@/components/common/SectionHeader'
import { RadarChartDisplay } from './RadarChartDisplay'
import { createStyles } from './styles'

interface FlavourProfile {
  data: number[]
  labels: string[]
}

interface FlavourProfileChartProps {
  data: FlavourProfile
  tasteProfile?: string
}

export const FlavourProfileChart: React.FC<FlavourProfileChartProps> = ({ data, tasteProfile }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  if (data.data.length < 3) return null

  return (
    <View style={styles.section}>
      <View style={styles.radarContainer}>
        <RadarChartDisplay data={data} />
        {tasteProfile && <Text style={styles.profileText}>{tasteProfile}</Text>}
      </View>
    </View>
  )
}
