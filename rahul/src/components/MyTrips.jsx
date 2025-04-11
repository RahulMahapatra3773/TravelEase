import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [canceledTrips, setCanceledTrips] = useState([]);
  const [viewingCanceled, setViewingCanceled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    const savedCanceledTrips = JSON.parse(localStorage.getItem('canceledTrips') || '[]');
    setTrips(savedTrips);
    setCanceledTrips(savedCanceledTrips);
  }, []);
  const handleCancel = (index) => {
    const canceledTrip = trips[index];
    const updatedTrips = trips.filter((_, idx) => idx !== index);
    const updatedCanceledTrips = [...canceledTrips, canceledTrip];
    setTrips(updatedTrips);
    setCanceledTrips(updatedCanceledTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    localStorage.setItem('canceledTrips', JSON.stringify(updatedCanceledTrips));
    axios.post('http://localhost:8000/updateCanceledTickets', { canceledTickets: 1 })
      .then(response => {
        console.log('Canceled ticket count updated successfully');})
      .catch(err => {
        console.error('Error updating canceled ticket count', err);});
    toast.error("Ticket Cancelled Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored"
    });
  };
  const handleView = (trip) => {
    navigate('/ticket-details', { state: { trip } });};
  const handleClearAll = () => {
    setCanceledTrips([]);
    localStorage.setItem('canceledTrips', JSON.stringify([]));
    toast.success("All Canceled Trips Cleared!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored"});};
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;};
  const filteredTrips = viewingCanceled ? canceledTrips : trips;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-16 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center text-white">My Trips</h1>
        {viewingCanceled && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Clear All
          </button>
        )}
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
          value={viewingCanceled ? "canceled" : "current"}
          onChange={(e) => setViewingCanceled(e.target.value === "canceled")}>
          <option value="current">Current Trips</option>
          <option value="canceled">Canceled Trips</option>
        </select>
      </div>
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-green-500 mb-4">Train Details</h2>
              <p><strong>PNR:</strong> {trip.pnr}</p>
              <p className="text-sm mb-2"><strong>Train Number:</strong> {trip.trainNumber}</p>
              <p className="text-sm mb-2"><strong>Train Name:</strong> {trip.trainName}</p>
              <p className="text-sm mb-2"><strong>Departure Time:</strong> {trip.departureTime}</p>
              <p className="text-sm mb-2"><strong>Travel Date:</strong> {formatDate(trip.travelDate)}</p>
              {!viewingCanceled && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleView(trip)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full">
                    View
                  </button>
                  <button
                    onClick={() => handleCancel(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full ml-2">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No trips available.</p>
      )}
    </div>
  );
};
export default MyTrips;
