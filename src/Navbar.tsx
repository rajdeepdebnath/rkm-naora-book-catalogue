import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {useIsLoggedIn} from './useIsLoggedIn';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../api';

const TopNavbar = ({isLoggedIn, setIsLoggedIn}) => {
  let location = useLocation();
  const navigate = useNavigate();
  console.log(isLoggedIn);
  

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    setIsLoggedIn(false);
    navigate('/');
}


  return (
    <Navbar className="bg-light">
        <Container>
          <Row>
            <Col lg={6} md={6} sm={6} xs={8}>
              <img src="/nav.png" alt="RKM Naora" className='w-100' />
            </Col>
            <Col lg={6} md={6} sm={6} xs={4} className='text-end'>
              {location.pathname !== "/login" && !isLoggedIn
              && <Link to='/login' className='btn btn-primary btn-sm'>Log in</Link>}
              {isLoggedIn
              && 
              <Button variant="primary" onClick={handleLogout} className='btn-sm'>Log out</Button>}
              {location.pathname === "/login" 
              && <Link to='/' className='btn btn-secondary btn-sm'>Home</Link>}
            </Col>
          </Row>
        </Container>
    </Navbar>
  )
}

export default TopNavbar
