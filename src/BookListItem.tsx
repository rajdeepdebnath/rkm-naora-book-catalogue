import React, { useState } from 'react'
import { Book } from './types/book'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import AddEditBook from './AddEditBook'
import Spinner from 'react-bootstrap/esm/Spinner'
import { deleteBook } from '../api'

interface Props{
    setNewBookAdded: React.Dispatch<React.SetStateAction<boolean>>;
    book:Book,
    idx:number,
    isLoggedIn:boolean
}

const BookListItem = ({isLoggedIn,setNewBookAdded,book, idx}:Props) => {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleteing] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');

    const handleEdit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        setEditing(true);
    }

    const handleDelete = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        if(confirm("Are you sure you want to delete?")){
            setDeleteing(true);
            let response = await deleteBook(book.id!);
            setDeleteing(false);
            if(response){
                setNewBookAdded(true);
            }
        }

    }

    const handleEditingComplete = () => {
        setEditing(false);
        setNewBookAdded(true);
    }

  return (
    <>
      {book && !editing && (
            <Row key={book.id}>
                <Col sm={1} className='border text-center'>
                    {idx + 1}
                </Col>
                <Col sm={5} className='text-break border'>
                    {book.Name}
                </Col>
                <Col sm={5} className='text-break border'>
                    {book.Author}
                </Col>
                {isLoggedIn && !deleting && <Col sm={1} className='border text-wrap'>
                    <a className='text-primary custom-fs-14 text-decoration-none' 
                    onClick={handleEdit} role="button">Edit</a>&nbsp;|&nbsp;
                    <a className='text-primary custom-fs-14 text-decoration-none' 
                    onClick={handleDelete} role="button">Delete</a>
                </Col>}
                {isLoggedIn && deleting && <Col sm={1} className='border'>
                    <Spinner variant='primary' animation="border" size="sm" />
                </Col>}
            </Row>
      )}
      {book && editing && <AddEditBook setNewBookAdded={handleEditingComplete} bookToUpdate={book} />}
    </>
  )
}

export default BookListItem
