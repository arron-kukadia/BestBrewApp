import { useQuery } from '@tanstack/react-query'
import { imageService, extractS3Key, isLocalUri } from '@/services/imageService'

const STALE_TIME = 50 * 60 * 1000

const getS3Key = (value: string): string | null => {
  if (isLocalUri(value)) return null
  if (!value.startsWith('http')) return value
  return extractS3Key(value)
}

export const imageUrlKeys = {
  all: ['imageUrls'] as const,
  signed: (s3Key: string) => [...imageUrlKeys.all, s3Key] as const,
}

export const useImageUrl = (imageValue?: string): string | undefined => {
  const s3Key = imageValue ? getS3Key(imageValue) : null

  const { data: signedUrl } = useQuery({
    queryKey: imageUrlKeys.signed(s3Key!),
    queryFn: () => imageService.getSignedUrl(s3Key!),
    enabled: !!s3Key,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  })

  if (!imageValue) return undefined
  if (!s3Key) return imageValue
  return signedUrl
}
