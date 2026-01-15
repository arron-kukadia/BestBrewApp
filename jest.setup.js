import '@testing-library/react-native'

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native')
  return {
    default: {
      createAnimatedComponent: (component) => component,
      View,
    },
    View,
    FadeIn: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
    FadeInUp: { duration: () => ({}) },
    FadeOutUp: { duration: () => ({}) },
    FadeInRight: { duration: () => ({}) },
    FadeOutRight: { duration: () => ({}) },
    useSharedValue: jest.fn(),
    useAnimatedStyle: jest.fn(() => ({})),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
    runOnJS: jest.fn((fn) => fn),
  }
})

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native')
  return {
    MaterialIcons: View,
  }
})

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
  }
})

jest.mock('@/services/authService', () => ({
  authService: {
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    confirmSignUp: jest.fn(),
    resetPassword: jest.fn(),
    confirmResetPassword: jest.fn(),
    getCurrentUser: jest.fn(),
    getUserAttributes: jest.fn(),
    getSession: jest.fn(),
    signInWithGoogle: jest.fn(),
    deleteAccount: jest.fn(),
  },
}))
