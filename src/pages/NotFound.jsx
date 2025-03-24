import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SentimentDissatisfied } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 8,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SentimentDissatisfied sx={{ fontSize: 120, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </Typography>
        <Button 
          component={RouterLink} 
          to="/" 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Return Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;