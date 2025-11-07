import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import API, { setAuthToken } from "./api";
import Loading from "./components/Loading";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        try {
          setAuthToken(token);
          const res = await API.get("user/");
          setUser(res.data);
        } catch (error) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAuthToken(null);
    setUser(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
        <h1 className="app-header">University Management</h1>
        <Routes>
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register setUser={setUser} />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
