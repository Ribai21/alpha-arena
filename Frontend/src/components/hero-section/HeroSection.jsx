// filepath: /c:/Users/moham/Desktop/gymProject/gym-website/src/components/hero-section/HeroSection.jsx
import React from "react";
import Header from "../header/Header";
import hero_image from "../../assets/hero11.png";
import hero_image_back from "../../assets/hero_image_back.png";
import { useState,useEffect } from "react";
import Calories from "../../assets/calories.png";
import NumberCounter from "number-counter";
import "./HeroSection.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import {  Menu, MenuItem } from "@mui/material";

const HeroSection = () => {
  const navigate = useNavigate();
  const transition = { type: "spring", duration: 3 };
  const [anchorEl, setAnchorEl] = useState(null);
  const [change ,setChange] = useState("Get Started");
  const open = Boolean(anchorEl);
  const mobile = window.innerWidth <= 768 ? true : false;
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) setChange("Dashboard");
  }, []);
  const handleJoinNow = () => {
    navigate("/login");
  };
  const adminjoinnow = () => {
    navigate("/admin");
  };
  
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJoinClick = () => {
      if (!isLoggedIn) {
        navigate("/login")
      } else {
        navigate("/clientdas")
       
        
      }
      

    };


  return (
    <div className="hero" id="home">
      <div className="blur hero-blur"></div>
      {/* LEFT SIDE */}
      <div className="left-h">
        <Header />
        <div className="the-best-ad">
          <motion.div
            initial={{ left: mobile ? "165px" : "228px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>the best fitness club in the town </span>
        </div>
        <div className="hero-text">
          <motion.div
          initial={{opacity:0,y:-100} }
          whileInView={{opacity:1,y:0}}
          transition={transition}>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </motion.div>
          <motion.div
          initial={{opacity:0,y:-100}}
          whileInView={{opacity:1,y:0}}
          transition={transition}>
            <span>Ideal body</span>
          </motion.div>
          <div>
            <motion.span
            initial={{opacity:0,x:-100}}
            whileInView={{opacity:1,x:0}}
            transition={transition}
            style={{fontWeight:"300"}}
            >
              In here we will help you to shape and build your ideal body and
              live up your life to fullest
            </motion.span>
          </div>
        </div>
        {/* NUMBERS */}
        <div className="figures">
          <div>
            <span>
              <NumberCounter end={40} start={20} delay="3" preFix="+" />
            </span>
            <span>expert coachs</span>
          </div>
          <div>
            <span>
              <NumberCounter end={278} start={179} delay="3" preFix="+" />
            </span>
            <span>members</span>
          </div>
          <div>
            <span>
              <NumberCounter end={30} start={10} delay="3" preFix="+" />
            </span>
            <span>fitness programs</span>
          </div>
        </div>
        {/* LEFTSIDE BUTTON */}
        <div className="hero-buttons">
          <button className="btn whitespace-nowrap" onClick={handleJoinClick}>{change}</button>
          <button className="btn" onClick={()=>navigate("/about")}>Learn More</button>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="right-h">
        <button className="btn" onClick={handleOpen}>
          Join Now
        </button>
        {/* DROPDOWN */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <div className="m-item">
            <MenuItem
              sx={{ ":hover": { color: "orange" } }}
              onClick={() => {
                handleJoinNow();
                handleClose();
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              sx={{ ":hover": { color: "orange" } }}
              onClick={() => {
                adminjoinnow();
                handleClose();
              }}
              component={Link}
              to="/admin"
            >
              Admin
            </MenuItem>
          </div>
        </Menu>
        <img src={hero_image} alt="" className="hero-image max-w-none    " />
        <motion.img
          initial={{ right: "6rem" }}
          whileInView={{ right: "18rem" }}
          transition={transition}
          src={hero_image_back}
          alt=""
          className="hero-image-back"
        />
        <motion.div
          initial={{ right: "37rem" }}
          whileInView={{ right: "28rem" }}
          transition={transition}
          className="calories"
        >
          <img src={Calories} className="max-w-none" alt="" />
          <div>
            <span>Calories Burned</span>
            <span>340 kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
