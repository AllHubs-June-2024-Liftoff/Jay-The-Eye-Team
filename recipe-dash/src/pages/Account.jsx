import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Container, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios";
import { addToCart } from '../store/cartSlice';
import { useParams, useNavigate } from 'react-router-dom';

import logoImage from '../assets/images/reciepe-dash-black-yellow.png';
import plateImage from '../assets/images/plate-243.png';
import deliveryImage from '../assets/images/delivery-243.png';

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
        const fetchPreviousOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/deliveries/order-history/${customer_id}`);
                const platesResponse = await axios.get('http://localhost:8080/plates/api');

                console.log('Redux State:', { address, phone, nameFirst, nameLast });

                const platesMap = platesResponse.data.reduce((acc, plate) => {
                    acc[plate.id] = plate;
                    return acc;
                }, {});

                const data = response.data.map(order => ({
                    total: order.grandTotal,
                    id: order.id,
                    dateCreated: order.dateCreated,
                    items: Object.entries(order.plateQuantities).map(([plateStr, quantity]) => {
                        const plateName = plateStr.match(/name='([^']+)'/)[1];
                        const itemPriceMatch = plateStr.match(/price=([\d.]+)/);
                        const itemPrice = itemPriceMatch ? parseFloat(itemPriceMatch[1]) : 0;
                        const plateIdMatch = plateStr.match(/id=(\d+)/);
                        const plateId = plateIdMatch ? parseInt(plateIdMatch[1], 10) : null;
                        const plateData = platesMap[plateId] || {};
                        const imageUrl = plateData.plateImage || '';

                        return { plateId, name: plateName, itemPrice, quantity, imageUrl };
                    }),
                }));

                setPreviousOrders(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching previous orders:', err);
                setError('Failed to load previous orders');
                setLoading(false);
            }
        };

        fetchPreviousOrders();
    }, [customer_id]);

    const handleReorderItems = async (order) => {
        console.log("Order:", order);
        order.items.forEach((item, index) => {
            console.log(`Item ${index + 1}:`, item);
        });

        order.items.map((item, index) => (
            dispatch(addToCart({
                plate_id: item.plateId,
                name: item.name,
                price: item.itemPrice,
                quantity: item.quantity,
                total: item.itemPrice * item.quantity,
                plateImage: item.imageUrl,
            }))
        ));

        navigate('/');
    };

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
    }, [userId]);



    return (
         <Container
           sx={{
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'flex-start',
             alignItems: 'center',
             paddingTop: 0,
             width: '90vw',
             maxWidth: '100%',
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
                    marginTop: 0,
                    marginBottom: 0,
                    borderWidth: 3,
                    borderColor: 'black',
                    width: '100%',
                    borderStyle: 'solid',
                    opacity: 1,
                }}
            />

        <Grid container spacing={2}>
            {/* Customer Info Section */}
            <Grid item xs={12} md={7}>
                <Box>
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
            <Grid item xs={12} md={5}>
                <Box>
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
                                <li key={index} style={{ marginBottom: '0' }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Box>
            </Grid>
        </Grid>

            {/* Dashboard Stats Section */}
            <Grid container spacing={3} sx={{ marginBottom: 7, }}>

                <Grid item xs={12} md={4}>
                  <StyledCard style={{ backgroundColor: '#f7f7f7',}}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                              src={plateImage}
                              alt="meal icon"
                              style={{ width: 40, height: 40,}}
                            />

                            <StyledValueTypography sx={{ marginLeft: 1 }}>
                              {dashboardData.totalStuff1}
                            </StyledValueTypography>
                      </Box>

                      <StyledStuffTypography variant="h6">
                        Different meals
                      </StyledStuffTypography>
                    </CardContent>
                  </StyledCard>
                </Grid>

                <Grid item xs={12} md={4}>
                  <StyledCard style={{ backgroundColor: '#f7f7f7',}}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                              src={deliveryImage}
                              alt="meal icon"
                              style={{ width: 40, height: 40,}}
                            />

                            <StyledValueTypography sx={{ marginLeft: 1 }}>
                              {dashboardData.totalStuff2}
                            </StyledValueTypography>
                      </Box>

                      <StyledStuffTypography variant="h6">
                        Total plates ordered
                      </StyledStuffTypography>
                    </CardContent>
                  </StyledCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <StyledCard style={{ backgroundColor: '#f7f7f7',}}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <StyledValueTypography>{dashboardData.totalStuff4}</StyledValueTypography>
                            <StyledStuffTypography variant="h6">Points to spend</StyledStuffTypography>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>

            {/* Previous Orders Section */}
            <Grid container>
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
                    <Grid container spacing={1}>
                        {previousOrders.map((order, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card sx={{ maxWidth: 275, maxHeight: 140,  overflow: 'auto' , margin: 0 }}>
                                    <CardContent>

                                        <Typography variant="body1" style={{fontWeight: 'bold' }}>
                                            Order #{order.id}
                                        </Typography>

                                        <Typography style={{ fontSize: '0.85rem' }}>
                                            Placed on {new Date(order.dateCreated).toLocaleString('en-US', {
                                                year: '2-digit',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            }).replace(',', '').replace(/^0/, '').replace(' ', ' at ')}
                                        </Typography>

                                        {/* Reorder Button */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleReorderItems(order)}
                                            sx={{ marginTop: 1, marginBottom: 1, backgroundColor: 'black', }}
                                        >
                                            Reorder
                                        </Button>

                                        <Typography style={{ fontSize: '15px', fontWeight: 'bold', marginBottom:
                                            '5px', color: 'grey'}}>
                                            Cart Total: ${order.total}
                                        </Typography>

                                        {/* Plates ordered */}
                                       <ul style={{ textAlign: 'left',}}>
                                         {order.items && order.items.length > 0 ? (
                                           order.items.map((item, index) => (
                                             <li key={index}>
                                               {item.name} ({item.quantity})
                                             </li>
                                           ))
                                         ) : (
                                           <li>No items available</li>
                                         )}
                                       </ul>



                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>

        </Container>
    );
};

export default Account;