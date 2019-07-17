import App, { Container } from 'next/app';
import React from 'react';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import withRedux from 'next-redux-wrapper';
import NextSeo from 'next-seo';
import { Grommet } from 'grommet';
import theme from '../components/theme';
import CachePersistorContext from '../components/CachePersistorContext';
import withApollo from '../lib/withApollo';
import SEO from '../next-seo.config';
import { initStore } from '../lib/store';
import initCachePersistor from '../lib/initCachePersistor';

class MyApp extends App {
  constructor(props) {
    super(props);

    this.state = {
      persistor: null,
    };
  }

  componentDidMount() {
    const { apolloClient } = this.props;

    if (apolloClient) {
      const persistor = initCachePersistor(apolloClient.cache);

      this.setState({ persistor });
    }
  }

  render() {
    const { Component, pageProps, apolloClient, store } = this.props;
    const { persistor } = this.state;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <NextSeo config={SEO} />
            <Grommet theme={theme}>
              <CachePersistorContext.Provider value={persistor}>
                <Component {...pageProps} />
              </CachePersistorContext.Provider>
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
