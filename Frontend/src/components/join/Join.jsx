import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import "./Join.css";

const Join = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const transition = { type: "spring", duration: 5 };

  const sendEmail = (e) => {
    e.preventDefault();
    setMessage("Mail Sent Successfully!");
    setTimeout(() => setMessage(""), 3000);

    emailjs
      .sendForm(
        "service_kn9ogpe",
        "template_xlczg6l",
        form.current,
        "_hXO2TuQIMP_SoDvc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="Join" id="join-us">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={transition}
        className="left-j"
      >
        <hr />
        <hr className="h" />

        <div>
          <span className="stroke-text">READY TO</span>
          <span>LEVEL UP</span>
        </div>
        <div>
          <span>YOUR BODY</span>
          <span className="stroke-text">WITH US?</span>
        </div>
      </motion.div>

      <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={transition}
      className="right-j">
        <form ref={form} className="email-container" onSubmit={sendEmail}>
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email address"
            required
          />
          <button className="btn btn-j">Join Now</button>
        </form>
        {message && (
          <p style={{ color: "green", fontWeight: "bold", fontSize: "12px" }}>
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Join;
