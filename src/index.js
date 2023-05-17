import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, split, HttpLink, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpUri = "https://eoq8vw.sse.codesandbox.io/graphql";
const wsUri = "wss://eoq8vw.sse.codesandbox.io/graphql";

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUri
  })
);

const httpLink = new HttpLink({
  uri: httpUri
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  rootElement
);
