import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReturnTool = () => {
  const [issues, setIssues] = useState([]);
  const [issueId, setIssueId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("/api/v1/issue/register", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setIssues(res.data.filter((issue) => issue.status === "issued"));
      } catch (error) {
        alert("Error fetching issued tools");
      }
    };
    fetchIssues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/v1/issue/return",
        { issueId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Tool returned successfully");
      navigate("/mechanic");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to return tool");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Return Tool</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            onChange={(e) => setIssueId(e.target.value)}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Issued Tool</option>
            {issues.map((issue) => (
              <option key={issue._id} value={issue._id}>
                {issue.toolId.name} (Issued on{" "}
                {new Date(issue.issueDate).toLocaleDateString()})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
          >
            Return Tool
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnTool;
