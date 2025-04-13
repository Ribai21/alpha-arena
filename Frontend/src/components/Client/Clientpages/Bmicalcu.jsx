import { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !height || !age || !gender) {
        alert("All fields are required");
        return;
      }
      const heightInMeters = height / 100;
      let bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      determineBMICategory(bmiValue, gender, age);
  };

  const determineBMICategory = (bmiValue, gender, age) => {
    if(!weight||!height||!age||!gender){
        alert("required all field")
    }
    else{
        if (age < 18) {
            setCategory("BMI classification varies for children");
            return;
          }
          if (gender === "male") {
            if (bmiValue < 18.5) setCategory("Underweight");
            else if (bmiValue < 24.9) setCategory("Normal weight");
            else if (bmiValue < 29.9) setCategory("Overweight");
            else setCategory("Obese");
          } else {
            if (bmiValue < 18.5) setCategory("Underweight");
            else if (bmiValue < 24.4) setCategory("Normal weight");
            else if (bmiValue < 29.9) setCategory("Overweight");
            else setCategory("Obese");
          }
        };
    }

  const getCategoryColor = () => {
    if (category === "Normal weight") return "bg-green-500";
    if (category === "Overweight" || category === "Obese") return "bg-red-500";
    if (category === "Underweight") return "bg-orange-500";
    return "bg-white/20";
  };

  return (
    <div className=" mx-auto w-[500px] p-5 backdrop-blur-lg shadow-lg mt-5 border-2 border-orange-500">

      <h2 className="text-2xl font-bold mb-4 text-center">BMI Calculator</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium ">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2   mt-1  outline-none bg-transparent border-b-2 border-orange-500"
          placeholder="Enter weight"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium ">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 mt-1 outline-none bg-transparent border-b-2 border-orange-500"
          placeholder="Enter height"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium ">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2  mt-1 outline-none text-black bg-transparent border-b-2 border-orange-500"
          placeholder="Enter age"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium  ">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2  mt-1 outline-none bg-transparent border-b-2 border-orange-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        
      </div>
      
      <button
        onClick={calculateBMI}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Calculate BMI
      </button>
      {bmi && (
        <div className={`mt-4 p-4 rounded-lg text-center text-white ${getCategoryColor()}`}>
          <p className="text-lg font-semibold">Your BMI: {bmi}</p>
          <p className="text-sm">Category: {category}</p>
        </div>
      )}
    </div>
  );
}
