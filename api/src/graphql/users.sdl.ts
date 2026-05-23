export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    avatarUrl: String
    city: String!
    district: String
    bio: String
    favoriteDirections: [GameCategory]!
    favoriteGamesText: String
    experienceLevel: ExperienceLevel!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdGameSessions: [GameSession]!
    gameRegistrations: [GameRegistration]!
    favoriteGames: [FavoriteGameSession]!
    playerPosts: [PlayerPost]!
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

  enum Role {
    USER
    ADMIN
  }

  type Query {
    users: [User!]! @requireAuth(roles: "admin")
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    password: String
    name: String
    avatarUrl: String
    city: String
    district: String
    bio: String
    favoriteDirections: [GameCategory]
    favoriteGamesText: String
    experienceLevel: ExperienceLevel!
    role: Role!
  }

  input UpdateUserInput {
    email: String
    name: String
    avatarUrl: String
    city: String
    district: String
    bio: String
    favoriteDirections: [GameCategory]
    favoriteGamesText: String
    experienceLevel: ExperienceLevel
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: "admin")
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth(roles: "admin")
  }
`
