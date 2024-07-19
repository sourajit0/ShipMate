
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <div className="container mx-auto max-w-sm p-4">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" ref={emailRef} required placeholder="Email" className="border p-2 w-full rounded" />
        <input type="password" ref={passwordRef} required placeholder="Password" className="border p-2 w-full rounded" />
        <button disabled={loading} type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Log In</button>
      </form>
      <div className="mt-4">
        Need an account? <Link to="/register" className="text-blue-500">Register</Link>
      </div>
    </div>
  );
}
