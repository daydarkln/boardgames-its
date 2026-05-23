export const schema = gql`
  type GameRegistration {
    id: Int!
    status: RegistrationStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: Int!
    user: User!
    gameSessionId: Int!
    gameSession: GameSession!
  }

  enum RegistrationStatus {
    PENDING
    APPROVED
    DECLINED
    CANCELLED
  }

  type Query {
    gameRegistrations: [GameRegistration!]! @requireAuth(roles: "admin")
    gameRegistration(id: Int!): GameRegistration @requireAuth
    myRegistrations: [GameRegistration!]! @requireAuth
  }

  input CreateGameRegistrationInput {
    status: RegistrationStatus
    userId: Int
    gameSessionId: Int!
  }

  input UpdateGameRegistrationInput {
    status: RegistrationStatus
    userId: Int
    gameSessionId: Int
  }

  type Mutation {
    createGameRegistration(
      input: CreateGameRegistrationInput!
    ): GameRegistration! @requireAuth(roles: "admin")
    updateGameRegistration(
      id: Int!
      input: UpdateGameRegistrationInput!
    ): GameRegistration! @requireAuth(roles: "admin")
    deleteGameRegistration(id: Int!): GameRegistration!
      @requireAuth(roles: "admin")
  }
`
