import { useState } from "react";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import "./App.css";

const App = () => {
  // 'isLogin' state handle karegi ki login dikhana hai ya register
  const [isLogin, setIsLogin] = useState(true);

  return (
    // 🎯 WARNING FIXED: Material UI Box hata kar standard HTML div aur inline styles lagaye
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
      {/* 1. State ke basis par component render hoga */}
      {isLogin ? <Login /> : <Registration />}

      {/* 2. Toggle karne ke liye niche ek chota sa button */}
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
