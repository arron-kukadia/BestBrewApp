import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { ImagePicker } from './index'

jest.mock('expo-image-picker', () => ({
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  launchCameraAsync: jest.fn().mockResolvedValue({ canceled: true }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ canceled: true }),
}))

describe('ImagePicker', () => {
  it('renders placeholder when no image', () => {
    render(<ImagePicker onImageSelected={jest.fn()} onImageRemoved={jest.fn()} />)

    expect(screen.getByText('Add a photo')).toBeOnTheScreen()
  })

  it('renders image when imageUri is provided', () => {
    render(
      <ImagePicker
        imageUri="file://test-image.jpg"
        onImageSelected={jest.fn()}
        onImageRemoved={jest.fn()}
      />
    )

    expect(screen.getByText('Change')).toBeOnTheScreen()
  })

  it('shows options when placeholder is pressed', async () => {
    render(<ImagePicker onImageSelected={jest.fn()} onImageRemoved={jest.fn()} />)

    await userEvent.press(screen.getByText('Add a photo'))
    expect(screen.getByText('Add a photo')).toBeOnTheScreen()
  })
})
