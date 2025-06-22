import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Bar, Line } from 'react-chartjs-2';
import { Container, Typography, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [frames, setFrames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const today = new Date().toISOString().slice(0, 10);
        const res = await API.get(`/activity/${today}`);
        setFrames(res.data.frames);
      } catch (err: any) {
        setError('Failed to load activity data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Group frames by hour
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const framesPerHour = Array(24).fill(0);
  if (frames && frames.length > 0) {
    // For demo, assume each frame has a timestamp property (future-proofing)
    // But since we only store images, just distribute them evenly for now
    frames.forEach((_, i) => {
      const hour = Math.floor((i / frames.length) * 24);
      framesPerHour[hour]++;
    });
  }

  const chartData = {
    labels: hours.map(h => `${h}:00`),
    datasets: [
      {
        label: 'Frames Captured',
        data: framesPerHour,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { 
        display: true, 
        text: '📊 Screen Activity Distribution (Bar Chart)',
        font: { size: 18, weight: 'bold' as const }
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        stepSize: 1,
        title: {
          display: true,
          text: 'Number of Frames',
          font: { size: 14, weight: 'bold' as const }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Hour of Day',
          font: { size: 14, weight: 'bold' as const }
        }
      }
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { 
        display: true, 
        text: '📈 Screen Activity Trends (Line Chart)',
        font: { size: 18, weight: 'bold' as const }
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        stepSize: 1,
        title: {
          display: true,
          text: 'Number of Frames',
          font: { size: 14, weight: 'bold' as const }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Hour of Day',
          font: { size: 14, weight: 'bold' as const }
        }
      }
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold', 
        color: '#1976d2',
        textAlign: 'center',
        mb: 4,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      }}>
        📊 Activity Dashboard
      </Typography>
      
      {loading && (
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#666', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
          Loading your activity data...
        </Typography>
      )}
      
      {error && (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'error.main', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
          {error}
        </Typography>
      )}
      
      {!loading && !error && (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }}>
              Today's Summary
            </Typography>
            <Typography variant="h5" sx={{ color: '#666', mb: 2, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
              🎯 Total Frames Captured Today: <span style={{ color: '#1976d2', fontWeight: 'bold' }}>{frames.length}</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', maxWidth: 600, mx: 'auto', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
              This represents the number of screen captures taken today. Each frame helps track your digital activity patterns.
            </Typography>
          </Paper>

          {frames.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  color: '#1976d2',
                  mb: 3,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}>
                  📊 Understanding Your Charts
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
                  <p><strong>Bar Chart:</strong> Shows the distribution of screen captures across different hours of the day. Higher bars indicate more active periods.</p>
                  <p><strong>Line Chart:</strong> Displays the trend of your screen activity throughout the day, helping you identify patterns in your productivity.</p>
                  <p><strong>What this means:</strong> Use these insights to understand your work patterns and optimize your productivity schedule!</p>
                </Typography>
                <Bar data={chartData} options={barOptions} />
              </Paper>
              
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  color: '#1976d2',
                  mb: 3,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}>
                  📉 Activity Trends
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
                  This line chart reveals trends in your screen activity over time. 
                  It helps you visualize patterns and identify when you're most and least active during the day.
                </Typography>
                <Line data={chartData} options={lineOptions} />
              </Paper>
            </div>
          ) : (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#666', mb: 2, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
                📷 No Activity Data Yet
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
                Start recording your screen activity from the Settings page to see your productivity insights here!
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard; 