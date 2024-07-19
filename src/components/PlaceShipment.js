import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Razorpay from 'razorpay';
import { nanoid } from 'nanoid';
import { useAuth } from '../context/AuthContext';

export default function PlaceShipment() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [packageSize, setPackageSize] = useState('');
  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [shippingCharge, setShippingCharge] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Access current user

  const calculateShippingCharge = () => {
    // Implement your logic to calculate shipping charge based on packageSize and destination
    setShippingCharge(100); // Replace with actual logic
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateShippingCharge();
    try {
      // Generate a unique tracking ID
      const trackingID = nanoid();

      // Create initial tracking states
      const initialTrackingStates = [
        { status: 'Ordered', timestamp: new Date().toISOString() },
        { status: 'Shipped', timestamp: '' },
        { status: 'In Transit', timestamp: '' },
        { status: 'Out for Delivery', timestamp: '' },
        { status: 'Delivered', timestamp: '' },
      ];

      // Create a new shipment in Firestore
      const shipmentRef = await addDoc(collection(db, 'shipments'), {
        sender,
        receiver,
        packageSize,
        sourceAddress,
        destinationAddress,
        trackingID,
        status: 'Ordered',
        trackingStates: initialTrackingStates,
        email: currentUser.email, // Associate shipment with current user's email
      });

      // Set the order number
      setOrderNumber(shipmentRef.id);

      // Initiate Razorpay payment
      const razorpay = new Razorpay({
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key ID
        amount: shippingCharge * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        name: 'Shipment Tracker',
        description: `Payment for shipment ID: ${shipmentRef.id}`,
        handler: (response) => {
          // Handle the payment success, store tracking ID, etc.
          console.log('Payment successful:', response);
          navigate(`/track-shipment/${trackingID}`);
        },
        prefill: {
          name: sender,
          email: currentUser.email, // Use current user's email
          contact: '9999999999', // Replace with user's contact number
        },
        theme: {
          color: '#3399cc',
        },
      });

      razorpay.open();
    } catch (error) {
      console.error('Error creating shipment:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Place Shipment</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="sender" className="mb-2 font-medium">Sender</label>
          <input
            type="text"
            id="sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Sender"
            className="border p-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="receiver" className="mb-2 font-medium">Receiver</label>
          <input
            type="text"
            id="receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Receiver"
            className="border p-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="packageSize" className="mb-2 font-medium">Package Size</label>
          <input
            type="text"
            id="packageSize"
            value={packageSize}
            onChange={(e) => setPackageSize(e.target.value)}
            placeholder="Package Size"
            className="border p-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="sourceAddress" className="mb-2 font-medium">Source Address</label>
          <input
            type="text"
            id="sourceAddress"
            value={sourceAddress}
            onChange={(e) => setSourceAddress(e.target.value)}
            placeholder="Source Address"
            className="border p-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="destinationAddress" className="mb-2 font-medium">Destination Address</label>
          <input
            type="text"
            id="destinationAddress"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            placeholder="Destination Address"
            className="border p-2 rounded"
            required
          />
        </div>
      </form>
      <div className="text-center mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Create Shipment
        </button>
      </div>
      {orderNumber && (
        <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-800">
          <p className="font-semibold">Shipment Created Successfully!</p>
          <p>Your Order Number: <strong>{orderNumber}</strong></p>
        </div>
      )}
    </div>
  );
}
