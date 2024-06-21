import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types";

interface BooksState {
  books: Book[];
  readingList: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  readingList: [],
  loading: true,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    addToReadingList(state, action: PayloadAction<Book>) {
      state.readingList.push(action.payload);
    },
    removeFromReadingList: (state, action: PayloadAction<string>) => {
      state.readingList = state.readingList.filter(
        (book) => book.id !== action.payload
      );
    },
  },
});

export const {
  setBooks,
  setLoading,
  setError,
  addToReadingList,
  removeFromReadingList,
} = booksSlice.actions;

export default booksSlice.reducer;
