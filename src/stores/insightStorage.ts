import { createMMKV, type MMKV } from 'react-native-mmkv'
import { InsightsResponse } from '@/types/insight'

const INSIGHTS_KEY = 'insights_data'

let insightStorage: MMKV | null = null

const getStorage = (): MMKV => {
  if (!insightStorage) {
    insightStorage = createMMKV({ id: 'insight-storage' })
  }
  return insightStorage
}

export const getStoredInsights = (): InsightsResponse | null => {
  const data = getStorage().getString(INSIGHTS_KEY)
  if (!data) return null

  try {
    return JSON.parse(data) as InsightsResponse
  } catch {
    return null
  }
}

export const storeInsights = (insights: InsightsResponse): void => {
  getStorage().set(INSIGHTS_KEY, JSON.stringify(insights))
}

export const clearStoredInsights = (): void => {
  getStorage().remove(INSIGHTS_KEY)
}
