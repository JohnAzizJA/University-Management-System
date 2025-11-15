import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      // Check if first login
      if (result.user.is_first_login) {
        navigate('/first-login-password-change');
      } else {
        // Redirect based on user type
        redirectToDashboard(result.user.user_type);
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const redirectToDashboard = (userType) => {
    switch (userType) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'professor':
      case 'ta':
      case 'admin_staff':
        navigate('/staff/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>University Management System</h1>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="help-text">
          Contact your administrator if you've forgotten your password.
        </p>
      </div>
    </div>
  );
};

export default Login;