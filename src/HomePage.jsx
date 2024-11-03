import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import BackgroundImage from "./assets/background-image.jpg" // Update the path as needed

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 4,
          borderRadius: 2,
          textAlign: 'center',
          color: '#fff',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: '700', mb: 2 }}>
          Meet Space: A Web Chat Application
        </Typography>
        <Typography variant="h6" gutterBottom>
          Connect with people instantly.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          sx={{ mt: 2, color: '#fff' }}
        >
          Log In
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          color="primary"
          sx={{ mt: 2, ml: 2, color: '#fff', borderColor: '#fff' }}
        >
          Register
        </Button>
      </Container>
    </Box>
  );
}

export default HomePage;
