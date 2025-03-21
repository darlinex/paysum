import React, { useEffect, useState } from "react";
import "../authentication/Login.css";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import instance from "../axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
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
        console.log(cred)

        if (!cred.email || !cred.password) {
            toast.error("Please fill in both email and password.");
            return;
        }

        try {
            const response = await instance.post("/auth/login/", cred);
            console.log(response)
            console.log('the token is' + response.data.token)
            localStorage.setItem('ACCESS_TOKEN', response.data.token)
            toast.success("Login successful! Redirecting...");
            navigate('/loader')
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

    useEffect(() => {
        console.log(cred);
    });

    return (
        <div className="div-login">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>Welcome Back</h1>

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

                {/* <Link to={"/loader"}> */}
                <button type="submit">Login</button>
                {/* </Link> */}
            </form>
        </div>
    );
}

export default Login;
