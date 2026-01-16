import { fetchAuthSession } from 'aws-amplify/auth'
import { InsightsRequest, InsightsResponse } from '@/types/insight'

const INSIGHTS_ENDPOINT = process.env.EXPO_PUBLIC_AWS_RECOMMENDATIONS_ENDPOINT

export const insightService = {
  getInsights: async (request: InsightsRequest): Promise<InsightsResponse> => {
    if (!INSIGHTS_ENDPOINT) {
      throw new Error('Insights endpoint not configured')
    }

    const session = await fetchAuthSession()
    const token = session.tokens?.idToken?.toString()

    if (!token) {
      throw new Error('No authentication token available')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(INSIGHTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId))

    if (!response.ok) {
      throw new Error(`Failed to fetch insights: ${response.status}`)
    }

    return response.json()
  },
}
