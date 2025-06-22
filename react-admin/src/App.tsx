import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Chat from './components/Chat';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile';
import Landing from './components/Landing';

const isAuthenticated = () => !!localStorage.getItem('token');

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

const NavBar: React.FC = () => {
  const location = useLocation();
  if (!isAuthenticated()) return null;
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 32px',
      background: '#222',
      marginBottom: 24,
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 22, letterSpacing: 1 }}>
        <span role="img" aria-label="logo" style={{ marginRight: 8 }}>🪄</span>MagicRoll A2Z
      </div>
      <div style={{ display: 'flex', gap: 28 }}>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: location.pathname === '/dashboard' ? 'bold' : 400, borderBottom: location.pathname === '/dashboard' ? '2px solid #fff' : 'none', paddingBottom: 2 }}>Dashboard</Link>
        <Link to="/settings" style={{ color: '#fff', textDecoration: 'none', fontWeight: location.pathname === '/settings' ? 'bold' : 400, borderBottom: location.pathname === '/settings' ? '2px solid #fff' : 'none', paddingBottom: 2 }}>Settings</Link>
        <Link to="/chat" style={{ color: '#fff', textDecoration: 'none', fontWeight: location.pathname === '/chat' ? 'bold' : 400, borderBottom: location.pathname === '/chat' ? '2px solid #fff' : 'none', paddingBottom: 2 }}>Chat</Link>
        <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', fontWeight: location.pathname === '/profile' ? 'bold' : 400, borderBottom: location.pathname === '/profile' ? '2px solid #fff' : 'none', paddingBottom: 2 }}>Profile</Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App; 