import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import BookListItem from "./BookListItem";
import { Book } from "./types/book";

interface Props {
  books: Book[];
}

function PdfView({ books }: Props) {
  return (
    <table width={"100%"} style={{ fontSize: 12 }}>
      <tr
        style={{
          border: "1px solid #939292",
          backgroundColor: "#d3d3d3",
          padding: "3px 0",
        }}
      >
        <td width="1%">#</td>
        <td width="40%">Book</td>
        <td width="31%">Author</td>
        <td width="10%">Language</td>
        <td width="7%">Price</td>
        <td width="3%">Quantity</td>
        <td width="8%">Total</td>
      </tr>
      {books.map((book, idx) => (
        <tr key={idx} style={{ padding: "3px 0" }}>
          <td width="1%">{idx + 1}</td>
          <td width="40%">{book.Name}</td>
          <td width="31%">{book.Author}</td>
          <td width="10%">{book.Language}</td>
          <td width="7%">{book.Price}</td>
          <td width="3%">{book.Quantity}</td>
          <td width="8%">{book.TotalPrice}</td>
        </tr>
      ))}
      <hr />
      <tr>
        <td width="90%">&nbsp;</td>
        <td width="10%" style={{ fontWeight: "bold" }}>
          Total:{books.reduce((a, b) => a + b.TotalPrice, 0).toFixed(2)}
        </td>
      </tr>
    </table>
  );
}

export default PdfView;
