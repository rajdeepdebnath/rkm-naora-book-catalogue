import React from 'react'
import { Book } from './types/book'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import BookListItem from './BookListItem'

interface Props{
  setNewBookAdded: React.Dispatch<React.SetStateAction<boolean>>;
    books:Book[]
}

const BookList = ({setNewBookAdded,books}:Props) => {
  return (
    <Container className='shadow border'>
      {books.map((book, idx) => <BookListItem setNewBookAdded={setNewBookAdded} book={book} idx={idx} />)}
    </Container>
  )
}

export default BookList
