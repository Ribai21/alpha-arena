import React from "react";
import "./Footer.css";
import Github from "../../assets/github.png";
import Instagram from "../../assets/instagram.png";
import LinkedIn from "../../assets/linkedin.png";
import Logo from "../../assets/ogbrand.png";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import x from "../../assets/twitter.png";
import CallIcon from "@mui/icons-material/CallOutlined";
import Mail from "@mui/icons-material/MailOutlineOutlined";
import Tele from "@mui/icons-material/SendOutlined";

const Footer = () => {
  const transition = { type: "spring", duration: 3 };
  return (
    <div className="Footer-container">
      <hr />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={transition}
        className="inner"
      >
        <div className="foooter">
          <img className="f-logo" src={Logo} alt="" />
          <div className="contact">
            <a href="tel:+919894175227"
            style={{textDecoration:"none",color:"white"}} 
            ><span style={{whiteSpace:"nowrap"} }>
              <CallIcon /> +91 9894175227
            </span></a>
            <a style={{textDecoration:"none",color:"white"}} href="mailto:ribairibai@gmail.com">
              <span>
              <Mail />AlphaArena@gmail.com
            </span></a>
            <a style={{textDecoration:"none",color:"white"}} 
            href="https://t.me/a_m_r_o6" target="_blank" rel="noopener noreferrer">
            <span>
              <Tele />AlphaAena
            </span>
            </a>
          </div>
          <div className="social-links">
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Github} alt="GitHub" />
            </a>
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LinkedIn} alt="LinkedIn" />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={x} className="x" alt="" />
            </a>
          </div>
        </div>
        <div className="footer">
          <ul>
            <span className="heading">Quick Link</span>
            <li>Offer & Discount</li>
            <li>Get Coupon</li>
            <li>Contact Us</li>
            <li>About</li>
          </ul>
        </div>
        <Link to="programs"  smooth={true}>
          <div className="footer">
            <ul>
              <span className="heading">Programs</span>
              <li>Fat Loss</li>
              <li>Cardio Training</li>
              <li>Strength Training</li>
              <li>Health Fitness</li>
              <li>Power Lifting</li>
            </ul>
          </div>
        </Link>

        <div className="footer">
          <ul>
            <span className="heading">Gym Basics</span>
            <li>Gym Accessories</li>
            <li>Health Tips</li>
            <li>Choose Timimg</li>
            <li>Rules For gym</li>
          </ul>
        </div>
        <div className="footer">
          <ul>
            <span className="heading">Support</span>
            <li>FAQ</li>
            <li>Report Payment Issue</li>
            <li>Tearms Of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </motion.div>
      <div className="last">
        <ul>
          <li>
            &copy; {new Date().getFullYear()} Alpha Arena. All rights reserved.
          </li>
          <li>Terms</li>
          <li>Acceptable User Guidelines</li>
          <li>Trust Center</li>
          <li>Legal & Compliance</li>
          <li>Your Privacy & Security</li>
          <li>Cookies Preference</li>
        </ul>
      </div>

      <div className="blur blur-f-1"></div>
      <div className="blur blur-f-2"></div>
    </div>
  );
};

export default Footer;
