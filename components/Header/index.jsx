import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import cookie from 'cookie';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Heading, Box, Button, Anchor } from 'grommet';
import { Notification } from 'grommet-icons';
import redirect from '../../lib/redirect';

const logout = (apolloClient) => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1, // Expire the cookie immediately
  });

  // Force a reload of all the current queries now that the user is
  // logged in, so we don't accidentally leave any state around.
  apolloClient.resetStore().then(() => {
    // Redirect to a more useful page when signed out
    redirect({}, '/');
  });
};

export const PROFILE_QUERY = gql`
  query User {
    user {
      id
      firstName
    }
  }
`;

const Header = ({ router: { pathname } }) => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
    >
      <Heading level="3" margin="none">
        My App
      </Heading>
      <Link prefetch href="/">
        <Anchor className={pathname === '/' ? 'is-active' : ''}>Home</Anchor>
      </Link>
      <Link prefetch href="/users">
        <Anchor className={pathname === '/users' ? 'is-active' : ''}>
          Users
        </Anchor>
      </Link>
      <Link prefetch href="/about">
        <Anchor className={pathname === '/about' ? 'is-active' : ''}>
          About
        </Anchor>
      </Link>
      <Query query={PROFILE_QUERY}>
        {({ client, data: { user } }) => {
          if (user) {
            return <Anchor onClick={() => logout(client)}>Logout</Anchor>;
          }

          return (
            <>
              <Link prefetch href="/create-account">
                <Button primary size="big" label="Create account" />
              </Link>
              <Link prefetch href="/signin">
                <Anchor className={pathname === '/signin' ? 'is-active' : ''}>
                  Signin
                </Anchor>
              </Link>
            </>
          );
        }}
      </Query>
      <Button icon={<Notification />} onClick={() => {}} />
    </Box>
  );
};

export default withRouter(Header);

Header.propTypes = {
  router: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};
