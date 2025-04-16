// import Sidebar from "../components/Admin/Sidebar";
import Footer from "../components/footer/Footer";
import HeroSection from "../components/hero-section/HeroSection";
import Join from "../components/join/Join";
import Plans from "../components/plans/Plans";
import Programs from "../components/programs/Programs";
import Reasons from "../components/reasons/Reasons";
import Testimonials from "../components/testimonials/Testimonials";


import React from "react";

const Home = () => {
  return (
    <>
      
      <HeroSection />
      <Programs />
      <Reasons />
      <Plans />
      <Testimonials />
      <Join />
      <Footer />
    
    </>
  );
};

export default Home;
