import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Anchor, Box, Button } from 'grommet';
import Link from 'next/link';
import PostUpvoter from '../PostUpVoter';
import ErrorMessage from '../ErrorMessage';

const List = (props) => <Box tag="ul" {...props} />;

const ListItem = (props) => <Box direction="row" tag="li" {...props} />;

const loadMorePosts = (allPosts, fetchMore) => {
  fetchMore({
    variables: {
      skip: allPosts.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return previousResult;
      }

      return Object.assign({}, previousResult, {
        // Append the new posts results to the old one
        allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
      });
    },
  });
};

export const ALL_POSTS_QUERY = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`;
export const allPostsQueryVars = {
  skip: 0,
  first: 10,
};

const PostList = () => {
  return (
    <Box align="center">
      <Box width="medium">
        <Query query={ALL_POSTS_QUERY} variables={allPostsQueryVars}>
          {({ loading, error, data, fetchMore }) => {
            if (!data || error) {
              return <ErrorMessage message="Error loading posts." />;
            }

            if (loading) {
              return <div>Loading</div>;
            }

            const { allPosts, _allPostsMeta } = data;

            if (!allPosts)
              return <ErrorMessage message="Error loading posts." />;

            const areMorePosts = allPosts.length < _allPostsMeta.count;

            return (
              <>
                <List>
                  {allPosts.map((post, index) => (
                    <ListItem
                      key={post.id}
                      margin={{ bottom: 'small' }}
                      align="center"
                    >
                      <Link prefetch href="post/[id]" as={`post/${post.id}`}>
                        <Anchor>
                          <span>{index + 1}. </span>
                          {post.title}
                        </Anchor>
                      </Link>
                      <Box margin={{ left: 'xsmall' }} justify="center">
                        <PostUpvoter id={post.id} votes={post.votes} />
                      </Box>
                    </ListItem>
                  ))}
                </List>
                {areMorePosts ? (
                  <Button
                    primary
                    label={loading ? 'Loading...' : 'Show More'}
                    onClick={() => loadMorePosts(allPosts, fetchMore)}
                  />
                ) : (
                  ''
                )}
              </>
            );
          }}
        </Query>
      </Box>
    </Box>
  );
};

export default PostList;
