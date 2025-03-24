import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, Alert, Button, Box, Typography, Container } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Refresh } from '@mui/icons-material';
import theme from './theme';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import Loader from './components/common/Loader';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { loadUser } from './redux/actions/authActions';
import { initSampleData, resetSampleData } from './utils/initSampleData';
import { verifyAppInitialization, debugLocalStorage } from './utils/helpers';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  
  const [initializationStatus, setInitializationStatus] = useState({
    isComplete: false,
    isSuccessful: false,
    error: null
  });
  
  useEffect(() => {
    try {
      console.log('App initialization starting...');
      
      initSampleData();
      
      const verificationResult = verifyAppInitialization();
      const isSuccessful = verificationResult.usersInitialized && verificationResult.tasksInitialized;
      
      if (!isSuccessful) {
        console.warn('Verification failed, attempting to reset data:', verificationResult);
        resetSampleData();
      }
      
      debugLocalStorage();
      
      setInitializationStatus({
        isComplete: true,
        isSuccessful: true,
        error: null
      });
      
      console.log('App initialization complete');
    } catch (error) {
      console.error('Error during app initialization:', error);
      setInitializationStatus({
        isComplete: true,
        isSuccessful: false,
        error: error.message || 'Failed to initialize application data'
      });
    }
  }, []);
  
  useEffect(() => {
    if (token && initializationStatus.isSuccessful) {
      dispatch(loadUser(token));
    }
  }, [dispatch, token, initializationStatus.isSuccessful]);
  
  const handleResetData = () => {
    try {
      resetSampleData();
      window.location.reload();
    } catch (error) {
      console.error('Error resetting data:', error);
      setInitializationStatus({
        ...initializationStatus,
        error: `Failed to reset data: ${error.message}`
      });
    }
  };
  
  if (initializationStatus.isComplete && !initializationStatus.isSuccessful) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" color="error" gutterBottom>
            Initialization Error
          </Typography>
          <Alert severity="error" sx={{ mb: 4 }}>
            {initializationStatus.error || 'Failed to initialize application data'}
          </Alert>
          <Typography variant="body1" sx={{ mb: 4 }}>
            This may be due to issues with your browser's localStorage. Try resetting the application data.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Refresh />}
            onClick={handleResetData}
            size="large"
          >
            Reset Application Data
          </Button>
        </Container>
      </ThemeProvider>
    );
  }
  
  if (!initializationStatus.isComplete) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Cozy Todo App
          </Typography>
          <Loader message="Initializing application..." />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;