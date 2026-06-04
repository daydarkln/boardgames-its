export const schema = gql`
  type Venue {
    id: Int!
    name: String!
    description: String!
    detailedDescription: String
    address: String
    district: String
    city: String!
    websiteUrl: String
    phone: String
    imageUrl: String
    rating: Float!
    latitude: Float
    longitude: Float
    amenities: [String]!
    createdAt: DateTime!
    updatedAt: DateTime!
    gameSessions: [GameSession]!
  }

  type Query {
    venues(input: VenueFilterInput): [Venue!]! @skipAuth
    venue(id: Int!): Venue @skipAuth
  }

  input VenueFilterInput {
    city: String
    district: String
    amenity: String
  }

  input CreateVenueInput {
    name: String!
    description: String!
    detailedDescription: String
    address: String
    district: String
    city: String!
    websiteUrl: String
    phone: String
    imageUrl: String
    rating: Float!
    latitude: Float
    longitude: Float
    amenities: [String]
  }

  input UpdateVenueInput {
    name: String
    description: String
    detailedDescription: String
    address: String
    district: String
    city: String
    websiteUrl: String
    phone: String
    imageUrl: String
    rating: Float
    latitude: Float
    longitude: Float
    amenities: [String]!
  }

  type Mutation {
    createVenue(input: CreateVenueInput!): Venue! @requireAuth(roles: "admin")
    updateVenue(id: Int!, input: UpdateVenueInput!): Venue!
      @requireAuth(roles: "admin")
    deleteVenue(id: Int!): Venue! @requireAuth(roles: "admin")
  }
`
