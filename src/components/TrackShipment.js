// src/components/TrackShipment.js
import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function TrackShipment() {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    setError('');
    setShipment(null);
    try {
      const docRef = doc(db, 'shipments', trackingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShipment(docSnap.data());
      } else {
        setError('No such shipment found');
      }
    } catch (error) {
      setError('Error fetching shipment details');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Track Shipment</h2>
      <input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Enter Tracking ID"
        className="border p-2 w-full rounded mb-4"
      />
      <button onClick={handleTrack} className="bg-blue-500 text-white p-2 rounded w-full">
        Track
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {shipment && (
        <div className="mt-4 border p-4 rounded">
          <p><strong>Source:</strong> {shipment.sourceAddress}</p>
          <p><strong>Destination:</strong> {shipment.destinationAddress}</p>
          <p><strong>Status:</strong> {shipment.status}</p>
          {/* Add tracking bar UI */}
        </div>
      )}
    </div>
  );
}
