import { uploadData, remove, getUrl, list } from 'aws-amplify/storage'
import { fetchAuthSession } from 'aws-amplify/auth'
import { compressImage, deleteLocalImage } from '@/helpers/image'
import { isValidId } from '@/helpers/sanitize'

const S3_BUCKET = process.env.EXPO_PUBLIC_AWS_S3_BUCKET || ''

export const extractS3Key = (value: string): string | null => {
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

export const isLocalUri = (uri: string): boolean => {
  return uri.startsWith('file://') || uri.startsWith('content://') || uri.startsWith('ph://')
}

const getIdentityId = async (): Promise<string> => {
  const session = await fetchAuthSession()
  const identityId = session.identityId
  if (!identityId) {
    throw new Error('No identity ID available')
  }
  return identityId
}

export const imageService = {
  uploadCoffeeImage: async (localUri: string, coffeeId: string): Promise<{ key: string }> => {
    if (!isValidId(coffeeId)) {
      throw new Error('Invalid coffeeId')
    }

    const identityId = await getIdentityId()
    const compressed = await compressImage(localUri)
    const key = `public/coffees/${identityId}/${coffeeId}.jpg`

    const response = await fetch(compressed.uri)
    const blob = await response.blob()

    await uploadData({
      path: key,
      data: blob,
      options: {
        contentType: 'image/jpeg',
      },
    }).result

    if (compressed.uri !== localUri) {
      await deleteLocalImage(compressed.uri)
    }

    return { key }
  },

  deleteImage: async (imageUrl: string): Promise<void> => {
    try {
      const s3Key = extractS3Key(imageUrl) ?? decodeURIComponent(imageUrl)
      await remove({ path: s3Key })
    } catch (error) {
      console.warn('Failed to delete image:', error)
    }
  },

  getSignedUrl: async (key: string): Promise<string> => {
    const s3Key = extractS3Key(key) ?? decodeURIComponent(key)
    const result = await getUrl({ path: s3Key })
    return result.url.toString()
  },

  deleteAllUserImages: async (): Promise<void> => {
    try {
      const identityId = await getIdentityId()
      const prefix = `public/coffees/${identityId}/`
      const result = await list({ path: prefix })

      await Promise.all(result.items.map((item) => remove({ path: item.path })))
    } catch (error) {
      console.warn('Failed to delete user images:', error)
    }
  },
}
