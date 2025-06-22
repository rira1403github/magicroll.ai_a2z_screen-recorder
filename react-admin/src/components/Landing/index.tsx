import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import {
  ScreenShare as ScreenShareIcon,
  Analytics as AnalyticsIcon,
  Chat as ChatIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Insights as InsightsIcon,
  PlayArrow as PlayArrowIcon,
  Login as LoginIcon
} from '@mui/icons-material';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ScreenShareIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Smart Screen Recording',
      description: 'Advanced screen capture technology with 1 frame per second for optimal performance and minimal resource usage.'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Productivity Analytics',
      description: 'Comprehensive dashboard with charts and insights to track your daily activity patterns and productivity trends.'
    },
    {
      icon: <ChatIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'AI-Powered Chat',
      description: 'Intelligent chat assistant that analyzes your activity data and provides personalized productivity recommendations.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Privacy First',
      description: 'Your data stays private and secure. All recordings are stored locally and only you have access to your insights.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Real-time Processing',
      description: 'Instant data processing and analysis with minimal latency for immediate productivity insights.'
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Detailed Reports',
      description: 'Generate comprehensive reports on your work patterns, peak productivity hours, and activity distribution.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                MagicRoll A2Z
                <br />
                Screen Recorder
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  lineHeight: 1.6
                }}
              >
                Transform your productivity with AI-powered screen recording and intelligent activity analysis. 
                Track, analyze, and optimize your work patterns like never before.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => navigate('/signup')}
                  sx={{
                    bgcolor: 'white',
                    color: '#1976d2',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: '#f5f5f5'
                    }
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                  🎯 Productivity Dashboard Preview
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <ScreenShareIcon sx={{ fontSize: 80, opacity: 0.8 }} />
                  <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
                    Real-time activity tracking and insights
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 6,
            color: '#333',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}
        >
          🚀 Powerful Features
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              elevation={3}
              sx={{
                height: '100%',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8
                }
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#333',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    lineHeight: 1.6,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#1976d2', py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              mb: 3,
              color: 'white',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }}
          >
            Ready to Boost Your Productivity?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'rgba(255,255,255,0.9)',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }}
          >
            Join thousands of users who have transformed their work habits with MagicRoll A2Z
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                bgcolor: 'white',
                color: '#1976d2',
                fontWeight: 'bold',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': {
                  bgcolor: '#f5f5f5'
                }
              }}
            >
              Start Your Free Trial
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#333', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}
              >
                MagicRoll A2Z Screen Recorder
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#ccc',
                  mb: 3,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}
              >
                The ultimate productivity tool for tracking, analyzing, and optimizing your screen activity 
                with AI-powered insights and intelligent recommendations.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}
              >
                Developed by
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 1,
                  color: '#1976d2',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}
              >
                Ritik Raj
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#ccc',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                  }}
                >
                  📧 rajritik1403@gmail.com
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#ccc',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                  }}
                >
                  💼 <a href="https://www.linkedin.com/in/ritik-raj-41b5a5234/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>LinkedIn</a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#ccc',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                  }}
                >
                  🐙 <a href="https://github.com/rira1403github" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>GitHub</a>
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid #555', mt: 4, pt: 3, textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#999',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
              }}
            >
              © 2024 MagicRoll A2Z. All rights reserved. | Built with ❤️ by Ritik Raj
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing; 