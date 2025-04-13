import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChartBar,
  FaClipboardList,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaSignOutAlt,
  FaCalculator,
  FaHome,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import axios from "axios";

import Logo from "../../assets/ogbrand.png";
import Log_img from "../../assets/avatar.jpg"; // Default avatar

const CSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    const savedMobile = localStorage.getItem("userMobile");
    if (savedMobile) {
      setMobile(savedMobile);
      fetchUserDetails(savedMobile);
    }
  }, []);

  const fetchUserDetails = async (mobileNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${mobileNumber}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userMobile");
    toast.success("Logged out successfully!");

    navigate("/");
  };

  const menuItems = [
    { path: "/", icon: <FaHome size={27} />, label: "Home" },
    { path: "dashboard", icon: <FaChartBar size={27} />, label: "Dashboard" },
    { path: "attendance", icon: <FaClipboardCheck size={27} />, label: "Attendance" },
    { path: "payment", icon: <FaMoneyBillWave size={27} />, label: "Payment" },
    { path: "bmicalculator", icon: <FaCalculator size={27} />, label: "BMI Calculator" },
    { path: "report", icon: <FaClipboardList size={27} />, label: "Reports" },
  ];

  return (
    <div className="flex border-2 shadow-2xl h-screen border-orange-400">
      <div
        id="sidebar"
        className={`text-white h-screen p-5 pt-8 duration-300 bg-blur flex-shrink-0 ${
          isOpen ? "w-60" : "w-20"
        } overflow-y-auto flex flex-col justify-between`}
      >
        <div>
          <Link to="editprofile">
          {isOpen && <div className="flex items-center space-x-3">
              <img
                src={user?.image ? `http://localhost:5000/${user.image}` : Log_img}
                alt="User"
                className="w-16 h-16 rounded-full  "
              />
              <h1 className="text-lg capitalize font-bold">{user?.name || "User"}</h1>
            </div>}
          </Link>

          <div className="flex justify-end items-center my-6">
            <FaBars
              className="text-2xl me-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          {/* Menu start */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <Tooltip title={item.label} arrow placement="right" key={index}>
                <li
                  className="flex items-center space-x-4 p-2 hover:bg-orange-600 rounded-md cursor-pointer"
                >
                  <Link to={item.path} className="flex items-center space-x-2 w-full">
                    {item.icon}
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              </Tooltip>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <Tooltip title="Logout" arrow placement="right">
          <div
            onClick={handleLogout}
            className="flex items-center space-x-4 p-2 mt-4 rounded-md cursor-pointer hover:bg-red-600 transition-colors duration-300"
          >
            <FaSignOutAlt size={27} />
            {isOpen && <span>Logout</span>}
          </div>
        </Tooltip>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default CSidebar;
