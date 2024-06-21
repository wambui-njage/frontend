import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  Avatar,
  Box,
  Container,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
  Divider,
  Typography,
  ListItemAvatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

// icons
import SearchIcon from '@mui/icons-material/Search';
import IconUserCircle from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

// store
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToReadingList, removeFromReadingList } from '../../store/slices/bookSlice';

// interface
import { Book } from '../../types';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
}));

const Header: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const books = useSelector((state: RootState) => state.books.books);
  const readingList = useSelector((state: RootState) => state.books.readingList);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const searchResults = books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isBookInReadingList = (book: Book) => {
    return readingList.some((item) => item.id === book.id);
  };

  const handleToggleReadingList = (book: Book) => {
    if (isBookInReadingList(book)) {
      dispatch(removeFromReadingList(book.id));
    } else {
      dispatch(addToReadingList(book));
    }
  };

  const highlightSearchTerm = (text: string, term: string) => {
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: theme.palette.primary.main }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: theme.palette.common.white }}>
      <Container>
        <Toolbar>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" width="70" />

          {/* Search bar at the center */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon color="primary" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search book by title…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom" style={{ zIndex: 1, width: '30%' }}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper sx={{ maxHeight: 400, overflowY: 'auto', width: '100%' }}>
                  <List>
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <React.Fragment key={result.id}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar alt={result.title} src={result.coverPhotoURL} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={highlightSearchTerm(result.title, searchTerm)}
                              secondary={result.author}
                            />
                            {isBookInReadingList(result) ? (
                              <Tooltip title="Remove from reading list">
                                <IconButton
                                  aria-label="delete"
                                  color="error"
                                  onClick={() => handleToggleReadingList(result)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Add to reading list">
                                <IconButton
                                  aria-label="add"
                                  color="primary"
                                  onClick={() => handleToggleReadingList(result)}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </ListItem>
                          {index < searchResults.length - 1 && <Divider />}
                        </React.Fragment>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="textSecondary">
                              No results found :(
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </Box>

          {/* Profile avatar on the right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ cursor: 'pointer', backgroundColor: theme.palette.warning.main }}>
              <IconUserCircle />
            </Avatar>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
