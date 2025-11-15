import { useState } from "react";
import API, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import ErrorBox from "../components/ErrorBox";

export default function register({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    role: "STUDENT",
  });
  const [errors, setErrors] = useState(null);
  const nav = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErrors(null);
    try {
      await API.post("register/", form);
      // after successful registration, obtain JWT tokens by logging in
      try {
        const loginRes = await API.post("login/", {
          username: form.username,
          password: form.password,
        });
        const { access, refresh } = loginRes.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        setAuthToken(access);
        if (setUser) {
          const userRes = await API.get("user/");
          setUser(userRes.data);
        }
        nav("/dashboard");
      } catch (e) {
        // if login after register fails, send user to login page
        nav("/login");
      }
    } catch (err) {
      setErrors(err.response?.data || { detail: "Registration failed" });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input
            className="register-input"
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={change}
          />
          <input
            className="register-input"
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={change}
          />
          <input
            className="register-input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={change}
            required
          />
          <input
            className="register-input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
            required
          />
          <input
            className="register-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={change}
            required
          />
          <label
            style={{ display: "block", textAlign: "left", margin: "8px 0 4px" }}
          >
            Role
          </label>
          <input
            className="register-input"
            name="password2"
            type="password"
            placeholder="Confirm Password"
            value={form.password2}
            onChange={change}
            required
          />
          <select
            className="register-input"
            name="role"
            value={form.role}
            onChange={change}
            style={{ height: "40px" }}
          >
            <option value="STUDENT">Student</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="register-button" type="submit">
            Register
          </button>
          <div className="login-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
        <ErrorBox error={errors} onClose={() => setErrors(null)} />
      </div>
    </div>
  );
}
