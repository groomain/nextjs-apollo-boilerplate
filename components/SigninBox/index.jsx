import React, { useContext } from 'react';
import { ApolloContext, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import cookie from 'cookie';

import { Paragraph, Form, Box, TextInput, Button, Heading } from 'grommet';
import redirect from '../../lib/redirect';

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

// TODO: Find a better name for component.
const SigninBox = () => {
  let email;
  let password;

  const { client } = useContext(ApolloContext);
  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={(data) => {
        // Store the token in cookie
        document.cookie = cookie.serialize('token', data.signinUser.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
        // Force a reload of all the current queries now that the user is
        // logged in
        client.resetStore().then(() => {
          redirect({}, '/');
        });

        email.value = '';
        password.value = '';
      }}
      onError={(error) => {
        // If you want to send error to external service?
        console.log(error);
      }}
    >
      {(signinUser, { error }) => (
        <Box align="center">
          <Box width="medium">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                signinUser({
                  variables: {
                    email: email.value,
                    password: password.value,
                  },
                });
              }}
            >
              <Heading level="3">Signin</Heading>
              {error && (
                <Paragraph>No user found with that information.</Paragraph>
              )}
              <Box margin={{ bottom: 'small' }}>
                <TextInput
                  name="email"
                  placeholder="Email"
                  ref={(node) => {
                    email = node;
                  }}
                />
              </Box>
              <Box margin={{ bottom: 'small' }}>
                <TextInput
                  name="password"
                  placeholder="Password"
                  ref={(node) => {
                    password = node;
                  }}
                  type="password"
                />
              </Box>
              <Box margin={{ bottom: 'small' }}>
                <Button type="submit" primary label="Sin in" />
              </Box>
            </Form>
          </Box>
        </Box>
      )}
    </Mutation>
  );
};

export default SigninBox;
