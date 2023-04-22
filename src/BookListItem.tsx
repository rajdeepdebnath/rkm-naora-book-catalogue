import React, { useState } from 'react'
import { Book } from './types/book'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import AddEditBook from './AddEditBook'

interface Props{
    setNewBookAdded: React.Dispatch<React.SetStateAction<boolean>>;
    book:Book,
    idx:number
}

const BookListItem = ({setNewBookAdded,book, idx}:Props) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');

    const handleEdit = () => {
        setEditing(true);
    }

    const handleEditingComplete = () => {
        setEditing(false);
        setNewBookAdded(true);
    }

  return (
    <>
      {book && !editing && (
            <Row key={book.id}>
                <Col sm={1} className='border'>
                    {idx + 1}
                </Col>
                <Col sm={5} className='text-break border'>
                    {book.Name}
                </Col>
                <Col sm={5} className='text-break border'>
                    {book.Author}
                </Col>
                <Col sm={1} className='border'>
                    <a className='text-primary' onClick={handleEdit}>Edit</a>
                </Col>
            </Row>
      )}
      {book && editing && <AddEditBook setNewBookAdded={handleEditingComplete} bookToUpdate={book} />}
    </>
  )
}

export default BookListItem
