// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <BrowserRouter>
      {/* The Navbar will render on every page */}
      <Navbar />
      
      {/* Main content wrapper */}
      <main className="min-h-screen bg-gray-50 pt-16"> 
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;