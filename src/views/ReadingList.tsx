import React from 'react';
import Lottie from "lottie-react";
import { useDispatch, useSelector } from 'react-redux';

// MUI components
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Component
import BookCard from '../components/book/BookCard';

// Assets
import notFoundAnimation from "../animation/404.json";
import loadingAnimation from "../animation/loading.json";

//store
import { RootState } from '../store';
import { removeFromReadingList } from '../store/slices/bookSlice';

const Home: React.FC = () => {

  const { loading, error, readingList } = useSelector((state: RootState) => state.books);

  const dispatch = useDispatch();

  const handleRemoveBook = (title: string) => {
    dispatch(removeFromReadingList(title));
  };

  // error handle
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
  
      <Grid container spacing={2} justifyContent={'center'}>
      {/* loading animation */}
      {loading &&        
          <Grid item xs={12} sx={{ flexDirection:"column",height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Lottie animationData={loadingAnimation} loop={true} style={{ height: 200 }} />
          </Grid>      
      }

       {/* reading list */}
        {!loading && readingList.length > 0 && (
          readingList.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <BookCard 
                title={book.title}
                author={book.author}
                coverPhotoURL={book.coverPhotoURL}
                readingLevel={book.readingLevel}
                onRemove={() => handleRemoveBook(book.id)}
              />
            </Grid>
          ))
        ) }

        {/* 404 animation */}
        {!loading && readingList.length === 0 &&        
     
              <Grid item xs={12} sx={{ flexDirection:"column",height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Lottie animationData={notFoundAnimation} loop={true} style={{ height: 200 }} />
                <Typography variant="body1" align="center">
                  Search book to add to reading list...
                </Typography>
              </Grid>      
        }

      </Grid>
    </Container>
  );
};

export default Home;
