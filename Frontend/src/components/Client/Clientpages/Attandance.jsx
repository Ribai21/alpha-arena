import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const mobile = localStorage.getItem("userMobile"); // Get mobile from localStorage

  useEffect(() => {
    if (!mobile) return;

    // Fetch user details using mobile number
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/details/mobile/${mobile}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Fetch attendance records using mobile number
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/attendance/mobile/${mobile}`
        );
        setAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchUserDetails();
    fetchAttendance();
  }, [mobile]);
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

  const presentDays = attendance.filter((record) => record.status === "Present").length;
  const totalDays = attendance.length; 
  const absentDays = totalDays - presentDays; 
  return (
    <div className="p-4 w-full h-screen overflow-y-auto">
      {/* Attendance Summary */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">

        <div className="p-5 rounded-xl hover:bg-green-600/20 hover:scale-105 bg-green-800/30 text-center shadow-lg border border-green-500">
          <h3 className="text-lg font-semibold text-green-400">Present Days</h3>
          <p className="text-3xl font-bold text-white ">{presentDays}</p>
        </div>
        <div className="p-5 rounded-xl hover:bg-red-600/20 hover:scale-105 bg-red-800/30 text-center shadow-lg border border-red-500">
          <h3 className="text-lg font-semibold text-red-400">Absent Days</h3>
          <p className="text-3xl font-bold text-white ">{absentDays}</p>
        </div>
        <div className="p-5 rounded-xl hover:bg-blue-600/20 hover:scale-105 bg-blue-800/30 text-center shadow-lg border border-blue-500">
          <h3 className="text-lg font-semibold text-blue-400">Total Records</h3>
          <p className="text-3xl font-bold text-white ">{totalDays}</p>
        </div>
      </div>
      {/* Attendance Records */}
      <h3 className="text-4xl font-bold text-white mt-4">
        <span className="stroke-text">Attendance</span> Records
      </h3>
      {attendance.length > 0 ? (
        <table className="w-full  mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-lg text-orange-400">Date</th>
              <th className="p-2 text-lg text-orange-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.date} className="border-b">
                <td className="p-2 text-center text-white">
                  {new Date(record.date).toDateString()}
                </td>
                <td className="py-2 px-4  text-center  text-white font-semibold capitalize ">
                  <span
                    className={`px-2 py-1 rounded-2xl  text-sm font-bold ${
                      record.status === "Present"
                        ? "bg-green-600/20 text-green-500 blur-none"
                        : "bg-red-600/20 text-red-900 font-semibold"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

export default Attendance;
