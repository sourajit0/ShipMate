// src/components/ShipmentHistory.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';

export default function ShipmentHistory() {
  const [shipments, setShipments] = useState([]);
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchShipments = async () => {
      const q = query(
        collection(db, 'shipments'),
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedShipments = [];
      querySnapshot.forEach((doc) => {
        fetchedShipments.push({ ...doc.data(), id: doc.id });
      });
      setShipments(fetchedShipments);
    };
    fetchShipments();
  }, [currentUser]);

  const filteredShipments = shipments.filter((shipment) => {
    if (filter === 'all') return true;
    if (filter === 'delivered') return shipment.status === 'Delivered';
    return shipment.status !== 'Delivered';
  });

  return (
    <div className="container mx-auto max-w-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Shipment History</h2>
      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <ul>
        {filteredShipments.map((shipment) => (
          <li key={shipment.id} className="border p-4 rounded mb-2">
            <p><strong>Source:</strong> {shipment.sourceAddress}</p>
            <p><strong>Destination:</strong> {shipment.destinationAddress}</p>
            <p><strong>Status:</strong> {shipment.status}</p>
            <Link to={`/order/${shipment.id}`} className="text-blue-500">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
