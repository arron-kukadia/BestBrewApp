import { generateClient, GraphQLResult } from 'aws-amplify/api'
import { Coffee } from '@/types'
import * as queries from '@/graphql/queries'
import * as mutations from '@/graphql/mutations'

const client = generateClient()

export interface CreateCoffeeInput {
  id: string
  userId: string
  brand: string
  name: string
  origin: string
  roastLevel: Coffee['roastLevel']
  grindType: Coffee['grindType']
  processMethod?: Coffee['processMethod']
  rating: number
  notes?: string
  imageUrl?: string
  flavourNotes: Coffee['flavourNotes']
  price?: number
  currency?: Coffee['currency']
  bagSize?: Coffee['bagSize']
  customBagSize?: string
  roastDate?: string
  purchaseLocation?: string
  isFavorite: boolean
  createdAt: string
  updatedAt?: string
}

export interface UpdateCoffeeInput {
  id: string
  userId: string
  brand?: string
  name?: string
  origin?: string
  roastLevel?: Coffee['roastLevel']
  grindType?: Coffee['grindType']
  processMethod?: Coffee['processMethod']
  rating?: number
  notes?: string
  imageUrl?: string
  flavourNotes?: Coffee['flavourNotes']
  price?: number
  currency?: Coffee['currency']
  bagSize?: Coffee['bagSize']
  customBagSize?: string
  roastDate?: string
  purchaseLocation?: string
  isFavorite?: boolean
}

interface ListCoffeesResponse {
  listCoffeeTables: {
    items: Coffee[]
    nextToken: string | null
  }
}

interface GetCoffeeResponse {
  getCoffeeTable: Coffee
}

interface CreateCoffeeResponse {
  createCoffeeTable: Coffee
}

interface UpdateCoffeeResponse {
  updateCoffeeTable: Coffee
}

export const coffeeService = {
  listCoffees: async (userId: string, limit = 50, nextToken?: string): Promise<Coffee[]> => {
    try {
      const response = (await client.graphql({
        query: queries.listCoffeeTables,
        variables: {
          filter: { userId: { eq: userId } },
          limit,
          nextToken,
        },
      })) as GraphQLResult<ListCoffeesResponse>
      return response.data?.listCoffeeTables.items ?? []
    } catch (error) {
      console.error('Error fetching coffees:', error)
      throw error
    }
  },

  getCoffee: async (userId: string, id: string): Promise<Coffee | null> => {
    try {
      const response = (await client.graphql({
        query: queries.getCoffeeTable,
        variables: { userId, id },
      })) as GraphQLResult<GetCoffeeResponse>
      return response.data?.getCoffeeTable ?? null
    } catch (error) {
      console.error('Error fetching coffee:', error)
      throw error
    }
  },

  createCoffee: async (input: CreateCoffeeInput): Promise<Coffee> => {
    try {
      const response = (await client.graphql({
        query: mutations.createCoffeeTable,
        variables: { input },
      })) as GraphQLResult<CreateCoffeeResponse>
      if (!response.data?.createCoffeeTable) {
        throw new Error('Failed to create coffee')
      }
      return response.data.createCoffeeTable
    } catch (error) {
      console.error('Error creating coffee:', error)
      throw error
    }
  },

  updateCoffee: async (input: UpdateCoffeeInput): Promise<Coffee> => {
    try {
      const response = (await client.graphql({
        query: mutations.updateCoffeeTable,
        variables: { input },
      })) as GraphQLResult<UpdateCoffeeResponse>
      if (!response.data?.updateCoffeeTable) {
        throw new Error('Failed to update coffee')
      }
      return response.data.updateCoffeeTable
    } catch (error) {
      console.error('Error updating coffee:', error)
      throw error
    }
  },

  deleteCoffee: async (userId: string, id: string): Promise<void> => {
    try {
      await client.graphql({
        query: mutations.deleteCoffeeTable,
        variables: { input: { userId, id } },
      })
    } catch (error) {
      console.error('Error deleting coffee:', error)
      throw error
    }
  },
}
