import React from 'react'
import { Platform, View, Pressable, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { HomeScreen } from '@/screens/HomeScreen'
import { HistoryScreen } from '@/screens/HistoryScreen'
import { DiscoveryScreen } from '@/screens/DiscoveryScreen'
import { SettingsScreen } from '@/screens/SettingsScreen'
import { useTheme } from '@/hooks/useTheme'
import { MainTabParamList, RootStackParamList } from '@/types'

const Tab = createBottomTabNavigator<MainTabParamList>()

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const AddButton: React.FC = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<NavigationProp>()

  return (
    <View style={styles.addButtonWrapper}>
      <Pressable
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('AddEntry')}
        testID="add-coffee-button"
      >
        <MaterialIcons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </View>
  )
}

export const TabNavigator: React.FC = () => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const tabBarHeight =
    60 + (Platform.OS === 'android' ? Math.max(insets.bottom, 25) : insets.bottom)

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Platform.OS === 'android' ? Math.max(insets.bottom, 8) : insets.bottom,
          paddingTop: 8,
          height: tabBarHeight,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={View}
        options={{
          tabBarButton: () => <AddButton />,
          tabBarLabel: () => null,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
          },
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  addButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
})
