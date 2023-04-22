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
    handleSearchedBooks:(searchText: string, searchedBooks: Book[]) => void
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
            handleSearchedBooks(searchText, books);
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
        handleSearchedBooks('', books);
        setClearLoading(false);
    }
    
  return (
    <Container fluid className='my-3 p-2 pb-4 bg-light'>
       <Form onSubmit={handleSearch}>
        <Row>
            <Col lg={10} md={8} sm={8} xs={12}>
                <Form.Control placeholder="Book or Author (at least 3 characters)" 
                maxLength={10} minLength={3}
                value={searchText} onChange={e => setSearchText(e.target.value)} />
                <Form.Text className="text-muted custom-fs-12">
                    <em>Maximum 10 characters</em>
                </Form.Text>
            </Col>
            <Col lg={2} md={4} sm={4} xs={12}>
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
