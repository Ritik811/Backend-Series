import { useState } from "react";
import { registerUser } from "../api/chat";

export const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await registerUser(formData);
      if (data.success) {
        setSuccess(data.message);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    // 🎯 WARNING FIXED: class ko className kiya
    <div className="auth-container-box">
      <div className="auth-card">
        <div className="auth-header-title">
          <h2>Create Account 🚀</h2>
          <p>Join Mini Chat to start conversations with friends</p>
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
              placeholder="Choose a unique username (e.g., ritik)"
              required
              autoComplete="off" // 🎯 WARNING FIXED: camelCase autoComplete
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-input-group">
            {/* 🎯 WARNING FIXED: for ko htmlFor kiya */}
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email (e.g., ritik@gmail.com)"
              required
              autoComplete="off" // 🎯 WARNING FIXED: camelCase autoComplete
              value={formData.email}
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
              placeholder="Create a strong password (min 6 chars)"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-auth-submit">
            Register Now
          </button>
        </form>

        <div className="auth-card-footer">
          <p>
            Already have an account? <a href="/chats/login">Login here 🔑</a>
          </p>
          <a href="/chats" className="back-to-dashboard">
            ⬅️ Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};
