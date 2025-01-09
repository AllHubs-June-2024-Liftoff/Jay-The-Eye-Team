import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import { login } from "../store/userSlice"; // Import the login action from your Redux slice

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleChefLogin = () => {
        dispatch(login({ nameFirst: "Chef", isChef: true }));
        navigate("/");
    };
    const handleUserLogin = () => {
        dispatch(login({ nameFirst: "John", isChef: false }));
        navigate("/");
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            // API call to login the user
            const response = await axios.post("http://localhost:8080/api/login", formData);

            // Extract user data from the response
            const { nameFirst, email, isChef } = response.data;

            // Update Redux store
            dispatch(
                login({
                    email,
                    nameFirst,
                    loginStatus: true,
                    isChef,
                })
            );

            // Redirect to the homepage
            navigate("/");
        } catch (error) {
            // Display error message on failure
            setErrorMessage(
                error.response?.data || "Invalid username or password. Please try again."
            );
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">Login</button>
                <button onClick={handleChefLogin}>Login as Chef</button>
                <button onClick={handleUserLogin}>User Login</button>
                <div className="mt-3">
                    <p>
                        Don’t have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
