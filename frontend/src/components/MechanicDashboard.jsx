import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MechanicDashboard = () => {
  const [tools, setTools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get("/api/v1/tools/getTool", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTools(res.data.tools);
      } catch (error) {
        alert("Error fetching tools");
      }
    };

    fetchTools();
  }, []);

  console.log("dddd", tools);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md max-w-5xl mx-auto border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Mechanic Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => navigate("/issue-tool")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Issue Tool
          </button>
          <button
            onClick={() => navigate("/return-tool")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Return Tool
          </button>
          <button
            onClick={() => navigate("/issue-register")}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            View Issue Register
          </button>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Available Tools
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool._id} className="text-center">
                  <td className="py-2 px-4 border">{tool.name}</td>
                  <td className="py-2 px-4 border">{tool.category}</td>
                  <td className="py-2 px-4 border">
                    <img
                      src={`http://localhost:4000/${tool.image?.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={tool.name}
                      className="h-12 w-auto mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border">{tool.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
