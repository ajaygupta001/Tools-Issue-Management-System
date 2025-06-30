import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IssueTool = () => {
  const [tools, setTools] = useState([]);
  const [toolId, setToolId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get("/api/v1/tools/getTool", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTools(res.data.tools);
      } catch (error) {
        alert("Error fetching tools");
      }
    };
    fetchTools();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/v1/issue/issue",
        { toolId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Tool issued successfully");
      navigate("/mechanic");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to issue tool");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Issue Tool</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            onChange={(e) => setToolId(e.target.value)}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Tool</option>
            {tools.map((tool) => (
              <option key={tool._id} value={tool._id}>
                {tool.name} ({tool.quantity} available)
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Issue Tool
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueTool;
