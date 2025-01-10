import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Paper, styled } from "@mui/material";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  background: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem"
  }
}));

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

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: "0.8rem 2rem",
  fontSize: "1.1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
  }
}));

const ContactUs = () => {

  const [contactUs, setContactUs] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const newContactUs = {
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
    };

    // Optimistically update the comment list
    setContactUs((prevContactUs) => [...prevContactUs, newContactUs]);

    await submitContactUsToBackend(newContactUs);
  };

  // Submit the comment to the backend
  const submitContactUsToBackend = async (commentData) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/contactus/api-update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setSuccessMessage(<div style={{ color: '#DAA520' }}>Comment submitted successfully!</div>);
        setErrorMessage('');

        // Clear the form after successful submission
              setFormData({
                name: "",
                email: "",
                comment: ""
              });

      } else {
        setErrorMessage(`Failed to submit message!  ${JSON.stringify(commentData)}`);
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      // setErrorMessage('An error occurred while submitting your comment.');
    } finally {
      setLoading(false);
    }
  };

return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <StyledPaper elevation={0}>
       <Box
         sx={{
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
         }}
       >
         <Typography
           variant="h3"
           component="h1"
           align="center"
           gutterBottom
           sx={{
             fontWeight: "bold",
             color: "#DAA520",
             marginRight: 3,
           }}
         >
           Contact
         </Typography>
         <img
           src={logoImage}
           alt="Logo"
           style={{
             width: "35%",
             display: "block",
           }}
         />
       </Box>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 4, color: "black" }}
        >
          We'd love to hear from you! Please fill out the form below and we'll get
          back to you as soon as possible.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Message"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <SubmitButton
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#DAA520",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                size="large"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </SubmitButton>

            </Grid>
          </Grid>
        </form>

        {successMessage && <Typography variant="body1" sx={{ color: "green", mt: 2 }}>{successMessage}</Typography>}
        {errorMessage && <Typography variant="body1" sx={{ color: "red", mt: 2 }}>{errorMessage}</Typography>}
      </StyledPaper>
    </Container>
  );
};

export default ContactUs;
