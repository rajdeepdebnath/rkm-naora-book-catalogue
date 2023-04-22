import { useEffect, useState } from 'react'
import { getAllBooks, logOut } from '../api'
import { Book } from './types/book';
import Button from 'react-bootstrap/Button';
import { useIsLoggedIn } from './useIsLoggedIn';
import AddEditBook from './AddEditBook';
import BookList from './BookList';

function Home({isLoggedIn}) {
  const [books, setBooks] = useState<Book[]>([])
  const [newBookAdded, setNewBookAdded] = useState<boolean>(false);


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
    <div>
      {isLoggedIn && <AddEditBook setNewBookAdded={setNewBookAdded} />}
      {books && <BookList setNewBookAdded={setNewBookAdded} books={books} />}
    </div>
  )
}

export default Home
