import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        nameFirst: "",
        nameLast: "",
        email: "",
        password: "",
        reEnterPassword: "",
        address: "",
        phone: "",
        isChef: false,
    });

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (formData.password !== formData.reEnterPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                nameFirst: formData.nameFirst,
                nameLast: formData.nameLast,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                phone: formData.phone,
                isChef: formData.isChef,
            });
            setSuccessMessage(response.data);
            navigate("/login");
        } catch (error) {
            setErrorMessage(
                error.response?.data || "An error occurred during registration."
            );
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nameFirst" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameFirst"
                        name="nameFirst"
                        value={formData.nameFirst}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nameLast" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameLast"
                        name="nameLast"
                        value={formData.nameLast}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
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
                <div className="mb-3">
                    <label htmlFor="reEnterPassword" className="form-label">Re-enter Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="reEnterPassword"
                        name="reEnterPassword"
                        value={formData.reEnterPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isChef"
                        name="isChef"
                        checked={formData.isChef}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isChef">
                        Register as a Chef
                    </label>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
