import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Container, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import logoImage from '../assets/images/reciepe-dash-black-yellow.png';
import axios from "axios";
import { addToCart } from '../store/cartSlice';
import { useParams, useNavigate } from 'react-router-dom';

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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.user_id);

    const [previousOrders, setPreviousOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);

    const { loginStatus, email, nameFirst, nameLast, isChef, address, phone, customer_id } = useSelector((state) => state.user);
    console.log('customer_id', customer_id);

    const customerInfo = {
        name: `${nameFirst} ${nameLast}`,
        address: address,
        phone: phone,
        email: email,
    };

      useEffect(() => {
          // Fetch previous orders using Axios
          const fetchPreviousOrders = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/deliveries/order-history/${customer_id}`);
              const platesResponse = await axios.get('http://localhost:8080/plates/api');
              //console.log('API Response:', response.data);
              //console.log('Plates API Response:', platesResponse.data);

              // Create a lookup map for plates
                const platesMap = platesResponse.data.reduce((acc, plate) => {
                  acc[plate.id] = plate; // Assuming `plate.id` matches the `plateId` in `plateQuantities`
                  //console.log("acc", acc);
                  return acc;
                }, {});

                const data = response.data.map(order => ({
                    total: order.grandTotal,
                    id: order.id,
                    items: Object.entries(order.plateQuantities).map(([plateStr, quantity]) => {

                      // Extract the plate name from the string and create the item structure
                      const plateName = plateStr.match(/name='([^']+)'/)[1]; // Extract name from the string
                      const itemPriceMatch = plateStr.match(/price=([\d.]+)/);
                      const itemPrice = itemPriceMatch ? parseFloat(itemPriceMatch[1]) : 0;

                      // Extract the plate ID from the string
                      const plateIdMatch = plateStr.match(/id=(\d+)/);
                      const plateId = plateIdMatch ? parseInt(plateIdMatch[1], 10) : null;

                      // Get plate details from platesMap
                      const plateData = platesMap[plateId] || {};
                      const imageUrl = plateData.plateImage || '';

                      return { plateId, name: plateName, itemPrice, quantity, imageUrl };
                    }),
                  }));
                  //console.log('data:', data);
                  //console.log('response', response.data);

                  setPreviousOrders(data); // Assume response.data contains an array of orders

              setLoading(false);
            } catch (err) {
              console.error('Error fetching previous orders:', err);
              setError('Failed to load previous orders');
              setLoading(false);
            }
          };

          fetchPreviousOrders();
        }, []);

    const handleReorderItems = async (order) => {
        console.log("Order:", order);
        order.items.forEach((item, index) => {
          console.log(`Item ${index + 1}:`, item);
        });

        order.items.map((item, index) => (

        dispatch(addToCart({
            plate_id: item.plateId, // Use plate_id instead of id
            name: item.name,
            price: item.itemPrice,
            quantity: item.quantity,
            total: item.itemPrice * item.quantity,
            plateImage: item.imageUrl,
          }))
        ))

        navigate('/');
    }

      useEffect(() => {
          const fetchOrders = async () => {
            try {

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
      <Grid container spacing={2}>
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
        <Grid item xs={12} md={10}>
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

        {/* Previous Orders Section */}
        <Grid container spacing={3}>
          <StyledHeaderTypography variant="h6">
            Previous Orders
          </StyledHeaderTypography>

          {loading ? (
            <Typography>Loading previous orders...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : previousOrders.length === 0 ? (
            <Typography>No previous orders found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {previousOrders.map((order, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography>Order #{order.id}</Typography>
                      <Typography>Date:{new Date(order.dateCreated).toLocaleString()}</Typography>

                      {/* Plates ordered */}
                      <ul>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <li key={index}>
                              {item.name} (x{item.quantity})
                            </li>
                          ))
                        ) : (
                          <li>No items available</li> // This handles cases where there are no items
                        )}
                      </ul>

                      <Typography variant="body2">Total: ${order.total}</Typography>

                      {/* Reorder Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleReorderItems(order)}
                        sx={{ marginTop: 2 }}
                      >
                        Reorder
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

          {/* Dashboard Stats Section */}
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
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

      </Container>
    );

};

export default Account;