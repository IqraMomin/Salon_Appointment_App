import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import "./Login.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { login } from '../../redux/slices/auth';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const userData = { email, password};
    dispatch(login(userData));

  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className='login-div'>
      <h2>Login</h2>
      <Form onSubmit={formSubmitHandler} className='sign-up-form'>

        <Form.Group controlId='email'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type='email' placeholder='abc@example.com'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
        </Form.Group>

        <Button type='submit'>Login</Button>

      </Form>
      <Button variant='link'
      onClick={()=>{
        history.push("/signup")
      }}>New User? Register Now</Button>
      </div>
    </div>
  )
}

export default Login
