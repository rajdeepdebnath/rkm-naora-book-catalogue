import { useState } from "react"
import { Container } from "react-bootstrap"
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import { getAllBooks, searchBooks } from "../api";
import { Book } from "./types/book";

interface Props{
    handleSearchedBooks:(searchedBooks: Book[]) => void
}

const Search = ({handleSearchedBooks}:Props) => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [clearLoading, setClearLoading] = useState(false)

    const handleSearch = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        if(searchText.trim().length > 2){
            setLoading(true);
            let books = await searchBooks(searchText);
            handleSearchedBooks(books);
            setLoading(false);
        }else{
            alert("Please enter at least 3 characters");
        }
    }

    const handleClear = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        setClearLoading(true);
        setSearchText('');
        let books = await getAllBooks();
        handleSearchedBooks(books);
        setClearLoading(false);
    }
    
  return (
    <Container className='my-3 p-2 shadow border'>
       <Form onSubmit={handleSearch}>
        <Row>
            <Col sm={10} xs={12}>
                <Form.Control placeholder="Book or Author (at least 3 characters)" maxLength={30} minLength={3}
                value={searchText} onChange={e => setSearchText(e.target.value)} />
            </Col>
            <Col sm={2} xs={5}>
                <Button variant="primary" type="submit" className='btn-sm'>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                </Button>&nbsp;
                <Button variant="outline-secondary" type="button" className='btn-sm' onClick={handleClear}>
                    {clearLoading ? <Spinner animation="border" size="sm" /> : 'Clear'}
                </Button>
            </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default Search
