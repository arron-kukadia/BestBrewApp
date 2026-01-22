import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { useQueryClient } from '@tanstack/react-query'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { ButtonWithIcon } from '@/components/common/ButtonWithIcon'
import { coffeeService } from '@/services/coffeeService'
import {
  useCustomFlavourNotes,
  useCreateCustomFlavourNote,
  useUpdateCustomFlavourNote,
  useDeleteCustomFlavourNote,
} from '@/api/useCustomFlavourNotes'
import { CustomFlavourNote } from '@/types'
import { createStyles } from './styles'

export const FlavourNotesScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)

  const { data: customNotes = [] } = useCustomFlavourNotes(user?.id)
  const createMutation = useCreateCustomFlavourNote()
  const updateMutation = useUpdateCustomFlavourNote()
  const deleteMutation = useDeleteCustomFlavourNote()

  const [newNoteName, setNewNoteName] = useState('')
  const [editingNote, setEditingNote] = useState<CustomFlavourNote | null>(null)
  const [editingName, setEditingName] = useState('')

  const handleAdd = () => {
    const trimmedName = newNoteName.trim()
    if (!trimmedName || !user?.id) return

    const isDuplicate = customNotes.some(
      (note) => note.name.toLowerCase() === trimmedName.toLowerCase()
    )
    if (isDuplicate) {
      Alert.alert('Duplicate', 'This flavour note already exists.')
      return
    }

    createMutation.mutate(
      {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        name: trimmedName,
      },
      {
        onSuccess: () => setNewNoteName(''),
      }
    )
  }

  const handleStartEdit = (note: CustomFlavourNote) => {
    setEditingNote(note)
    setEditingName(note.name)
  }

  const handleSaveEdit = async () => {
    if (!editingNote || !user?.id) return
    const trimmedName = editingName.trim()
    if (!trimmedName) return
    if (trimmedName === editingNote.name) {
      setEditingNote(null)
      setEditingName('')
      return
    }

    const isDuplicate = customNotes.some(
      (note) => note.id !== editingNote.id && note.name.toLowerCase() === trimmedName.toLowerCase()
    )
    if (isDuplicate) {
      Alert.alert('Duplicate', 'This flavour note already exists.')
      return
    }

    updateMutation.mutate(
      {
        id: editingNote.id,
        userId: user.id,
        name: trimmedName,
      },
      {
        onSuccess: async () => {
          await coffeeService.renameFlavourNoteInCoffees(user.id, editingNote.name, trimmedName)
          queryClient.invalidateQueries({ queryKey: ['coffees'] })
          setEditingNote(null)
          setEditingName('')
        },
      }
    )
  }

  const handleCancelEdit = () => {
    setEditingNote(null)
    setEditingName('')
  }

  const handleDelete = (note: CustomFlavourNote) => {
    if (!user?.id) return

    Alert.alert(
      'Delete Flavour Note',
      `Delete "${note.name}"? Coffees already using this note will keep it, but you won't be able to select it for new entries.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate({ userId: user.id, id: note.id }),
        },
      ]
    )
  }

  const renderNoteItem = ({ item, index }: { item: CustomFlavourNote; index: number }) => (
    <Animated.View
      entering={FadeInUp.duration(300).delay(index * 50)}
      exiting={FadeOutDown.duration(200)}
    >
      <View style={styles.noteItem}>
        {editingNote?.id === item.id ? (
          <>
            <TextInput
              style={styles.noteInput}
              value={editingName}
              onChangeText={setEditingName}
              autoFocus
              autoCapitalize="words"
              onSubmitEditing={handleSaveEdit}
            />
            <View style={styles.noteActions}>
              <Pressable style={styles.actionButton} onPress={handleSaveEdit}>
                <MaterialIcons name="check" size={22} color={theme.colors.primary} />
              </Pressable>
              <Pressable style={styles.actionButton} onPress={handleCancelEdit}>
                <MaterialIcons name="close" size={22} color={theme.colors.textSecondary} />
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.noteText}>{item.name}</Text>
            <View style={styles.noteActions}>
              <Pressable
                style={styles.actionButton}
                onPress={() => handleStartEdit(item)}
                testID={`edit-${item.id}`}
              >
                <MaterialIcons name="edit" size={22} color={theme.colors.textSecondary} />
              </Pressable>
              <Pressable
                style={styles.actionButton}
                onPress={() => handleDelete(item)}
                testID={`delete-${item.id}`}
              >
                <MaterialIcons name="delete" size={22} color={theme.colors.error} />
              </Pressable>
            </View>
          </>
        )}
      </View>
    </Animated.View>
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons
        name="local-cafe"
        size={48}
        color={theme.colors.textSecondary}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>No Custom Notes Yet</Text>
      <Text style={styles.emptyDescription}>
        Add your own flavour notes to describe coffees in your unique way.
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <ButtonWithIcon onPress={() => navigation.goBack()} iconName="arrow-back" />
        <Text style={styles.title}>Custom Flavour Notes</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Create your own flavour notes to use alongside the default options when logging coffees.
        </Text>

        <View style={styles.addRow}>
          <TextInput
            style={styles.addInput}
            placeholder="Add new flavour note..."
            placeholderTextColor={theme.colors.textSecondary}
            value={newNoteName}
            onChangeText={setNewNoteName}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
            autoCapitalize="words"
          />
          <Pressable
            style={[
              styles.addButton,
              (!newNoteName.trim() || createMutation.isPending) && styles.addButtonDisabled,
            ]}
            onPress={handleAdd}
            disabled={!newNoteName.trim() || createMutation.isPending}
          >
            <MaterialIcons name="add" size={24} color={theme.colors.surface} />
          </Pressable>
        </View>

        <FlashList
          data={customNotes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </SafeAreaView>
  )
}
