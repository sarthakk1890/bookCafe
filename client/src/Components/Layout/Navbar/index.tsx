import React, { useState, useEffect } from 'react';
import './style.scss';
import Logo from '../../../assets/heading.png';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaCircleUser } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { IoSearchSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface NavbarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, isAdmin }) => {
  const option = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    whileInView: {
      y: 0,
      opacity: 1,
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = () => {
    if (menuVisible) {
      toggleMenu();
    }
  };

  useEffect(() => {
    const links = document.querySelectorAll('.nav-list a');
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={`navbar ${menuVisible ? 'active' : ''}`}>
      <Link to='/'>
        <motion.div
          className='logoContainer'
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
        >
          <img src={Logo} alt="BookCafe" />
        </motion.div>
      </Link>
      <motion.div {...option} className={`nav-list ${menuVisible ? 'hidden' : ''}`}>
        <Link to='/' onClick={handleLinkClick}>Home</Link>
        <Link to='/contact' onClick={handleLinkClick}>Contact Us</Link>
        <Link to='/store' onClick={handleLinkClick}>Store</Link>
        <Link to='/admin/dashboard' onClick={handleLinkClick} style={{ display: isAdmin ? "" : "none" }}>Dashboard</Link>
        <Link to='/search' onClick={handleLinkClick}><IoSearchSharp /></Link>
        <Link to='/cart' onClick={handleLinkClick}><MdOutlineShoppingCart /></Link>
        <Link to={isAuthenticated ? "/me" : "/login"} onClick={handleLinkClick}>
          <FaCircleUser />
        </Link>
      </motion.div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuVisible ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
