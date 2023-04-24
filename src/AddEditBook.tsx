import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { addBook, updateBook } from '../api';
import { useState } from 'react';
import { Book, LanguageEnum } from './types/book';
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
    const [language, setLanguage] = useState(bookToUpdate ? bookToUpdate?.Language :'');
    const [price, setPrice] = useState(bookToUpdate ? bookToUpdate?.Price :0);
    const [quantity, setQuantity] = useState(bookToUpdate ? bookToUpdate?.Quantity :0);
    
    const handleAddEditBook = async (e:React.SyntheticEvent) => {
        e.preventDefault();

        if(name.trim().length > 0 && author.trim().length > 0) {
            setLoading(true);

            console.log(isNaN(price));
            
            if(isNaN(price)){
                alert("Please enter valid price like 100.00 or 100.50");
                setLoading(false);
                return;
            }
            
            let actionIsSuccess:boolean|null = null;
            if(bookToUpdate === null){
                let book:Book = {Name:name, Author:author, 
                    Language:language as LanguageEnum, 
                    Price:price, 
                    Quantity:quantity, 
                    TotalPrice:price*quantity, 
                    created_date:new Date(Date.now())};
                actionIsSuccess = await addBook(book);
            }else{
                let book:Book = {id: bookToUpdate.id,Name:name, Author:author, 
                    Language:language as LanguageEnum, 
                    Price:price, 
                    Quantity:quantity, 
                    TotalPrice:price*quantity, 
                    created_date:new Date(Date.now())};
                actionIsSuccess = await updateBook(book);
            }
            setLoading(false);
            
            if(actionIsSuccess){
                setSuccess(true);
                setNewBookAdded(true);
                setName('');
                setAuthor('');
                setLanguage('');
                setPrice(0);
                setQuantity(0);
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
    <Container fluid className='my-3 pb-4 d-none d-md-block mx-0'>
      <Form onSubmit={handleAddEditBook}>
        <Row>
            <Col md={3}>
                <Form.Control placeholder="Book name" maxLength={30} minLength={1}
                value={name} onChange={e => setName(e.target.value)} />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Maximum 30 characters</em>
                </Form.Text>
            </Col>
            <Col md={3}>
                <Form.Control placeholder="Author"  maxLength={30}  minLength={1}
                value={author} onChange={e => setAuthor(e.target.value)} />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Maximum 30 characters</em>
                </Form.Text>
            </Col>
            <Col md={1}>
                <Form.Control as="select" value={language} aria-label="language"
                        onChange={e => setLanguage(e.target.value)}>
                    <option value="Bengali">Bengali</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                </Form.Control>
                <Form.Text className="text-muted custom-fs-12">
                    <em>Language</em>
                </Form.Text>
            </Col>
            <Col md={1}>
                <Form.Control type="text" placeholder="100.00" maxLength={7}  minLength={1}
                value={price} onChange={e => setPrice(Number(e.target.value))} />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Price</em>
                </Form.Text>
            </Col>
            <Col md={1}>
                <Form.Control type="number" placeholder="Quantity" min={0} max={1000}
                value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Quantity</em>
                </Form.Text>
            </Col>
            <Col md={1}>
                <Form.Control type="number" placeholder="Total" value={price*quantity} readOnly />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Total</em>
                </Form.Text>
            </Col>
            <Col md={2}>
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
