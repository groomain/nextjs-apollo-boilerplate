import gql from 'graphql-tag';

export default (apolloClient) =>
  apolloClient
    .query({
      query: gql`
        query User {
          user {
            id
            firstName
          }
        }
      `,
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
