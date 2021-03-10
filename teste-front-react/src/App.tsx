import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { VideosListProvider } from './hooks/videosList';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <VideosListProvider>
        <Routes />
      </VideosListProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
