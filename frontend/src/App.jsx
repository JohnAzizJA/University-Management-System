import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import API, { setAuthToken } from "./api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setAuthToken(token);
      API.get("user/")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          setAuthToken(null);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div>
        <h1 className="app-header">University Management</h1>
        <Routes>
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
