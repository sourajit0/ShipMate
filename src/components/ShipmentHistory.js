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
      if (!currentUser) return; // Ensure user is authenticated

      try {
        // Fetch shipments for the current user
        const q = query(
          collection(db, 'shipments'),
          where('email', '==', currentUser.email) // Assuming you use email to filter
        );
        const querySnapshot = await getDocs(q);
        const fetchedShipments = [];
        querySnapshot.forEach((doc) => {
          fetchedShipments.push({ ...doc.data(), id: doc.id });
        });
        setShipments(fetchedShipments);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    };

    fetchShipments();
  }, [currentUser]);

  // Filter shipments based on status
  const filteredShipments = shipments.filter((shipment) => {
    if (filter === 'all') return true;
    if (filter === 'delivered') return shipment.status === 'Delivered';
    return shipment.status !== 'Delivered';
  });

  // Determine current status based on the latest non-empty timestamp in trackingStates
  const determineCurrentStatus = (trackingStates) => {
    if (!trackingStates || trackingStates.length === 0) return 'Ordered';
  
    // Filter out states with empty timestamps
    const statusesWithTimestamps = trackingStates.filter(state => state.timestamp);
    if (statusesWithTimestamps.length === 0) return 'Ordered';
  
    // Find the latest state with a non-empty timestamp
    const latestState = statusesWithTimestamps.reduce((latest, state) => {
      return new Date(state.timestamp).getTime() > new Date(latest.timestamp).getTime() ? state : latest;
    });
  
    return latestState.status;
  };
  

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
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => {
            const currentStatus = determineCurrentStatus(shipment.trackingStates);

            return (
              <li key={shipment.id} className="border p-4 rounded mb-2">
                <p><strong>Order ID:</strong> {shipment.id}</p>
                <p><strong>Sender:</strong> {shipment.sender}</p>
                <p><strong>Receiver:</strong> {shipment.receiver}</p>
                <p><strong>Source Address:</strong> {shipment.sourceAddress}</p>
                <p><strong>Destination Address:</strong> {shipment.destinationAddress}</p>
                <p><strong>Package Size:</strong> {shipment.packageSize}</p>
                <p><strong>Status:</strong> {currentStatus}</p>

               
              </li>
            );
          })
        ) : (
          <p>No shipments found.</p>
        )}
      </ul>
    </div>
  );
}
