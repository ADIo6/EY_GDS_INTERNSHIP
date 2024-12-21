import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
    {
        imgUrl :weatherImg,
        title : 'Calculate Weather',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
        imgUrl :guideImg,
        title : 'Best Tour Guide',
        desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
        imgUrl :customizationImg,
        title : 'Customization',
        desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
]
const ServiceList = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            easing: 'linear', // Animation easing
            offset: 250, // Trigger animation 280px before element is in view
          });
      }, []);
    
  return (
    <>
     {
        servicesData.map((item, index) => (
         <Col lg="3" key={index} data-aos="fade-up"> {/* Addin AOS effect  */}
            <ServiceCard item={item}/>
        </Col>
    ))
     } 
    </>
  )
}


export default ServiceList
