import { useState, useEffect } from 'react'
import { imageService } from '@/services/imageService'

const S3_BUCKET = process.env.EXPO_PUBLIC_AWS_S3_BUCKET || ''

const extractS3Key = (value: string): string | null => {
  if (!value.startsWith('http')) return null
  try {
    const url = new URL(value)
    if (!url.hostname.includes(S3_BUCKET)) return null
    const path = decodeURIComponent(url.pathname)
    return path.startsWith('/') ? path.slice(1) : path
  } catch {
    return null
  }
}

const isLocalUri = (uri: string): boolean => {
  return uri.startsWith('file://') || uri.startsWith('content://') || uri.startsWith('ph://')
}

const getS3Key = (value: string): string | null => {
  if (isLocalUri(value)) return null
  if (!value.startsWith('http')) return value
  return extractS3Key(value)
}

export const useImageUrl = (imageValue?: string): string | undefined => {
  const [signedUrl, setSignedUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!imageValue) {
      setSignedUrl(undefined)
      return
    }

    const s3Key = getS3Key(imageValue)
    if (!s3Key) {
      setSignedUrl(imageValue)
      return
    }

    let cancelled = false
    imageService
      .getSignedUrl(s3Key)
      .then((url) => {
        if (!cancelled) setSignedUrl(url)
      })
      .catch((error) => {
        console.warn('[useImageUrl] Failed to resolve:', s3Key, error)
      })

    return () => {
      cancelled = true
    }
  }, [imageValue])

  return signedUrl
}
