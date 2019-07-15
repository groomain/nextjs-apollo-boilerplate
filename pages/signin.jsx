import React from 'react';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/checkLoggedIn';

import SigninBox from '../components/SigninBox';
import App from '../components/App';
import Header from '../components/Header';

class Signin extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/');
    }

    return {};
  }

  render() {
    return (
      <App>
        <Header />
        <SigninBox />
      </App>
    );
  }
}

export default Signin;
