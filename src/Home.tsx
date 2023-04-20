import { useEffect, useState } from 'react'
import { getAllBooks, logOut } from '../api'
import { Book } from './types/book';
import Button from 'react-bootstrap/Button';
import { useIsLoggedIn } from './useIsLoggedIn';

function Home({isLoggedIn}) {
  const [books, setBooks] = useState<Book[]>([])


  useEffect(() => {
    getAllBooks().then(setBooks);
    
  }, []);

  return (
    <div>
      <input type="text"></input><Button variant="primary">Primary</Button>
      {isLoggedIn && 'Add book'}
      {books.map(book =><div key={book.id}>{`${book.Name} - ${book.Author}`}</div>)}
    </div>
  )
}

export default Home
