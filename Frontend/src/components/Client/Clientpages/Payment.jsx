import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Payment = () => {
  const [data, setData] = useState({
    email: "",
    mobile: "",
    program: "",
    plan: "",
  });
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState(null); // Store user ID after fetching
  const [loading, setLoading] = useState(false);

  // Get mobile number from local storage (ensure it's a valid string)
  const storedMobile = localStorage.getItem("userMobile") || "";
  useEffect(() => {
    if (storedMobile) {
      axios
        .get(`http://localhost:5000/api/getUserByMobile/${storedMobile}`)
        .then((res) => {
          if (res.data.user) {
            setUserId(res.data.user.id); // ✅ This is the correct user ID
            setData((prev) => ({
              ...prev,
              mobile: res.data.user.mobile,
              email: res.data.user.email, // Autofill email if needed
            }));
          } else {
            toast.error("User not found. Please check your mobile number.");
          }
        })
        .catch(() => toast.error("Error fetching user data."));
    }
  }, [storedMobile]);
  
  const pricing = {
    "Fat Loss": {
      "1 Month": 1000,
      "3 Months": 2500,
      "6 Months": 4500,
      "1 Year": 8000,
    },
    "Muscle Building": {
      "1 Month": 1200,
      "3 Months": 3000,
      "6 Months": 5000,
      "1 Year": 9000,
    },
    Cardio: {
      "1 Month": 800,
      "3 Months": 2000,
      "6 Months": 3500,
      "1 Year": 6000,
    },
    Calisthenics: {
      "1 Month": 1100,
      "3 Months": 2800,
      "6 Months": 4800,
      "1 Year": 8500,
    },
  };

  const updateAmount = (program, plan) => {
    setAmount(program && plan ? pricing[program]?.[plan] || 0 : 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === "program" || name === "plan") {
        updateAmount(updatedData.program, updatedData.plan);
      }
      return updatedData;
    });
  };
  const payNow = () => {
    if (!data.email || !data.program || !data.plan || !amount) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (!userId) {
      toast.error("User ID not found. Try logging in again.");
      return;
    }

    setLoading(true); // Start loading

    const options = {
      key: "rzp_test_ldEQ9jv6CiiTJn",
      amount: amount * 100,
      currency: "INR",
      name: "Alpha Arena Gym",
      description: "Gym Membership Payment",
      prefill: {
        name: "Alpha Arena",
        email: data.email,
        contact: "+91" + data.mobile,
      },
      handler: async function (response) {
        try {
          await axios.post("http://localhost:5000/api/payment", {
            user_id: userId,
            amount,
            transaction_id: response.razorpay_payment_id,
          });

          toast.success("Payment Successful! Your membership is updated.");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          toast.error(
            "Payment recorded, but there was an issue updating the database."
          );
        } finally {
          setLoading(false);
        }
      },
      theme: { color: "#F37254" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="w-full flex justify-center h-fit">
      <div className="flex flex-col items-center p-6 mt-10 shadow-2xl border-2 border-white max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-orange-700 text-center">
          Gym Membership Payment
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="border border-orange-500 p-2 rounded mb-4 w-72 outline-none"
          value={data.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="mobile"
          placeholder="Enter Your Mobile Number"
          className="border border-orange-500 p-2 rounded mb-4 w-72 outline-none"
          value={data.mobile}
          onChange={handleChange}
          required
        />

        <select
          name="program"
          className="border border-orange-500 p-2 rounded mb-4 w-72 outline-none"
          value={data.program}
          onChange={handleChange}
          required
        >
          <option value="">Select Program Type</option>
          {Object.keys(pricing).map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>

        <select
          name="plan"
          className="border border-orange-500 p-2 rounded mb-4 w-72 outline-none"
          value={data.plan}
          onChange={handleChange}
          required
        >
          <option value="">Select Plan Duration</option>
          {["1 Month", "3 Months", "6 Months", "1 Year"].map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>

        <div className="text-xl font-semibold mb-4 text-orange-800">
          Amount: ₹{amount || "0"}
        </div>

        <button
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition w-72 disabled:opacity-50"
          onClick={payNow}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
