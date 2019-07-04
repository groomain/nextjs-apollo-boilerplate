import PropTypes from 'prop-types';
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Button } from 'grommet';
import { Like } from 'grommet-icons';
import gql from 'graphql-tag';

function upvotePost(votes, id, client) {
  client.mutate({
    mutation: gql`
      mutation updatePost($id: ID!, $votes: Int) {
        updatePost(id: $id, votes: $votes) {
          id
          __typename
          votes
        }
      }
    `,
    variables: {
      id,
      votes: votes + 1,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updatePost: {
        __typename: 'Post',
        id,
        votes: votes + 1,
      },
    },
  });
}

const PostUpVoter = ({ votes, id }) => {
  return (
    <ApolloConsumer>
      {(client) => (
        <Button
          gap="small"
          icon={<Like />}
          onClick={() => upvotePost(votes, id, client)}
          label={votes}
        />
      )}
    </ApolloConsumer>
  );
};

PostUpVoter.propTypes = {
  id: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

export default PostUpVoter;
