import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import { File } from 'expo-file-system/next'
import { Image } from 'react-native'

interface CompressImageOptions {
  maxDimension?: number
  quality?: number
}

interface CompressedImage {
  uri: string
  width: number
  height: number
}

const getImageDimensions = (uri: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject)
  })
}

export const compressImage = async (
  uri: string,
  options: CompressImageOptions = {}
): Promise<CompressedImage> => {
  const { maxDimension = 1200, quality = 0.7 } = options

  const { width, height } = await getImageDimensions(uri)
  const context = ImageManipulator.manipulate(uri)

  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      context.resize({ width: maxDimension })
    } else {
      context.resize({ height: maxDimension })
    }
  }

  const imageRef = await context.renderAsync()
  const result = await imageRef.saveAsync({
    compress: quality,
    format: SaveFormat.JPEG,
  })

  return {
    uri: result.uri,
    width: imageRef.width,
    height: imageRef.height,
  }
}

export const getImageFileSize = async (uri: string): Promise<number> => {
  try {
    const file = new File(uri)
    if (file.exists) {
      return file.size ?? 0
    }
    return 0
  } catch {
    return 0
  }
}

export const deleteLocalImage = async (uri: string): Promise<void> => {
  try {
    const file = new File(uri)
    if (file.exists) {
      file.delete()
    }
  } catch (error) {
    console.error('Error deleting local image:', error)
  }
}

export const getImageMimeType = (uri: string): string => {
  const extension = uri.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'gif':
      return 'image/gif'
    case 'webp':
      return 'image/webp'
    default:
      return 'image/jpeg'
  }
}
