import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography
        variant="body1" // Use a valid variant like body1 for text
        component="div"
        gutterBottom
        style={{
          marginBottom: 10,
          marginTop: 8,
          textAlign: 'left',
        }}
      >
        There are many variations of passages of Lorem Ipsum available, but the majority
        have suffered alteration in some form, by injected humour, or randomised words
        which don't look even slightly believable. If you are going to use a passage
        of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
        All the Lorem Ipsum generators on the Internet.
      </Typography>
    </Container>
  );
};

export default Home;