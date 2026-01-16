import { useState, useEffect, useCallback } from 'react'
import * as Location from 'expo-location'

interface LocationData {
  country: string | null
  countryCode: string | null
  city: string | null
  isLoading: boolean
  error: string | null
  hasPermission: boolean
}

export const useLocation = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    country: null,
    countryCode: null,
    city: null,
    isLoading: false,
    error: null,
    hasPermission: false,
  })

  const requestPermission = useCallback(async () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setLocationData((prev) => ({
          ...prev,
          isLoading: false,
          hasPermission: false,
          error: 'Location permission denied',
        }))
        return false
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      })

      const [geocode] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      setLocationData({
        country: geocode?.country || null,
        countryCode: geocode?.isoCountryCode || null,
        city: geocode?.city || null,
        isLoading: false,
        error: null,
        hasPermission: true,
      })

      return true
    } catch (error) {
      setLocationData((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get location',
      }))
      return false
    }
  }, [])

  const checkPermission = useCallback(async () => {
    const { status } = await Location.getForegroundPermissionsAsync()
    setLocationData((prev) => ({ ...prev, hasPermission: status === 'granted' }))
    return status === 'granted'
  }, [])

  useEffect(() => {
    checkPermission()
  }, [checkPermission])

  return {
    ...locationData,
    requestPermission,
    checkPermission,
  }
}
