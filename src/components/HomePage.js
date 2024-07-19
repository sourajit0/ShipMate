// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import featureImage from '../assets/feature.svg'; // Add your SVG file in assets

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Welcome to ShipmentApp</h1>
      <img src={featureImage} alt="Feature" className="mx-auto mb-8" />
      <div className="space-y-4">
        <Link to="/place" className="bg-blue-500 text-white p-4 rounded block max-w-xs mx-auto">Place Shipment</Link>
        <Link to="/history" className="bg-blue-500 text-white p-4 rounded block max-w-xs mx-auto">Shipment History</Link>
        <Link to="/track" className="bg-blue-500 text-white p-4 rounded block max-w-xs mx-auto">Track Shipment</Link>
      </div>
    </div>
  );
}
