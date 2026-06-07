import { useEffect, useState } from "react";

export const Dashboard = ({ onLogout }) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // 🎯 Browser ki memory se logged-in user ka naam nikala
    const user = localStorage.getItem("username");
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogoutClick = () => {
    // 🎯 Logout par localStorage saaf kiya
    localStorage.removeItem("username");
    onLogout(); // Parent state ko batane ke liye
  };

  return (
    <div
      className="auth-container-box"
      style={{ maxWidth: "800px", width: "90%" }}
    >
      <div
        className="auth-card"
        style={{ textAlign: "center", padding: "40px" }}
      >
        <div className="auth-header-title">
          <h2>
            Welcome to Mini Chat,{" "}
            <span style={{ color: "#007bff" }}>@{currentUser}</span>! 🚀
          </h2>
          <p>Dhasu! Tum successfully login ho chuke ho.</p>
        </div>

        {/* 💬 Dummy Chat UI (Aage hum isme Socket.io lagayenge) */}
        <div
          style={{
            background: "#f9f9f9",
            height: "200px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #ccc",
            margin: "20px 0",
            color: "#888",
          }}
        >
          🔒 Real-time Chat Box (Socket.IO Connection Coming Soon...)
        </div>

        <button
          onClick={handleLogoutClick}
          className="btn-auth-submit"
          style={{ backgroundColor: "#dc3545", marginTop: "10px" }}
        >
          Logout Account 🔑
        </button>
      </div>
    </div>
  );
};
