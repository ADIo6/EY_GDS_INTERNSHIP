import React, { useState } from 'react'
import Header from '../Header/Header'
import Routers from '../../router/Routers'
import Footer from '../Footer/Footer'
const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () =>{
    setDarkMode(!darkMode);
  }
  return (
    <>
   <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Routers />
      <Footer darkMode={darkMode} />
    </div>
    </>
  )
}

export default Layout
