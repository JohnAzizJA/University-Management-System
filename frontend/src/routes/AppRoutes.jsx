import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Auth pages
import Login from '../pages/Auth/Login';
import FirstLoginPasswordChange from '../pages/Auth/FirstLoginPasswordChange';

// Admin pages
import AdminDashboard from '../pages/Admin/AdminDashboard';
import CreateUser from '../pages/Admin/CreateUser';

// Student pages
import StudentDashboard from '../pages/Student/StudentDashboard';

// Staff pages
import StaffDashboard from '../pages/Staff/StaffDashboard';

// Error pages
import Unauthorized from '../pages/Auth/Unauthorized';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* First login password change (protected but special) */}
      <Route
        path="/first-login-password-change"
        element={
          <ProtectedRoute>
            <FirstLoginPasswordChange />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/create"
        element={
          <ProtectedRoute adminOnly>
            <CreateUser />
          </ProtectedRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedUserTypes={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Staff routes */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute allowedUserTypes={['staff', 'professor', 'ta']}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Parent routes */}
      <Route
        path="/parent/dashboard"
        element={
          <ProtectedRoute allowedUserTypes={['parent']}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* 404 - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;