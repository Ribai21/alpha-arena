import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBars,
  FaChartBar,
  FaClipboardList,
  FaUserPlus,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaDumbbell,
  FaSignOutAlt,
  FaAngleDown,
  FaUsers,
  FaHome,
} from "react-icons/fa";
import { TbReportAnalytics,TbBrandMiniprogram  } from "react-icons/tb";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Logo from "../../assets/ogbrand.png";
import { toast } from "react-toastify";
import { BsMegaphoneFill } from "react-icons/bs";
const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({
    attendance: false,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!document.getElementById("sidebar").contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { path: "/", icon: <FaHome size={27} />, label: "Home" },
    { path: "dashboard", icon: <FaChartBar size={27} />, label: "Dashboard" },
    { path: "addmember", icon: <FaUserPlus size={27} />, label: "Manage Member" },
    { path: "fees", icon: <FaMoneyBillWave size={27} />, label: "Fees" },
    { path: "addtrainer", icon: <FaUserPlus size={27} />, label: "Manage Trainer" },
    { path: "equip", icon: <FaDumbbell size={27} />, label: "Equipment" },
    { path: "report", icon: <TbReportAnalytics size={27} />, label: "Report" },
    { path: "program", icon: <TbBrandMiniprogram size={27} />, label: "Program" },
    { path: "announce", icon: <BsMegaphoneFill size={27} />, label: "Announcement" },
  ];

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])),
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleLogout = () => {
    if(localStorage.getItem("admin")){
      localStorage.removeItem("admin"); 
      if (!localStorage.getItem("admin")) {
        toast.success("Logged out successfully!");
        navigate("/");
      } else {
        toast.error("Logout failed!");
      }
    }
    else{
      toast.error("Login First")
    }
  };
  

  return (
    <div className="flex border-2 shadow-2xl h-screen border-orange-400">
      <div
        id="sidebar"
        className={`text-white h-screen p-5 pt-8 duration-300 bg-blur flex-shrink-0 ${
          isOpen ? "w-64" : "w-20"
        } overflow-y-auto flex flex-col justify-between`}
      >
        <div>
          <img src={Logo} className={`w-[140px] ms-9 mb-5 ${!isOpen && "hidden"}`} alt="" />
          <div className="flex justify-between items-center mb-10">
            <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>
              Admin
            </h1>
            <FaBars
              className="text-2xl ms-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          {/* Menu start */}
          <ul className="space-y-2">
            
            <li
              className="relative"
              onClick={() => isOpen && toggleDropdown("attendance")}
            >
              <Tooltip title="Attandance" arrow placement="right">
                <div className="flex items-center space-x-4 p-2 hover:bg-orange-600 rounded-md cursor-pointer">
                  <FaClipboardCheck size={27} className="shrink-0" />
                  <div className="flex justify-between items-center w-full">
                    <span className={`${!isOpen && "hidden"}`}>Attendance</span>
                    {isOpen && (
                      <FaAngleDown
                        className={`transform transition-transform duration-300 ${
                          openDropdowns.attendance ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </Tooltip>
              {isOpen && openDropdowns.attendance && (
                <ul className="rounded-md mt-1 py-2">
                  <Tooltip title="trainer Att.." arrow placement="right">
                    <li className="px-4 py-2 hover:bg-orange-600">
                      <Link
                        to="traineratt"
                        className="flex items-center space-x-2"
                      >
                        <FaUser size={27} className="shrink-0" />
                        <span>Trainer Attendance</span>
                      </Link>
                    </li>
                  </Tooltip>
                  <Tooltip title="Client Att.." arrow placement="right">
                  <li className="px-4 py-2 hover:bg-orange-600">
                    <Link to="clientatt" className="flex items-center space-x-2">
                      <FaUsers size={27} className="shrink-0" />
                      <span>Client Attendance</span>
                    </Link>
                  </li>
                  </Tooltip>
                </ul>
              )}
            </li>

            {menuItems.map((item, index) => (
              <Tooltip key={index} title={item.label} arrow placement="right">
                <li
                  
                  className="flex items-center space-x-4 p-2 hover:bg-orange-600 rounded-md cursor-pointer"
                >
                  <Link
                    to={item.path}
                    className="flex items-center space-x-2 w-full"
                  >
                    {item.icon}
                    <span className={`${!isOpen && "hidden"}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              </Tooltip>
            ))}
          </ul>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center space-x-4 p-2 mt-4 rounded-md cursor-pointer hover:bg-red-600 transition-colors duration-300"
        >
          <FaSignOutAlt size={27} />
          <span className={`${!isOpen && "hidden"}`}>Logout</span>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default Sidebar;
