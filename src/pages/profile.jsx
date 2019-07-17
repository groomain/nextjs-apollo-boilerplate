import React from 'react';
import App from '../components/App';
import Header from '../components/Header';
import UserProfil from '../components/UserProfil';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';

const Profile = () => (
  <App>
    <Header />
    <UserProfil />
  </App>
);

Profile.getInitialProps = async (context) => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(context, '/');
  }

  return {};
};

export default Profile;
