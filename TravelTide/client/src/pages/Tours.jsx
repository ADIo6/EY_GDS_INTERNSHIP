import React, { useEffect, useState } from 'react';
import CommonSection from '../shared/CommonSection';
import "../styles/tour.css";

import { Col, Container, Row } from 'reactstrap';
import SearchBar from '../shared/SearchBar';
import TourCard from '../shared/TourCard';
import Newsletter from '../shared/Newsletter';


import { fetchTours } from '../services/api';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tours, setTours] = useState([]);

 

  useEffect(() => {
    const pages = Math.ceil(5 / 4); // later we will use backend data count
    setPageCount(pages);
  }, [page]);

  useEffect(() => {
    const getTours = async () => {
      try {
        const data = await fetchTours();
        setTours(data.data);
      } catch (error) {
        console.error('Failed to fetch tours:', error);
      }
    };

    getTours();
  }, []);

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <SearchBar setTours={setTours} />
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {tours.length > 0 ? (
              tours.map((tour) => (
                <Col lg='3' className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            ) : (
              <Col lg='12'>
                <p>No tours found.</p>
              </Col>
            )}

            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map(number => (
                  <span key={number} onClick={() => setPage(number)}
                    className={page === number ? 'active__page' : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
