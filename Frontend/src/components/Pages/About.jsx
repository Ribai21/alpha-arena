import React, { useEffect, useState } from "react";
import about from "../../assets/about2.avif";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-cards";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import Footer from "../footer/Footer";
import TiltedCard from "../Text/Card";
import sample from "../../assets/ogbrand.png";

const About = () => {
  const [trainer, setTrainer] = useState([]);

  useEffect(() => {
    fetchdetails();
  }, []);

  const fetchdetails = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/tusers");
      setTrainer(data);
    } catch (err) {
      console.error("Error fetching trainer data:", err);
    }
  };

  return (
    <>
      <div className="flex-col w-full h-screen overflow-scroll p-4">
        <div className="sticky">{/* Optional Header Component */}</div>

        {/* Section: Story */}
        <div className="w-full flex flex-col-reverse  lg:flex-row justify-center items-center mt-10 gap-6">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 2 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="leftside flex flex-col text-start w-full md:w-2/3 lg:1/2 px-4"
          >
            <h1 className="text-3xl md:text-5xl font-stix text-center md:text-left text-white font-bold mb-5">
              Our <span className="stroke-text">Story</span>
            </h1>
            <p className="text-xl text-white indent-9 mt-2">
              We are a team of passionate individuals dedicated to providing the
              best service possible. Our journey began with a simple idea, and
              we have grown into a community of like-minded people. Our mission
              is to make a positive impact in the world by offering innovative
              solutions and exceptional customer service. We believe in the
              power of collaboration and strive to create a supportive
              environment for our team and our clients.
            </p>
            <p className="text-xl text-white indent-9 mt-4">
              Alpha Arena, widely regarded as one of India's premium fitness
              destinations, is more than just a gym; it’s a way of life. The
              vision and mission of our venture are to provide the best fitness
              experience possible under the supervision of highly qualified and
              experienced professionals. We meet the demand for an upscale gym
              in the growing suburb of Kilpauk and surrounding areas.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="rightside w-full md:w-2/3 lg:1/2 order-1 md:order-2 flex justify-center items-center"
          >
            <div className="w-full h-full p-0 md:p-6">
              <img
                src={about}
                alt="About Us"
                className="w-full h-full ms-2 rounded-ss-[63px] border-s-8 rounded-ee-[63px] border-e-8 border-orange-400 object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Section: Trainers */}
        <div className="container mt-10 w-full">
          {/* Heading */}
          <div className="flex md:flex-row flex-col gap-3 relative justify-center items-center">
            <span className="text-3xl md:text-5xl text-center text-white font-bold stroke-text">
              Meet Our
            </span>
            <span className="text-3xl md:text-5xl text-center text-white font-bold">
              Expert
            </span>
            <span className="text-3xl md:text-5xl text-center text-white font-bold stroke-text">
              Trainers
            </span>
            <div className="border-2 absolute bottom-[-6px] border-orange-400 w-1/2"></div>
          </div>

          {/* Swiper Carousel */}
          <div className="flex justify-center my-10">
            <TiltedCard
              imageSrc={sample}
              altText=""
              captionText="Trainer Details"
              containerHeight="240px"
              containerWidth="240px"
              imageHeight="210px"
              imageWidth="230px"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="w-[240px]"
                >
                  {trainer.map((trainer) => (
                    <SwiperSlide key={trainer.id}>
                      <div className="bg-white p-4 rounded-lg shadow-lg w-fit flex flex-row gap-3 md:flex-col items-center">
                        <div className="imgggg  w-1/2 md:w-full ">
                          <img
                            // src={trainer.image}
                            src="https://img.freepik.com/free-photo/confident-sportsman-with-headphones-jumping-rope_1098-21632.jpg?t=st=1744829762~exp=1744833362~hmac=c591e74cf34dde430a58235c3b9a36bd8695d573a40064e113fcf3e1d5913d88&w=740"
                            alt={trainer.name}
                            className="w-full h-44 object-cover rounded-lg "
                            style={{ objectPosition: "center 20%" }}
                          />
                        </div>
                        <div className="lower  w-1/2 md:w-full text-start   md:text-center">
                          <h2 className="text-2xl  capitalize font-semibold text-black">
                            {trainer.name}
                          </h2>
                          <p className="text-black text-sm">
                            Profession with {trainer.experience} of Experience
                          </p>
                          <p className="text-black text-sm mt-1 ">
                            {trainer.email}
                          </p>
                          {/* Social Links */}
                          <div className="social flex scale-90 md:scale-100 gap-2 md:justify-evenly mt-5 w-full  md:px-3">
                            <a
                              href="#"
                              className="text-blue-500 transform transition duration-300 hover:-translate-y-2"
                            >
                              <FaFacebookF size={20} />
                            </a>
                            <a
                              href="#"
                              className="text-black transform transition duration-300 hover:-translate-y-2"
                            >
                              <BsTwitterX size={20} />
                            </a>
                            <a
                              href="#"
                              className="text-red-500 transform transition duration-300 hover:-translate-y-2"
                            >
                              <FaInstagram size={20} />
                            </a>
                            <a
                              href="#"
                              className="text-green-500 transform transition duration-300 hover:-translate-y-2"
                            >
                              <FaWhatsapp size={20} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              }
            />
          </div>
          <div className="md:mt-40">

          <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
