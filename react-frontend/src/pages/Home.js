import React from 'react';
import { Container } from '@mui/material';
import PlateList from '../components/plates/PlateList';

const Home = () => {
  return (
    <div>
      <Container sx={{ height: '100px' }}></Container>
      <Container>
        <PlateList />
      </Container>
    </div>
  );
};

export default Home;