import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Box, TextInput, Button, Heading } from 'grommet';
import { allPostsQuery, allPostsQueryVars } from '../PostList';

function handleSubmit(event, client) {
  event.preventDefault();
  const form = event.target;
  const formData = new window.FormData(form);
  const title = formData.get('title');
  const url = formData.get('url');
  form.reset();

  client.mutate({
    mutation: gql`
      mutation createPost($title: String!, $url: String!) {
        createPost(title: $title, url: $url) {
          id
          title
          votes
          url
          createdAt
        }
      }
    `,
    variables: { title, url },
    update: (proxy, { data: { createPost } }) => {
      const data = proxy.readQuery({
        query: allPostsQuery,
        variables: allPostsQueryVars,
      });
      proxy.writeQuery({
        query: allPostsQuery,
        data: {
          ...data,
          allPosts: [createPost, ...data.allPosts],
        },
        variables: allPostsQueryVars,
      });
    },
  });
}

const Submit = () => {
  return (
    <ApolloConsumer>
      {(client) => (
        <Box align="center">
          <Box margin={{ bottom: 'small' }}>
            <Form onSubmit={(event) => handleSubmit(event, client)}>
              <Heading level="1" margin={{ top: 'medium', bottom: 'medium' }}>
                Posts
              </Heading>
              <Box width="medium">
                <Box margin={{ bottom: 'small' }}>
                  <TextInput
                    placeholder="title"
                    name="title"
                    type="text"
                    required
                  />
                </Box>
                <Box margin={{ bottom: 'small' }}>
                  <TextInput
                    margin={{ bottom: 'small' }}
                    placeholder="url"
                    name="url"
                    type="url"
                    required
                  />
                </Box>
              </Box>
              <Button primary label="Submit" />
            </Form>
          </Box>
        </Box>
      )}
    </ApolloConsumer>
  );
};

export default Submit;
