import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const { user, logout } = useAuth();

  const getUserTypeDisplay = () => {
    switch (user?.user_type) {
      case 'professor':
        return 'Professor';
      case 'ta':
        return 'Teaching Assistant';
      case 'admin_staff':
        return 'Administrative Staff';
      default:
        return 'Staff';
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>{getUserTypeDisplay()} Dashboard</h2>
        <div className="nav-user">
          <span>Welcome, {user?.first_name || user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome, {user?.first_name}!</h1>
        <p>Employee ID: {user?.employee_id}</p>
        <p>Department: {user?.department}</p>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>My Classes</h3>
            <p>View and manage your classes</p>
          </div>

          <div className="dashboard-card">
            <h3>Students</h3>
            <p>View student information</p>
          </div>

          <div className="dashboard-card">
            <h3>Assignments</h3>
            <p>Create and grade assignments</p>
          </div>

          <div className="dashboard-card">
            <h3>Schedule</h3>
            <p>View your teaching schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;