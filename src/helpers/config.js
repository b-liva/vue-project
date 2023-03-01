// HTTP connection to the API
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client/core";
import {provideApolloClient} from "@vue/apollo-composable";

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `/localhost/ngql/`,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
provideApolloClient(apolloClient)


