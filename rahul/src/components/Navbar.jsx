import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCaretDown, FaUserAlt, FaSuitcaseRolling, FaPhoneAlt, FaSignOutAlt, FaRegComment } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.profilePic) {
      setProfilePic(storedData.profilePic);}
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    logout();
    toast.error('Successfully logged out!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: 'colored',
    });
  };
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md absolute w-full top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white text-2xl flex items-center">
          <FaHome className="text-green-500" />
        </Link>
        <span className="text-green-400 text-2xl font-bold">TravelEase</span>
      </div>
      {isAuthenticated ? (
        <div className="flex items-center space-x-4 relative">
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img
                src={profilePic || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-green-500"/>
              <FaCaretDown className="text-green-500" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg w-48 z-50">
                <ul className="space-y-2 p-2">
                  <li>
                    <Link
                      to="/account"
                      className="flex items-center space-x-2 text-white hover:text-green-500">
                      <FaUserAlt className="text-green-500" />
                      <span>Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-trips"
                      className="flex items-center space-x-2 text-white hover:text-green-500" >
                      <FaSuitcaseRolling className="text-green-500" />
                      <span>My Trips</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/help"
                      className="flex items-center space-x-2 text-white hover:text-green-500">
                      <FaPhoneAlt className="text-green-500" />
                      <span>Support</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/feedback"
                      className="flex items-center space-x-2 text-white hover:text-green-500">
                      <FaRegComment className="text-green-500" />
                      <span>Feedback</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 text-white hover:text-red-500">
                      <FaSignOutAlt className="text-red-500" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white">
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/signup"
          className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white">
          Login/Signup
        </Link>
      )}
    </nav>
  );
}
export default Navbar;
