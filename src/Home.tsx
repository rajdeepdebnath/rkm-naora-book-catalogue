import { useEffect, useState } from 'react'
import { getAllBooks, logOut } from '../api'
import { Book } from './types/book';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Home({setIsLoggedIn}) {
  const [books, setBooks] = useState<Book[]>([])
  const navigate = useNavigate();

console.log(books);


  useEffect(() => {
    getAllBooks().then(setBooks);
    
  }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        await logOut();
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/');
    }

  return (
    <div>
      <input type="text"></input><Button variant="primary">Primary</Button>
      <Button variant="primary" onClick={handleLogout}>Logout</Button>
      {books.map(book =><div key={book.id}>{`${book.Name} - ${book.Author}`}</div>)}
    </div>
  )
}

export default Home
