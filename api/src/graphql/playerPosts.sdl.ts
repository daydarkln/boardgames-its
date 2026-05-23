export const schema = gql`
  type PlayerPost {
    id: Int!
    title: String!
    description: String!
    category: GameCategory!
    city: String!
    district: String
    isOnline: Boolean!
    experienceLevel: ExperienceLevel!
    neededPlayers: Int!
    currentPlayers: Int!
    tags: [String]!
    status: PlayerPostStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    authorId: Int!
    author: User!
  }

  enum GameCategory {
    BOARD_GAMES
    TTRPG
    MAFIA
  }

  enum ExperienceLevel {
    ANY
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  enum PlayerPostStatus {
    ACTIVE
    CLOSED
    HIDDEN
  }

  type Query {
    playerPosts(input: PlayerPostFilterInput): [PlayerPost!]! @skipAuth
    playerPost(id: Int!): PlayerPost @skipAuth
  }

  input PlayerPostFilterInput {
    category: GameCategory
    district: String
    isOnline: Boolean
    experienceLevel: ExperienceLevel
  }

  input CreatePlayerPostInput {
    title: String!
    description: String!
    category: GameCategory!
    city: String!
    district: String
    isOnline: Boolean!
    experienceLevel: ExperienceLevel!
    neededPlayers: Int!
    currentPlayers: Int!
    tags: [String]!
    status: PlayerPostStatus
    authorId: Int
  }

  input UpdatePlayerPostInput {
    title: String
    description: String
    category: GameCategory
    city: String
    district: String
    isOnline: Boolean
    experienceLevel: ExperienceLevel
    neededPlayers: Int
    currentPlayers: Int
    tags: [String]
    status: PlayerPostStatus
    authorId: Int
  }

  type Mutation {
    createPlayerPost(input: CreatePlayerPostInput!): PlayerPost! @requireAuth
    updatePlayerPost(id: Int!, input: UpdatePlayerPostInput!): PlayerPost!
      @requireAuth
    closePlayerPost(id: Int!): PlayerPost! @requireAuth
    hidePlayerPost(id: Int!): PlayerPost! @requireAuth(roles: "admin")
    deletePlayerPost(id: Int!): PlayerPost! @requireAuth
  }
`
