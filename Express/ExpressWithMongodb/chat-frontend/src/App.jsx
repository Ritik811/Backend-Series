import { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { Dashboard } from "./components/Dashboard"; // 🔥 Naya dashboard import kiya
import "./App.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔄 Page load hote hi check karo ki kya user pehle se logged in hai?
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // 🎯 Agar user login ho chuka hai, toh direct Dashboard dikhao
  if (isLoggedIn) {
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  // 🎯 Agar logged in nahi hai, toh Auth Screens (Login/Register) dikhao
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {isLogin ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Registration />
      )}

      <div style={{ marginTop: "16px" }}>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
            margin: 0,
          }}
        >
          {isLogin ? "Naye user ho? " : "Pehle se account hai? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              fontWeight: "bold",
              marginLeft: "4px",
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {isLogin ? "Register Karo" : "Login Karo"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default App;
