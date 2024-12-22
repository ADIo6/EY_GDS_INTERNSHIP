import React ,{useRef,useEffect}from 'react'
import {Container, Row,Button} from 'reactstrap'
import {Link, NavLink} from 'react-router-dom'

import logo from '../../assets/images/logo3.jpeg'
import logo5 from '../../assets/images/logo5.jpeg'
import './header.css'
const nav__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/tours',
    display:'Tours'
  },

];
const Header = ({ toggleDarkMode, darkMode }) => {

  // const [dropDownMenu, setDropDownMenu] = useState(false);

  const headerRef = useRef(null);
  
  useEffect(() => {
    const stickyHeaderFunc = () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add('sticky__header');
        } else {
            headerRef.current.classList.remove('sticky__header');
        }
    };

      window.addEventListener('scroll', stickyHeaderFunc);

      return () => {
          window.removeEventListener('scroll', stickyHeaderFunc);
        };
      }, []);

      
  return (
    <header className={`header ${darkMode ? 'dark-mode' : 'light-mode'}`} // Dynamically combine dark-mode and sticky-header classes
    ref={headerRef}>
<Container>
  <Row>
    <div className="nav__wrapper d-flex align-items-center justify-content-around">
      {/* =====logo===== */}
      <div className="logo">
        <img src={darkMode ? logo5 : logo} alt="Logo" />
      </div>
      {/* =====logo end ===== */}
      {/* =====menu===== */}
      <div className="navigation">
      <ul className="menu d-flex align-items-center gap-3">
    {nav__links.map((item,index)=>(
      <li className="nav__item" key={index}>
        <NavLink 
        to ={item.path}
         className={navClass =>
           navClass.isActive ? 'active__link':''}>
        {item.display}</NavLink>
      </li>
      
      
    ))}
    <Button className='btn secondary__btn dark__light' onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
      </ul>
      </div>

      <div className="separator"></div>

        <div className="nav__right d-flex align-items-center gap-3">
            <div className="nav__btns d-flex align-items-center gap-4  ">
              <Button className='btn secondary__btn'> 
                <Link to={'/login'}>Login</Link> 
                </Button>
                <Button className='btn primary__btn'> 
                <Link to={'/register'}>Register</Link> 
              </Button>
              
            </div>
            
          <span className="mobile__menu">
            <i class="ri-menu-line"></i>
          </span>
        </div>
      </div>
  </Row>
</Container>
    </header>
  )
}

export default Header
