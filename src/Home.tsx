import { useEffect, useState } from 'react'
import { getAllBooks, logOut } from '../api'
import { Book } from './types/book';
import Button from 'react-bootstrap/Button';
import { useIsLoggedIn } from './useIsLoggedIn';
import AddEditBook from './AddEditBook';
import BookList from './BookList';
import Container from 'react-bootstrap/esm/Container';
import Search from './Search';

function Home({isLoggedIn}) {
  const [books, setBooks] = useState<Book[]>([])
  const [newBookAdded, setNewBookAdded] = useState<boolean>(false);

  const handleSearchedBooks = (searchedBooks:Book[]) => {
    setBooks(searchedBooks);
  }


  useEffect(() => {
    getAllBooks().then(setBooks);
    
  }, []);

  useEffect(() => {
    if(newBookAdded){
      getAllBooks().then(setBooks);
      setNewBookAdded(false);
    }
  }, [newBookAdded]);


  return (
    <Container>
      <Search handleSearchedBooks={handleSearchedBooks}/>
      {isLoggedIn && <AddEditBook setNewBookAdded={setNewBookAdded} />}
      {books && <BookList isLoggedIn={isLoggedIn} setNewBookAdded={setNewBookAdded} books={books} />}
    </Container>
  )
}

export default Home
