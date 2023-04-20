import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api';

const Login = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 
        let u = await signIn({email, password});
        console.log(JSON.stringify(u, null, 2));
        // localStorage.setItem('token', u.stsTokenManager.accessToken);
        localStorage.setItem('isLoggedIn', Boolean(u).toString());
        setIsLoggedIn(Boolean(u))
        navigate('/');
    }

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'
     style={{height:'90vh'}}>
        <Row>
            <Col className='mb-2'>
                <h4 className='text-primary'>Book Catalogue - Log in</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={handleLogin} className='shadow p-3 border rounded'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" 
                        value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                        value={password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Login
