import React from 'react';
import App from 'next/app';
import { ApolloClient, InMemoryCache} from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
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