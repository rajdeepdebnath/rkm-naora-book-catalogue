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
  // const tableColumns = (columnData:[]) => {
  //     return (
  //         <>
  //             {columnData.map(c => {
  //                 <>
  //                     <td width="1%">#</td>
  //                     <td width="40%">Book</td>
  //                     <td width="31%">Author</td>
  //                     <td width="10%">Language</td>
  //                     <td width="7%">Price</td>
  //                     <td width="3%">Quantity</td>
  //                     <td width="8%">Total</td>
  //                 </>
  //             })}
  //         </>
  //     )
  // }
  return (
    <table width={"100%"} style={{ fontSize: 12, margin: 5 }}>
      <tr style={{ width: "100%", paddingTop: 20 }}>
        <td style={{ width: "100%", textAlign: "center" }}>
          <img src="/nav.png" alt="RKM Naora" style={{ width: 200 }} />
        </td>
      </tr>
      <tr style={{ width: "100%" }}>
        <td style={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>
          Book bill
        </td>
      </tr>
      <tr style={{ width: "100%", textAlign: "right", padding: 10 }}>
        <td width="90%">&nbsp;</td>
        <td width="10%" style={{ fontWeight: "bold", fontSize: 10 }}>
          Date: {new Date().toDateString()}
        </td>
      </tr>
      <tr
        style={{
          width: "100%",
          border: "1px solid #939292",
          backgroundColor: "#d3d3d3",
          padding: "3px",
        }}
      >
        <td width="45%">Book</td>
        <td width="33%">Author</td>
        <td width="10%">Language</td>
        <td width="5%">Price</td>
        <td width="auto">Quantity</td>
        <td width="5%">Total</td>
      </tr>
      {books.map((book, idx) => (
        <tr
          key={idx}
          style={{
            width: "100%",
            padding: "3px",
          }}
        >
          <td width="45%">
            {idx + 1}.&nbsp;&nbsp;
            {book.Name}
          </td>
          <td width="33%">{book.Author}</td>
          <td width="10%">{book.Language}</td>
          <td width="5%">{book.Price}</td>
          <td width="auto">{book.Quantity}</td>
          <td width="5%">{book.TotalPrice}</td>
        </tr>
      ))}
      <hr />
      <tr style={{ width: "100%" }}>
        <td
          style={{
            width: "8%",
            fontWeight: "bold",
            textAlign: "right",
            paddingRight: 70,
          }}
        >
          <strong>
            Total:{books.reduce((a, b) => a + b.TotalPrice, 0).toFixed(2)}
          </strong>
        </td>
      </tr>
      <hr />
      <tr style={{ width: "100%" }}>
        <td
          style={{
            width: "8%",
            fontSize: "10px",
            textAlign: "right",
            paddingTop: 70,
            paddingRight: 70,
          }}
        >
          <em>Signature</em>
        </td>
      </tr>
      <hr />
    </table>
  );
}

export default PdfView;
