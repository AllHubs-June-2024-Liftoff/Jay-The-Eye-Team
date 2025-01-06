import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Plate from "./Plate";
import PlateList from '../components/plates/PlateList';

const Homepage = () => {
    const isChef = useSelector((state) => state.user.isChef); // Check chef status from Redux
    const [plates, setPlates] = useState([]);
    const [editingPlate, setEditingPlate] = useState(null); // Tracks the plate being edited

    // Fetch plates from backend
    useEffect(() => {
        const fetchPlates = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/plates/");
                setPlates(response.data);
            } catch (error) {
                console.error("Error fetching plates:", error);
            }
        };

        fetchPlates();
    }, []);

    // Handle input change for editable fields
    const handleInputChange = (e, plateId) => {
        const { name, value } = e.target;
        setPlates((prevPlates) =>
            prevPlates.map((plate) =>
                plate.id === plateId ? { ...plate, [name]: value } : plate
            )
        );
    };

    // Save the updated plate to the backend
    const handleSave = async (plate) => {
        try {
            await axios.post(`http://localhost:8080/api/plates/add`, plate); // Use the appropriate backend endpoint for updating
            setEditingPlate(null); // Exit editing mode
        } catch (error) {
            console.error("Error saving plate:", error);
        }
    };

    // Delete a plate
    const handleDelete = async (plateId) => {
        try {
            await axios.delete(`http://localhost:8080/api/plates/${plateId}`);
            setPlates((prevPlates) => prevPlates.filter((plate) => plate.id !== plateId));
        } catch (error) {
            console.error("Error deleting plate:", error);
        }
    };

    return (
        <div className="container mt-5">

            <h2>Menu Items</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Discount</th>
                        {isChef && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {plates.map((plate) => (
                        <tr key={plate.id}>
                            <td>
                                <img
                                    src={plate.pictureLink}
                                    alt={plate.name}
                                    style={{ width: "300px", height: "300px" }}
                                />
                            </td>
                            <td>
                                {isChef && editingPlate === plate.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={plate.name}
                                        onChange={(e) => handleInputChange(e, plate.id)}
                                    />
                                ) : (
                                    plate.name
                                )}
                            </td>
                            <td>
                                {isChef && editingPlate === plate.id ? (
                                    <textarea
                                        name="description"
                                        value={plate.description}
                                        onChange={(e) => handleInputChange(e, plate.id)}
                                    />
                                ) : (
                                    plate.description
                                )}
                            </td>
                            <td>
                                {isChef && editingPlate === plate.id ? (
                                    <input
                                        type="number"
                                        name="price"
                                        value={plate.price}
                                        onChange={(e) => handleInputChange(e, plate.id)}
                                    />
                                ) : (
                                    `$${plate.price}`
                                )}
                            </td>
                            <td>
                                {isChef && editingPlate === plate.id ? (
                                    <input
                                        type="number"
                                        name="discount"
                                        value={plate.discount}
                                        onChange={(e) => handleInputChange(e, plate.id)}
                                    />
                                ) : (
                                    `${plate.discount * 100}%`
                                )}
                            </td>
                            {isChef && (
                                <td>
                                    {editingPlate === plate.id ? (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleSave(plate)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setEditingPlate(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => setEditingPlate(plate.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(plate.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Container sx={{ height: '100px' }} />
            <Container>
              <PlateList />
            </Container>
        </div>
    );
};

export default Homepage;
