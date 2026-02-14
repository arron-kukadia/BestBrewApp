import { uploadData, remove, getUrl } from 'aws-amplify/storage'
import { fetchAuthSession } from 'aws-amplify/auth'
import { compressImage, deleteLocalImage } from '@/helpers/image'

interface UploadResult {
  imageUrl: string
  key: string
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
  uploadCoffeeImage: async (localUri: string, coffeeId: string): Promise<UploadResult> => {
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

  getSignedUrl: async (key: string): Promise<string> => {
    const result = await getUrl({ path: key })
    return result.url.toString()
  },
}
