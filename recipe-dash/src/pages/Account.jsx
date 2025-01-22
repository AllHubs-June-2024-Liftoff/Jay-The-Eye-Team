import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Divider, Container, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';
import axios from "axios";

const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#DAA520',
  align: 'left',
  textAlign: 'left',
  marginBottom: '15px'
}));

const StyledStuffTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '13px',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
}));

const StyledValueTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
}));

const customerInfo = {
  name: 'John Doe',
  address: '123 Main St, Cityville, USA',
  phone: '(123) 456-7890',
  email: 'johndoe@example.com',
};

const favorites = [
  'Beef Wellington',
  'Cajun Crab',
  'Chicken and Waffles',
  'Jollof Rice',
  'Shawarma',
  'Wiener Schnitzel'
];

const dashboardData = {
  totalStuff1: 23,
  totalStuff2: 94,
  totalStuff3: 'Jan 12, 2021',
  totalStuff4: '2100',
};

const Account = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState(null);

      const userId = useSelector((state) => state.user.id);

      useEffect(() => {
          const fetchOrders = async () => {
            try {
                const userId = 1;
              const response = await axios.get(`http://localhost:8080/deliveries/order-history/${userId}`);
              setOrderHistory(response.data);
              console.log("Order history fetched:", response.data);
              } catch (err) {
                console.error("Error fetching order history:", err);
                setError(err.message);
            }
          };

          fetchOrders();
        }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
      <Container
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#DAA520',
            marginRight: 3,
          }}
        >
          Account Details
        </Typography>

        <Divider
          sx={{
            marginTop: 4,
            marginBottom: 5,
            borderWidth: 3,
            borderColor: 'black',
            width: '100%',
            borderStyle: 'solid',
            opacity: 1,
          }}
        />

        {/* Customer Info Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '0 20px' }}>
              <CardContent>
                <StyledHeaderTypography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Customer Information
                </StyledHeaderTypography>
                <Typography sx={{ textAlign: 'left' }}>
                  <span style={{ fontWeight: 'bold' }}>Name:</span> {customerInfo.name}
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  <span style={{ fontWeight: 'bold' }}>Address:</span> {customerInfo.address}
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  <span style={{ fontWeight: 'bold' }}>Phone:</span> {customerInfo.phone}
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  <span style={{ fontWeight: 'bold' }}>Email:</span> {customerInfo.email}
                </Typography>
              </CardContent>
            </Box>
          </Grid>

          {/* Favorites Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '0 20px' }}>
              <CardContent>
                <StyledHeaderTypography variant="h6">Favorites</StyledHeaderTypography>
                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '5px',
                    paddingLeft: '30px',
                    textAlign: 'left',
                  }}
                >
                  {favorites.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Box>
          </Grid>
        </Grid>



        {/* Dashboard Stats Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <StyledValueTypography>{dashboardData.totalStuff1}</StyledValueTypography>
                <StyledStuffTypography variant="h6">
                  Different <br /> meals
                </StyledStuffTypography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={2}>
            <StyledCard sx={{ alignItems: 'flex-end' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <StyledValueTypography>{dashboardData.totalStuff2}</StyledValueTypography>
                <StyledStuffTypography variant="h6">
                  Total plates ordered
                </StyledStuffTypography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledCard sx={{ alignItems: 'flex-end' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <StyledValueTypography>{dashboardData.totalStuff3}</StyledValueTypography>
                <StyledStuffTypography variant="h6">
                  Date of your last order
                </StyledStuffTypography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <StyledValueTypography>{dashboardData.totalStuff4}</StyledValueTypography>
                <StyledStuffTypography variant="h6">Points to spend</StyledStuffTypography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Order History Section */}
        <Box sx={{ marginTop: 5, width: '100%' }}>
          <Typography
            variant="h4"
            component="h2"
            align="left"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#DAA520',
              marginBottom: 3,
            }}
          >
            Order History
          </Typography>
          {orderHistory.length === 0 ? (
            <Typography sx={{ textAlign: 'center' }}>
              No orders found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {orderHistory.map((order) => (
                <div key={order.id}>
                  <h3>Order ID: {order.id}</h3>
                  <p>Status: {order.status}</p>
                  <p>Total: ${order.grandTotal}</p>
                  <p>Date: {new Date(order.dateCreated).toLocaleString()}</p>
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.plateId}>
                        {item.plateName} - Quantity: {item.quantity} - Price: ${item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </Grid>
          )}
        </Box>

      </Container>
    );
  };

export default Account;