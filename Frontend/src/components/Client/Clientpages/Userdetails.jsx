import { useState, useEffect } from "react";
import axios from "axios";
import Modellay from "../../Model/Modellay";
import Userprofile from "./Userprofile";
import { MdPerson } from "react-icons/md";
import { GiMuscleUp } from "react-icons/gi";
import { RiVipCrownFill } from "react-icons/ri"; // VIP Crown - Premium Membership Icon
import SplitText from "../../Text/Split";

const Userdetails = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="p-6 bg-grey-400  max-h-screen overflow-y-scroll w-full">
      {user ? (
        <div className="bg-grey-400   p-6  w-full ">
          {/* <h2 className="text-3xl font-bold text-center capitalize mb-6">Welcome {user.name}!! </h2> */}
          <h2 className="">
            <SplitText
              text={`Welcome Back, ${user.name}!!`}
              className="text-3xl text-white font-semibold capitalize font-stix text-center"
              delay={150}
              animationFrom={{
                opacity: 0,
                transform: "translate3d(0,-50px,0)",
              }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
          </h2>
          <div className="flex flex-col items-center">
            <img
              src={
                user.image
                  ? `http://localhost:5000/${user.image}`
                  : "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 bg-cover border-orange-500"
            />

          
          </div>

          <div className="bg-orange-500 text-black p-3 rounded-md flex justify-between mt-4">
            <span className="font-bold flex gap-2">
              <MdPerson size={24} /> Personal Information
            </span>
          
          </div>

          <div className="mt-4">
            <p className="text-white capitalize">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-white">
              <strong>Phone:</strong> {user.mobile}
            </p>
            <p className="text-white">
              <strong>Age:</strong> {user.age}
            </p>
            <p className="text-white capitalize">
              <strong>gender:</strong> {user.gender}
            </p>
            <p className="text-white">
              <strong>Email ID:</strong> {user.email}
            </p>
            <p className="text-white"><strong>Address:</strong> {user.address}</p>
          </div>

          <div className="bg-orange-500 text-black p-3 rounded-md flex justify-between mt-4">
            <span className="font-bold flex gap-2">
              <GiMuscleUp size={24} />
              Fitness Information
            </span>
          </div>
          <div className="mt-4">
            <p className="text-white">
              <strong>Fitness Goals:</strong>{" "}
              {typeof user.fitness_goals === "string"
                ? JSON.parse(user.fitness_goals).join(", ")
                : user.fitness_goals?.join(", ") || "N/A"}
            </p>

            <p className="text-white capitalize">
              <strong>Medical Condition:</strong> {user.medical_conditions}
            </p>
          </div>
          <div className="bg-orange-500 text-black p-3 rounded-md flex justify-between mt-4">
            <span className="font-bold flex gap-2">
              <RiVipCrownFill size={24} />
              MemberShip Information
            </span>
          </div>
          <div className="mt-4">
            <p className="text-white">
              <strong>MemberShip Type:</strong> {user.membership_type}
            </p>
            <p className="text-white capitalize"><strong>Program:</strong> {user.program}</p>
          </div>

          {/* <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-orange-500 text-white mt-4 py-2 rounded-md font-bold"
          >
            Edit
          </button> */}
        </div>
      ) : (
        <Userprofile/>
      )}

      {/* {isOpen && (
        <Modellay
          handleclose={() => setIsOpen(false)}
          name={"Edit Profile"}
          content={<Userprofile user={user} />}
        />
      )} */}
    </div>
  );
};

export default Userdetails;