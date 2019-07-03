import React from 'react';
import App from '../components/App';
import Header from '../components/Header';
import Submit from '../components/Submit';
import PostList from '../components/PostList';
import PostModal from '../components/PostModal';

const Index = ({ query }) => {
  return (
    <App>
      <Header />
      <Submit />
      <PostList />
      {query.id && <PostModal id={query.id} />}
    </App>
  );
};

Index.getInitialProps = ({ query }) => {
  return { query };
};

export default Index;
