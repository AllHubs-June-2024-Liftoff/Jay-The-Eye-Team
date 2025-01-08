import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

import logo from '../assets/images/reciepe-dash-white-yellow.png';

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'black', height: 70 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: 40 }} />
        </Link>

        <Box sx={{ ml: 'auto' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/about">Contact</Button>

          <Button
            sx={{
              backgroundColor: '#DAA520',
              color: 'black',
              '&:hover': { backgroundColor: 'white' },
            }}
            component="a" href="http://localhost:8080" target="_blank" rel="noopener noreferrer"
          >
            Chef Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
