import React from 'react'
import './Footer.css'
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Avatar } from '@mui/material';
const Footer = () => {
  return (
    <>
      <div>
        <footer className="footer">
          <div className="quote-section">
            <p className="quote-text">
              Discover, Cook, and Savor Every Flavor!
            </p>
            
          </div>

          <div className="categories">
            <a href="#" className="category-link">Home</a>
            <a href="#" className="category-link">About</a>
            <a href="#" className="category-link">Search</a>

          </div>

          <div className="footer-bottom">
            {/* Logo */}
            <div className="logo">
              <Avatar
            alt="Recipe Hub Logo"
            src="/recipe-logo.jpg"
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, width: 36, height: 36 }}
          />
            </div>

            {/* Social Media Icons */}
            <div className="social-media">
              <a href="#" className="icon"><FaFacebookF /></a>
              <a href="#" className="icon"><FaInstagram /></a>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

export default Footer