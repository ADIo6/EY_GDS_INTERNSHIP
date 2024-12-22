import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import '../styles/about.css'; 

import about from '../assets/images/aboutTravel.jpg';

const About = () => {
  return (
    <section className="about-section">
      <Container>
        <Row>
          <Col lg="6" md="12" className="about-image">
            <img src={about} alt="About Us" />
          </Col>
          <Col lg="6" md="12" className="about-content">
            <h2>About Us</h2>
            <p>
              Welcome to TravelTide, your number one source for all things travel. We're dedicated to giving you the very best of travel experiences, with a focus on dependability, customer service, and uniqueness.
            </p>
            <p>
              Founded in 2018, TravelTide has come a long way from its beginnings. When we first started out, our passion for providing the best travel experiences drove us to do intense research, and gave us the impetus to turn hard work and inspiration into a booming online travel agency.
            </p>
            <Button className="btn primary__btn">Learn More</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;