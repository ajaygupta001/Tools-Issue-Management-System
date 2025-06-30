import React, { useState, useEffect } from "react";
import axios from "axios";

const IssueRegister = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("/api/v1/issue/register", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setIssues(res.data);
      } catch (error) {
        alert("Error fetching issue register");
      }
    };
    fetchIssues();
  }, []);

  // console.log("dddddd", issues);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Issue Register</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Tool Name</th>
                <th className="py-2 px-4 border">Mechanic Name</th>
                <th className="py-2 px-4 border">Issue Date</th>
                <th className="py-2 px-4 border">Return Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id}>
                  <td className="py-2 px-4 border">{issue.toolId?.name}</td>
                  <td className="py-2 px-4 border">{issue.mechanicId?.name}</td>
                  <td className="py-2 px-4 border">
                    {new Date(issue.issueDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {issue.returnDate
                      ? new Date(issue.returnDate).toLocaleDateString()
                      : "Not Returned"}
                  </td>
                  <td className="py-2 px-4 border capitalize">
                    {issue.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueRegister;
