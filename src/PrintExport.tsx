import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import * as XLSX from "xlsx";
import { Book } from "./types/book";
import Print from "./Print";

interface Props {
  books: Book[];
  isLoggedIn: boolean;
}

const PrintExport = ({ isLoggedIn, books }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const worksheet = XLSX.utils.json_to_sheet(
      books.map((b, idx) => ({
        SlNo: idx + 1,
        Name: b.Name,
        Author: b.Author,
        Language: b.Language,
        Price: b.Price,
        Quantity: b.Quantity,
        TotalPrice: b.TotalPrice,
        created_date: b.created_date,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Book-Catalog");
    XLSX.writeFile(workbook, "Book-Catalog.xlsx");

    setLoading(false);
  };

  return (
    <Container className="my-1 pb-5 d-none d-md-block">
      <Row>
        <Col md={12} className="mt-3 text-center">
          <Button
            variant="outline-success"
            type="button"
            className="btn-sm"
            onClick={handleDownload}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Download"}
          </Button>
        </Col>
        <Col md={12} className="text-center mb-3">
          {isLoggedIn && <Print books={books} />}
        </Col>
      </Row>
    </Container>
  );
};

export default PrintExport;
