import React, { useState } from "react";
import axios from "axios";
import "../Pages/Forget.css";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const Forgetpass = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("m-backscreen")) {
      onClose();
    }
  };

  const forgetSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (currentStep === 0) {
        // Send OTP to email
        const response = await axios.post("http://localhost:5000/api/auth/send-otp", {
          email: formData.email,
        });
        alert(response.data.message);
        setCurrentStep(1);
      } else if (currentStep === 1) {
        // Verify OTP
        const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
          email: formData.email,
          otp: formData.otp,
        });
        alert(response.data.message);
        setCurrentStep(2);
      } else if (currentStep === 2) {
        // Reset password
        const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
          email: formData.email,
          newPassword: formData.newPassword,
        });
        alert(response.data.message);
        setCurrentStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 0:
        return "Send OTP";
      case 1:
        return "Verify OTP";
      case 2:
        return "Reset Password";
      case 3:
        return "Close";
      default:
        return "Submit";
    }
  };

  const renderFormField = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="form-grp">
            <p>Enter email to reset your password.</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
              className="!mt-5"
            />
          </div>
        );
      case 1:
        return (
          <div className="form-grp">
            <p>Enter OTP.</p>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              required
              className="!mt-4"
            />
          </div>
        );
      case 2:
        return (
          <div className="form-grp">
            <p className="text-white">Enter New Password.</p>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter New Password"
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="form-grp p-2 success-message">
            <p className="font-semibold text-2xl text-green-600 ">Password Reset Successfully!</p>
            <p className="font-semibold text-sm text-green-600">You can now login with your new password.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleButtonClick = () => {
    if (currentStep === 3) {
      onClose();
    } else {
      forgetSubmit();
    }
  };

  return (
    <div className="m-backscreen" onClick={handleOutsideClick}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="m-model"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h2">
          {currentStep === 3 ? "Success" : "Forgot Password"}
          <span>
            <CloseIcon onClick={onClose} />
          </span>
        </div>

        {error && <p className="error-message">{error}</p>}

        {renderFormField()}

        <div className="">
          <button className="f-btn !font-semibold" onClick={handleButtonClick} disabled={loading}>
            {loading ? "Processing..." : getButtonText()}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Forgetpass;
