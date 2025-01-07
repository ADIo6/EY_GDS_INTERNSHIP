import React, { useRef, useEffect, useState, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo3.jpeg";
import logo5 from "../../assets/images/logo5.jpeg";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";


const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = ({ toggleDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { isLoggedIn, setIsLoggedIn, userDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const headerRef = useRef(null);

  useEffect(() => {
    const stickyHeaderFunc = () => {
      const isMobile = window.innerWidth <= 768; // Adjust for mobile viewports
      if (window.scrollY > (isMobile ? 50 : 80)) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", stickyHeaderFunc);

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
    // Perform any additional logout logic (e.g., clearing tokens, redirecting)
  };

  const dynamicNavLinks = isLoggedIn
    ? nav__links.map((link) =>
        link.path === "/about" ? { ...link, path: "/bookings", display: "Bookings" } : link
      )
    : nav__links;

  return (
    <header
      className={`header ${darkMode ? "dark-mode" : "light-mode"}`} // Dynamically combine dark-mode and sticky-header classes
      ref={headerRef}
    >
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* =====logo===== */}
            <div className="logo">
              <img src={darkMode ? logo5 : logo} alt="Logo" />
            </div>
            {/* =====logo end ===== */}
            {/* =====menu===== */}
            <div className={`navigation ${isMenuOpen ? "menu-open" : ""}`}>
              <ul className="menu d-flex align-items-center gap-3">
                {dynamicNavLinks.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                <Button
                  className="btn secondary__btn dark__light"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </Button>
              </ul>
            </div>

            <div className="separator"></div>

            <div className="nav__right d-flex align-items-center gap-3">
              <div className="nav__btns d-flex align-items-center gap-4">
                {isLoggedIn ? (<>
                  <h5 className='mb-0 bg'>{userDetails|| "Guest"}</h5>
                  <Button className="btn secondary__btn" onClick={handleLogout}>
                    Logout
                  </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to={"/login"}>Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to={"/register"}>Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span
                className="mobile__menu"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <i className={`ri-${isMenuOpen ? "close" : "menu"}-line`}></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
