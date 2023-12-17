import React, { useState } from 'react';
import { Tabs, Tab, Paper, Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

function LoginSignup() {
  const [value, setValue] = useState(0);
  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });
  const [signupFormData, setSignupFormData] = useState({
    signupEmail: '',
    signupUsername: '',
    signupPassword: '',
    confirmSignupPassword: '',
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('your-login-endpoint', loginFormData);
      console.log('Login Form submitted:', response.data);
    } catch (error) {
      console.error('Error submitting login form:', error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupFormData.signupEmail)) {
      alert('Invalid email format');
      return;
    }

    // Password matching validation
    if (signupFormData.signupPassword !== signupFormData.confirmSignupPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('your-signup-endpoint', signupFormData);
      console.log('Signup Form submitted:', response.data);
    } catch (error) {
      console.error('Error submitting signup form:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center', marginTop: '9vw', marginBottom: '9.5vw', boxShadow: '4px 4px 8px rgba(0, 77, 153, 0.3)' }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        style={{ marginBottom: '20px' }}
      >
        <Tab label="Login" style={{ color: '#164863' }} />
        <Tab label="Signup" style={{ color: '#164863' }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <form onSubmit={handleLoginSubmit}>
          <Typography variant="body2" color="textSecondary" gutterBottom style={{ color: '#164863' }}>
            Don't have an account? <span style={{ cursor: 'pointer', color: '#427D9D' }} onClick={() => setValue(1)}>Signup</span>
          </Typography>
          <TextField
            label="Email"
            type="email"
            name="loginEmail"
            value={loginFormData.loginEmail}
            onChange={handleLoginInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="loginPassword"
            value={loginFormData.loginPassword}
            onChange={handleLoginInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" style={{ backgroundColor: '#164863', color: '#fff', marginTop: '20px' }}>
            Login
          </Button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <form onSubmit={handleSignupSubmit}>
          <Typography variant="body2" color="textSecondary" gutterBottom style={{ color: '#164863' }}>
            Already have an account? <span style={{ cursor: 'pointer', color: '#427D9D' }} onClick={() => setValue(0)}>Login</span>
          </Typography>
          <TextField
            label="Email"
            type="email"
            name="signupEmail"
            value={signupFormData.signupEmail}
            onChange={handleSignupInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Username"
            type="text"
            name="signupUsername"
            value={signupFormData.signupUsername}
            onChange={handleSignupInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="signupPassword"
            value={signupFormData.signupPassword}
            onChange={handleSignupInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmSignupPassword"
            value={signupFormData.confirmSignupPassword}
            onChange={handleSignupInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" style={{ backgroundColor: '#164863', color: '#fff', marginTop: '20px' }}>
            Signup
          </Button>
        </form>
      </TabPanel>
    </Paper>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default LoginSignup;
