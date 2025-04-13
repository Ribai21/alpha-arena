import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
const ClientAtt = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const markPresent = async (clientId) => {
    try {
      await axios.post("http://localhost:5000/mark-present", {
        client_id: clientId,
      });
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientId ? { ...client, status: "Present" } : client
        )
      );
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="stroke-text">Client</span> Attendance
      </h2>
      <table className="min-w-full   text-center">
        <thead className=" sticky top-0 z-30 text-white">
          <tr>
          <th className="py-3 px-4">ID</th>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Membership Type</th>
          <th className="py-3 px-4">Plan</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-black overflow-scroll">
          {clients.map((client,index) => (
            <motion.tr
            key={client.id}
            initial={{ opacity: 0, y: 20 }} // Start lower (20px down)
            animate={{ opacity: 1, y: 0 }} // Move to normal position
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
            className="hover:bg-orange-500 border-b hover:bg-opacity-5"
          >
              <td className="py-2 px-4  text-white font-semibold capitalize ">
                {index+1}
              </td>
              <td className="py-2 px-4  text-white font-semibold capitalize ">
                {client.name}
              </td>
              <td className="py-2 px-4  text-white font-semibold capitalize ">
                {client.program}
              </td>
              <td className="py-2 px-4  text-white font-semibold capitalize ">
                {client.membership_type}
              </td>
              <td  className="py-2 px-4 text-white font-semibold capitalize ">
                <span
                  className={`px-2 py-1 rounded-2xl  text-sm font-bold ${
                    client.status === "Present" ? "bg-green-600/20 text-green-500 " : "bg-red-600/20 text-red-900 font-semibold"
                  }`}
                >
                  {client.status}
                </span>
              </td>

              <td className="py-2 px-4  text-white font-semibold capitalize ">
                <button
                  className={`${
                    client.status === "Present"
                      ? "bg-white/10 !text-black "
                      : "bg-green-600 hover:bg-green-700"
                  } text-white px-3 py-1 rounded`}
                  onClick={() => markPresent(client.id)}
                  disabled={client.status === "Present"}
                >
                  {client.status === "Present" ? "Present" : "Mark Present"}
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientAtt;



