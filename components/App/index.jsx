import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'grommet';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const App = ({ children }) => (
  <Box fill>
    <GlobalStyle />
    {children}
  </Box>
);

App.defaultProps = {
  children: null,
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
