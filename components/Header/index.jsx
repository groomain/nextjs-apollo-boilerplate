import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import cookie from 'cookie';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
    <header>
      <Link prefetch href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link prefetch href="/users">
        <a className={pathname === '/users' ? 'is-active' : ''}>Users</a>
      </Link>
      <Link prefetch href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      <Query query={PROFILE_QUERY}>
        {({ client, data: { user } }) => {
          if (user) {
            return <a onClick={() => logout(client)}>Logout</a>;
          }

          return (
            <>
              <Link prefetch href="/create-account">
                <a
                  className={pathname === '/create-account' ? 'is-active' : ''}
                >
                  Create account
                </a>
              </Link>
              <Link prefetch href="/signin">
                <a className={pathname === '/signin' ? 'is-active' : ''}>
                  Signin
                </a>
              </Link>
            </>
          );
        }}
      </Query>

      <style jsx>
        {`
          header {
            margin-bottom: 25px;
          }
          a {
            font-size: 14px;
            margin-right: 15px;
            text-decoration: none;
          }
          .is-active {
            text-decoration: underline;
          }
        `}
      </style>
    </header>
  );
};

export default withRouter(Header);

Header.propTypes = {
  router: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};
