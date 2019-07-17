import PropTypes from 'prop-types';
import React from 'react';

const Error = ({ message }) => (
  <aside>
    {message}
    <style jsx>
      {`
        aside {
          padding: 1.5em;
          font-size: 14px;
          color: white;
          background-color: red;
        }
      `}
    </style>
  </aside>
);

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: '',
};

export default Error;
