import React, { useState } from "react";
import "../authentication/Login.css";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import instance from "../axios/axiosinstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"; // Import framer-motion for animations

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password Validation Function
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    return regex.test(password);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password strength
    if (!isPasswordValid(formData.password)) {
      toast.error("Password must be 8-15 characters and include a number & special character.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await instance.post("/auth/signup", {
        email: formData.email,
        password: formData.password,
      });

      toast.success("Signup successful! Please log in.");
      console.log(response.data);
      navigate(`/otp/${formData.email}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="div-login">
      <motion.form
        className="login-card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="signup"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Sign Up
        </motion.h1>

        <motion.label
          
          htmlFor="email"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Email
        </motion.label>
        <motion.input
          type="email"
          placeholder="Enter Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        <motion.label
          htmlFor="password"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Password
        </motion.label>
        <div className="password-eye">
          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-password"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          {showPassword ? (
            <LiaEye className="see-password" onClick={() => setShowPassword(false)} />
          ) : (
            <LiaEyeSlash className="see-password" onClick={() => setShowPassword(true)} />
          )}
        </div>

        <motion.label
          htmlFor="confirmPassword"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Confirm Password
        </motion.label>
        <div className="password-eye">
          <motion.input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="input-password"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
          {showConfirmPassword ? (
            <LiaEye className="see-password" onClick={() => setShowConfirmPassword(false)} />
          ) : (
            <LiaEyeSlash className="see-password" onClick={() => setShowConfirmPassword(true)} />
          )}
        </div>

        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
        >
          Sign up
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Register;
