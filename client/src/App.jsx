import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Tabs from './components/Tabs/Tabs.jsx';
import theme from './assets/stylesheets/theme.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Tabs />
    </ThemeProvider>
  );
}

export default App;

