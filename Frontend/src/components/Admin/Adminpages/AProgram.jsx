import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const AProgram = () => {
    const [programs, setPrograms] = useState([]);
    const [newProgram, setNewProgram] = useState({ heading: "", details: "" });
    const [editingProgram, setEditingProgram] = useState(null);
    const [updatedProgram, setUpdatedProgram] = useState({ heading: "", details: "" });

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const res = await axios.get("http://localhost:5000/programs");
            setPrograms(res.data);
        } catch (error) {
            console.error("Error fetching programs", error);
        }
    };

    const handleAddProgram = async () => {
      if (!newProgram.heading || !newProgram.details) {
        // alert("Please fill in all fields");
        toast.error("Please fill in all fields");
        return;
      }
      try {
        const res = await axios.post("http://localhost:5000/programs", newProgram);
        setPrograms([...programs, res.data]);
        setNewProgram({ heading: "", details: "" });
      } catch (error) {
        console.error("Error adding program", error);
      }
    };

    const handleEditClick = (program) => {
        setEditingProgram(program.id);
        setUpdatedProgram({ heading: program.heading, details: program.details });
    };

    const handleUpdateProgram = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/programs/${id}`, updatedProgram);
            setPrograms(programs.map(p => (p.id === id ? { ...p, ...updatedProgram } : p)));
            setEditingProgram(null);
        } catch (error) {
            console.error("Error updating program:", error);
        }
    };

    const handleDeleteProgram = async (id) => {
        const isConfirm = window.confirm("Are you sure?");
        if (isConfirm) {
            try {
                await axios.delete(`http://localhost:5000/programs/${id}`);
                setPrograms(programs.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error deleting program", error);
            }
        }
    };

    return (
        <div className="p-4 overflow-scroll">
            <h2 className="text-4xl text-white font-bold mb-4"><span className="stroke-text">Manage</span> Programs</h2>

            {/* Add Program Form */}
            <div className="mb-4 xs:flex-col  sm:flex ">
                <input
                    type="text"
                    placeholder="Program Name"
                    value={newProgram.heading}
                    onChange={(e) => setNewProgram({ ...newProgram, heading: e.target.value })}
                    className="border outline-none mb-1 capitalize p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProgram.details}
                    onChange={(e) => setNewProgram({ ...newProgram, details: e.target.value })}
                    className="border outline-none mb-1 capitalize p-2 mr-2"
                />
                <button onClick={handleAddProgram} className="bg-blue-500   !h-[44px] !w-[160px] log-submit text-white px-4 py-2 rounded">
                    Add Program
                </button>
            </div>

            {/* Display Programs in Table */}
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="py-2 text-orange-400">Program Name</th>
                        <th className="py-2 text-orange-400">Description</th>
                        <th className="py-2 text-orange-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => (
                        <tr key={program.id} className="border-b">
                            <td className="py-2 px-4 text-white">
                                {editingProgram === program.id ? (
                                    <input
                                        type="text"
                                        value={updatedProgram.heading}
                                        onChange={(e) => setUpdatedProgram({ ...updatedProgram, heading: e.target.value })}
                                        className="border outline-none bg-transparent p-1"
                                    />
                                ) : (
                                    program.heading
                                )}
                            </td>
                            <td className="py-2 px-4 text-white">
                                {editingProgram === program.id ? (
                                    <input
                                        type="text"
                                        value={updatedProgram.details}
                                        onChange={(e) => setUpdatedProgram({ ...updatedProgram, details: e.target.value })}
                                        className="border outline-none broder-orange-500 bg-transparent p-1"
                                    />
                                ) : (
                                    program.details
                                )}
                            </td>
                            <td className="py-2 px-4 flex">
                                {editingProgram === program.id ? (
                                    <button
                                        onClick={() => handleUpdateProgram(program.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditClick(program)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteProgram(program.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AProgram;
