import React from 'react';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function Signup() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle showConfirmPassword state
  };

  return (
    <div className='content'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <br />
      <Row>
        <h4 className='box'>Sign Up</h4>
        <Col md={6}>
          <Form onSubmit={submitHandler} className='box'>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <div className='input-group'>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Example: minimum length, uppercase, lowercase, digit, and special character'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant='outline-secondary'
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`fa ${
                      showPassword ? 'fas fa-eye-slash' : 'fa-eye'
                    }`}
                  ></i>
                </Button>
              </div>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Confirm Password</Form.Label>
              <div className='input-group'>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Example: minimum length, uppercase, lowercase, digit, and special character'
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant='outline-secondary'
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i
                    className={`fa ${
                      showPassword ? 'fas fa-eye-slash' : 'fa-eye'
                    }`}
                  ></i>
                </Button>
              </div>
            </Form.Group>

            <div className='mb-3'>
              <Button type='submit'>Sign Up</Button>
            </div>

            <div className='mb-3'>
              Already have an account?{' '}
              <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </div>
          </Form>
        </Col>

        <Col md={6} className='mt-3'>
          <img src='/images/logo.png' alt='register' className='img-fluid' />
        </Col>
      </Row>
    </div>
  );
}
