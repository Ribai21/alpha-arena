import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { BsMegaphoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import axios from "axios";

const CDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [announcementCount, setAnnouncementCount] = useState(0);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever the task list updates
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Fetch announcement count from API
  useEffect(() => {
    const fetchAnnouncementCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/announcements/count");
        setAnnouncementCount(response.data.count);
      } catch (error) {
        console.error("Error fetching announcement count:", error);
      }
    };

    fetchAnnouncementCount();
  }, []);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { id: Date.now().toString(), title: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask("");
      setShowAddTask(false);
    }
  };

  // Function to toggle task completion status
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      <div className="p-8  min-h-fit w-full">
        <h1 className="text-3xl text-white mb-5 font-bold"><span className="stroke-text">Fitness</span> Dashboard</h1>
        

        <div className="grid grid-cols-4 gap-6">
          {/* Payment Reminder Card */}
          <div className="bg-red-100 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Payment Reminder</h2>
            <p className="text-4xl font-bold text-red-600">3 days</p>
            <p className="text-gray-600 mb-6">until next payment</p>
            <Link to={"/clientdas/payment"} className="bg-blue-600 text-white px-4 py-2 rounded">
              Pay Now
            </Link>
          </div>
          

          {/* Announcement Card */}
          <div className="p-6 rounded-xl bg-white justify-center shadow flex flex-col items-center">
            <Link to={"/clientdas/message"} className="flex flex-col justify-center items-center gap-2">
              <Badge badgeContent={announcementCount} showZero max={5} color="warning">
                <BsMegaphoneFill size={50} fill="light" />
              </Badge>
              <h1 className="text-2xl">Announcement</h1>
            </Link>
          </div>
        </div>

        {/* Workout Tasks Section */}
        <div className="p-6 mt-5 w-[55%] ms-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Workout Tasks</h2>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
          </div>

          {showAddTask && (
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new task..."
              />
              <button
                onClick={addTask}
                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition-colors"
              >
                Save
              </button>
            </div>
          )}

          {/* Display Task List */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                  <span
                    className={task.completed ? "line-through text-gray-500" : "text-gray-900"}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDashboard;
