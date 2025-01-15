import React, { useState, useEffect } from "react";
import { Box, Container, Typography, GlobalStyles, Grid, Card, CardMedia } from "@mui/material";
import PlateApi from '../components/plates/PlateApi';
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';

const About = () => {
  const [plates, setPlates] = useState([]);
  const [error, setError] = useState(null);
  const [shuffledPlates, setShuffledPlates] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const handleFetchPlates = (data) => {
    setPlates(data);
    setHasFetched(true);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  // Shuffle the array after fetching data
  useEffect(() => {
    if (plates.length > 0) {
      const shuffled = [...plates].sort(() => Math.random() - 0.5);
      setShuffledPlates(shuffled);
    }
  }, [plates]);

  return (
    <div style={{ height: '100%' }}>
      {/* Fetch plates only once when page is loaded */}
      {!hasFetched && (
        <PlateApi onFetchPlates={handleFetchPlates} onError={handleError} />
      )}

      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1.5rem",
        }}
      >
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "40%", marginLeft: "auto", marginRight: "auto", display: "block" }}
        />

        <Typography variant="body1" paragraph align="left" style={{ fontSize: '1.2rem', lineHeight: '2' }}>
          Welcome to <strong>RecipeDash</strong>, where we deliver homemade, chef-crafted meals from around the world straight to your door. Based in St. Louis, our team of experienced chefs brings the authentic flavors of international cuisines to your home, using only the freshest ingredients. <br /> <br />
          <strong>Why Choose Us?</strong> <br />
          • Fresh, homemade meals made with locally sourced ingredients<br />
          • Authentic, local and international cuisines<br />
          • Convenient delivery right to your door
        </Typography>

        {/* Display error if it exists */}
        {error && (
          <Typography color="error" variant="body1" paragraph>
            {error}
          </Typography>
        )}

        {/* Gallery Section for Randomly Selected Plates */}
        <Grid container spacing={3} justifyContent="center">
          {shuffledPlates.slice(0, 6).map((plate, index) => (
            <Grid item xs={10} sm={5} md={2} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    aspectRatio: '1',
                  }}
                  src={plate.plateImage}
                  alt={plate.name}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="body1" paragraph align="left" style={{ fontSize: '1.2rem', lineHeight: '2' }}>
          Join us on a culinary journey and experience the world’s flavors, one meal at a time. Thank you for choosing RecipeDash — we can’t wait to cook for you!
        </Typography>

      </Container>
    </div>
  );
};

export default About;
