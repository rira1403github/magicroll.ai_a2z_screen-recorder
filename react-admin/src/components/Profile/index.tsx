import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  IconButton,
  Switch,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import bgImage from './bg-image.jpg';


const Input = styled('input')({
  display: 'none',
});

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        setName(decoded.name || '');
        setUsername(decoded.username || '');
        setMobileNumber(decoded.mobileNumber || '');
      }
    } catch (error) {
      console.warn('Invalid token:', error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: `'Segoe UI', 'Poppins', sans-serif`,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
            textAlign: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: darkMode ? '#90caf9' : '#4A00E0',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Profile
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: darkMode ? '#ccc' : '#888' }}>
            I am a professional user
          </Typography>

          <Box position="relative" display="inline-block">
            <Avatar
              src={profileImage || ''}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleImageUpload}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={{ position: 'absolute', bottom: 0, right: 0 }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>

          {editing ? (
            <Box>
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Username"
                fullWidth
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mobile Number"
                fullWidth
                variant="outlined"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={() => setEditing(false)}
                sx={{ background: '#4A00E0', fontWeight: 'bold' }}
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mt: 2, color: darkMode ? '#eee' : '#222' }}>
                Name: {name || 'Not provided'}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, color: darkMode ? '#eee' : '#222' }}>
                Username: {username || 'Not available'}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, color: darkMode ? '#eee' : '#222' }}>
                Mobile: {mobileNumber || 'Not provided'}
              </Typography>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() => setEditing(true)}
                sx={{ mt: 3, borderColor: '#4A00E0', color: '#4A00E0' }}
              >
                Edit Profile
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            fullWidth
            sx={{ fontWeight: 'bold', py: 1 }}
          >
            Logout
          </Button>

          <Box mt={2}>
            <Typography variant="caption" sx={{ color: darkMode ? '#bbb' : '#666' }}>
              Toggle Dark Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="primary"
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
