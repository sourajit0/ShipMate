import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
        <Link to="/" className="text-white text-lg font-semibold">ShipmentApp</Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/track" className="text-white">Track Shipment</Link>
        <div className="relative">
          <button onClick={handleDropdownToggle} className="text-white focus:outline-none">Menu</button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
              {currentUser ? (
                <>
                  <Link to="/place" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Place Shipment</Link>
                  <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Shipment History</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <img src={logo} alt="User Profile" className="h-8 w-8 rounded-full" />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={handleMobileMenuToggle} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2">
          <Link to="/track" className="text-white mx-2">Track Shipment</Link>
          <Link to="/place" className="text-white mx-2">Place Shipment</Link>
          <Link to="/history" className="text-white mx-2">Shipment History</Link>
          {currentUser ? (
            <>
              <button onClick={logout} className="text-white mx-2">Logout</button>
              <Link to="/profile">
                <img src={logo} alt="User Profile" className="h-8 w-8 rounded-full" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2">Login</Link>
              <Link to="/register" className="text-white mx-2">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
