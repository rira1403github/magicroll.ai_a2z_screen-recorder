import React, { useState, useRef, useEffect } from 'react';
import API from '../../api';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  TextField, 
  Typography, 
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/chat', { message: input.trim() });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get response from AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SmartToyIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Typography component="h1" variant="h3" sx={{ 
            fontWeight: 'bold', 
            color: '#1976d2',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}>
            🤖 AI Chat Assistant
          </Typography>
        </Box>
        
        <Paper elevation={3} sx={{ 
          p: 3, 
          width: '100%', 
          height: '100%', 
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: 2,
            textAlign: 'center',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}>
            💬 Ask me anything about your productivity and activity data!
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2, fontSize: '1rem' }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            mb: 2,
            p: 2,
            bgcolor: '#f8f9fa',
            borderRadius: 2
          }}>
            {messages.length === 0 ? (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" sx={{ 
                  color: '#666',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}>
                  👋 Welcome! Start a conversation to get insights about your productivity.
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#888',
                  mt: 2,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}>
                  Try asking: "What were my most productive hours today?" or "Show me my activity patterns"
                </Typography>
              </Box>
            ) : (
              messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      maxWidth: '70%',
                      flexDirection: message.isUser ? 'row-reverse' : 'row',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: message.isUser ? '#1976d2' : '#4caf50',
                        width: 40,
                        height: 40,
                        mr: message.isUser ? 0 : 1,
                        ml: message.isUser ? 1 : 0,
                      }}
                    >
                      {message.isUser ? <PersonIcon /> : <SmartToyIcon />}
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: message.isUser ? '#1976d2' : 'white',
                        color: message.isUser ? 'white' : 'black',
                        borderRadius: 2,
                        maxWidth: '100%',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.5,
                          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                          wordBreak: 'break-word'
                        }}
                      >
                        {message.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 1,
                          opacity: 0.7,
                          fontSize: '0.75rem',
                          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                        }}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              ))
            )}
            
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: '#4caf50', width: 40, height: 40, mr: 1 }}>
                    <SmartToyIcon />
                  </Avatar>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
                    <CircularProgress size={20} />
                    <Typography
                      variant="body2"
                      sx={{
                        ml: 1,
                        color: '#666',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                      }}
                    >
                      AI is thinking...
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask about your productivity..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!input.trim() || loading}
              sx={{
                borderRadius: 2,
                px: 3,
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Chat; 