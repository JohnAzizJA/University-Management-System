import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>Student Dashboard</h2>
        <div className="nav-user">
          <span>Welcome, {user?.first_name || user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome, {user?.first_name}!</h1>
        <p>Student ID: {user?.student_id}</p>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>My Courses</h3>
            <p>View your enrolled courses</p>
          </div>

          <div className="dashboard-card">
            <h3>Assignments</h3>
            <p>Check pending assignments</p>
          </div>

          <div className="dashboard-card">
            <h3>Grades</h3>
            <p>View your academic performance</p>
          </div>

          <div className="dashboard-card">
            <h3>Schedule</h3>
            <p>Check your class schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;