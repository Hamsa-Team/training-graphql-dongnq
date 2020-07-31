import React from 'react';
import App from 'next/app';
import { ApolloClient, InMemoryCache} from '@apollo/client';
import { ApolloProvider } from 'react-apollo';
import constants from '../core/constants';

const client = new ApolloClient({
    uri: constants.GRAPHQL_URL,
    cache: new InMemoryCache()
})

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        )
    }
}

export default MyApp;