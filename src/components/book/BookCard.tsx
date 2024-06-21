import React from 'react';
import { useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {  CardActions, Chip, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { BookCardProps } from '../../types';


const BookCard: React.FC<BookCardProps> = ({ title, author, coverPhotoURL, readingLevel, onRemove }) => {
  const theme = useTheme();
  const authorInitial = author.charAt(0);

  return (
    <Card sx={{ maxWidth: 345, margin: 2, minHeight: 480 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.dark }} aria-label="author">
            {authorInitial}
          </Avatar>
        }
        title={title}
        subheader={author}
      />

      <CardMedia
        component="img"
        height="200"
        image={coverPhotoURL}
        alt={title}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima libero esse necessitatibus eius itaque nemo facilis corrupti consectetur quis mollitia...
        </Typography>
      </CardContent>

      <CardActions sx={{justifyContent:"space-between"}}>
        <Chip label={`Reading Level : ${readingLevel}` } color='warning' />
        <Tooltip title="Remove from reading list" >
        <IconButton aria-label="delete" color="error" onClick={() => onRemove()}>
          <DeleteIcon />
        </IconButton>
        </Tooltip>
      </CardActions>
      
    </Card>
  );
};

export default BookCard;
