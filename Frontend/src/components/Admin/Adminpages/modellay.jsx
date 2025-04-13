import { useState } from "react";

const modellay = ({ handleClose, program, handleSubmit }) => {
  const [formData, setFormData] = useState(
    program ? { heading: program.heading, details: program.details } : { heading: "", details: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (program) {
      handleSubmit(program.id, formData);
    } else {
      handleSubmit(formData);
    }
    handleClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{program ? "Edit Program" : "Add Program"}</h2>
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          placeholder="Program Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default modellay;
