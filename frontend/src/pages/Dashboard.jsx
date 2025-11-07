import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import { clearAuthToken } from "../api";

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear token and header
    clearAuthToken();
    // notify parent to clear user state if provided
    if (onLogout) onLogout(null);
    // redirect to login
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h1>University Management</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>Welcome, {user?.username}</p>
          <p>Role: {user?.role}</p>
          {user?.role === "ADMIN" && (
            <div style={{ marginTop: 12 }}>
              <strong>Admin:</strong> You can manage users and system settings.
            </div>
          )}
          {user?.role === "STAFF" && (
            <div style={{ marginTop: 12 }}>
              <strong>Staff:</strong> You can access staff resources and manage
              courses.
            </div>
          )}
          {user?.role === "STUDENT" && (
            <div style={{ marginTop: 12 }}>
              <strong>Student:</strong> You can view your courses and grades.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
