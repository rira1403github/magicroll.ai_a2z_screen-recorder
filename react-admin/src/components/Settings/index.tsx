import React, { useState, useRef } from 'react';
import API from '../../api';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Switch, 
  FormControlLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const Settings: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: { 
          frameRate: { ideal: 1 },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const formData = new FormData();
          formData.append('frame', event.data);
          
          try {
            await API.post('/activity/frame', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
          } catch (err) {
            console.error('Failed to send frame:', err);
          }
        }
      };
      
      mediaRecorder.start(1000); // Capture every second
      setIsRecording(true);
      setSuccess('🎥 Screen recording started successfully!');
      
    } catch (err: any) {
      setError('Failed to start recording: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsRecording(false);
    setSuccess('⏹️ Screen recording stopped successfully!');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SettingsIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Typography component="h1" variant="h3" sx={{ 
            fontWeight: 'bold', 
            color: '#1976d2',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}>
            ⚙️ Settings
          </Typography>
        </Box>
        
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: 3,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}>
            🎥 Screen Recording Controls
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              color: '#666',
              marginBottom: 2,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }}>
              Control your screen recording to capture activity data for productivity insights.
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3, fontSize: '1rem' }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3, fontSize: '1rem' }}>
              {success}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isRecording}
                  onChange={() => isRecording ? stopRecording() : startRecording()}
                  disabled={loading}
                />
              }
              label={
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}>
                  {isRecording ? '🟢 Recording Active' : '🔴 Recording Inactive'}
                </Typography>
              }
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={startRecording}
              disabled={isRecording || loading}
              startIcon={loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
              sx={{ 
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 32px',
                borderRadius: 2,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
              }}
            >
              {loading ? 'Starting...' : '▶️ Start Recording'}
            </Button>
            
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={stopRecording}
              disabled={!isRecording}
              startIcon={<StopIcon />}
              sx={{ 
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 32px',
                borderRadius: 2,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
              }}
            >
              ⏹️ Stop Recording
            </Button>
          </Box>
          
          <Box sx={{ mt: 4, p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: 2,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }}>
              📋 Recording Information
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#666',
              lineHeight: 1.6,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }}>
              • <strong>Frame Rate:</strong> 1 frame per second for optimal performance<br/>
              • <strong>Quality:</strong> High-definition capture (1920x1080)<br/>
              • <strong>Storage:</strong> Frames are sent to the server for analysis<br/>
              • <strong>Privacy:</strong> Only you can see your recorded data<br/>
              • <strong>Usage:</strong> Data is used to generate productivity insights in the Dashboard
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings; 






