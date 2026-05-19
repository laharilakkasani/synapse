import React, { useState } from "react";

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const BACKEND_URL = window.location.hostname === "localhost" 
    ? "http://localhost:4500" 
    : "https://your-backend-render-url.onrender.com"; // 👈 Swap with your active Render URL

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const path = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const response = await fetch(`${BACKEND_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Auth action failed");

      if (isLogin) {
        localStorage.setItem("quiz_jwt_token", data.token);
        localStorage.setItem("quiz_username", data.username);
        onAuthSuccess();
      } else {
        alert("Account created successfully! Please log in.");
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{isLogin ? "Sign In" : "Sign Up"}</h2>
      
      {error && <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {!isLogin && (
          <input 
            type="text" name="username" placeholder="Username" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            value={formData.username} onChange={handleInputChange} required 
          />
        )}
        <input 
          type="email" name="email" placeholder="Email Address" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          value={formData.email} onChange={handleInputChange} required 
        />
        <input 
          type="password" name="password" placeholder="Password" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          value={formData.password} onChange={handleInputChange} required 
        />
        <button type="submit" disabled={loading} style={{ padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p onClick={() => { setIsLogin(!isLogin); setError(""); }} style={{ color: "#007bff", cursor: "pointer", textAlign: "center", marginTop: "15px" }}>
        {isLogin ? "Need an account? Register here" : "Have an account? Log in here"}
      </p>
    </div>
  );
};

export default AuthPage;