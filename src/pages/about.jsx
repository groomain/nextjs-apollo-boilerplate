import React from 'react';
import { withRouter } from 'next/router';
import { Box } from 'grommet';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import App from '../components/App';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import { CLIENT_CMS } from '../lib/initApollo';
import RichText from '../components/RichText';

export const ABOUT_QUERY = gql`
  query about {
    about(uid: "about", lang: "fr-fr") {
      title
      content
    }
  }
`;

const About = () => (
  <App>
    <Header />
    <Box tag="article" align="center">
      <Query query={ABOUT_QUERY} context={{ clientName: CLIENT_CMS }}>
        {({ loading, error, data }) => {
          if (loading) {
            return loading;
          }

          if (error) {
            return <ErrorMessage message={error.message} />;
          }

          return (
            <>
              <RichText content={data.about.title} />
              <RichText content={data.about.content} />
            </>
          );
        }}
      </Query>
    </Box>
  </App>
);

export default withRouter(About);
