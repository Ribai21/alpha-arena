import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Trainerdata = ({ handleclose, existingData, isEdit }) => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    city: "",
    experience: "",
    mobile: "",

    email: "",
  });

  // Prefill data when editing
  useEffect(() => {
    if (isEdit && existingData) {
      setUserData(existingData);
    }
  }, [isEdit, existingData]);

  // Handle input changes
  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.patch(
          `http://localhost:5000/tusers/${existingData.id}`,
          userData
        );
        toast.success("User updated successfully!");
      } else {
        console.log("Sending User Data:", userData); // Debugging
        const response = await axios.post(
          "http://localhost:5000/tusers",
          userData
        );
        toast.success("User added successfully!");
      }
    } catch (error) {
      console.error(
        "Error:",
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
            value={userData.name}
            onChange={handleData}
            className="mt-1 border p-1 "

            required
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={userData.age}
            onChange={handleData}
            className="mt-1 border p-1 "
            required
            placeholder="Age"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={handleData}
            className="mt-1 border p-1 "
            required
            placeholder="Age"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="city">Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={userData.experience}
            onChange={handleData}
            className="mt-1 border p-1 "
            required
            placeholder="eg.1-year"
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={userData.mobile}
            onChange={handleData}
            className="mt-1 border p-1 "
            required
            placeholder="eg.9876543210"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="mobile">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleData}
            className="mt-1 border p-1 "
            required
            placeholder="eg.alphaarena@gmail.com"
          />
        </div>

        <button
          type="submit"
          className="log-submit  text-white !h-[40px] mx-auto mt-4"
        >
          {isEdit ? "Update Data" : "Add Data"}
        </button>
      </form>
    </>
  );
};

export default Trainerdata;
