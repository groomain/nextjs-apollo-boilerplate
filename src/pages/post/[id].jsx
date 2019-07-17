import React from 'react';
import App from '../../components/App';
import Header from '../../components/Header';
import Submit from '../../components/Submit';
import PostList from '../../components/PostList';
import PostModal from '../../components/PostModal';

const Post = ({ query }) => {
  let id = null;

  if (query) {
    ({ id } = query);
  }

  return (
    <App>
      <Header />
      <Submit />
      <PostList />
      {id && <PostModal id={id} />}
    </App>
  );
};

Post.getInitialProps = ({ query }) => {
  return { query };
};

export default Post;
