import { generateClient, GraphQLResult } from 'aws-amplify/api'
import { CustomFlavourNote } from '@/types'
import * as queries from '@/graphql/queries'
import * as mutations from '@/graphql/mutations'
import { sanitizeFormField } from '@/helpers/sanitize'

const client = generateClient()

export interface CreateCustomFlavourNoteInput {
  id: string
  userId: string
  name: string
  createdAt: string
}

export interface UpdateCustomFlavourNoteInput {
  id: string
  userId: string
  name: string
}

interface ListCustomFlavourNotesResponse {
  listCustomFlavourNotes: {
    items: CustomFlavourNote[]
    nextToken: string | null
  }
}

interface CreateCustomFlavourNoteResponse {
  createCustomFlavourNote: CustomFlavourNote
}

interface UpdateCustomFlavourNoteResponse {
  updateCustomFlavourNote: CustomFlavourNote
}

export const customFlavourNoteService = {
  listCustomFlavourNotes: async (userId: string): Promise<CustomFlavourNote[]> => {
    try {
      const response = (await client.graphql({
        query: queries.listCustomFlavourNotes,
        variables: {
          filter: { userId: { eq: userId } },
          limit: 100,
        },
      })) as GraphQLResult<ListCustomFlavourNotesResponse>
      return response.data?.listCustomFlavourNotes.items ?? []
    } catch (error) {
      console.error('Error fetching custom flavour notes:', error)
      throw error
    }
  },

  createCustomFlavourNote: async (
    input: CreateCustomFlavourNoteInput
  ): Promise<CustomFlavourNote> => {
    try {
      const sanitizedInput = { ...input, name: sanitizeFormField('flavourNoteName', input.name) }
      const response = (await client.graphql({
        query: mutations.createCustomFlavourNote,
        variables: { input: sanitizedInput },
      })) as GraphQLResult<CreateCustomFlavourNoteResponse>
      if (!response.data?.createCustomFlavourNote) {
        throw new Error('Failed to create custom flavour note')
      }
      return response.data.createCustomFlavourNote
    } catch (error) {
      console.error('Error creating custom flavour note:', error)
      throw error
    }
  },

  updateCustomFlavourNote: async (
    input: UpdateCustomFlavourNoteInput
  ): Promise<CustomFlavourNote> => {
    try {
      const sanitizedInput = { ...input, name: sanitizeFormField('flavourNoteName', input.name) }
      const response = (await client.graphql({
        query: mutations.updateCustomFlavourNote,
        variables: { input: sanitizedInput },
      })) as GraphQLResult<UpdateCustomFlavourNoteResponse>
      if (!response.data?.updateCustomFlavourNote) {
        throw new Error('Failed to update custom flavour note')
      }
      return response.data.updateCustomFlavourNote
    } catch (error) {
      console.error('Error updating custom flavour note:', error)
      throw error
    }
  },

  deleteCustomFlavourNote: async (userId: string, id: string): Promise<void> => {
    try {
      await client.graphql({
        query: mutations.deleteCustomFlavourNote,
        variables: { input: { userId, id } },
      })
    } catch (error) {
      console.error('Error deleting custom flavour note:', error)
      throw error
    }
  },
}
