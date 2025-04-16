import React, { useEffect, useState } from "react";
import axios from "axios";

const CAnnouncement = () => {
  const [messages, setMessages] = useState([]);

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

  return (
    <div className="p-5 w-full">
      <h2 className="text-4xl font-bold text-white mb-3">
        <span className="stroke-text">Announcement</span> Board
      </h2>

      {/* Table */}
      <table className="min-w-full   text-center">
        <thead className=" sticky top-0 z-30 text-white">
          
            <th className="py-3 px-4 text-lg text-orange-400">Message</th>
            <th className="py-3 px-4 text-lg text-orange-400">S.No</th>
            <th className="py-3 px-4 text-lg text -orange-400">Posted At</th>
          
        </thead>
        <tbody className="text-black  overflow-scroll  ">
          {messages.length > 0 ? (messages.map((msg,index) => (
            <tr key={msg.id} className="hover:bg-orange-500 border-b hover:bg-opacity-25">
              <td className="py-2 px-4  text-white font-semibold capitalize">{index+1}</td>
              <td className="py-2 px-4  text-white font-semibold capitalize">{msg.message}</td>
              <td className="py-2 px-4  text-white font-semibold capitalize">{new Date(msg.created_at).toLocaleString()}</td>
            </tr>
          ))):( 
          <tr  className="text-2xl opacity-50">
            <td colSpan="10" className="py-2 px-4  text-white text-center font-semibold capitalize">No Messages</td></tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default CAnnouncement;
