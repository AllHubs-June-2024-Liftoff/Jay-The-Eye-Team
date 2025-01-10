import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { selectCartTotalQuantity } from "../store/cartSlice";

// Components
import logo from '../assets/images/reciepe-dash-white-yellow.png';

// Pages
import Homepage from "../pages/Homepage";
import About from "../pages/About";
import Account from "../pages/Account";
import AddPlate from "../pages/AddPlate";
import Admin from "../pages/Admin";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import MenuItem from "../pages/MenuItem";
import Register from "../pages/Register";
import OrderComplete from "../pages/OrderComplete";
import Reviews from "../pages/Reviews";
import Plate from "../pages/Plate";
import Cart from "../pages/Cart";

function NavBar() {
  const dispatch = useDispatch();
  const { loginStatus, email, nameFirst, isChef } = useSelector((state) => state.user);
  const totalQuantity = useSelector(selectCartTotalQuantity); // Fetch total quantity from cart

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <Navbar
        expand="lg"
        className="navbar-dark bg-dark fixed-top"
        style={{ width: "100%" }}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact-us">
                Contact
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {!loginStatus ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={`Hi, ${nameFirst}`}
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/account">
                    Account
                  </NavDropdown.Item>
                  {!isChef && (
                    <>
                      <NavDropdown.Item as={Link} to="/cart">
                        Cart
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/checkout">
                        Checkout
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/favorites">
                        Favorites
                      </NavDropdown.Item>
                    </>
                  )}
                  {isChef && (
                    <>
                      <NavDropdown.Item as={Link} to="/reviews">
                        Reviews
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/add_plate">
                        Add Plate
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {/* Add Cart Icon with Quantity */}
              {!isChef && (
                <Nav.Link as={Link} to="/cart" className="cart-icon">
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <i className="fas fa-shopping-cart" style={{ fontSize: "1.5rem", color: "#fff" }}></i>
                    {totalQuantity > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-5px",
                          right: "-10px",
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "50%",
                          padding: "3px 6px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
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
        {/* Prevents content from being hidden behind the fixed navbar */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/add_plate" element={<AddPlate />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menuitem" element={<MenuItem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ordercomplete" element={<OrderComplete />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/plate/:plateId" element={<Plate />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default NavBar;
