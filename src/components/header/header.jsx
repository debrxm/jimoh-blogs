import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../side-nav/side-nav';
import logo from '../../assets/logo.png';
import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';
// import instagram from '../../assets/instagram.svg';
// import facebook from '../../assets/facebook.svg';
// import twitter from '../../assets/twitter.svg';
import Hero from '../hero/hero';
import './header.scss';

const Header = () => {
  const [isShow, setisShow] = useState(false);
  // const handleScroll = e => {
  //   setisShow(!isShow);
  // };
  const toggleMenu = () => {
    setisShow(!isShow);
  };
  return (
    <>
      {isShow ? <SideNav handleToggleSidebar={toggleMenu} /> : null}
      <header className="header">
        <nav className={`${isShow ? 'dark' : ''} navbar`}>
          <div className="nav-links container">
            <div className="show">
              <div className="brand">
                <Link to="/">
                  <img src={logo} alt="LOGO" className="logo-icon" />
                </Link>
              </div>

              <img
                src={isShow ? close : menu}
                className="menu-button"
                alt="MenuIcon"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </nav>
        <Hero />
      </header>
    </>
  );
};

export default Header;
