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

const RadarChartDisplayComponent: React.FC<RadarChartDisplayProps> = ({ data }) => {
  const theme = useTheme()

  return (
    <RadarChart
      key={theme.isDark ? 'dark' : 'light'}
      data={data.data}
      maxValue={100}
      chartSize={250}
      hideAsterLines
      startAngle={90}
      labels={data.labels}
      gridConfig={{
        fill: theme.colors.surface,
        gradientColor: theme.colors.surface,
        opacity: 0.2,
        strokeWidth: 0.3,
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
}

export const RadarChartDisplay = React.memo(RadarChartDisplayComponent, (prevProps, nextProps) => {
  const prevData = prevProps.data
  const nextData = nextProps.data

  if (prevData.data.length !== nextData.data.length) return false
  if (prevData.labels.length !== nextData.labels.length) return false

  const dataEqual = prevData.data.every((value, index) => value === nextData.data[index])
  const labelsEqual = prevData.labels.every((label, index) => label === nextData.labels[index])

  return dataEqual && labelsEqual
})
