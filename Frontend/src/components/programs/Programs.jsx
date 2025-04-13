// import React from "react";
// import { programsData } from "../../data/programsData";
// import RightArrow from "../../assets/rightArrow.png";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Programs.css";
// import { useNavigate } from "react-router-dom";
// const Programs = () => {
const transition = { type: "spring", duration: 3 };
//   const navigate =useNavigate()

// //   // Check if the user is logged in
//   const isLoggedIn = !!localStorage.getItem("token");

//   const handleJoinClick = () => {
//     if (!isLoggedIn) {
//       toast.error("Please login first!", {
//         position: "top-center",
//         autoClose: 3000,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,

//       });
//     } else {
//       toast("Get Start Your Journey", {
//               position: "top-center",
//               autoClose: 4000,
//               theme: "dark",
//               hideProgressBar: false,
//               closeOnClick: false,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             navigate("/clientdas/payment");
//     }
//   };

//   return (
//     <div className="Programs" id="programs">
//       <div className="programs-header">
//         <span className="stroke-text">Explore our</span>
//         <span>Programs</span>
//         <span className="stroke-text">to shape you</span>
//       </div>
//       <div className="program-categories">
//         {programsData.map((program, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, x: 100 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={transition}
//             className="category"
//           >
//             {program.image}
//             <span>{program.heading}</span>
//             <span>{program.details}</span>
//             <div className="join-now" onClick={handleJoinClick}>
//               <span>Join Now</span>
//               <img src={RightArrow} alt="" />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Programs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RightArrow from "../../assets/rightArrow.png";
import { toast } from "react-toastify";
import "./Programs.css";
import { FaDumbbell,FaFire ,FaBiohazard   } from "react-icons/fa";
import { MdOutlineSportsKabaddi, MdSportsGymnastics } from "react-icons/md";
import { IoMdFitness } from "react-icons/io";
import { GiMuscleUp } from "react-icons/gi";
import { LuBike } from "react-icons/lu";
import { BsPersonArmsUp } from "react-icons/bs";
import { IoFitnessSharp } from "react-icons/io5";



const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();
  const transition = { type: "spring", duration: 3 };

  //   // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/programs")
      .then((res) => setPrograms(res.data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);
  const iconitems = [
    { icon: <IoMdFitness /> },
    { icon: <FaFire  /> },
    { icon: <IoFitnessSharp /> },
    { icon: <BsPersonArmsUp /> },
    { icon: <MdSportsGymnastics /> },
    { icon: <GiMuscleUp /> },
    { icon: <LuBike /> },
    { icon: <FaDumbbell /> },
    { icon: <MdOutlineSportsKabaddi /> },
    { icon: <FaBiohazard  /> },
    
  ];

  const handleJoinClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login first!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast("Get Start Your Journey", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/clientdas/payment");
    }
  };

  return (
    <div className="Programs " id="programs">
      <div className="programs-header">
        <span className="stroke-text">Explore our</span>
        <span>Programs</span>
        <span className="stroke-text">to shape you</span>
      </div>
      <div className="program-categories">
        {programs.map((program, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={transition}
            className="category"
          >
            {/* <span className="text-4xl">{iconitems[i].icon}</span> */}
            <span className="text-4xl">{iconitems[i].icon}</span>

            <span className="whitespace-nowrap text-2xl">
              {program.heading}
            </span>
            <span className="!font-semibold">{program.details}</span>
            <div className="join-now" onClick={handleJoinClick}>
              <span>Join Now</span>
              <img src={RightArrow} alt="" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
