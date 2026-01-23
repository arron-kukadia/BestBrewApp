import { uploadData, remove } from 'aws-amplify/storage'
import { compressImage, deleteLocalImage } from '@/helpers/image'

interface UploadResult {
  imageUrl: string
  key: string
}

export const imageService = {
  uploadCoffeeImage: async (
    localUri: string,
    userId: string,
    coffeeId: string
  ): Promise<UploadResult> => {
    const compressed = await compressImage(localUri)
    const key = `public/coffees/${userId}/${coffeeId}.jpg`

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

    return {
      imageUrl: key,
      key,
    }
  },

  deleteImage: async (key: string): Promise<void> => {
    try {
      await remove({ path: key })
    } catch (error) {
      console.warn('Failed to delete image:', error)
    }
  },
}
