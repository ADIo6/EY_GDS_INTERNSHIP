import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchTour } from '../services/api';
import '../styles/search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'

const SearchBar = ({ setTours }) => {
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState('');
  const [maxGroupSize, setMaxGroupSize] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchParams = { city, distance, maxGroupSize };
      const data = await searchTour(searchParams);
      setTours(data.data);
      navigate('/tours');
    } catch (error) {
      console.error('Failed to search tours:', error);
    }
  };

  return (
    <Col lg='12'>
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4" onSubmit={handleSearch}>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Location</h6>
              <input
                className='inputs'
                type="text"
                placeholder='Where are you going?'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i className="ri-map-pin-time-line"></i></span>
            <div>
              <h6>Distance</h6>
              <input
                className='inputs'
                type="number"
                placeholder='Distance k/m'
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span><i className="ri-group-line"></i></span>
            <div>
              <h6>Max People</h6>
              <input
                className='inputs'
                type="number"
                placeholder='0'
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(e.target.value)}
              />
            </div>
          </FormGroup>
          <button className="search__icon" type="submit">
            <i className="ri-search-line"></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
