import React, { useState } from 'react'
import {Button, Form} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/slices/auth';
import "./SignUp.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



function SignUp() {
  const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [phone,setPhone] = useState("");

const dispatch = useDispatch();
const history = useHistory();

const formSubmitHandler = (e)=>{
  e.preventDefault();
  const userData = {name,email,password,phone};
  dispatch(signUp(userData));

}

    return (
      <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='sign-up-div'>
          <h2>Sign Up</h2>
          <Form onSubmit={formSubmitHandler} className='sign-up-form'>
            <Form.Group controlId='name'>
              <Form.Label>Name:</Form.Label>
              <Form.Control type='text' placeholder='Enter your Name...' 
              value={name}
              onChange={(e)=>{setName(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control type='email' placeholder='abc@example.com' 
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password:</Form.Label>
              <Form.Control type='password' placeholder='1234567'
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId='phone'>
              <Form.Label>Phone:</Form.Label>
              <Form.Control type='number' placeholder='Enter your Phone Number...' 
              value={phone}
              onChange={(e)=>{setPhone(e.target.value)}}/>
            </Form.Group>
            <Button type='submit'>SignUp</Button>
            </Form>  
            <Button variant='link' 
            onClick={()=>{
              history.push("/login");
            }}>Alreadu a User? Login</Button>
            
        </div>
        </div>
    )
}

export default SignUp
