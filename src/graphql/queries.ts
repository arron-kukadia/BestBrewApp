export const listCoffeeTables = `
  query ListCoffeeTables($filter: TableCoffeeTableFilterInput, $limit: Int, $nextToken: String) {
    listCoffeeTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`

export const getCoffeeTable = `
  query GetCoffeeTable($userId: String!, $id: ID!) {
    getCoffeeTable(userId: $userId, id: $id) {
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
