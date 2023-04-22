import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { addBook, updateBook } from '../api';
import { useState } from 'react';
import { Book } from './types/book';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Alert } from 'react-bootstrap';

interface Props {
    setNewBookAdded: React.Dispatch<React.SetStateAction<boolean>>;
    bookToUpdate?:Book | null
}

const AddEditBook = ({setNewBookAdded, bookToUpdate = null}: Props) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState(bookToUpdate ? bookToUpdate?.Name :'');
    const [author, setAuthor] = useState(bookToUpdate ? bookToUpdate?.Author :'');
    
    const handleAddEditBook = async (e:React.SyntheticEvent) => {
        e.preventDefault();

        if(name.trim().length > 0 && author.trim().length > 0) {
            setLoading(true);
            let actionIsSuccess:boolean|null = null;
            if(bookToUpdate === null){
                let book:Book = {Name:name, Author:author, created_date:new Date(Date.now())};
                actionIsSuccess = await addBook(book);
            }else{
                let book:Book = {id: bookToUpdate.id,Name:name, Author:author, created_date:new Date(Date.now())};
                actionIsSuccess = await updateBook(book);
            }
            setLoading(false);
            
            if(Boolean(actionIsSuccess)){
                setSuccess(true);
                setNewBookAdded(true);
                setName('');
                setAuthor('');
            }else{
                setError(true);
            }
    
            setTimeout(() => {
                setSuccess(false);
                setError(false);
            }, 2000);
        }else{
            alert("Please enter Name and Author.");
        }
    }

    const handleCancel = () => {
        setNewBookAdded(true);
    }

  return (
    <Container className='my-3 p-2 pb-4'>
      <Form onSubmit={handleAddEditBook}>
        <Row>
            <Col sm={5} xs={11}>
                <Form.Control placeholder="Book name" maxLength={30} minLength={1}
                value={name} onChange={e => setName(e.target.value)} />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Maximum 30 characters</em>
                </Form.Text>
            </Col>
            <Col sm={5} xs={11}>
                <Form.Control placeholder="Author"  maxLength={30}  minLength={1}
                value={author} onChange={e => setAuthor(e.target.value)} />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Maximum 30 characters</em>
                </Form.Text>
            </Col>
            <Col sm={2} xs={5}>
                <Button variant="primary" type="submit" className='btn-sm'>
                    {loading ? <Spinner animation="border" size="sm" /> : `${bookToUpdate !== null ? 'Edit' : 'Add'} Book`}
                </Button>&nbsp;
                {bookToUpdate && 
                <Button variant="outline-secondary" type="button" className='btn-sm' onClick={handleCancel}>
                    Cancel
                </Button>}
            </Col>
        </Row>
      </Form>
        {success && <Row className='mt-3'>
            <Col xs={3}>
                <Alert variant='success'>Book {`${bookToUpdate !== null ? 'updated' : 'added'}`}</Alert>
            </Col>
        </Row>}
        {error && <Row>
            <Col>
                <Alert variant='danger'>Error!</Alert>
            </Col>
        </Row>}
    </Container>
  )
}

export default AddEditBook
