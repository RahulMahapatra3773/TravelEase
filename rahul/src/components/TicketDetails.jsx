import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import { MdOutlineFileDownload } from "react-icons/md";
const TicketDetails = () => {
  const { state } = useLocation();
  const [tripDetails, setTripDetails] = useState(state?.trip || null);
  useEffect(() => {
    if (!tripDetails) {
      const storedTripDetails = localStorage.getItem("tripDetails");
      if (storedTripDetails) {
        const tripArray = JSON.parse(storedTripDetails);
        setTripDetails(tripArray[0]);
      }
    }
  }, [tripDetails]);
  if (!tripDetails) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">No trip details available.</div>;}
  const formattedTravelDate = new Date(tripDetails.travelDate).toLocaleDateString();
  const handleDownload = () => {
    const element = document.getElementById("ticket-details");
    const options = {
      margin: 0,
      filename: `TicketDetails_${tripDetails.pnr}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { 
        unit: "in", 
        format: [9, 8],
        orientation: "portrait" 
      },
    };
    html2pdf().from(element).set(options).save();
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="relative max-w-4xl mx-auto bg-gray-800 p-4 rounded-lg shadow-xl mt-20" id="ticket-details">
        <MdOutlineFileDownload
          onClick={handleDownload}
          className="absolute top-4 right-4 text-green-400 text-3xl cursor-pointer hover:text-green-300"/>
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
          <h2 className="text-2xl font-bold text-green-400 mb-3">E-Ticket</h2>
          <div className="text-lg space-y-2">
            <p><strong className="text-green-300">PNR:</strong> {tripDetails.pnr}</p>
            <p><strong className="text-green-300">Train Name:</strong> {tripDetails.trainName}</p>
            <p><strong className="text-green-300">Train Number:</strong> {tripDetails.trainNumber}</p>
            <p><strong className="text-green-300">From:</strong> {tripDetails.fromStation}</p>
            <p><strong className="text-green-300">To:</strong> {tripDetails.toStation}</p>
            <p><strong className="text-green-300">Travel Date:</strong> {formattedTravelDate}</p>
            <p><strong className="text-green-300">Class Type:</strong> {tripDetails.classType}</p>
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-bold text-green-400 mb-3">Passenger Details</h3>
          {tripDetails.passengers.length > 0 ? (
               <>
              <div className="grid grid-cols-5 gap-4 text-center font-semibold border-b border-gray-600 pb-2 mb-3">
                <div>Name</div>
                <div>Age</div>
                <div>Gender</div>
                <div>Booking Status</div>
                <div>Current Status</div>
              </div>
              {tripDetails.passengers.map((passenger, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 text-center mb-3 hover:bg-gray-600 rounded-lg transition-all duration-200">
                  <div>{passenger.name}</div>
                  <div>{passenger.age}</div>
                  <div>{passenger.gender}</div>
                  <div className="text-yellow-400">{tripDetails.availability}</div>
                  <div className="text-yellow-400">{tripDetails.availability}</div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-gray-400">No passengers added.</p>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-bold text-green-400 mb-3">Contact Details</h3>
          <div className="space-y-2 text-lg">
            <p><strong className="text-green-300">Email:</strong> {tripDetails.contact?.email || 'N/A'}</p>
            <p><strong className="text-green-300">Phone:</strong> {tripDetails.contact?.phone || 'N/A'}</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">&copy; 2024 TravelEase. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
export default TicketDetails;
