import App, { Container } from 'next/app';
import React from 'react';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import withRedux from 'next-redux-wrapper';
import withApollo from '../lib/withApollo';
import { initStore } from '../lib/store';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, store } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default compose(
  withApollo,
  withRedux(initStore)
)(MyApp);

// export default withApollo(MyApp);
