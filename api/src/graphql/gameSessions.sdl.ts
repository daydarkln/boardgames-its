export const schema = gql`
  type GameSession {
    id: Int!
    title: String!
    description: String!
    category: GameCategory!
    gameSystem: String
    date: DateTime!
    startTime: String!
    endTime: String
    maxPlayers: Int!
    minPlayers: Int!
    status: GameSessionStatus!
    experienceLevel: ExperienceLevel!
    isOnline: Boolean!
    isPrivate: Boolean!
    requiresApproval: Boolean!
    locationDetails: String
    connectionInfo: String
    imageUrl: String
    tags: [String]!
    createdAt: DateTime!
    updatedAt: DateTime!
    organizerId: Int!
    organizer: User!
    venueId: Int
    venue: Venue
    registrations: [GameRegistration]!
    favorites: [FavoriteGameSession]!
  }

  enum GameCategory {
    BOARD_GAMES
    TTRPG
    MAFIA
  }

  enum GameSessionStatus {
    DRAFT
    PUBLISHED
    CANCELLED
    FINISHED
  }

  enum ExperienceLevel {
    ANY
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  type Query {
    gameSessions(input: GameSessionFilterInput): [GameSession!]! @skipAuth
    gameSession(id: Int!): GameSession @skipAuth
    myGameSessions: [GameSession!]! @requireAuth
  }

  input GameSessionFilterInput {
    category: GameCategory
    district: String
    experienceLevel: ExperienceLevel
    hasSeats: Boolean
    venueId: Int
    dateFrom: DateTime
    dateTo: DateTime
  }

  input CreateGameSessionInput {
    title: String!
    description: String!
    category: GameCategory!
    gameSystem: String
    date: DateTime!
    startTime: String!
    endTime: String
    maxPlayers: Int!
    minPlayers: Int!
    status: GameSessionStatus
    experienceLevel: ExperienceLevel!
    isOnline: Boolean!
    isPrivate: Boolean!
    requiresApproval: Boolean!
    locationDetails: String
    connectionInfo: String
    imageUrl: String
    tags: [String]!
    organizerId: Int
    venueId: Int
  }

  input UpdateGameSessionInput {
    title: String
    description: String
    category: GameCategory
    gameSystem: String
    date: DateTime
    startTime: String
    endTime: String
    maxPlayers: Int
    minPlayers: Int
    status: GameSessionStatus
    experienceLevel: ExperienceLevel
    isOnline: Boolean
    isPrivate: Boolean
    requiresApproval: Boolean
    locationDetails: String
    connectionInfo: String
    imageUrl: String
    tags: [String]
    organizerId: Int
    venueId: Int
  }

  type Mutation {
    createGameSession(input: CreateGameSessionInput!): GameSession! @requireAuth
    updateGameSession(id: Int!, input: UpdateGameSessionInput!): GameSession!
      @requireAuth
    cancelGameSession(id: Int!): GameSession! @requireAuth
    registerForGameSession(id: Int!): GameRegistration! @requireAuth
    cancelGameSessionRegistration(id: Int!): GameRegistration! @requireAuth
    approveGameRegistration(id: Int!): GameRegistration! @requireAuth
    declineGameRegistration(id: Int!): GameRegistration! @requireAuth
    addFavoriteGameSession(id: Int!): FavoriteGameSession! @requireAuth
    removeFavoriteGameSession(id: Int!): FavoriteGameSession! @requireAuth
    deleteGameSession(id: Int!): GameSession! @requireAuth
  }
`
