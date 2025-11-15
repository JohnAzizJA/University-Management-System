import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>Admin Dashboard</h2>
        <div className="nav-user">
          <span>Welcome, {user?.first_name || user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        
        <div className="dashboard-cards">
          <Link to="/admin/users/create" className="dashboard-card">
            <h3>Create New User</h3>
            <p>Register students and staff members</p>
          </Link>

          <Link to="/admin/users" className="dashboard-card">
            <h3>Manage Users</h3>
            <p>View and manage all system users</p>
          </Link>

          <Link to="/admin/students" className="dashboard-card">
            <h3>Students</h3>
            <p>View all student accounts</p>
          </Link>

          <Link to="/admin/staff" className="dashboard-card">
            <h3>Staff</h3>
            <p>View all staff members</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;