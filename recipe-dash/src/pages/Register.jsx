import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
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

        // Password matching validation
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
        <Container maxWidth="md" >
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
                > Create an Account
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={10}>
                    {/* Left Grid*/}
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            fullWidth
                            label="First Name"
                            name="nameFirst"
                            value={formData.nameFirst}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                        <StyledTextField
                            fullWidth
                            label="Last Name"
                            name="nameLast"
                            value={formData.nameLast}
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
                        <StyledTextField
                            fullWidth
                            label="Verify Password"
                            type="password"
                            name="reEnterPassword"
                            value={formData.reEnterPassword}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    {/* Right Grid */}
                    <Grid item xs={12} sm={6}>
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
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            multiline
                            rows={2}
                        />
                        <StyledTextField
                            fullWidth
                            label="Phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isChef"
                                    checked={formData.isChef}
                                    onChange={handleChange}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            }
                            label="Register as a Chef"
                        />
                    </Grid>

                    {/* Error and Success Messages */}
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography color="error">{errorMessage}</Typography>
                        </Grid>
                    )}
                    {successMessage && (
                        <Grid item xs={12}>
                            <Typography color="success">{successMessage}</Typography>
                        </Grid>
                    )}

                    {/* Submit Button & Logo*/}
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
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
                        >
                            Register
                        </Button>
                        <img
                            src={logoImage}
                            alt="Logo"
                            style={{
                                width: "30%",
                                display: "block",
                                marginTop: "50px",
                            }}
                        />
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
};

export default Register;
