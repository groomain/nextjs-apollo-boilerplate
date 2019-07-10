import gql from 'graphql-tag';

export default (apolloClient) =>
  apolloClient
    .query({
      query: gql`
        query User {
          user {
            id
            firstName
            lastName
          }
        }
      `,
    })
    .then(({ data }) => {
      return { loggedInUser: data.user };
    })
    .catch((err) => {
      console.log(err);
      return { loggedInUser: null };
    });
