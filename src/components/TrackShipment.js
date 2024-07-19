import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTruck, faPlane, faHome, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

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

  const trackingStages = [
    { label: 'Pick Up', icon: faBox },
    { label: 'Shipped', icon: faTruck },
    { label: 'In Transit', icon: faPlane },
    { label: 'Out for Delivery', icon: faHome },
    { label: 'Delivered', icon: faCheckCircle }
  ];

  const getProgressBarWidth = (index) => {
    return `${((index + 1) / trackingStages.length) * 100}%`;
  };

  const getCurrentStatus = () => {
    if (!shipment || !shipment.trackingStates) return 'Pick Up';
    const lastCompletedIndex = shipment.trackingStates.reduce((maxIndex, state, index) => {
      return state.timestamp ? Math.max(maxIndex, index) : maxIndex;
    }, -1);
    return lastCompletedIndex >= 0 ? trackingStages[lastCompletedIndex].label : 'Pick Up';
  };

  const currentStatus = getCurrentStatus();

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
        <div className="mt-4 border p-4 rounded shadow-lg">
          <p><strong>Order ID:</strong> {trackingId}</p>
          <p><strong>Sender:</strong> {shipment.sender}</p>
          <p><strong>Receiver:</strong> {shipment.receiver}</p>
          <p><strong>Source Address:</strong> {shipment.sourceAddress}</p>
          <p><strong>Destination Address:</strong> {shipment.destinationAddress}</p>
          <p><strong>Package Size:</strong> {shipment.packageSize}</p>
          <p><strong>Estimated Delivery Date:</strong> {shipment.estimatedDeliveryDate || 'N/A'}</p>
          <p><strong>Status:</strong> {currentStatus}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Tracking Progress:</h3>
            <div className="flex items-center justify-between mb-2">
              {trackingStages.map((stage) => (
                <div key={stage.label} className="flex-1 text-center text-xs font-medium text-gray-600">
                  <FontAwesomeIcon icon={stage.icon} className={`text-xl ${currentStatus === stage.label ? 'text-blue-600' : 'text-gray-300'}`} />
                  <div>{stage.label}</div>
                </div>
              ))}
            </div>
            <div className="relative mt-4">
              <div className="absolute inset-0 bg-gray-300 h-1 rounded-full" />
              <div className="relative flex items-center">
                {trackingStages.map((stage, index) => (
                  <div
                    key={stage.label}
                    className={`relative flex-1 h-1 ${index < trackingStages.length - 1 ? 'bg-gray-300' : ''}`}
                    style={{ backgroundColor: index <= trackingStages.findIndex(t => t.label === currentStatus) ? 'blue' : 'gray' }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center">
                  {trackingStages.map((stage, index) => (
                    <div
                      key={stage.label}
                      className={`absolute w-1/${trackingStages.length} ${index <= trackingStages.findIndex(t => t.label === currentStatus) ? 'text-blue-600' : 'text-gray-400'}`}
                      style={{ left: getProgressBarWidth(index) }}
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







