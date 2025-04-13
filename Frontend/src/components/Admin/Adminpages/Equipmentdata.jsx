import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// THESE ARE THE CONTENT THAT SHOWN INSIDE THE MODEL

const Equipmentdata = ({ handleclose, existingData, isEdit }) => {
  const [userData, setUserData] = useState({
    name: "",
    quantity: "",
    vendor: "",
    price: "",
    contact: "",
    place: ""
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
          `http://localhost:5000/equip/${existingData.id}`,
          userData
        );
        toast.success("Equipment updated successfully!");
      } else {
        // console.log("Sending User Data:", userData); // Debugging
        const response = await axios.post(
          "http://localhost:5000/equip",
          userData
        );
        toast.success("Equipment added successfully!");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response?.data?.message || "Failed to add Equipment");
    }
    handleclose();
  };

  return (
    <>
      <form className="gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">Equipment Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleData}
            className="mt-1 outline-none border p-1 "

            required
            placeholder="Equipment Name"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="age">Quanity</label>
          <input
            type="number"
            id="quanity"
            name="quantity"
            value={userData.quantity}
            onChange={handleData}
            className="mt-1 outline-none border p-1 "
            required
            placeholder="Quantity"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="city">Vendor</label>
          <input
            type="text"
            id="vendor"
            name="vendor"
            value={userData.vendor}
            onChange={handleData}
            className="mt-1 outline-none border p-1 "
            required
            placeholder="Vendor Name"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="city">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={userData.price}
            onChange={handleData}
            className="mt-1 outline-none border p-1 "
            required
            placeholder="eg.19,223"
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="mobile">Contact</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={userData.contact}
            onChange={handleData}
            className="mt-1 outline-none border p-1 "
            required
            placeholder="eg.9876543210"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="mobile">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={userData.place}
            onChange={handleData}
            className="mt-1 outline-none border p-1 "
            required
            placeholder="Place"
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

export default Equipmentdata;
