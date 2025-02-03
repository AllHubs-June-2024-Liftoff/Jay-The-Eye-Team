import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Link, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/userSlice";
import { selectCartTotalQuantity } from "../store/cartSlice";
import { fetchFavoritePlates, selectFavoritePlates } from "../store/favoritesSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { styled } from '@mui/system';
import { Tooltip } from "@mui/material";

// Components
import logo from '../assets/images/reciepe-dash-white-yellow.png';

// Pages
import Homepage from "../pages/Homepage";
import About from "../pages/About";
import Account from "../pages/Account";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Empty from "../pages/Empty";
import Register from "../pages/Register";
import OrderComplete from "../pages/OrderComplete";
import Plate from "../pages/Plate";
import Cart from "../pages/Cart";
import PaymentForm from "../pages/PaymentForm";
import NotFound404 from "../pages/NotFound404";

const StyledNavLink = styled(Nav.Link)`
  text-decoration: none;
  color: white;
  padding: 10px;
  &:hover {
    font-weight: bold;
    color: #DAA520;
  }
`;

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginStatus, customer_id, nameFirst, isChef } = useSelector((state) => state.user);
  const totalQuantity = useSelector(selectCartTotalQuantity); // Fetch total quantity from cart
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    // Check if user data exists in localStorage on initial load
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData) {
      // Dispatch stored user data to Redux store if available
      dispatch(login({
        user_id: storedUserData.user_id,
        customer_id: storedUserData.customer_id,
        email: storedUserData.email,
        nameFirst: storedUserData.nameFirst,
        nameLast: storedUserData.nameLast,
        isChef: storedUserData.isChef,
        loginStatus: true,
        address: storedUserData.address,
        phone: storedUserData.phone
      }));
    }

    if (loginStatus && customer_id) {
      // Fetch favorites when NavBar loads
      dispatch(fetchFavoritePlates(customer_id));
    }
  }, [loginStatus, customer_id, dispatch]);

  const favoritePlates = useSelector(selectFavoritePlates);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('userData'); // Make sure to remove 'userData' from localStorage
    navigate('/');
  };

  const handleCheckout = () => {
    if (!loginStatus) {
      // Redirect to login page if user is not logged in
      navigate("/login", { state: { from: "/payment" } });
    } else {
      // Proceed to payment page if logged in
      navigate("/cart");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-dark bg-dark fixed-top" style={{ width: "100%" }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <StyledNavLink as={Link} to="/">Home</StyledNavLink>
              <StyledNavLink as={Link} to="/about">About</StyledNavLink>
              <StyledNavLink as={Link} to="/contact-us">Contact</StyledNavLink>
            </Nav>
            <Nav className="ms-auto">
              {!loginStatus ? (
                <StyledNavLink as={Link} to="/login" sx={{ marginRight: '1rem' }}>Login</StyledNavLink>
              ) : (
                <NavDropdown title={`Hi, ${nameFirst}`} id="user-dropdown" align="end"
                className="navbar-user-dropdown">
                  {!isChef && (
                    <>
                      <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/cart">Cart</NavDropdown.Item>
                    </>
                  )}
                  {isChef && (
                    <NavDropdown.Item as={Link} to="http://localhost:8080" style={{ fontWeight: 'bold' }}>
                      Go to Chef Dashboard
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} style={{ fontWeight: 'bold', backgroundColor: 'black', color: '#DAA520', padding: '10px' }}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!isChef && (
                <Nav.Link onClick={handleCheckout} className="cart-icon">
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <Tooltip title={loginStatus ? "" : "Log in to view cart"} arrow>
                      <i className="fas fa-shopping-cart" style={{ fontSize: "2rem", color: "#fff", marginRight: "20px" }}></i>
                    </Tooltip>
                    {totalQuantity > 0 && (
                      <span style={{
                        position: "absolute",
                        top: "-10px",
                        right: "5px",
                        backgroundColor: "#DAA520",
                        color: "white",
                        borderRadius: "50%",
                        padding: "5px 10px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        opacity: 1
                      }}>
                        {totalQuantity}
                      </span>
                    )}
                  </div>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ paddingTop: "56px" }}>
        <Routes>
          <Route path="/" element={<Empty />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/plate/:plateId" element={<Plate />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Elements stripe={stripePromise}><PaymentForm /></Elements>} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </>
  );
}

export default NavBar;