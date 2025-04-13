import React, { useState } from "react";
import email_icon from "../../assets/email.png";
import pass_icon from "../../assets/password.png";
import admin_avatar from "../../assets/try.jpg";
import "./Login.css";
import Forgetpass from "./Forgetpass";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const Admin = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const adminmail = "alpha_admin@gmail.com";
  const adminpass = "ribaiadmin";

  const validateForm = () => {
    let tempErrors = {};
    if (!mail.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!pass.trim()) {
      tempErrors.password = "Password is required.";
    } else if (pass.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (mail === adminmail && pass === adminpass) {
        localStorage.setItem("admin", mail);
        toast.success("Welcome Admin");
        navigate("/admindas");
      } else {
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <div className="p-container">
      <div className="blur-l-1"></div>
      <div className="blur-l-2"></div>
      <div className="log-container admin-bg">
        <div className="log-header">
          <div className="log-text">Admin Login</div>
          <div className="underline"></div>
          <div className="log-img">
            <img src={admin_avatar} alt="Admin" />
          </div>
          <div className="log-inputs">
            <div className="log-input">
              <img src={email_icon} alt="Email" />
              <input
                type="email"
                placeholder="Admin Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
            <div className="log-input relative">
              <img src={pass_icon} alt="Password" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <span className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash size={20} color="orange" /> : <FaRegEye size={20} color="orange" />}
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="forget">
            Forgot Password? <span onClick={() => setShowModal(true)}>Click Here</span>
          </div>
          <div className="submit-con">
            <button className="log-submit full" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
      <Forgetpass isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Admin;
