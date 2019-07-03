import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactModal from 'react-modal';
import ErrorMessage from '../ErrorMessage';
import { Router } from '../../routes';

export const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      votes
      url
      createdAt
    }
  }
`;

const PostModal = ({ id }) => {
  const [showModal, setShowModal] = useState(true);

  const handleOpenModa = useCallback(() => {
    setShowModal(true);
  });

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    Router.push('/');
  });

  useEffect(() => {
    handleOpenModa();
  }, [id]);

  return (
    <ReactModal
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
      onRequestClose={handleCloseModal}
    >
      <button onClick={handleCloseModal}>Close Modal</button>
      <Query query={postQuery} variables={{ id }}>
        {({ error, data }) => {
          if (!data || error) {
            return <ErrorMessage message="Error loading posts." />;
          }

          const { Post: post } = data;

          if (!post) {
            return null;
          }

          return (
            <div>
              <p>{post.id}</p>
              <p>{post.title}</p>
              <p>{post.votes}</p>
              <p>{post.url}</p>
            </div>
          );
        }}
      </Query>
    </ReactModal>
  );
};

export default PostModal;

PostModal.propTypes = {
  id: PropTypes.string.isRequired,
};
