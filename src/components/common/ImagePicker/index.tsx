import React from 'react'
import { View, Text, Image, Pressable, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as ExpoImagePicker from 'expo-image-picker'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface ImagePickerProps {
  imageUri?: string
  onImageSelected: (uri: string) => void
  onImageRemoved: () => void
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  imageUri,
  onImageSelected,
  onImageRemoved,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const requestPermissions = async (): Promise<boolean> => {
    const cameraPermission = await ExpoImagePicker.requestCameraPermissionsAsync()
    const mediaPermission = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()

    if (cameraPermission.status !== 'granted' || mediaPermission.status !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Please enable camera and photo library access in your settings to add photos.'
      )
      return false
    }
    return true
  }

  const showImageOptions = () => {
    Alert.alert('Add Photo', 'Choose how you want to add a photo', [
      {
        text: 'Take Photo',
        onPress: handleTakePhoto,
      },
      {
        text: 'Choose from Library',
        onPress: handleChooseFromLibrary,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    const result = await ExpoImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.7,
    })

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri)
    }
  }

  const handleChooseFromLibrary = async () => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.7,
    })

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri)
    }
  }

  const handleRemoveImage = () => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this photo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: onImageRemoved,
      },
    ])
  }

  if (imageUri) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          <Pressable style={styles.removeButton} onPress={handleRemoveImage} hitSlop={8}>
            <MaterialIcons name="close" size={16} color="#FFFFFF" />
          </Pressable>
          <Pressable style={styles.changeButton} onPress={showImageOptions}>
            <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
            <Text style={styles.changeButtonText}>Change</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.placeholder} onPress={showImageOptions}>
        <MaterialIcons name="add-a-photo" size={32} color={theme.colors.textTertiary} />
        <Text style={styles.placeholderText}>Add a photo</Text>
      </Pressable>
    </View>
  )
}
