export const schema = gql`
  type FavoriteGameSession {
    id: Int!
    createdAt: DateTime!
    userId: Int!
    user: User!
    gameSessionId: Int!
    gameSession: GameSession!
  }

  type Query {
    favoriteGameSessions: [FavoriteGameSession!]! @requireAuth
    favoriteGameSession(id: Int!): FavoriteGameSession @requireAuth
  }

  input CreateFavoriteGameSessionInput {
    userId: Int!
    gameSessionId: Int!
  }

  input UpdateFavoriteGameSessionInput {
    userId: Int
    gameSessionId: Int
  }

  type Mutation {
    createFavoriteGameSession(
      input: CreateFavoriteGameSessionInput!
    ): FavoriteGameSession! @requireAuth
    updateFavoriteGameSession(
      id: Int!
      input: UpdateFavoriteGameSessionInput!
    ): FavoriteGameSession! @requireAuth(roles: "admin")
    deleteFavoriteGameSession(id: Int!): FavoriteGameSession! @requireAuth
  }
`
