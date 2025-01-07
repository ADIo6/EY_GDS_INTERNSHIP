import React, { useRef, useState, useEffect, useContext } from 'react';
import '../styles/tour-details.css';

import { useParams } from 'react-router-dom';
import { Col, Container, Form, ListGroup, Row } from 'reactstrap';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import { fetchTourById, submitReview } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  
  const { userDetails } = useContext(AuthContext);


  useEffect(() => {
    const getTour = async () => {
      try {
        console.log('Fetching tour with ID:', id);
        const data = await fetchTourById(id);
        console.log('Fetched tour data:', data);
        setTour(data.data);
        setReviews(data.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tour:', error);
        setLoading(false);
      }
    };

    getTour();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!tour) {
    return <p>Tour not found.</p>;
  }

  const { photo, title, desc, price, address, city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const reviewText = reviewMsgRef.current.value;

  //   const reviewData = {
  //     username: userDetails || 'Anonymous', // Use actual username if available
  //     reviewText,
  //     rating: tourRating,
  //     date: new Date(),
  //   };

  //   try {
  //     const data = await submitReview(id, reviewData);
  //     setReviews([...reviews, data.data]);
  //     reviewMsgRef.current.value = '';
  //     setTourRating(null);
  //   } catch (error) {
  //     console.error('Failed to submit review:', error);
  //   }
  // };



  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    const userID = localStorage.getItem('userID'); // Ensure the userID is retrieved from localStorage
  
    if (!userID) {
      console.error('User not logged in!');
      return;
    }
  
    console.log("User name isaf: ",userDetails);
    const reviewData = {
      username: userDetails || 'Anonymous', // Use actual username if available
      reviewText,
      rating: tourRating,
      date: new Date(),
    };
  
    try {
      const data = await submitReview(id, reviewData);
      setReviews([...reviews, data.data]);
      reviewMsgRef.current.value = '';
      setTourRating(null);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };



  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <div className="tour__content">
                <img src={photo} alt="" />
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className='tour__rating d-flex align-items-center gap-1'>
                      <i className="ri-star-fill" style={{ 'color': "var(--secondary-color)" }}></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? ('Not rated') : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i>
                      {address}
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span><i className="ri-map-pin-2-line"></i>{city}</span>
                    <span><i className="ri-money-dollar-circle-line"></i>${price}/per person</span>
                    <span><i className="ri-map-pin-time-line"></i>{distance} k/m</span>
                    <span><i className="ri-group-line"></i>{maxGroupSize} people </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1<i className="ri-star-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2<i className="ri-star-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3<i className="ri-star-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4<i className="ri-star-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5<i className="ri-star-fill"></i>
                      </span>
                    </div>
                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
                      <button className="btn primary__btn text-white" type='submit'>
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {
                    reviews?.map(review => (
                      <div className="review__item" key={review.id || review._id}>
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>{new Date(review.date).toLocaleDateString("en-US", options)}</p>
                            </div>
                            <span className='d-flex align-items-center '>
                              {review.rating}<i className="ri-star-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
