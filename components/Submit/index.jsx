import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Box, Button, Heading, Paragraph } from 'grommet';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { allPostsQuery, allPostsQueryVars } from '../PostList';
import { CustomTextInput } from '../Form';

const schema = Yup.object().shape({
  title: Yup.string().required('Required'),
  url: Yup.string().required('Required'),
});

const initialValues = {
  title: '',
  url: '',
};

const CREATE_POST = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(title: $title, url: $url) {
      id
      title
      votes
      url
      createdAt
    }
  }
`;

const handleSubmit = (mutate, { title, url }, { setSubmitting, resetForm }) => {
  mutate({
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
    optimisticResponse: {
      __typename: 'Mutation',
      createPost: {
        __typename: 'Post',
        title,
        url,
      },
    },
  }).then(
    () => {
      resetForm(initialValues);
      setSubmitting(false);
    },
    () => {
      setSubmitting(false);
    }
  );
};

const Submit = () => {
  return (
    <Box align="center">
      <Box width="medium" margin={{ bottom: 'small' }}>
        <Mutation mutation={CREATE_POST}>
          {(mutate, { error }) => (
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values, actions) =>
                handleSubmit(mutate, values, actions)
              }
              render={({ isSubmitting }) => (
                <Form>
                  <Heading
                    level="1"
                    margin={{ top: 'medium', bottom: 'medium' }}
                  >
                    Add post
                  </Heading>
                  {error && (
                    <Paragraph>No user found with that information.</Paragraph>
                  )}
                  <Field
                    name="title"
                    type="text"
                    htmlFor="create-post-title"
                    component={CustomTextInput}
                    placeholder="Title"
                    value=""
                  />
                  <Field
                    name="url"
                    type="text"
                    htmlFor="create-post-url"
                    component={CustomTextInput}
                    placeholder="Password"
                    value=""
                  />
                  <Box margin={{ bottom: 'small' }}>
                    <Button
                      type="submit"
                      primary
                      label="Submit"
                      disabled={isSubmitting}
                    />
                  </Box>
                </Form>
              )}
            />
          )}
        </Mutation>
      </Box>
    </Box>
  );
};

export default Submit;
