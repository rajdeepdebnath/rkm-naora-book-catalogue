import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Spinner from 'react-bootstrap/esm/Spinner'
import * as XLSX from 'xlsx';
import { Book } from './types/book'

interface Props{
    books:Book[]
}

const ExportExcel = ({books}:Props) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = (e:React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        

        const worksheet = XLSX.utils
        .json_to_sheet(books.map((b, idx) => ({ SlNo:idx+1, 
          Name:b.Name, Author:b.Author, 
          Language: b.Language,
          Price: b.Price,
          Quantity: b.Quantity,
          TotalPrice: b.TotalPrice,
          created_date:b.created_date })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Book-Catalog");
        XLSX.writeFile(workbook, "Book-Catalog.xlsx");

        setLoading(false);

    }
    
  return (
    <Container className='my-1 pb-5 d-none d-md-block'>
      <Row>
        <Col sm={12} className='text-center my-3'>
            <Button variant="outline-success" type="button" className='btn-sm' 
                onClick={handleDownload}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Download'}
            </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ExportExcel
