import { useState } from "react";
import { login } from "../api/chat";

export const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await login(formData);
      if (data.success) {
        setSuccess(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        onLoginSuccess();
        console.log("User successfully logged in and saved to local storage!");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="auth-container-box">
      <div className="auth-card">
        <div className="auth-header-title">
          <h2>Welcome Back! 🔑</h2>
          <p>Login to your Mini Chat account to continue</p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div
            style={{
              color: "red",
              backgroundColor: "#ffebee",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "green",
              backgroundColor: "#e8f5e9",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-input-group">
            {/* 🎯 WARNING FIXED: for ko htmlFor kiya */}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username (e.g., ritik)"
              required
              autoComplete="off" // 🎯 WARNING FIXED: camelCase autoComplete
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-input-group">
            {/* 🎯 WARNING FIXED: for ko htmlFor kiya */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your secret password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-auth-submit">
            Sign In
          </button>
        </form>

        <div className="auth-card-footer">
          <p>
            Don't have an account?
            <a href="/chats/register"> Register here 🚀</a>
          </p>
          <a href="/chats" className="back-to-dashboard">
            ⬅️ Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};
