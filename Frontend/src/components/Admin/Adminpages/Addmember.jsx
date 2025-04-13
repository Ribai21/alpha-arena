import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Modellay from "../../Model/Modellay";
import Memberdata from "../Adminpages/Memberdata/Clientdata";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Import Framer Motion

const Addmember = () => {
  const [user, setUser] = useState([]); 
  const [filteruser, setFilterUser] = useState([]); 
  const [isopen, setIsopen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users
  const getAllusers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
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
        user.address.toLowerCase().includes(searchText) ||
        user.program.toLowerCase().includes(searchText) ||
        user.age.toLowerCase().includes(searchText)
    );
    setFilterUser(filteredUsers);
  };

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are You Sure!!");
    if (isConfirm) {
      try {
        const res = await axios.delete(`http://localhost:5000/users/${id}`);
        if (res.status === 200) {
          const updatedUsers = user.filter((user) => user.id !== id);
          setUser(updatedUsers);
          setFilterUser(updatedUsers);
          toast.success("User Deleted Successfully!");
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

  //Date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container p-4 w-full">
      <h3 className="text-4xl font-bold mb-4 text-white">
        <span className="stroke-text">Manage</span> Member
      </h3>

      {/* Search Input and Add Button */}
      <div className="flex justify-between  mb-4">
        <input
          type="search"
          placeholder="Search here"
          className="border p-2 w-[65%] outline-none mb-2 "
          onChange={handleSearch}
        />
      </div>

      {/* Table Container with Scroll */}
      <div className="max-h-[450px] container overflow-auto">
        <table className="min-w-full text-center">
          <thead className="sticky top-0 z-30 text-orange-400">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Membership Type</th>
              <th className="py-3 px-4">Mobile</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Joined Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-black overflow-scroll">
            {Array.isArray(filteruser) && filteruser.length > 0 ? (
              filteruser.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }} // Start lower (20px down)
                  animate={{ opacity: 1, y: 0 }} // Move to normal position
                  transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
                  className="hover:bg-orange-500 border-b hover:bg-opacity-5"
                >
                  <td className="py-2 px-4 text-white font-semibold capitalize">{index + 1}</td>
                  <td className="py-2 px-4 text-white font-semibold capitalize">{user.name}</td>
                  <td className="py-2 px-4 text-white font-semibold capitalize">{user.age}</td>
                  <td className="py-2 px-4 text-white font-semibold capitalize">{user.address}</td>
                  <td className="py-2 px-4 text-white font-semibold capitalize">{user.program}</td>
                  <td className="py-2 px-4 text-white font-semibold capitalize">{user.mobile}</td>
                  <td className="py-2 px-4 text-white font-semibold capitalize">{user.membership_type}</td>
                  <td className="py-2 px-4 text-white font-semibold">{user.email}</td>
                  <td className="py-2 px-4 text-white font-semibold capitalize">{formatDate(user.join_date)}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <IconButton onClick={() => handleDelete(user.id)} aria-label="delete">
                      <DeleteIcon className="text-red-900" />
                    </IconButton>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
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
              <Memberdata
                handleclose={handleclose}
                existingData={selectedUser}
                isEdit={!!selectedUser}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Addmember;
