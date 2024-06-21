// src/App.tsx
import React from 'react';
import useFetch from './hooks/useFetch';

//mui
import { Box } from '@mui/material';
import ReadingList from './views/ReadingList';
import Header from './components/header/Header';

const App: React.FC = () => {
    const query = `
    query Books{
      books {
        title
        author
        coverPhotoURL
        readingLevel
      }
    }
  `;

  // add url to env
 useFetch('http://localhost:4000', query);

  return (
    <>
      <Header />
      <Box sx={{marginTop:10}}>
        <ReadingList />
      </Box>
    </>
  );
};

export default App;
