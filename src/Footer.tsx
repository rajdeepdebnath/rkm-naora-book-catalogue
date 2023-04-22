import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

const Footer = () => {
  return (
    <Container fluid className='bg-dark py-2 position-fixed bottom-0'>
      <Row>
        <Col xs={12} className='text-center custom-fs-12 text-light'>
            Copyright reserved 2023 @ RKM Naora
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
