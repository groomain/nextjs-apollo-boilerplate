import App, { Container } from 'next/app';
import React from 'react';
import { compose } from 'recompose';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import withRedux from 'next-redux-wrapper';
import NextSeo from 'next-seo';
import { Grommet } from 'grommet';
import theme from '../components/theme';
import withApollo from '../lib/withApollo';
import SEO from '../next-seo.config';
import { initStore } from '../lib/store';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, store } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <NextSeo config={SEO} />
            <Grommet theme={theme}>
              <Component {...pageProps} />
            </Grommet>
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
