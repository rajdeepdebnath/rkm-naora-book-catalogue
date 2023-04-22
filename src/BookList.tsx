import React, { useState } from 'react'
import { Book } from './types/book'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import BookListItem from './BookListItem'
import Button from 'react-bootstrap/esm/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import { DEFAULT_PAGE_LIMIT } from './constants'

interface Props{
  setNewBookAdded: React.Dispatch<React.SetStateAction<boolean>>;
  handleLoadMore:() => void;
  fetchedBookCount:number;
    books:Book[],
    isLoggedIn:boolean
}

const BookList = ({isLoggedIn, fetchedBookCount, handleLoadMore,setNewBookAdded,books}:Props) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMoreEvent = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    setLoadingMore(true);
    await handleLoadMore();
    setLoadingMore(false);
  }

  return (
    <Container fluid className='py-2'>
    <Row>
        <Col xs={1} className='border fw-bold bg-light text-center'>
            No.
        </Col>
        <Col md={5} xs={6} className='border fw-bold bg-light text-center'>
            Book Name
        </Col>
        <Col xl={5} md={4} xs={5} className='border fw-bold bg-light text-center'>
            Author
        </Col>
        {isLoggedIn && <Col xl={1} md={2}
        className='border fw-bold bg-light text-center d-none d-md-block'>
            Action
        </Col>}
    </Row>
      {books.map((book, idx) => <BookListItem key={idx} isLoggedIn={isLoggedIn} setNewBookAdded={setNewBookAdded} book={book} idx={idx} />)}
      <Row>
        <Col sm={12} className='text-center my-3'>
          <Button variant="primary" type="button" className='btn-sm' onClick={handleLoadMoreEvent}
           disabled={fetchedBookCount < DEFAULT_PAGE_LIMIT}>
              {loadingMore ? <Spinner animation="border" size="sm" /> : 'Load more'}
          </Button>
        </Col>
      </Row>
      <hr className="hr hr-blurry" />
    </Container>
  )
}

export default BookList
