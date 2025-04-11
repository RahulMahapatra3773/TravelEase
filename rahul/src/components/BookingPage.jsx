import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImSpinner6 } from "react-icons/im";
const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, fromStation, toStation, travelDate, classType, availability } = location.state || {};
  if (!train) {
    return <div>No train information available.</div>;
  }
  const [passengers, setPassengers] = useState([]);
  const [newPassenger, setNewPassenger] = useState({
    name: '',
    age: '',
    gender: '',
    preference: '',
    nationality: '',
  });
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [editingPassengerIndex, setEditingPassengerIndex] = useState(null);
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: '',
  });
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const handleAddPassenger = () => {
    if (newPassenger.name) {
      if (editingPassengerIndex !== null) {
        const updatedPassengers = passengers.map((passenger, idx) =>
          idx === editingPassengerIndex ? newPassenger : passenger
        );
        setPassengers(updatedPassengers);
        setEditingPassengerIndex(null);
      } else {
        setPassengers([...passengers, newPassenger]);
      }
      setNewPassenger({
        name: '',
        age: '',
        gender: '',
        preference: '',
        nationality: '',
      });
      setShowPassengerForm(false);
    }
  };
  const handlePassengerInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassenger({
      ...newPassenger,
      [name]: value,
    });
  };
  const handleGenderChange = (e) => {
    setNewPassenger({
      ...newPassenger,
      gender: e.target.value,
    });
  };
  const handlePreferenceChange = (value) => {
    setNewPassenger({
      ...newPassenger,
      preference: value,
    });
  };
  const handleEditPassenger = (index) => {
    setEditingPassengerIndex(index);
    setNewPassenger(passengers[index]);
    setShowPassengerForm(true);
  };
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({
      ...contactDetails,
      [name]: value,
    });
  };
  const generatePNR = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleMakePayment = () => {
    setIsLoading(true);
    setShowBookingPopup(false);
    setTimeout(() => {
      navigate('/fakepayment');
      setIsLoading(false);
    }, 3000);
  };
  const handleCancelBooking = () => {
    setShowBookingPopup(false);
  };  
  const handleBookNow = () => {
    if (passengers.length === 0) {
      toast.error("Please add at least one passenger.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      return;
    }
    if (!contactDetails.email || !contactDetails.phone) {
      toast.error("Please provide contact details.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      return;
    }
    const pnr = generatePNR();
    const tripDetails = {
      trainNumber: train.number,
      trainName: train.name,
      departureTime: train.depTime,
      travelDate,
      fromStation,
      toStation,
      passengers,
      contact: contactDetails,
      pnr,
      availability,
      classType,
    };
  
    let existingTrips = JSON.parse(localStorage.getItem('trips'));
    if (!Array.isArray(existingTrips)) {
      existingTrips = [];
    }
    localStorage.setItem('trips', JSON.stringify([...existingTrips, tripDetails]));
    setShowBookingPopup(true);
  };
  return (
    <div className={`min-h-screen bg-gray-900 text-white p-6 `}>
       <div className={`bg-gray-800 p-6 rounded-lg mb-6 mt-16 max-w-4xl mx-auto ${showBookingPopup ? 'blur-sm' : ''}`}>
        <div className="bg-gray-700 p-4 rounded mb-6 border-2 border-green-500">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Boarding Details</h2>
          <p><strong>Train Name:</strong> {train.name}</p>
          <p><strong>Train Number:</strong> {train.number}</p>
          <p><strong>From:</strong> {fromStation}</p>
          <p><strong>To:</strong> {toStation}</p>
          <p><strong>Travel Date:</strong> {new Date(travelDate).toLocaleDateString()}</p>
          <p><strong>Class Type:</strong> {classType}</p>
          <p><strong>Availability:</strong> {availability}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded mb-6 border-2 border-green-500">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Passengers</h2>
          <div className="p-2 rounded mb-4">
            {passengers.map((passenger, idx) => (
              <div key={idx} className="flex items-center space-x-4 py-2">
                <input type="checkbox" id={`passenger-${idx}`} className="text-green-500" />
                <label htmlFor={`passenger-${idx}`} className="text-white">{passenger.name}</label>
                <button
                  onClick={() => handleEditPassenger(idx)}
                  className="ml-20 text-blue-500 hover:text-blue-400 transition duration-300"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
          {!showPassengerForm ? (
            <button
              onClick={() => setShowPassengerForm(true)}
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Add Passenger
            </button>
          ) : (
            <div className="absolute bg-gray-800 p-6 rounded w-96 bottom-1/4 left-1/2 transform -translate-x-1/2">
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-bold text-green-400">Add Passenger</h3>
                <button onClick={() => setShowPassengerForm(false)} className="text-red-500 font-bold">X</button>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newPassenger.name}
                onChange={handlePassengerInputChange}
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white"/>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newPassenger.age}
                onChange={handlePassengerInputChange}
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white"
                inputMode="numeric"
                pattern="[0-9]*"/>
              <div className="mb-2">
                <p className="font-semibold text-green-400">Gender</p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={newPassenger.gender === 'Male'}
                      onChange={handleGenderChange}
                      className="text-green-500" />
                    Male
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={newPassenger.gender === 'Female'}
                      onChange={handleGenderChange}
                      className="text-green-500"/>
                    Female
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={newPassenger.gender === 'Other'}
                      onChange={handleGenderChange}
                      className="text-green-500"/>
                    Other
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-green-400">Preference</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper'].map((preference) => (
                    <button
                      key={preference}
                      type="button"
                      className={`px-4 py-2 rounded-full text-sm ${newPassenger.preference === preference ? 'bg-green-600' : 'bg-gray-600'} transition duration-300`}
                      onClick={() => handlePreferenceChange(preference)}>
                      {preference}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={newPassenger.nationality}
                onChange={handlePassengerInputChange}
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white" />
              <button
                type="button"
                onClick={handleAddPassenger}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                {editingPassengerIndex === null ? 'Add Passenger' : 'Update Passenger'}
              </button>
            </div>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded mb-6 border-2 border-green-500">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Contact Details</h2>
          <input
            type="email"
            name="email"
            value={contactDetails.email}
            onChange={handleContactChange}
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white" />
          <input
            type="tel"
            name="phone"
            value={contactDetails.phone}
            onChange={handleContactChange}
            placeholder="Phone"
            className="w-full p-2 rounded bg-gray-700 text-white"/>
        </div>
        <button
          onClick={handleBookNow}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300" >
          Book Now
        </button>
      </div>
      {isLoading && (
        <div className="inset-0 absolute flex items-center justify-center bg-opacity-50 z-50">
          <ImSpinner6 className="w-16 h-16 text-green-400 animate-spin" />
        </div>)}
      {showBookingPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-6 rounded-lg text-white max-w-xl w-full relative">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Booking Summary</h2>
      <p><strong>Train Name:</strong> {train.name}</p>
      <p><strong>Train Number:</strong> {train.number}</p>
      <p><strong>From:</strong> {fromStation}</p>
      <p><strong>To:</strong> {toStation}</p>
      <p><strong>Travel Date:</strong> {new Date(travelDate).toLocaleDateString()}</p>
      <p><strong>Class Type:</strong> {classType}</p>
      <p><strong>Availability:</strong> {availability}</p>
      <h3 className="mt-4 text-xl font-semibold">Passengers</h3>
      {passengers.map((passenger, idx) => (
        <p key={idx}>{passenger.name}</p>))}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleCancelBooking}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
          Cancel
        </button>
        <button
          onClick={handleMakePayment}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Proceed to Payment
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
export default BookingPage;
