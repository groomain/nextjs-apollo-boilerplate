import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import App from '../components/App';

const Error = ({ statusCode }) => {
  return (
    <App>
      <Header />
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </App>
  );
};

Error.getInitialProps = ({ res: { statusCode } }) => {
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: '',
};

export default Error;
