import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Clientdata = ({ handleclose, existingData, isEdit }) => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    address: "", // 🔥 Fixed: Changed from 'city' to 'address'
    membership_type: "",
    mobile: "",
    plan: "",
    email: "",
    program: "",
  });

  // ✅ Prefill data when editing
  useEffect(() => {
    if (isEdit && existingData) {
      setUserData({ ...existingData }); // Spread to create a new object
    }
  }, [isEdit, existingData]);

  // ✅ Handle input changes properly
  const handleData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("User Data to be sent:", userData); // ✅ Log data before sending
  
    try {
      if (isEdit) {
        await axios.patch(
          `http://localhost:5000/users/${existingData.id}`,
          userData
        );
        toast.success("User updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:5000/users",
          userData
        );
        console.log("Response:", response.data); // ✅ Log backend response
        toast.success("User added successfully!");
      }
    } catch (error) {
      console.error(
        "Error response:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response?.data?.message || "Failed to add user");
    }
    handleclose();
  };
  
  return (
    <>
      <form className="gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleData}
            className="mt-1 outline-none border p-1"
            required
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={userData.age}
            onChange={handleData}
            className="mt-1 outline-none border p-1"
            required
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="address">Address</label> {/* 🔥 Fixed label */}
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={userData.address} // 🔥 Fixed: Now using address instead of city
            onChange={handleData}
            className="mt-1 outline-none border p-1"
            required
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="membertype">Member Type</label>
          <select
            id="membertype"
            name="membership_type"
            value={userData.membertype}
            onChange={handleData}
            className="mt-1 outline-none border p-1"
            required
          >
            <option value="">Select Plan</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="Muscle Building">Muscle Building</option>
            <option value="Cardio">Cardio</option>
            <option value="Healthy Lifestyle">Healthy Lifestyle</option>
            <option value="Calisthenics">Calisthenics</option>
          </select>
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={userData.mobile}
            onChange={handleData}
            placeholder="e.g. 9876543210"
            className="mt-1 border outline-none p-1"
            required
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="plan">Plan</label>
          <select
            id="plan"
            name="plan"
            value={userData.plan}
            onChange={handleData}
            className="mt-1 border outline-none p-1"
            required
          >
            <option value="">Select Plan</option>
            <option value="1-month">1 Month</option>
            <option value="3-months">3 Months</option>
            <option value="6-months">6 Months</option>
            <option value="12-month">1 Year</option>
          </select>
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. alphaarena@gmail.com"
            value={userData.email}
            onChange={handleData}
            className="mt-1 border outline-none p-1"
            required
          />
        </div>

        <button
          type="submit"
          className="log-submit text-white !h-[40px] mx-auto mt-4"
        >
          {isEdit ? "Update Data" : "Add Data"}
        </button>
      </form>
    </>
  );
};

export default Clientdata;
