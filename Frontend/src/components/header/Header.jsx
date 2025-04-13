import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/ogbrand.png';
import Bars from '../../assets/menu (2).svg';
import { Link } from 'react-scroll';
import './Header.css';

const Header = () => {
  const mobile = window.innerWidth <= 768;
  const [menuOpened, setMenuOpened] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <img src={Logo} alt="Logo" className="logo" />
      {!menuOpened && mobile ? (
        <div className="res-btn" onClick={() => setMenuOpened(true)}>
          <img
            className="svg"
            src={Bars}
            alt="menu"
            style={{
              width: '1.7rem',
              height: '1.7rem', // ⚠️ removed space in '1.7 rem'
              fill: 'orange',
            }}
          />
        </div>
      ) : (
        <ul className="header-menu" ref={menuRef}>
          <li>
            <Link onClick={() => setMenuOpened(false)} activeClass="active" to="home" smooth={true}>Home</Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="programs" smooth={true}>Programs</Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="reasons" smooth={true}>Why us</Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="plans" smooth={true}>Plans</Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpened(false)} to="testimonials" smooth={true}>Testimonials</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
