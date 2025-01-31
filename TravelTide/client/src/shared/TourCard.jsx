import React from 'react'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '../styles/tour-card.css'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'

const TourCard = ({tour}) => {
    const {_id,title,city,photo,price, featured, reviews}=tour;
const {totalRating,avgRating} = calculateAvgRating(reviews)


  useEffect(() => {
    AOS.init ({
      duration: 800,
      easing:'ease-in-out',
      offset: 200
    });
  },[]);

  return (
    <div className='tour__card ' data-aos="zoom-in-up"  >
      <Card>
        <div className='card__body'>

        <div className="tour__img">
            <img src={photo} alt="tour-img" />
            { featured && <span>Featured</span>}
        </div>
        <CardBody>
                
              <div className=" card__top d-flex align-items-center justify-content-between">
                  <span className='tour__location d-flex align-items-center gap-1'>
                  <i className="ri-map-pin-line"></i> {city}
                  </span>
                  <span className='tour__rating d-flex align-items-center gap-1'>
                  <i className="ri-star-fill"></i>{avgRating === 0 ? null :avgRating} 
                  {totalRating === 0 ? ('Not rated'):(
                    <span>({reviews.length})</span>
                  )}
                  
                  </span>
              </div>
              <h5 className='tour__title'><Link to={`/tours/${_id}`}>{title}</Link></h5>

              <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <h5>${price} <span>/per person</span></h5>
                  <button className="btn booking__btn">
                      <Link to={`/tours/${_id}`}>Book Now</Link>
                  </button>
              </div>
              
          </CardBody>
        </div>
      </Card>
    
    </div>
  )
}

export default TourCard
