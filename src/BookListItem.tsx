import React, { useState } from "react";
import { Book } from "./types/book";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import AddEditBook from "./AddEditBook";
import Spinner from "react-bootstrap/esm/Spinner";
import { deleteBook } from "../api";

interface Props {
  setNewBookAdded?: React.Dispatch<React.SetStateAction<boolean>> | null;
  book: Book;
  idx: number;
  isLoggedIn: boolean;
}

const BookListItem = ({ isLoggedIn, setNewBookAdded, book, idx }: Props) => {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleteing] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const handleEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setEditing(true);
  };

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete?")) {
      setDeleteing(true);
      let response = await deleteBook(book.id!);
      setDeleteing(false);
      if (response && setNewBookAdded) {
        setNewBookAdded(true);
      }
    }
  };

  const handleEditingComplete = () => {
    setEditing(false);
    setNewBookAdded && setNewBookAdded(true);
  };

  return (
    <>
      {book && !editing && (
        <Row key={book.id} className="custom-fs-10 custom-p-0">
          <Col md={1} xs={1} className="border text-center">
            {idx + 1}
          </Col>
          <Col md={3} xs={3} className="custom-p-0 border">
            {book.Name}
          </Col>
          <Col md={3} xs={3} className="custom-p-0 border">
            {book.Author}
          </Col>
          <Col md={1} xs={2} className="custom-p-0 border">
            {book.Language}
          </Col>
          <Col md={1} xs={1} className="custom-p-0 border">
            {book.Price}
          </Col>
          <Col md={1} xs={1} className="custom-p-0 border">
            {book.Quantity}
          </Col>
          <Col md={1} xs={1} className="custom-p-0 border">
            {book.TotalPrice}
          </Col>
          {isLoggedIn && !deleting && (
            <Col xl={1} md={1} className="border text-wrap d-none d-md-block">
              <a
                className="text-primary custom-fs-12 text-decoration-none"
                onClick={handleEdit}
                role="button"
              >
                Edit
              </a>
              &nbsp;|&nbsp;
              <a
                className="text-primary custom-fs-12 text-decoration-none"
                onClick={handleDelete}
                role="button"
              >
                Delete
              </a>
            </Col>
          )}
          {isLoggedIn && deleting && (
            <Col sm={1} className="border">
              <Spinner variant="primary" animation="border" size="sm" />
            </Col>
          )}
        </Row>
      )}
      {book && editing && (
        <AddEditBook
          setNewBookAdded={handleEditingComplete}
          bookToUpdate={book}
        />
      )}
    </>
  );
};

export default BookListItem;
