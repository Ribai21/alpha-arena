import React from "react";
import { plansData } from "../../data/plansData";
import whiteTick from "../../assets/whiteTick.png";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Plans.css";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const transition = { type: "spring", duration: 3 };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token"); // Assuming token is stored in localStorage
  const navigate = useNavigate();
  const handleJoinClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login first!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast("Get Start Your Journey", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/clientdas/payment");
    }
  };

  return (
    <div className="plans-container">
      <div className="blur plans-blur-1"></div>
      <div className="blur plans-blur-2"></div>
      <div className="programs-header" style={{ gap: "2rem" }}>
        <span className="stroke-text">READY TO START</span>
        <span>YOUR JOURNEY</span>
        <span className="stroke-text">NOW WITH US</span>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={transition}
        className="plans"
      >
        {plansData.map((plan, i) => (
          <div className="plan" key={i}>
            {plan.icon}
            <span>{plan.name}</span>
            <span>₹{plan.price}</span>

            <div className="features">
              {plan.features.map((feature, i) => (
                <div key={i} className="feature">
                  <img src={whiteTick} alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div></div>
            <button className="btn text-black" onClick={handleJoinClick}>
              Join Now
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Plans;
