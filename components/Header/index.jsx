import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Heading, Box, Button, Anchor } from 'grommet';
import { compose } from 'recompose';
import { ApolloContext } from 'react-apollo';
import { logout, withAuthSync } from '../../utils/withAuth';

const Header = ({ loggedInUser, router: { pathname } }) => {
  const { client } = useContext(ApolloContext);

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      gap="medium"
    >
      <Box
        margin={{ left: 'left' }}
        gap="medium"
        direction="row"
        align="center"
      >
        <Link prefetch href="/">
          <Anchor className={pathname === '/' ? 'active' : ''}>
            <Heading size="small" level="3" margin="none">
              My App
            </Heading>
          </Anchor>
        </Link>
        {loggedInUser && (
          <Link prefetch href="/profile">
            <Anchor className={pathname === '/profile' ? 'active' : ''}>
              Profile
            </Anchor>
          </Link>
        )}
        <Link prefetch href="/about">
          <Anchor className={pathname === '/about' ? 'active' : ''}>
            About
          </Anchor>
        </Link>
      </Box>
      {loggedInUser ? (
        <Anchor onClick={() => logout(client)}>Logout</Anchor>
      ) : (
        <Box
          margin={{ left: 'auto' }}
          gap="medium"
          direction="row"
          align="center"
        >
          <Link prefetch href="/signin">
            <Anchor className={pathname === '/signin' ? 'active' : ''}>
              Signin
            </Anchor>
          </Link>
          <Link prefetch href="/create-account">
            <Button primary size="big" label="Create account" />
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default compose(
  withAuthSync,
  withRouter
)(Header);

Header.propTypes = {
  router: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};
