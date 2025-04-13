import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaUsers, FaUserCheck, FaDollarSign } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import axios from "axios";

const Dashboard = () => {
  const [selectedGraph, setSelectedGraph] = useState("revenue");
  const [revenueFilter, setRevenueFilter] = useState("monthly");
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/transaction"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };
    fetchPaymentStatus();
  }, []);

  const revenueData = {
    monthly: [
      { name: "Jan", revenue: 18000, profit: 5400 },
      { name: "Feb", revenue: 20800, profit: 6240 },
      { name: "Mar", revenue: 90200, profit: 10860 },
      { name: "Apr", revenue: 24400, profit: 8540 },
      { name: "May", revenue: 29200, profit: 10220 },
      { name: "Jun", revenue: 27200, profit: 9520 },
    ],
    yearly: [
      { name: "2020", revenue: 300000, profit: 154080 },
      { name: "2021", revenue: 400000, profit: 154900 },
      { name: "2022", revenue: 550000, profit: 44500 },
      { name: "2023", revenue: 700000, profit: 540560 },
      { name: "2023", revenue: 307000, profit: 40560 },
      { name: "2023", revenue: 200000, profit: 340560 },
    ],
  };

  const membersData = [
    { name: "Members", total: 300, active: 175, inactive: 125 },
  ];

  const trainersData = [
    { name: "Active Trainers", value: 75 },
    { name: "Inactive Trainers", value: 25 },
  ];

  const feesData = [
    { name: "Fees Paid", value: 900000 },
    { name: "Dues", value: 150000 },
  ];

  return (
    <div className="p-6  w-full !h-screen  overflow-y-scroll ">
      <h2 className="text-3xl font-bold text-white mb-6">
        <span className="stroke-text">Gym</span> Dashboard
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
        <div
          className="px-6 py-4 hover:opacity-60 hover:scale-105 bg-green-500  flex-1 items-center flex flex-col gap-2 text-white  rounded"
          onClick={() => setSelectedGraph("revenue")}
        >
          <GiTakeMyMoney size={34} />
          Revenue
        </div>
        <div
          className="px-6 py-4 hover:opacity-60 hover:scale-105 bg-blue-500 flex-1 items-center flex flex-col gap-2 text-white rounded"
          onClick={() => setSelectedGraph("members")}
        >
          <FaUsers size={34} />
          Members
        </div>
        <div
          className="px-6 py-4 hover:opacity-60 hover:scale-105 bg-red-500 flex-1 items-center flex flex-col gap-2 text-white rounded"
          onClick={() => setSelectedGraph("trainers")}
        >
          <FaUserCheck size={34} />
          Trainers
        </div>
        <div
          className="px-6 py-4 hover:opacity-60 hover:scale-105 bg-purple-500 flex-1 items-center flex flex-col gap-2 text-white rounded"
          onClick={() => setSelectedGraph("fees")}
        >
          <FaDollarSign size={34} />
          Fees
        </div>
      </div>

      <div className="w-full">
        {selectedGraph === "revenue" && (
          <div className="mb-4 flex  justify-center">
            <button
              className="px-4 py-2 bg-white rounded mx-2"
              onClick={() => setRevenueFilter("monthly")}
            >
              Monthly
            </button>
            <button
              className="px-4 py-2 bg-white hover:bg-gradient-to-bl from-red-100/20 to-red-400 rounded mx-2"
              onClick={() => setRevenueFilter("yearly")}
            >
              Yearly
            </button>
          </div>
        )}
      </div>
        <div className="bg-white p-6  sm:w-full rounded  shadow-md">
          {selectedGraph === "revenue" && (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={revenueData[revenueFilter]}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    axisLine={{ stroke: "#999" }}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={{ stroke: "#999" }}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                    labelFormatter={(label) =>
                      `${
                        revenueFilter === "monthly" ? "Month" : "Year"
                      }: ${label}`
                    }
                    contentStyle={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                    }}
                    animationDuration={300}
                  />
                  <Legend verticalAlign="top" />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1976d2"
                    strokeWidth={3}
                    name="Revenue"
                    dot={{ r: 5, strokeWidth: 2 }}
                    activeDot={{
                      r: 5,
                      stroke: "#1976d2",
                      strokeWidth: 1,
                      fill: "#fff",
                    }}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#e91e63"
                    strokeWidth={3}
                    name="Profit"
                    dot={{ r: 5, strokeWidth: 2 }}
                    activeDot={{
                      r: 5,
                      stroke: "#e91e63",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                    animationBegin={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedGraph === "members" && (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={membersData}
                  margin={{
                    top: 0,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={45}
                  barGap={90}
                >
                  <CartesianGrid strokeDasharray="9 9" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total Members" />
                  <Bar dataKey="active" fill="#82ca9d" name="Active Members" />
                  <Bar
                    dataKey="inactive"
                    fill="#ff8042"
                    name="InActive Members"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedGraph === "trainers" && (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip
                    formatter={(value, name) => [`${value}`, `${name}`]}
                  />
                  <Legend />
                  <Pie
                    data={trainersData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#ff5722" />
                    <Cell fill="#ccc" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedGraph === "fees" && (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip
                    formatter={(value, name) => [`${value}`, `${name}`]}
                  />
                  <Legend />
                  <Pie
                    data={feesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="green" />
                    <Cell fill="red" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      <div className="flex gap-7 mt-5 w-full">
        <div className="w-full bg-white p-4 rounded min-h-[350px] sm:w-[50%] overflow-scroll shadow-md">
          <header className="text-2xl font-bold mb-2  border-b-[2px] border-orange-400 pb-3">
            Transaction List
          </header>
          
          {users.map((user,index) => (
            <div key={index} className="flex flex-col justify-center  mt-2">
              <span className="flex justify-between capitalize font-bold text-sm sm:text-lg ">
                {user.name} <span className="text-xs sm:text-sm font-semibold">{new Date(user.payment_date).toLocaleDateString()}</span>
              </span>
              <span className="text-xs">{user.mobile}</span>
            </div>
          ))}
        </div>
        {/* <div className="w-[50%]"></div> */}
      </div>
    </div>
  );
};

export default Dashboard;
