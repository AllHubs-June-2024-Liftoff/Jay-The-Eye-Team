    import React, { useState } from "react";
    import { useDispatch } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import { Divider, Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
    import { styled } from "@mui/system";
    import { Link } from 'react-router-dom';
    import axios from "axios";
    import { login } from "../store/userSlice"; // Import the login action from your Redux slice
    import logoImage from '../assets/images/reciepe-dash-black-yellow.png';

    const StyledTextField = styled(TextField)(({ theme }) => ({
      "& .MuiInputLabel-root": {
        color: "black", // default color
        "&.Mui-focused": {
          color: "#DAA520", // change label color when focused
        },
      },
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: "#DAA520", // border color on hover
        },
        "&.Mui-focused fieldset": {
          borderColor: "#DAA520", // border color when focused
        },
      },
      marginBottom: "1rem",
    }));

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
            const response = await axios.post("http://localhost:8080/api/login", formData);
        
            // Extract user and customer details
            const { user_id, customer_id, email, firstName, lastName, isChef } = response.data;
        
            // Update Redux store
            dispatch(
              login({
                user_id,
                customer_id,
                email,
                nameFirst: firstName,
                nameLast: lastName,
                isChef,
                loginStatus: true,
              })
            );
        
            // Redirect to homepage
            navigate("/");
          } catch (error) {
            setErrorMessage(error.response?.data || "Login failed. Please try again.");
          }
        };
        
        
        return (
            <div className="container mt-5">
                <Typography
                      variant="h4"
                      component="h1"
                      align="center"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#DAA520",
                        marginRight: 3,
                        marginBottom: 3,
                      }}
                    > Login
                </Typography>

                <form onSubmit={handleSubmit}>

                    <Grid>
                        <StyledTextField
                            fullWidth
                            label="E-mail"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                        <StyledTextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </Grid >

                    {errorMessage && <p className="text-danger">{errorMessage}</p>}

                   <Grid container spacing={1} justifyContent="center" alignItems="center" direction="row">
                       <Grid item>
                           <Button
                               type="submit"
                               variant="contained"
                               sx={{
                                 backgroundColor: "#DAA520",
                                 "&:hover": {
                                   backgroundColor: "black",
                                 },
                               }}
                               size="large"
                               width="200px"
                           >Login
                           </Button>
                       </Grid>
                   </Grid>

                   <Grid item
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                   >
                       <Grid item>
                           <img
                               src={logoImage}
                               alt="Logo"
                               style={{
                                   width: "150px",
                                   display: "block",
                                   marginTop: "30px",
                               }}
                           />
                       </Grid>
                       <Grid item>
                           <div className="mt-3">
                               <p>
                                   Don’t have an account? <Link to="/register">Register here</Link>
                               </p>
                           </div>
                       </Grid>
                   </Grid>

                    <Grid container justifyContent="center" alignItems="center" direction="column" >
                      <Grid item xs={12}>
                        <Divider
                          sx={{
                            marginTop: 3,
                            marginBottom: 1,
                            borderWidth: 3,
                            borderColor: '#FF00FF',
                            width: '300px',
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: 'center', width: '100%' }}>
                        <p style={{ color: '#FF00FF', fontWeight: 'bold' }}>
                          Public User Logins - For Demo Only
                        </p>
                      </Grid>

                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <button onClick={handleChefLogin}>Login as Chef</button>
                        <button onClick={handleUserLogin}>User Login</button>
                      </Grid>
                    </Grid>

                </form>
            </div>
        );
    };

    export default Login;
