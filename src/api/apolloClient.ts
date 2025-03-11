import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
  // cache: new InMemoryCache({
  //   typePolicies: {
  //     Query: {
  //       fields: {
  //         Page: {
  //           merge: false,
  //           keyArgs: ["type", "sort", "isAdult"],
  //         },
  //       },
  //     },
  //   },
  // }),
});

export default client;