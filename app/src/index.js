import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import App from './components/App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
