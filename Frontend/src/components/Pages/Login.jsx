import React, { useState, useEffect } from "react";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import Log_img from "../../assets/avatar.jpg";
import pass_icon from "../../assets/password.png";
import "./Login.css";
import { toast } from "react-toastify";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import Forgetpass from "./Forgetpass";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [selectedImage, setSelectedImage] = useState(Log_img);
  const [action, setAction] = useState("Login");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState(localStorage.getItem("userEmail") || "");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate =useNavigate();
  useEffect(() => {
    localStorage.setItem("userEmail", mail);
  }, [mail]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Function to validate input fields
  const validateForm = () => {
    let tempErrors = {};

    if (action === "Sign Up" && !lname.trim()) {
      tempErrors.name = "Name is required.";
    }

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

  // Function to handle input changes and remove errors dynamically
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === "name") {
      setLname(value);
      if (value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
      }
    } else if (field === "email") {
      setMail(value);
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    } else if (field === "password") {
      setPass(value);
      if (value.length >= 6) {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      }
    }
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    setLoading(true);
  
    const url = action === "Login" ? "http://localhost:5000/login" : "http://localhost:5000/signup";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          action === "Login"
            ? { email: mail, password: pass }
            : { name: lname, email: mail, password: pass }
        ),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message);
  
        // ✅ Clear input fields after successful signup
        if (action === "Signup" || action=="Login") {
          // console.log("Clearing fields..."); // Debugging log
          setTimeout(() => {
            setLname("");
            setMail("");
            setPass("");
          }, 100); // Small delay ensures state updates properly
        }
  
        if (action === "Login") {
          localStorage.setItem("token", data.token);
          navigate("/clientdas");
          setTimeout(() => {
            setLname("");
            setMail("");
            setPass("");
          }, 100);
        }
      } else {
        // ✅ Handle email already registered case
        if (data.message === "Email already registered") {
          toast.error("This email is already registered. Try logging in.");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  

  return (
    <div className="p-container">
      <div className="blur-l-1"></div>
      <div className="blur-l-2"></div>
      <div className="log-container">
        <div className="log-header">
          <div className="log-text">
            {action}
            <div className="underline"></div>
          </div>
          <div className="navi">
            <div
              className={action === "Sign Up" ? "log-submit scal" : "log-submit scal gray"}
              onClick={() => setAction("Sign Up")}
            >
              Sign Up
            </div>
            <div
              className={action === "Login" ? "log-submit scal" : "log-submit scal gray"}
              onClick={() => setAction("Login")}
            >
              Login
            </div>
          </div>
          {action === "Sign Up" && (
            <div className="log-img">
              <label htmlFor="fileInput">
                <img src={selectedImage} alt="Selected" />
              </label>
              <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </div>
          )}
          <div className="log-inputs">
            {action === "Sign Up" && (
              <div className="log-input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Name"
                  value={lname}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </div>
            )}
            {errors.name && <p className="error-text">{errors.name}</p>}
            <div className="log-input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={mail}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
            <div className="log-input">
              <img src={pass_icon} alt="" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={pass}
                onChange={(e) => handleInputChange(e, "password")}
              />
              <span className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash size={25} color="orange" /> : <FaRegEye size={25} color="orange" />}
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          {action === "Login" && (
            <div className="forget">
              Forgot Password? <span onClick={() => setShowModal(true)}>Click Here</span>
            </div>
          )}
          <div className="submit-con">
            <div className="log-submit full" onClick={!loading ? handleSubmit : null}>
              {loading ? <ImSpinner9 className="spi" /> : action}
            </div>
          </div>
        </div>
      </div>
      <Forgetpass isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Login;
