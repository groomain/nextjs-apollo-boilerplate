import React, { useContext } from 'react';
import { ApolloContext, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Paragraph, Box, Button, Heading } from 'grommet';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../utils/withAuth';
import { CustomPasswordInput, CustomTextInput } from '../Form';

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        firstName
        lastName
        id
      }
    }
  }
`;

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalid')
    .required('Required'),
  password: Yup.string().required('Required'),
});

// TODO: Find a better name for component.
const SigninBox = () => {
  const { client } = useContext(ApolloContext);

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={(data) => {
        login(client, data.signinUser.token);
      }}
      onError={(error) => {
        // If you want to send error to external service?
        console.log(error);
      }}
    >
      {(signinUser, { error }) => (
        <Box align="center">
          <Box width="medium">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SigninSchema}
              onSubmit={({ email, password }) => {
                signinUser({
                  variables: {
                    email,
                    password,
                  },
                });
              }}
              render={({ status, isSubmitting }) => (
                <Form>
                  <Heading
                    level="1"
                    margin={{ top: 'medium', bottom: 'medium' }}
                  >
                    Signin
                  </Heading>
                  {error && (
                    <Paragraph>No user found with that information.</Paragraph>
                  )}
                  <Field
                    name="email"
                    type="email"
                    htmlFor="signin-email"
                    component={CustomTextInput}
                    placeholder="Email"
                  />
                  <Field
                    name="password"
                    type="password"
                    htmlFor="signin-password"
                    component={CustomPasswordInput}
                    placeholder="Password"
                  />
                  <Box margin={{ bottom: 'small' }}>
                    <Button
                      type="submit"
                      primary
                      label="Sign in"
                      disabled={isSubmitting}
                    />
                  </Box>
                </Form>
              )}
            />
          </Box>
        </Box>
      )}
    </Mutation>
  );
};

export default SigninBox;
