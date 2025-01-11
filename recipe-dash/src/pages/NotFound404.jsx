import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import chefsImage from '../assets/images/aboutchfs.png';

const NotFound404 = () => {
  return (
    <Container>
      <div style={{ textAlign: 'center', padding: '50px' }}>
        {/* Content Box with styling */}
        <Box
          sx={{
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: 1,
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#DAA520',
            lineHeight: '1.5',
            margin: '0 auto',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            Oops! The page you're looking for doesn't exist.
          </Typography>

          {/* Chef Image */}
          <img
            src={chefsImage}
            alt="Chef"
            style={{
              width: '40%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          />
        </Box>

        {/* Call to action */}
        <Typography
          variant="body1"
          sx={{
            paddingTop: '20px',
            fontSize: '1.5rem',
            color: '#333',
          }}
        >
          Feel free to{' '}
          <a
            href="/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 'bold',
              color: '#DAA520',
              textDecoration: 'none',
            }}
          >
            contact us
          </a>{' '}
          if you need help!
        </Typography>
      </div>
    </Container>
  );
};

export default NotFound404;
