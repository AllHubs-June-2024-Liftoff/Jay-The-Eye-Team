import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu, selectMenuItems, selectMenuStatus } from "../store/menuSlice";
import PlateList from "../components/plates/PlateList";
import { Box, Divider, Typography, TextField } from '@mui/material';
import { styled } from "@mui/system";
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';

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
        plate.name.toLowerCase().includes(searchQuery) // Assuming plates have a 'name' property
    );

    useEffect(() => {
      console.log("Filter loaded:", filteredPlates); // Check plates data
  }, [filteredPlates]);

    return (
        <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '100vh',
              paddingTop: '10px'
            }}
          >
            <Typography variant="subtitle1" align="center" sx={{ mb: 2, color: "black" }}>
                Skip the hassle of cooking and let us bring the warmth of homemade food to you—wholesome, tasty, and delivered with care!
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                textAlign: 'center'
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#DAA520",
                }}
              >
                Search for your next
              </Typography>

              <img
                 src={logoImage}
                 alt="Logo"
                 style={{
                     width: "150px",
                     display: "block"
                 }}
             />

              <Typography
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#DAA520",
                    marginRight: 3,
                  }}
                >
                  plate
            </Typography>

              <StyledTextField
                label="Search by plate name"
                value={searchQuery}
                onChange={handleSearchChange} // Bind the search input
              />
            </Box>

            <Divider sx={{
                marginTop: 4,
                marginBottom: 5,
                borderWidth: 3,
                borderColor: 'black',
                width: '100%',
                borderStyle: 'solid',
                opacity: 1,
            }} />

            <PlateList plates={filteredPlates} /> {/* Display filtered plates */}
            
            {menuStatus === "loading" && <p>Loading...</p>}
            {menuStatus === "failed" && <p>Error loading menu.</p>}
        </div>
    );
};

export default Homepage;
