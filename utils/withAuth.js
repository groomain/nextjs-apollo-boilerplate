import { Component } from 'react';
import cookie from 'js-cookie';
import redirect from "../lib/redirect";
import {Query} from "react-apollo";
import React from "react";
import gql from "graphql-tag";

export const login = async (apolloClient, token) => {
  cookie.set('token', token, { expires: 30 });
  
  apolloClient.resetStore().then(() => {
    // Redirect to a more useful page when signed out
    redirect({}, '/');
  });
}

export const signup = async (apolloClient,  token) => {
  cookie.set('token', token, { expires: 30 });
  
  apolloClient.resetStore().then(() => {
    // Redirect to a more useful page when signed out
    redirect({}, '/');
  });
}

export const logout = async (apolloClient) => {
  cookie.remove('token')
  
  // Force a reload of all the current queries  now that the user is
  // logged in, so we don't accidentally leave any state around.
  apolloClient.resetStore().then(() => {
    // Redirect to a more useful page when signed out
    redirect({}, '/');
  });
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const PROFILE_QUERY = gql`
  query User {
    user {
      id
      firstName
    }
  }
`;

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;
    
    constructor(props) {
      super(props);
    }
    
    render() {
      return <Query query={PROFILE_QUERY}>
        {({client, data}) => {
            let user = null;
            
            if (data) {
              ({user} = data);
            }
            
            return <WrappedComponent {...this.props} loggedInUser={user} />
          }
        }
      </Query>
    }
  }
