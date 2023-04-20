import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

const TopNavbar = () => {
  return (
    <Navbar className="bg-light">
        <Container>
          <Row>
            <Col lg={6} md={6} sm={6} xs={10}>
              <img src="/nav.png" alt="RKM Naora" className='w-100' />
            </Col>
          </Row>
        </Container>
    </Navbar>
  )
}

export default TopNavbar
