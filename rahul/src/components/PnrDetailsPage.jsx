import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
function PnrDetailsPage() {
  const location = useLocation();
  const { pnr } = location.state;
  const [ticketDetails, setTicketDetails] = useState(null);
  useEffect(() => {
    const storedTicket = localStorage.getItem("trips");
    if (storedTicket) {
      const tickets = JSON.parse(storedTicket);
      const ticket = tickets.find(ticket => ticket.pnr.trim() === pnr.trim());
      setTicketDetails(ticket);
    }
  }, [pnr]);
  if (!ticketDetails) {
    return <p className="text-red-500">No such PNR found.</p>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6">PNR Details</h2>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold">Ticket Information</h3>
        <p><strong>PNR:</strong> {ticketDetails.pnr}</p>
        <p><strong>Train Name:</strong> {ticketDetails.trainName}</p>
        <p><strong>From Station:</strong> {ticketDetails.fromStation}</p>
        <p><strong>To Station:</strong> {ticketDetails.toStation}</p>
        <p><strong>Travel Date:</strong> {ticketDetails.travelDate}</p>
        <p><strong>Seat Availability:</strong> {ticketDetails.classType}</p>
        <p><strong>Seat Availability:</strong> {ticketDetails.availability}</p>
      </div>
    </div>
  );
}

export default PnrDetailsPage;
