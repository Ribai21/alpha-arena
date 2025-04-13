import React, { useState } from "react";
import Stepper, { Step } from "../../Text/Stepper"; // Custom Stepper component
import axios from "axios";
import { toast } from "react-toastify";

const Userprofile = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    mobile: "",
    email: "",
    address: "",
    fitnessGoals: [],
    medicalConditions: "",
    membershipType: "",
    image: null,
    program: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFitnessGoalsChange = (e) => {
    const { value, checked } = e.target;
    let updatedGoals = [...formData.fitnessGoals];
    if (checked) {
      updatedGoals.push(value);
    } else {
      updatedGoals = updatedGoals.filter((goal) => goal !== value);
    }
    setFormData((prev) => ({
      ...prev,
      fitnessGoals: updatedGoals,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure all required fields are filled
    if (
      !formData.name ||
      !formData.gender ||
      !formData.age ||
      !formData.mobile ||
      !formData.email ||
      !formData.address ||
      !formData.membershipType ||!formData.program ||
      !formData.image // Ensure image is included
    ) {
      toast.error("All required fields must be filled!");
      return;
    }
  
    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("fitnessGoals", JSON.stringify(formData.fitnessGoals));
    formDataToSend.append("medicalConditions", formData.medicalConditions);
    formDataToSend.append("membershipType", formData.membershipType);
    formDataToSend.append("program", formData.program);
    formDataToSend.append("image", formData.image); // Append file
  
    try {
      const response = await axios.post("http://localhost:5000/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for file upload
      });

      localStorage.setItem("userMobile", formData.mobile);
      toast.success(response.data.message);
      window.location.href = window.location.href;


  
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
      console.error("Registration error:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-transparent border-none">
      <Stepper initialStep={1} className="!border-none" backButtonText="Previous" nextButtonText="Next">
        <Step>
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border outline-none rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border outline-none rounded"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border outline-none rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border outline-none rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border outline-none rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border outline-none rounded"
              required
            />
          </div>
        </Step>

        <Step>
          <h2 className="text-xl font-bold mb-4">Fitness Goals</h2>
          {[
            "Weight Loss",
            "Muscle Building",
            "Endurance Training",
            "General Fitness",
            "Stress Relief",
          ].map((goal) => (
            <div key={goal} className="flex items-center">
              <input
                type="checkbox"
                name="fitnessGoals"
                value={goal}
                checked={formData.fitnessGoals.includes(goal)}
                onChange={handleFitnessGoalsChange}
                className="mr-2"
              />
              <span>{goal}</span>
            </div>
          ))}
          <label className="block text-sm font-medium">
            Medical Conditions
          </label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            className="w-full p-2 border outline-none rounded"
            placeholder="Enter any medical conditions..."
          />
        </Step>

        <Step>
          <h2 className="text-xl font-bold w-fit mb-4">Membership Details</h2>
          <div className="overflow-y-scroll">
            <label className="block text-sm font-medium">Plan Type</label>
            <select
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              className="w-full p-2 border outline-none rounded"
              required
            >
              <option value="">Select</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
            </select>
            <label>Program</label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required>
                <option value="">Select</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Building">Muscle Building</option>
                <option value="Endurance Training">Endurance Training</option>
                <option value="General Fitness">General Fitness</option>
                <option value="Calisthenics">Calisthenics</option>
                <option value="Cross Fit">Cross Fit</option>
                <option value="Fat loss">Fat Loss</option>

              </select>
          </div>

          {/* New Image Upload Field */}
          <div className="mt-4">
            <label  className="block text-sm font-medium">
              Upload Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              id="userimage"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" className="log-submit my-3 !w-full !h-12">
            Submit
          </button>
        </Step>
      </Stepper>
      
    </form>
  );
};

export default Userprofile;
