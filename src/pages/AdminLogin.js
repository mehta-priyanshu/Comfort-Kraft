import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css"; 

const AdminLogin = ({onLogin}) => {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  // For demo, hardcoded admin password:
  const ADMIN_PASSWORD = "admin123"; // change this to a secure password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
      navigate("/admin/panel");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="admin-login-container" style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            required
            placeholder="Enter admin password"
            style={{ width: "100%", padding: "8px", fontSize: "1rem", marginTop: "8px", marginBottom: "12px" }}
          />
        </label>
        <button type="submit" style={{ padding: "10px 20px", fontSize: "1rem" }}>
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
