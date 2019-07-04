import React, { useContext } from 'react';
import { Mutation, ApolloContext } from 'react-apollo';
import gql from 'graphql-tag';
import cookie from 'cookie';
import { Heading, Button, Box, TextInput } from 'grommet';
import Link from 'next/dist/client/link';
import redirect from '../../lib/redirect';
import App from '../App';

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

const RegisterBox = () => {
  let firstName;
  let email;
  let password;
  let lastName;

  const { client } = useContext(ApolloContext);

  return (
    <Mutation
      mutation={CREATE_USER}
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
      }}
      onError={(error) => {
        // If you want to send error to external service?
        console.log(error);
      }}
    >
      {(create, { error }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            create({
              variables: {
                firstName: firstName.value,
                email: email.value,
                password: password.value,
                lastName: lastName.value,
              },
            });

            firstName.value = '';
            lastName.value = '';
            email.value = '';
            password.value = '';
          }}
        >
          {error && <p>Issue occurred while registering :(</p>}
          <pre>
            {error &&
              error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
              ))}
          </pre>
          <Box align="center">
            <Box width="medium">
              <Heading level={3}>Register</Heading>
              <Box margin={{ bottom: 'small' }}>
                <TextInput
                  name="firstName"
                  placeholder="first name"
                  ref={(node) => {
                    firstName = node;
                  }}
                />
              </Box>
              <Box margin={{ bottom: 'small' }}>
                <TextInput
                  name="lastname"
                  placeholder="last name"
                  ref={(node) => {
                    lastName = node;
                  }}
                />
              </Box>
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
                <Button label="Register" primary />
              </Box>
              <Box>
                Already have an account?{' '}
                <Link prefetch href="/signin">
                  <a>Sign in</a>
                </Link>
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </Mutation>
  );
};

export default RegisterBox;
