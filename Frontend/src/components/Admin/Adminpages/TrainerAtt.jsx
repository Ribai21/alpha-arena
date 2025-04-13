import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
const TrainerAtt = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/trainers")
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCheckInOut = async (trainerId, index) => {
    try {
      const res = await axios.post("http://localhost:5000/check-in-out", {
        trainer_id: trainerId,
      });

      if (res.data.message === "Checked In") {
        // alert("Trainer checked in at: " + res.data.checkInTime);
        setTrainers((prevTrainers) => {
          const updatedTrainers = [...prevTrainers];
          updatedTrainers[index] = {
            ...updatedTrainers[index],
            check_in_time: res.data.checkInTime,
            check_out_time: null,
          };
          return updatedTrainers;
        });
      } else {
        // alert("Trainer checked out at: " + res.data.checkOutTime);
        setTrainers((prevTrainers) => {
          const updatedTrainers = [...prevTrainers];
          updatedTrainers[index] = {
            ...updatedTrainers[index],
            check_out_time: res.data.checkOutTime,
          };
          return updatedTrainers;
        });
      }
    } catch (error) {
      console.error(
        "Error in API call:",
        error.response?.data || error.message
      );
      // alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };
  // date fromat
  const fomatTime = (dateString) => {
    if (!dateString) return "N/A"; // Handle null or undefined dates
    if (!dateString) return "N/A"; // Handle null or undefined dates
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
    
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, 
    });
  };
  return (
    <div className="p-6 w-full">
      <h2 className="text-4xl font-bold text-white gap- mb-4">
        <span className="stroke-text me-1">Trainer</span>Attendance
      </h2>
      <table className="w-full  ">
        <thead className=" sticky top-0 z-30 text-white">
          <th className="py-3 px-4 text-lg text-orange-400">ID</th>
          <th className="py-3 px-4 text-lg text-orange-400">Name</th>
          <th className="py-3 px-4 text-lg text-orange-400 ">Experience</th>
          <th className="py-3 px-4 text-lg text-orange-400 ">Mobile</th>
          <th className="py-3 px-4 text-lg text-orange-400 ">Email</th>
          <th className="py-3 px-4 text-lg text-orange-400 ">Check-In Time</th>
          <th className="py-3 px-4 text-lg text-orange-400 ">Check-Out Time</th>
          <th className="py-3 px-4 text-lg text-orange-400 ">Action</th>
        </thead>
        <tbody className="text-black overflow-scroll  ">
          {trainers.map((trainer, index) => (
             <motion.tr
             key={trainer.id}
             initial={{ opacity: 0, y: 20 }} // Start lower (20px down)
             animate={{ opacity: 1, y: 0 }} // Move to normal position
             transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
             className="hover:bg-orange-500 border-b hover:bg-opacity-5"
           >
              <td className="py-2 px-4   text-white font-semibold capitalize ">
                {index + 1}
              </td>
              <td className="py-2 px-4   text-white font-semibold capitalize ">
                {trainer.name}
              </td>
              {/* <td className="py-2 px-4   text-white font-semibold capitalize ">{trainer.age}</td> */}
              {/* <td className="py-2 px-4   text-white font-semibold capitalize ">{trainer.city}</td> */}
              <td className="py-2 px-4   text-white font-semibold capitalize ">
                {trainer.experience}
              </td>
              <td className="py-2 px-4   text-white font-semibold capitalize ">
                {trainer.mobile}
              </td>
              <td className="py-2 px-4   text-white font-semibold  ">
                {trainer.email}
              </td>
              <td className="py-2 px-4   text-white font-semibold  ">
                {fomatTime(trainer.check_in_time) || "Not Checked In"}
              </td>
              <td className="py-2 px-4   text-white font-semibold  ">
                {fomatTime(trainer.check_out_time) || "Not Checked Out"}
              </td>
              <td className="p-2  py-3 px- ">
                <button
                  className={`rounded whitespace-nowrap p-1 ${
                    trainer.check_out_time
                      ? "bg-white/10 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                  onClick={() => handleCheckInOut(trainer.id, index)}
                >
                  {trainer.check_in_time && !trainer.check_out_time
                    ? "Check Out"
                    : "Check In"}
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerAtt;
