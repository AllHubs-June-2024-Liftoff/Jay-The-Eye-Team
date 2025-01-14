import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu, selectMenuItems, selectMenuStatus } from "../store/menuSlice";
import PlateList from "../components/plates/PlateList";
import { Divider, Typography, TextField } from '@mui/material';

const Homepage = () => {
    const dispatch = useDispatch();
    const plates = useSelector(selectMenuItems);
    const menuStatus = useSelector(selectMenuStatus);
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search input

    // Fetch the menu only if the state is empty
    useEffect(() => {
        if (menuStatus === "idle") {
            dispatch(fetchMenu());
        }
    }, [menuStatus, dispatch]);

    useEffect(() => {
        console.log("Plates loaded:", plates); // Check plates data
    }, [plates]);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Filter plates based on the search query
    const filteredPlates = plates.filter(plate =>
        plate.name.toLowerCase().includes(searchQuery) //
    );



    return (
        <div>
            <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: "black" }}>
                Skip the hassle of cooking and let us bring the warmth of homemade food to you—wholesome, tasty, and delivered with care!
            </Typography>

            <Typography variant="body1" >
                -- Filter and search here --
            </Typography>

            <TextField
                style={{ marginBottom: '1px' }}
                label="Search by plate name"
                value={searchQuery}
                onChange={handleSearchChange} // Bind the search input
            />

            <Divider sx={{
                marginTop: 3,
                marginBottom: 5,
                borderWidth: 3,
                borderColor: '#DAA520',
                width: '100%',
            }} />

            <PlateList plates={filteredPlates} /> {/* Display filtered plates */}
            
            {menuStatus === "loading" && <p>Loading...</p>}
            {menuStatus === "failed" && <p>Error loading menu.</p>}
        </div>
    );
};

export default Homepage;
