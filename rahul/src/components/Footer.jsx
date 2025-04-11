import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const AdminPinPopup = ({ showPopup, setShowPopup }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const adminPin = "1234";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === adminPin) {
      navigate("/admin");
      setShowPopup(false);
      setPin("");
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };
  const handleClose = () => {
    setShowPopup(false);
    setPin("");
    setError("");
  };
  return (
    showPopup && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
          <h2 className="text-3xl font-semibold mb-6 text-center text-green-500">Enter Admin PIN</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}/>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition">
              Submit
            </button>
          </form>
          <button
            className="mt-4 text-red-500 w-full text-center"
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};
function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const handleAdminClick = () => {
    setShowPopup(true);
  };
  return (
    <footer className="bg-gray-900 text-gray-300 py-2 relative shadow-lg z-50 shadow-2xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 w-full">
        <div>
          <h2 className="text-lg font-semibold text-gray-100">TravelEase</h2>
          <p className="mt-2 text-sm">Your gateway to seamless and convenient travel experiences.</p>
        </div>
        <div className="flex justify-center space-x-8 flex-1">
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
        <div className="flex space-x-4 text-2xl ml-auto">
          <a href="https://facebook.com" target="_blank"  className="hover:text-white transition-colors">
            <AiFillFacebook />
          </a>
          <a href="https://twitter.com" target="_blank"  className="hover:text-white transition-colors">
            <AiFillTwitterSquare />
          </a>
          <a href="https://instagram.com" target="_blank"  className="hover:text-white transition-colors">
            <AiFillInstagram />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm">
        <p>&copy; 2024 TravelEase. All rights reserved.</p>
      </div>
      {location.pathname !== '/admin' && (
        <div className="absolute bottom-0 right-0 mb-16 mr-6">
          <button
            onClick={handleAdminClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-full text-md shadow-lg hover:bg-blue-700 transition duration-300">
            Admin
          </button>
        </div>
      )}
      <AdminPinPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </footer>
  );
}
export default Footer;
