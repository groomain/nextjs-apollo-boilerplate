import React, { useContext } from 'react';
import { Mutation, ApolloContext } from 'react-apollo';
import gql from 'graphql-tag';
import cookie from 'cookie';
import redirect from '../../lib/redirect';

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
          <input
            name="firstName"
            placeholder="first name"
            ref={(node) => {
              firstName = node;
            }}
          />
          <br />
          <input
            name="lastname"
            placeholder="last name"
            ref={(node) => {
              lastName = node;
            }}
          />
          <br />
          <input
            name="email"
            placeholder="Email"
            ref={(node) => {
              email = node;
            }}
          />
          <br />
          <input
            name="password"
            placeholder="Password"
            ref={(node) => {
              password = node;
            }}
            type="password"
          />
          <br />
          <button>Register</button>
        </form>
      )}
    </Mutation>
  );
};

export default RegisterBox;
