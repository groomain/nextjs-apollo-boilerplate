import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage';

export const userQuery = gql`
  query user {
    user {
      id
      firstName
      lastName
    }
  }
`;

const UserProfil = () => {
  return (
    <Query query={userQuery}>
      {({ loading, error, data }) => {
        if (!data || error)
          return <ErrorMessage message="Error loading posts." />;

        if (loading) return <div>Loading</div>;

        const { user } = data;

        if (!user) {
          return null;
        }

        return (
          <section>
            <p>{user.id}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <style jsx>
              {`
                section {
                  padding-bottom: 20px;
                }
                li {
                  display: block;
                  margin-bottom: 10px;
                }
                div {
                  align-items: center;
                  display: flex;
                }
                p {
                  font-size: 14px;
                  margin-right: 10px;
                  text-decoration: none;
                  padding-bottom: 0;
                  border: 0;
                }
              `}
            </style>
          </section>
        );
      }}
    </Query>
  );
};

export default UserProfil;
