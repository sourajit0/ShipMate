
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto max-w-lg p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p><strong>Email:</strong> {currentUser.email}</p>
      {/* Add more user details as required */}
    </div>
  );
}
