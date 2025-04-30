import React, { useEffect, useState } from "react";
import "../authentication/Login.css";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import instance from "../axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setCred((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cred.email || !cred.password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      const response = await instance.post("/auth/login/", cred);
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      toast.success("Login successful! Redirecting...");
      navigate('/loader');
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Login failed. Try again.";
        if (error.response.status === 401) {
          toast.error("Incorrect password. Please try again.");
        } else if (error.response.status === 404) {
          toast.error("No account found with this email.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Network error. Please try again.");
      }
      console.error("Login error:", error);
    }
  }

  return (
    <motion.div
      className="div-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        className="login-card"
        onSubmit={handleSubmit}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        <motion.h1
          className="welcom"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Welcome Back!
        </motion.h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email Address"
          value={cred.email}
          onChange={handleChange}
          name="email"
          required
        />

        <label htmlFor="password">Password</label>
        <div className="password-eye">
          <input
            type={showPassword ? "text" : "password"}
            value={cred.password}
            onChange={handleChange}
            placeholder="Enter Password"
            name="password"
            className="input-password"
            required
          />
          {showPassword ? (
            <LiaEye className="see-password" onClick={() => setShowPassword(false)} />
          ) : (
            <LiaEyeSlash className="see-password" onClick={() => setShowPassword(true)} />
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default Login;
