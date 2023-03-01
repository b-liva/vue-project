import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema, mockServer, createMockStore } from '@graphql-tools/mock'
import { graphql } from 'graphql'
import {schemaString} from "./schema";
import casual from "casual-browserify";

const schema = makeExecutableSchema(
    { typeDefs: schemaString }
)

// Mock object
const mocks = {
    CustomerNode: () => ({
        name: "cu01",
        phone: casual.phone,
        whatsapp: casual.phone,
        fax: casual.phone,
        email: casual.email,
        website: casual.url,
        addr: casual.address,
        agent: casual.boolean,
    }),
    CustomerNodeConnection: () => ({
        edges: [...new Array(casual.integer(3, 3))]
    })
}
const preserveResolvers = false
const store = createMockStore({schema, mocks})
// Mock the server passing the schema, mocks object and preserveResolvers arguments

// Alternatively, you can call addMocksToSchema with the same arguments
const schemaWithMocks = addMocksToSchema({
    schema,
    store,
    mocks,
    preserveResolvers
})

export const server = mockServer(schema, mocks, preserveResolvers)

const query = `
query getCustomerDetails($id: ID!) {
    getCustomerDetails: customer(id: $id) {
        id
        name
        type {
            id
            name
        }
        phone
        whatsapp
        fax
        email
        website
        postalCode
        addr
        agent
    }
}
`
export const gql = graphql({
    schema: schemaWithMocks,
    source: query,
    variableValues: {id: 6}
})

const filterCustomerQuery = `
query filterCustomer($customerName: String) {
    filterCustomer: allCustomers(name_Icontains: $customerName) {
        edges {
            node {
                id
                name
                phone
                whatsapp
            }
        }
    }
}`
export const customersGqlQuery = graphql({
    schema: schemaWithMocks,
    source: filterCustomerQuery,
})