import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu, selectMenuItems, selectMenuStatus } from "../store/menuSlice";
import PlateList from "../components/plates/PlateList";
import { Box, Divider, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from "@mui/system";
import axios from "axios";
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';

// Styled TextField for custom styling
const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '350px',
    "& .MuiInputLabel-root": {
        color: "black",
        textAlign: 'center',
        "&.Mui-focused": {
            color: "#DAA520",
        },
    },
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#DAA520",
            borderWidth: 3,
        },
        "&.Mui-focused fieldset": {
            borderColor: "#DAA520",
            borderWidth: 4,
        },
        "& .MuiInputLabel-root.Mui-focused": {
            fontSize: '10px',
        },
        '& input': {
            textAlign: 'center',
        },
    },
}));

const Homepage = () => {
    const dispatch = useDispatch();
    const plates = useSelector(selectMenuItems);
    const menuStatus = useSelector(selectMenuStatus);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCuisine, setSelectedCuisine] = useState("all");
    const [cuisines, setCuisines] = useState([{ id: "all", name: "All" }]);

    // Fetch menu on initial load
    useEffect(() => {
        if (menuStatus === "idle") {
            dispatch(fetchMenu());
        }
    }, [menuStatus, dispatch]);

    // Fetch cuisines from the server
    useEffect(() => {
        const fetchCuisines = async () => {
            try {
                const response = await axios.get("http://localhost:8080/cuisines/api");
                const formattedCuisines = [{ id: "all", name: "All" }, ...response.data];
                setCuisines(formattedCuisines);
            } catch (error) {
                console.error("Error fetching cuisines:", error);
            }
        };

        fetchCuisines();
    }, []);

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Handle cuisine filter change
    const handleCuisineChange = (event) => {
        setSelectedCuisine(event.target.value);
    };

    // Filter plates based on search and cuisine selection
    const filteredPlates = plates.filter((plate) => {
        const matchesQuery = plate.name.toLowerCase().includes(searchQuery);
        const matchesCuisine = selectedCuisine === "all" || plate.cuisine?.toLowerCase() === selectedCuisine;
        return matchesQuery && matchesCuisine;
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '100vh',
                paddingTop: '10px',
            }}
        >
            {/* Description Section */}
            <Typography variant="subtitle1" align="center" sx={{ color: "black" }}>
                Skip the hassle of cooking and let us bring the warmth of homemade food to you—wholesome, tasty, and delivered with care!
            </Typography>

            <Divider sx={{
                marginTop: 2,
                marginBottom: 3,
                borderWidth: 3,
                borderColor: 'black',
                width: '100%',
                borderStyle: 'solid',
            }} />

            {/* Search and Cuisine Filter */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                textAlign: 'center',
            }}>
                <Typography align="center" sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#DAA520",
                }}>
                    Search for your next
                </Typography>

                <img
                    src={logoImage}
                    alt="Logo"
                    style={{
                        width: "150px",
                        display: "block",
                    }}
                />

                <Typography align="center" sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#DAA520",
                    marginRight: 10,
                }}>
                    plate
                </Typography>

                <StyledTextField
                    label="Search by plate name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                {/* Cuisine Filter */}
                <FormControl sx={{ marginLeft: 10, width: "200px", backgroundColor: "#DAA520" }}>
                    <InputLabel
                        id="cuisine-select-label"
                        sx={{
                            color: "black",
                            backgroundColor: "transparent",
                            fontWeight: "bold",
                            position: "absolute",
                            top: "-10px",
                        }}
                        shrink
                    >
                        Filter by cuisine
                    </InputLabel>

                    <Select
                        labelId="cuisine-select-label"
                        value={selectedCuisine}
                        onChange={handleCuisineChange}
                    >
                        {cuisines.map((cuisine) => (
                            <MenuItem key={cuisine.id} value={cuisine.name.toLowerCase()}>
                                {cuisine.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Divider sx={{
                marginTop: 2,
                marginBottom: 5,
                borderWidth: 3,
                borderColor: 'black',
                width: '100%',
                borderStyle: 'solid',
            }} />

            {/* Display the filtered plates */}
            <PlateList plates={filteredPlates} />

            {/* Loading/Error States */}
            {menuStatus === "loading" && <p>Loading...</p>}
            {menuStatus === "failed" && <p>Error loading menu.</p>}
        </div>
    );
};

export default Homepage;