export const schemaString = `
schema {
  query: Query
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type CustomerNode implements Node {
  id: ID!
  code: Int!
  codeTemp: Int
  name: String!
  phone: String
  whatsapp: String
  fax: String
  email: String
  website: String
  postalCode: String
  addr: String
  agent: Boolean!
}

type CustomerNodeConnection {
  pageInfo: PageInfo!
  edges: [CustomerNodeEdge]!
}

type CustomerNodeEdge {
  node: CustomerNode
  cursor: String!
}

type Query {
  customer(id: ID!): CustomerNode
  allCustomers(before: String, after: String, first: Int, last: Int, id: ID, name: String, name_Icontains: String, pk: Float): CustomerNodeConnection
}
`