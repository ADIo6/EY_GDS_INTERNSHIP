import React, { useState, useContext } from 'react';
import '../styles/login.css';
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import loginImg from '../assets/images/login.webp';
import userIcon from '../assets/images/user2.png';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [ error, setError ] = useState('');

  const { setIsLoggedIn } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(credentials);
      console.log('Login successful:', data);
      setIsLoggedIn(true);
      navigate('/home');
      setError('');
      // Handle successful login (e.g., redirect, store token, etc.)
    } catch (error) {
      setError('Something went wrong!! Please try again later');
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="login" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
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
                      name="password"
                      placeholder="Password"
                      required
                      onChange={handleChange}
                    />
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={togglePassword}
                      
                    ></i>
                  </FormGroup>

                  {/* {error && <Error>{error}</Error>} */}

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
