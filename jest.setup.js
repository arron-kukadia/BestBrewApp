import '@testing-library/react-native'

jest.mock('react-native-reanimated', () => {
  const { View, Text } = require('react-native')
  const React = require('react')
  return {
    default: {
      createAnimatedComponent: (component) => component,
      View,
      Text,
    },
    createAnimatedComponent: (component) => component,
    View,
    Text,
    FadeIn: { duration: () => ({ delay: () => ({}) }) },
    FadeOut: { duration: () => ({}) },
    FadeInUp: { duration: () => ({ delay: () => ({}) }) },
    FadeOutUp: { duration: () => ({}) },
    FadeInRight: { duration: () => ({}) },
    FadeOutRight: { duration: () => ({}) },
    useSharedValue: jest.fn((init) => ({ value: init })),
    useAnimatedStyle: jest.fn(() => ({})),
    useAnimatedProps: jest.fn(() => ({})),
    useReducedMotion: jest.fn(() => false),
    withTiming: jest.fn((val) => val),
    withSpring: jest.fn((val) => val),
    runOnJS: jest.fn((fn) => fn),
    Easing: {
      out: jest.fn(() => jest.fn()),
      cubic: jest.fn(),
    },
  }
})

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    contains: jest.fn(() => false),
  })),
}))

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

jest.mock('aws-amplify/api', () => ({
  generateClient: jest.fn(() => ({
    graphql: jest.fn(),
  })),
  GraphQLResult: {},
}))

jest.mock('@/api/useCoffees', () => ({
  useCoffees: jest.fn(() => ({ data: [], isLoading: false, refetch: jest.fn() })),
  useCoffee: jest.fn(() => ({ data: null, isLoading: false })),
  useCreateCoffee: jest.fn(() => ({ mutate: jest.fn(), mutateAsync: jest.fn() })),
  useUpdateCoffee: jest.fn(() => ({ mutate: jest.fn(), mutateAsync: jest.fn() })),
  useDeleteCoffee: jest.fn(() => ({ mutate: jest.fn(), mutateAsync: jest.fn() })),
  useToggleFavorite: jest.fn(() => ({ mutate: jest.fn(), mutateAsync: jest.fn() })),
  coffeeKeys: {
    all: ['coffees'],
    lists: () => ['coffees', 'list'],
    list: (userId) => ['coffees', 'list', userId],
    details: () => ['coffees', 'detail'],
    detail: (id) => ['coffees', 'detail', id],
  },
}))

jest.mock('@/hooks/useImageUrl', () => ({
  useImageUrl: (imageKey) => imageKey,
}))

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
