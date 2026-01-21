import React from 'react'
import { RadarChart } from 'react-native-gifted-charts'
import { useTheme } from '@/hooks/useTheme'

interface FlavourProfile {
  data: number[]
  labels: string[]
}

interface RadarChartDisplayProps {
  data: FlavourProfile
}

export const RadarChartDisplay = React.memo<RadarChartDisplayProps>(
  ({ data }) => {
    const theme = useTheme()

    return (
      <RadarChart
        data={data.data}
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
    )
  },
  (prevProps, nextProps) => {
    const prevData = prevProps.data
    const nextData = nextProps.data

    if (prevData.data.length !== nextData.data.length) return false
    if (prevData.labels.length !== nextData.labels.length) return false

    const dataEqual = prevData.data.every(
      (value, index) => value === nextData.data[index]
    )
    const labelsEqual = prevData.labels.every(
      (label, index) => label === nextData.labels[index]
    )

    return dataEqual && labelsEqual
  }
)
