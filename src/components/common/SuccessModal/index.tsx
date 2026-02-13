import React, { useEffect, useRef } from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import LottieView from 'lottie-react-native'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface SuccessModalProps {
  visible: boolean
  title?: string
  message?: string
  onClose: () => void
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  title = 'Success!',
  message,
  onClose,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    if (visible && animationRef.current) {
      animationRef.current.play()
    }
  }, [visible])

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            ref={animationRef}
            source={require('@/assets/animations/success.json')}
            style={styles.animation}
            loop={false}
          />
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
