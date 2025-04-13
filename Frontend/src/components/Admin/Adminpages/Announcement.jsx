import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
const Announcement = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [updatedMessage, setUpdatedMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/messages");
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const addMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const { data } = await axios.post("http://localhost:5000/messages", {
        message: newMessage,
      });
      setMessages([data, ...messages]);
      setNewMessage("");
    } catch (err) {
      console.error("Error adding message:", err);
    }
  };
  const updateMessage = async (id) => {
    if (!updatedMessage.trim()) return;
    try {
      await axios.patch(`http://localhost:5000/messages/${id}`, {
        message: updatedMessage,
      });
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, message: updatedMessage } : msg
        )
      );
      setEditingMessage(null);
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/messages/${id}`);
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <div className="p-5 h-screen w-full">
      <h2 className="text-4xl font-bold text-white mb-3">
        <span className="stroke-text">Announcement</span> Board
      </h2>

      {/* Input field */}
      <div className="sm:flex  gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 outline-none w-[70%] capitalize mb-2 rounded me-auto"
        />
        <button
          onClick={addMessage}
          className="log-submit bg-blue-500 text-white  !h-[44px] !w-[100px]  rounded"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full   text-center">
        <thead className=" sticky top-0 z-30 text-white">
          <th className="py-3 px-4 text-lg text-orange-400">ID</th>
          <th className="py-3 px-4 text-lg text-orange-400">Message</th>
          <th className="py-3 px-4 text-lg text-orange-400">Created At</th>
          <th className="py-3 px-4 text-lg text-orange-400">Actions</th>
        </thead>
        <tbody className="text-black overflow-scroll  ">
          {messages.map((msg,index) => (
             <motion.tr
             key={msg.id}
             initial={{ opacity: 0, y: 20 }} // Start lower (20px down)
             animate={{ opacity: 1, y: 0 }} // Move to normal position
             transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
             className="hover:bg-orange-500 border-b hover:bg-opacity-5"
           >
              <td className="py-2 px-4  text-white font-semibold capitalize">
                {index+1}
              </td>
              <td className="py-2 px-4  text-white font-semibold capitalize">
                {editingMessage === msg.id ? (
                  <input
                    type="text"
                    value={updatedMessage}
                    onChange={(e) => setUpdatedMessage(e.target.value)}
                    className="border outline-none bg-transparent capitalize  p-1 w-full"
                  />
                ) : (
                  msg.message
                )}
              </td>
              <td className="py-2 px-4  text-white font-semibold capitalize">
                {new Date(msg.created_at).toLocaleString()}
              </td>
              <td className="py-2 px-4  text-white font-semibold ">
                {editingMessage === msg.id ? (
                  <button
                    onClick={() => updateMessage(msg.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <IconButton onClick={() =>{ setEditingMessage(msg.id); setUpdatedMessage(msg.message);}} aria-label="edit">
                  <EditIcon className="text-yellow-500" />
                </IconButton>
                )}

                <IconButton
                  onClick={() => deleteMessage(msg.id)}
                  aria-label="delete"
                >
                  <DeleteIcon className="text-red-900" />
                </IconButton>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Announcement;
