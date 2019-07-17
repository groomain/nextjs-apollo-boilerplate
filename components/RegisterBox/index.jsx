import React, { useContext } from 'react';
import { Mutation, ApolloContext } from 'react-apollo';
import gql from 'graphql-tag';
import { Heading, Button, Box, Paragraph } from 'grommet';
import Link from 'next/dist/client/link';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { signup } from '../../utils/withAuth';
import { CustomPasswordInput, CustomTextInput } from '../Form';
import { ALL_POSTS_QUERY, allPostsQueryVars } from '../PostList';

const CREATE_USER = gql`
  mutation Create(
    $name: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $name
      lastName: $lastName
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

const schema = Yup.object().shape({
  name: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Email')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {
  name: '',
  lastName: '',
  email: '',
  password: '',
};

const handleSubmit = (
  client,
  mutate,
  variables,
  { setSubmitting, resetForm }
) => {
  mutate({
    variables,
  }).then(
    ({ data }) => {
      signup(client, data.signinUser.token);
      resetForm(initialValues);
      setSubmitting(false);
    },
    () => {
      setSubmitting(false);
    }
  );
};

const RegisterBox = () => {
  const { client } = useContext(ApolloContext);

  return (
    <Box align="center">
      <Box width="medium">
        <Mutation mutation={CREATE_USER}>
          {(mutate, { error }) => (
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values, actions) =>
                handleSubmit(client, mutate, values, actions)
              }
              render={({ isSubmitting }) => (
                <Form>
                  <Heading
                    level="1"
                    margin={{ top: 'medium', bottom: 'medium' }}
                  >
                    Add post
                  </Heading>
                  {error && <p>Issue occurred while registering :(</p>}
                  <pre>
                    {error &&
                      error.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message}</span>
                      ))}
                  </pre>
                  {error && (
                    <Paragraph>No user found with that information.</Paragraph>
                  )}
                  <Field
                    name="name"
                    type="text"
                    htmlFor="register-name"
                    component={CustomTextInput}
                    placeholder="first name"
                    value=""
                  />
                  <Field
                    name="lastName"
                    type="text"
                    htmlFor="register-lastName"
                    component={CustomTextInput}
                    placeholder="Last name"
                    value=""
                  />
                  <Field
                    name="email"
                    type="email"
                    htmlFor="register-email"
                    component={CustomTextInput}
                    placeholder="Email"
                    value=""
                  />
                  <Field
                    name="password"
                    type="password"
                    htmlFor="create-post-url"
                    component={CustomPasswordInput}
                    placeholder="Password"
                    value=""
                  />
                  <Box margin={{ bottom: 'small' }}>
                    <Button
                      type="submit"
                      primary
                      label="Register"
                      disabled={isSubmitting}
                    />
                  </Box>
                  <Box>
                    Already have an account?{' '}
                    <Link prefetch href="/signin">
                      <a>Sign in</a>
                    </Link>
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

export default RegisterBox;
