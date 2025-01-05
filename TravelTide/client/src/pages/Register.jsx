import React, { useState } from 'react';
import '../styles/login.css';
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import registerImg from '../assets/images/register.webp';
import userIcon from '../assets/images/user2.png';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate(); 

  const [error, setError] = useState('');

   const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(credentials);
      console.log('Registration successful:', data);
      navigate('/login');
      setError('Successful Login', data);
      // Handle successful registration (e.g., redirect, show message, etc.)
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError('Something went wrong! Please try again later.');
        // console.error('Login failed:', error);
        // Handle login error
      }
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="register" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="password-field">
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      required
                      onChange={handleChange}
                    />
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={togglePassword}
                      ></i>
                  </FormGroup>

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Create Account
                  </Button>
                </Form>
                {error && <div className="error">{error}</div>}
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
