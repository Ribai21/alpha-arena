import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from 'lucide-react';

const Fees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({}); // Track loading per user

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/payment-status"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };
    fetchPaymentStatus();
  }, []);

  // Payment Reminder Function
  const sendPaymentReminder = async (email, name, userId) => {
    setLoading((prev) => ({ ...prev, [userId]: true })); // Set loading state

    try {
      await axios.post("http://localhost:5000/api/send-payment-reminder", {
        email,
        name,
      });
      alert(`Payment reminder sent to ${name}`);
    } catch (error) {
      console.error("Error sending payment reminder:", error);
      alert("Failed to send reminder. Try again.");
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false })); // Reset loading state
    }
  };

  return (
    <div className="p-4 w-full h-screen">
      <h2 className="text-4xl font-bold mb-4  text-white">
        <span className="stroke-text">Payment</span> Status
      </h2>
      <div className="overflow-scroll">
      <table className="border-collapse w-full m-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-orange-400 text-lg p-2">S.No</th>
            <th className="text-orange-400 text-lg p-2">Name</th>
            <th className="text-orange-400 text-lg p-2">Email</th>
            <th className="text-orange-400 text-lg p-2">Mobile</th>
            <th className="text-orange-400 text-lg p-2">Program</th>
            <th className="text-orange-400 text-lg p-2">Status</th>
            <th className="text-orange-400 text-lg p-2">Alert</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user.id} className="text-center border-b">
              <td className=" text-white p-2">{index+1}</td>
              <td className="capitalize text-white p-2">{user.name}</td>
              <td className="text-white p-2">{user.email}</td>
              <td className="text-white p-2">{user.mobile}</td>
              <td className="text-white p-2">{user.program}</td>
              <td className="py-2 px-4 text-white font-semibold capitalize">
                <span
                  className={`px-2 py-1 rounded-2xl text-sm font-bold ${
                    user.payment_status === "Paid"
                      ? "bg-green-600/20 text-green-500"
                      : "bg-red-600/20 text-red-900 animate-pulse font-semibold"
                  }`}
                >
                  {user.payment_status}
                </span>
              </td>

              <td className="p-2">
                <button
                  disabled={user.payment_status === "Paid" || loading[user.id]}
                  onClick={() => sendPaymentReminder(user.email, user.name, user.id)}
                  className={`px-2 py-1 rounded font-bold overflow-scroll text-white transition ${
                    user.payment_status === "Paid"
                      ? "bg-gray-500 cursor-not-allowed opacity-50"
                      : "bg-red-700 hover:bg-red-800"
                  }`}
                >
                  {loading[user.id] ? <Loader className="animate-spin"/> : "Alert"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Fees;
