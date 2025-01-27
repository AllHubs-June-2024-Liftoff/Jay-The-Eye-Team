import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu, selectMenuItems, selectMenuStatus } from "../store/menuSlice";
import PlateList from "../components/plates/PlateList";
import { Box, Divider, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from "@mui/system";
import axios from "axios";
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';
import { login } from "../store/userSlice";  // Adjust the path if needed


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

    useEffect(() => {
        // Check if there's any user data in localStorage
        const storedUser = localStorage.getItem("authData");

        if (storedUser) {
          // If user data exists, restore it to the Redux state
          dispatch(login(JSON.parse(storedUser)));
        }
      }, [dispatch]);


    // Fetch the menu only if the state is empty
    useEffect(() => {
        if (menuStatus === "idle") {
            dispatch(fetchMenu());
        }
    }, [menuStatus, dispatch]);

    useEffect(() => {
        console.log("Plates loaded:", plates); // Check plates data
    }, [plates]);

    useEffect(() => {
      console.log("Fetched cuisines:", cuisines); // Debug cuisines
      console.log("Selected cuisine:", selectedCuisine); // Debug selected cuisine
  }, [cuisines, selectedCuisine]);

    useEffect(() => {
            const fetchCuisines = async () => {
                try {
                    const response = await axios.get("http://localhost:8080/cuisines/api");
                    const formattedCuisines = [{ id: "all", name: "All" }, ...response.data];
                    console.log("Fetched cuisines:", formattedCuisines); // Debug log
                    setCuisines(formattedCuisines);
                } catch (error) {
                    console.error("Error fetching cuisines:", error);
                }
            };



            fetchCuisines();
        }, []);


    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleCuisineChange = (event) => {
        setSelectedCuisine(event.target.value);
    };

    // Filter plates based on the search query
    const filteredPlates = plates.filter((plate) => {
        const matchesQuery = plate.name.toLowerCase().includes(searchQuery); // Assuming plates have a 'name' property
        const matchesCuisine = selectedCuisine === "all" || plate.cuisine?.toLowerCase() === selectedCuisine;

        return matchesQuery && matchesCuisine;
    });

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
            <Typography variant="subtitle1" align="center" sx={{color: "black",}}>
                Skip the hassle of cooking and let us bring the warmth of homemade food to you—wholesome, tasty, and delivered with care!
            </Typography>

            <Divider sx={{
                marginTop: 2,
                marginBottom: 3,
                borderWidth: 3,
                borderColor: 'black',
                width: '100%',
                borderStyle: 'solid',
                opacity: 1,
            }} />

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
                    marginRight: 10,
                  }}
                >
                  plate
            </Typography>

              <StyledTextField
                label="Search by plate name"
                value={searchQuery}
                onChange={handleSearchChange}
              />

                {/* Search by cuisine */}
               <FormControl sx={{ marginLeft: 10, width: "200px", backgroundColor: "#DAA520", }}>

                 <InputLabel
                   id="cuisine-select-label"
                   sx={{
                     color: "black",
                     backgroundColor: "transparent",
                     fontWeight: "bold",
                     position: "absolute",
                     top: "-10px",  // Adjust to position the label above
                     left: "0",
                   }}
                   shrink={true}  // Ensure the label shrinks and stays above the input
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
                    {/* >>>>>>>>>>>>>> Need to fix cuisine data <<<<<<<<<<<<<<<<<<*/}
{/*                     {cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase()} */}
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
                opacity: 1,
            }} />

            <PlateList plates={filteredPlates} /> {/* Display filtered plates */}

            {menuStatus === "loading" && <p>Loading...</p>}
            {menuStatus === "failed" && <p>Error loading menu.</p>}
        </div>
    );
};

export default Homepage;