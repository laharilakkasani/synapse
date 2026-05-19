import React, { useState, useEffect } from "react";
import Quiz from "./component/Quiz";
import AuthPage from "./component/AuthPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("quiz_jwt_token");
    const savedName = localStorage.getItem("quiz_username");
    if (token && savedName) {
      setIsLoggedIn(true);
      setCurrentUser(savedName);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentUser(localStorage.getItem("quiz_username") || "Player");
  };

  const handleLogout = () => {
    localStorage.removeItem("quiz_jwt_token");
    localStorage.removeItem("quiz_username");
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
            <h3 style={{ margin: 0 }}> Quiz</h3>
            <div>
              <span style={{ marginRight: "15px", fontWeight: "bold" }}>User: {currentUser}</span>
              <button onClick={handleLogout} style={{ padding: "5px 12px", cursor: "pointer" }}>Log Out</button>
            </div>
          </header>
          <main style={{ padding: "20px" }}>
            <Quiz />
          </main>
        </>
      ) : (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;