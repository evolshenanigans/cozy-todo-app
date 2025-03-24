import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 8,
        backgroundImage: 'url(https://source.unsplash.com/random?cozy,home)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 248, 225, 0.85)',
          backdropFilter: 'blur(5px)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          align="center"
          color="primary"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 4,
            textShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Join Cozy Tasks
        </Typography>
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default Register;