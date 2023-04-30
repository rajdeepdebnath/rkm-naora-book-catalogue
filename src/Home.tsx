import { useEffect, useState } from "react";
import { getAllBooks, searchBooks } from "../api";
import { Book } from "./types/book";
import AddEditBook from "./AddEditBook";
import BookList from "./BookList";
import Container from "react-bootstrap/esm/Container";
import Search from "./Search";
import PrintExport from "./PrintExport";

function Home({ isLoggedIn }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [fetchedBookCount, setFetchedBookCount] = useState<number>(0);
  const [newBookAdded, setNewBookAdded] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchedBooks = (searchText: string, searchedBooks: Book[]) => {
    setSearchText(searchText);
    setBooks(searchedBooks);
  };

  const handleLoadMore = async () => {
    let moreBooks: Book[] = [];
    if (searchText.length > 0) {
      moreBooks = await searchBooks(searchText, books[books.length - 1].Name);
    } else {
      moreBooks = await getAllBooks(books[books.length - 1].Name);
    }
    setFetchedBookCount(moreBooks.length);
    setBooks((existingBooks) => [...existingBooks, ...moreBooks]);
  };

  useEffect(() => {
    getAllBooks().then((data) => {
      setFetchedBookCount(data.length);
      setBooks(data);
    });
  }, []);

  useEffect(() => {
    if (newBookAdded) {
      getAllBooks().then(setBooks);
      setNewBookAdded(false);
    }
  }, [newBookAdded]);

  return (
    <Container fluid>
      <Search handleSearchedBooks={handleSearchedBooks} />
      {isLoggedIn && <AddEditBook setNewBookAdded={setNewBookAdded} />}
      {books && (
        <BookList
          fetchedBookCount={fetchedBookCount}
          handleLoadMore={handleLoadMore}
          isLoggedIn={isLoggedIn}
          setNewBookAdded={setNewBookAdded}
          books={books}
        />
      )}
      <PrintExport isLoggedIn={isLoggedIn} books={books} />
    </Container>
  );
}

export default Home;
