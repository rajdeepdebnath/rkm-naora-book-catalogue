import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Book } from "./types/book";
import Html from "react-pdf-html";
import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import { renderToStaticMarkup } from "react-dom/server";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import PdfView from "./PdfView";

interface Props {
  books: Book[];
}

const Print = ({ books }: Props) => {
  const [isPrintReady, setIsPrintReady] = useState(false);

  const handlePrint = () => {
    if (!isPrintReady) setIsPrintReady(true);
  };

  useEffect(() => setIsPrintReady(false), [books]);

  return (
    <Container className="my-1 pb-5 d-none d-md-block">
      <Row>
        <Col md={12} className="text-right my-3">
          <Button
            variant="outline-success"
            type="button"
            className="btn-sm"
            onClick={handlePrint}
          >
            Print
          </Button>
        </Col>
        <Col md={12} className="my-3 text-left">
          {isPrintReady && (
            <PDFViewer height={500} width={"100%"} showToolbar={true}>
              <Document>
                <Page size="A4" orientation="landscape">
                  <Html>{renderToStaticMarkup(<PdfView books={books} />)}</Html>
                </Page>
              </Document>
            </PDFViewer>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Print;
