import { useState, useEffect } from "react";
import API, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/login.css";
import ErrorBox from "../components/ErrorBox";

export default function login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await API.post("login/", form);
      // backend returns JWT pair: { access, refresh }
      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      setAuthToken(access);
      // fetch current user
      const userRes = await API.get("user/");
      setUser(userRes.data);
      nav("/dashboard");
    } catch (e) {
      setErr(e.response?.data || { detail: "Login failed" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input
            className="login-input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={change}
            required
          />
          <input
            className="login-input"
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={change}
            required
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
        <ErrorBox error={err} onClose={() => setErr(null)} />
      </div>
    </div>
  );
}
