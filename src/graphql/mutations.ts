export const createCoffeeTable = `
  mutation CreateCoffeeTable($input: CreateCoffeeTableInput!) {
    createCoffeeTable(input: $input) {
      id
      userId
      brand
      name
      origin
      roastLevel
      grindType
      processMethod
      rating
      notes
      imageUrl
      flavourNotes {
        name
        intensity
      }
      price
      currency
      bagSize
      customBagSize
      roastDate
      purchaseLocation
      isFavorite
      createdAt
      updatedAt
    }
  }
`

export const updateCoffeeTable = `
  mutation UpdateCoffeeTable($input: UpdateCoffeeTableInput!) {
    updateCoffeeTable(input: $input) {
      id
      userId
      brand
      name
      origin
      roastLevel
      grindType
      processMethod
      rating
      notes
      imageUrl
      flavourNotes {
        name
        intensity
      }
      price
      currency
      bagSize
      customBagSize
      roastDate
      purchaseLocation
      isFavorite
      createdAt
      updatedAt
    }
  }
`

export const deleteCoffeeTable = `
  mutation DeleteCoffeeTable($input: DeleteCoffeeTableInput!) {
    deleteCoffeeTable(input: $input) {
      id
    }
  }
`
