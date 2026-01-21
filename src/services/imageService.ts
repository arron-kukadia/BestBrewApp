import { uploadData, remove } from 'aws-amplify/storage'
import * as FileSystem from 'expo-file-system/legacy'
import { compressImage, deleteLocalImage } from '@/helpers/image'

const S3_BUCKET = process.env.EXPO_PUBLIC_AWS_S3_BUCKET
const AWS_REGION = process.env.EXPO_PUBLIC_AWS_REGION

interface UploadResult {
  imageUrl: string
  key: string
}

export const imageService = {
  /**
   * Uploads a coffee image to S3 using Amplify Storage.
   * Uses Cognito Identity Pool for secure, temporary credentials.
   * No access keys stored in the app - production safe.
   */
  uploadCoffeeImage: async (
    localUri: string,
    userId: string,
    coffeeId: string
  ): Promise<UploadResult> => {
    const compressed = await compressImage(localUri)
    const key = `coffees/${userId}/${coffeeId}.jpg`

    const fileContent = await FileSystem.readAsStringAsync(compressed.uri, {
      encoding: 'base64',
    })

    const blob = Uint8Array.from(atob(fileContent), (char) => char.charCodeAt(0))

    await uploadData({
      path: `public/${key}`,
      data: blob,
      options: {
        contentType: 'image/jpeg',
      },
    }).result

    if (compressed.uri !== localUri) {
      await deleteLocalImage(compressed.uri)
    }

    const timestamp = Date.now()
    const imageUrl = `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/public/${key}?t=${timestamp}`

    return {
      imageUrl,
      key: `public/${key}`,
    }
  },

  /**
   * Deletes an image from S3.
   */
  deleteImage: async (key: string): Promise<void> => {
    try {
      await remove({
        path: key,
      })
    } catch (error) {
      console.warn('Failed to delete image:', error)
    }
  },

  /**
   * Gets the public URL for an image key.
   */
  getImageUrl: (key: string): string => {
    return `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`
  },

  getKeyFromUrl: (imageUrl: string): string | null => {
    const match = imageUrl.match(/\.amazonaws\.com\/(.+?)(\?|$)/)
    return match ? match[1] : null
  },
}
