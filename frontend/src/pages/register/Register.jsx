import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    axios
      .post("http://localhost:5001/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      })
      .then((result) => {
        setSuccess("Account created successfully! You can now log in.");
        
        // Clear input fields after successful registration
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        if (err.response?.data?.message === "User already registered") {
          setError("This email is already registered. Please log in.");
        } else {
          setError(err.response?.data?.message || "User already registered! Please Login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        <h1 className="header-topic">Create your Account</h1>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="inputs-group">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="inputs-group">
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="inputs-group">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputs-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputs-group">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox"/>
              I agree to the Terms and Conditions.
            </label>
          </div>

          <div className="register-footer">
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? "Creating Account..." : "Create My Account"}
            </button>
            <p className="login-link">
              Have an Account?{" "}
              <span onClick={() => navigate("/")}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
