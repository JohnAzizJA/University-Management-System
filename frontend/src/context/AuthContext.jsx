import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../api/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      try {
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user', error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      
      const { access, refresh, user: userData } = response;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.user_type === 'admin',
    isFirstLogin: user?.is_first_login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};