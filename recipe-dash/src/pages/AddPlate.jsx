import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPlate = () => {
    const navigate = useNavigate();
    const isChef = useSelector((state) => state.user.isChef); // Get isChef from Redux

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cuisineTag: "",
        price: "",
        discount: "",
        pictureLink: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/plates/add", formData);
            setMessage(response.data);
            navigate("/"); // Redirect to another page after successful addition
        } catch (error) {
            setMessage(error.response?.data || "An error occurred.");
        }
    };

    // Restrict access to chefs only
    if (!isChef) {
        return <h2>You are not authorized to access this page.</h2>;
    }

    return (
        <div className="container mt-5">
            <h2>Add Plate</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Plate Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="cuisineTag" className="form-label">Cuisine Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cuisineTag"
                        name="cuisineTag"
                        value={formData.cuisineTag}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="discount" className="form-label">Discount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pictureLink" className="form-label">Picture Link</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pictureLink"
                        name="pictureLink"
                        value={formData.pictureLink}
                        onChange={handleChange}
                    />
                </div>
                {message && <p className="text-success">{message}</p>}
                <button type="submit" className="btn btn-primary">Add Plate</button>
            </form>
        </div>
    );
};

export default AddPlate;