import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import * as FileSystem from 'expo-file-system/legacy'

interface CompressImageOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

interface CompressedImage {
  uri: string
  width: number
  height: number
}

export const compressImage = async (
  uri: string,
  options: CompressImageOptions = {}
): Promise<CompressedImage> => {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.7 } = options

  const context = ImageManipulator.manipulate(uri)
  context.resize({ width: maxWidth, height: maxHeight })

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
    const fileInfo = await FileSystem.getInfoAsync(uri)
    if (fileInfo.exists && 'size' in fileInfo) {
      return fileInfo.size
    }
    return 0
  } catch {
    return 0
  }
}

export const deleteLocalImage = async (uri: string): Promise<void> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri)
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(uri, { idempotent: true })
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
