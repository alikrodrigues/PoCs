import React from 'react';
import { Link } from 'react-router';

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem', color: '#e2e8f0', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', color: '#646cff' }}>Welcome to our Project</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>This is a simple React application using React Router v7.</p>
      <Link 
        to="/about" 
        style={{ 
          display: 'inline-block', 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#646cff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '0.5rem',
          fontWeight: 'bold'
        }}
      >
        Learn more about us
      </Link>
    </div>
  );
};

export default Home;
