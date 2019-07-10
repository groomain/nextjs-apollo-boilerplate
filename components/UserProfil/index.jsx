import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage';
import { withAuthSync } from '../../utils/withAuth';

export const userQuery = gql`
  query user {
    user {
      id
      firstName
      lastName
    }
  }
`;

const UserProfil = ({ loggedInUser }) => {
  console.log(loggedInUser);
  if (!loggedInUser) {
    return null;
  }

  return (
    <section>
      <p>{loggedInUser.id}</p>
      <p>{loggedInUser.firstName}</p>
      <p>{loggedInUser.lastName}</p>
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
};

export default withAuthSync(UserProfil);
