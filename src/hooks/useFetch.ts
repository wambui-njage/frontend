import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBooks, setLoading, setError } from "../store/slices/bookSlice";
import { v4 as uuidv4 } from "uuid";

const useFetch = <T>(url: string, query: string) => {
  const [data, setData] = useState<T | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
          dispatch(setError(result.errors[0].message));
        } else {
          //Give data ids so that we have a unique identifier
          const booksDataWithId = result.data.books.map((book: any) => ({
            ...book,
            id: uuidv4(),
          }));

          setData(result.data);
          dispatch(setBooks(booksDataWithId)); // Dispatch the books data to the Redux store
        }
      } catch (error: any) {
        dispatch(setError(error.message));
      }

      //create delay for loading animation
      setTimeout(() => dispatch(setLoading(false)), 2000);
    };

    fetchData();
  }, [url, query, dispatch]);

  return { data };
};

export default useFetch;
