import React, { useState, useContext } from 'react';
import './booking.css';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { createBooking } from '../../services/api'; // Import the createBooking function

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
//   const { userDetails,setUserDetails } = useContext(AuthContext);
    const userID = localStorage.getItem('userID');
    const userName = localStorage.getItem('userName');
    
  const [credentials, setCredentials] = useState({
    userID: userID || '', // Use dynamic user ID
    userName: userName|| '',
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: ''
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalCost = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  const handleClick = async e => {
    e.preventDefault();
    try {
      const bookingData = {
        ...credentials,
        tourName: title,
      };
      await createBooking(bookingData); // Call the API to create a booking
      navigate('/thank-you');
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price}<span>/per person</span></h3>
        <span className='tour__rating d-flex align-items-center '>
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder='Phone' id='phone' required onChange={handleChange} />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
            <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className='d-flex align-items-center gap-1'>
              ${price}<i className="ri-close-line"></i> 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalCost}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;
