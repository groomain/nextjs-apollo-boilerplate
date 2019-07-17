import React from 'react';
import App from '../components/App';
import Header from '../components/Header';
import Submit from '../components/Submit';
import PostList from '../components/PostList';

const Index = () => {
  return (
    <App>
      <Header />
      <Submit />
      <PostList />
    </App>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default Index;
