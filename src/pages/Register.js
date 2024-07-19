// src/pages/Register.js
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <div className="container mx-auto max-w-sm p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" ref={emailRef} required placeholder="Email" className="border p-2 w-full rounded" />
        <input type="password" ref={passwordRef} required placeholder="Password" className="border p-2 w-full rounded" />
        <input type="password" ref={passwordConfirmRef} required placeholder="Confirm Password" className="border p-2 w-full rounded" />
        <button disabled={loading} type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
      </form>
      <div className="mt-4">
        Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
      </div>
    </div>
  );
}
