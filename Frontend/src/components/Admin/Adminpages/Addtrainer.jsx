import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Modellay from "../../Model/Modellay";
import Trainerdata from "../Adminpages/Memberdata/Trainerdata";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const Addtrainer = () => {
  const [user, setUser] = useState([]); 
  const [filteruser, setFilterUser] = useState([]); 
  const [isopen, setIsopen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store the user to edit

  // Fetch all users
  const getAllusers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tusers");
      if (Array.isArray(res.data)) {
        setFilterUser(res.data);
        setUser(res.data);
      } else {
        console.error("Unexpected API response:", res.data);
        setFilterUser([]); 
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setFilterUser([]); 
    }
  };

  useEffect(() => {
    getAllusers();
  }, []);

  // Search function
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = user.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText) ||
        user.city.toLowerCase().includes(searchText) ||
        user.experience.toLowerCase().includes(searchText) 
    );
    setFilterUser(filteredUsers);
  };

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are You Sure!!");
    if (isConfirm) {
      try {
        const res = await axios.delete(`http://localhost:5000/tusers/${id}`);
        if (res.status === 200) {
          const updatedUsers = user.filter((user) => user.id !== id);
          setUser(updatedUsers);
          setFilterUser(updatedUsers);
          toast.success("Trainer Deleted Successfully!");
        }
      } catch (error) {
        console.error("Error deleting user:", error.response ? error.response.data : error.message);
      }
    }
  };

  // Open modal for adding a new user
  const handleopen = () => {
    setSelectedUser(null); // Reset selected user (new entry)
    setIsopen(true);
  };

  // Open modal for editing a user
  const updateRecord = (user) => {
    setSelectedUser(user); // Set the selected user for editing
    setIsopen(true);
  };

  // Close modal and refresh data
  const handleclose = () => {
    setIsopen(false);
    getAllusers();
  };

  return (
    <div className="container p-4">
      <h3 className="text-4xl font-bold mb-4 text-white">
        <span className="stroke-text">Manage</span> Trainer
      </h3>

      {/* Search Input and Add Button */}
      <div className="sm:flex justify-between xs:flex-col mb-4">
        <input
          type="search"
          placeholder="Search here"
          className="border p-2 w-[65%] outline-none mb-2 "
          onChange={handleSearch}
        />
        <button  onClick={handleopen} className="log-submit !h-[40px] !w-fit px-2 text-white">
          Add Trainer
        </button>
      </div>

      {/* Table Container with Scroll */}
      <div className="max-h-[450px]  overflow-auto">
        <table className="min-w-full  text-center">
          <thead className=" sticky top-0 z-30 text-white">
            <tr>
              <th className="py-3 px-4 text-lg text-orange-400">ID</th>
              <th className="py-3 px-4 text-lg text-orange-400">Name</th>
              <th className="py-3 px-4 text-lg text-orange-400">Age</th>
              <th className="py-3 px-4 text-lg text-orange-400">City</th>
              <th className="py-3 px-4 text-lg text-orange-400">Experience</th>
              <th className="py-3 px-4 text-lg text-orange-400">Mobile</th>
              <th className="py-3 px-4 text-lg text-orange-400 capitalize">email</th>
              <th className="py-3 px-4 text-lg text-orange-400">Actions</th>
            </tr>
          </thead>
          <tbody className="text-black overflow-scroll ">
            {Array.isArray(filteruser) && filteruser.length > 0 ? (
              filteruser.map((user, index) => (
                <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }} // Start lower (20px down)
                animate={{ opacity: 1, y: 0 }} // Move to normal position
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
                className="hover:bg-orange-500 border-b hover:bg-opacity-5"
              >
                  <td className="py-2 px-4  capitalize text-white font-semibold ">{index + 1}</td>
                  <td className="py-2 px-4  capitalize text-white font-semibold ">{user.name}</td>
                  <td className="py-2 px-4  capitalize text-white font-semibold ">{user.age}</td>
                  <td className="py-2 px-4  capitalize text-white font-semibold ">{user.city}</td>
                  <td className="py-2 px-4  capitalize text-white font-semibold ">{user.experience}</td>
                  <td className="py-2 px-4  capitalize text-white font-semibold ">{user.mobile}</td>
                  <td className="py-2 px-4   text-white font-semibold">{user.email}</td>
                  <td className="py-2 px-4  ">
                    <IconButton onClick={() => updateRecord(user)} aria-label="edit">
                      <EditIcon className="text-yellow-500" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)} aria-label="delete">
                      <DeleteIcon className="text-red-900" />
                    </IconButton>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal */}
        {isopen && (
          <Modellay
            handleclose={handleclose}
            name={selectedUser ? "Edit Member" : "Add Member"}
            content={
              <Trainerdata
                handleclose={handleclose}
                existingData={selectedUser} // Pass data for editing
                isEdit={!!selectedUser} // `true` if editing, `false` if adding
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Addtrainer;
