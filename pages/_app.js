import React, { useState } from 'react';
import AppContext from '../context/appContext';
import '@/styles/globals.css';
import Layout from '../components/layout';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';

function MyApp({ Component, pageProps }) {
  const [state, setstate] = useState({});

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={state}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
