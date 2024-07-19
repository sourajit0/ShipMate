// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PlaceShipment from './components/PlaceShipment';
import ShipmentHistory from './components/ShipmentHistory';
import TrackShipment from './components/TrackShipment';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { Buffer } from 'buffer';
import process from 'process';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/place" element={<ProtectedRoute><PlaceShipment /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><ShipmentHistory /></ProtectedRoute>} />
            <Route path="/track" element={<TrackShipment />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
