import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactModal from 'react-modal';
import { Button } from 'grommet';
import Router from 'next/router';
import ErrorMessage from '../ErrorMessage';

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
  if (!id) {
    return null;
  }

  const [showModal, setShowModal] = useState(true);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  });

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    Router.push('/');
  });

  useEffect(() => {
    handleOpenModal();
  }, [id]);

  return (
    <ReactModal
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
      onRequestClose={handleCloseModal}
      style={{ zIndex: 10 }}
    >
      <Button label="Close modal" onClick={handleCloseModal} />
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
