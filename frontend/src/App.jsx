import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import MechanicDashboard from "./components/MechanicDashboard";
import IssueTool from "./components/IssueTool";
import ReturnTool from "./components/ReturnTool";
import IssueRegister from "./components/IssueRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/mechanic" element={<MechanicDashboard />} />
        <Route path="/issue-tool" element={<IssueTool />} />
        <Route path="/return-tool" element={<ReturnTool />} />
        <Route path="/issue-register" element={<IssueRegister />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
