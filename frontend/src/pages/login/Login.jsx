import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { isProfileComplete } = response.data;

        // Save user details in local storage (optional)
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isProfileComplete", isProfileComplete);

        if (isProfileComplete) {
          navigate("/home"); // Redirect to dashboard if profile is complete
        } else {
          navigate("/home"); // Redirect to profile page if profile is incomplete
        }
      }
    } catch (err) {
      console.error("Error logging in:", err.response?.data?.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <h1 className="header-topics">Login to your Account</h1>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot Your Password?</a>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don’t Have an Account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
