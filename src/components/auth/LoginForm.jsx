import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../redux/actions/authActions';
import { validateLogin, isFormValid } from '../../utils/validation';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (touched[name]) {
      const validationErrors = validateLogin({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: validationErrors[name],
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    
    const validationErrors = validateLogin(formData);
    setErrors({
      ...errors,
      [name]: validationErrors[name],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (isFormValid(validationErrors)) {
      dispatch(login(formData));
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        maxWidth: '500px', 
        mx: 'auto', 
        borderRadius: 4,
        background: 'rgba(255, 253, 247, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Typography variant="h4" component="h1" mb={3} align="center" color="primary">
        Welcome Back
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          disabled={loading}
          sx={{ mb: 2 }}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button 
            color="secondary"
            sx={{ textTransform: 'none' }}
            onClick={() => alert('Password reset functionality would go here')}
          >
            Forgot password?
          </Button>
        </Box>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ 
            py: 1.5,
            mb: 2,
            fontSize: '1rem'
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
        
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button
              color="secondary"
              onClick={() => navigate('/register')}
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;