import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8000/getDashboardStats")
      .then(response => {
        if (response.data.status === "Success") {
          setStats(response.data);
        } else {
          console.error(response.data.message);
        }
      })
      .catch(err => console.error("Error fetching dashboard stats:", err));
    axios.get("http://localhost:8000/getFeedbacks")
      .then(response => {
        if (response.data.status === "Success") {
          setFeedbacks(response.data.feedbacks);
        } else {
          console.error(response.data.message);
        }
      })
      .catch(err => console.error("Error fetching feedbacks:", err));
  }, []);
  const handleRemoveFeedback = (id) => {
    axios.delete(`http://localhost:8000/deleteFeedback/${id}`)
      .then(response => {
        if (response.data.status === "Success") {
          setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
        } else {
          console.error("Error removing feedback:", response.data.message);
        }
      })
      .catch(err => console.error("Error removing feedback:", err));
  };
  const handleClearAllFeedbacks = () => {
    axios.delete("http://localhost:8000/clearAllFeedbacks")
      .then(response => {
        if (response.data.status === "Success") {
          setFeedbacks([]);
        } else {
          console.error("Error clearing all feedbacks:", response.data.message);
        }
      })
      .catch(err => console.error("Error clearing all feedbacks:", err));
  };
  const createBarChartData = (label, value, color = "#36A2EB") => ({
    labels: [label],
    datasets: [
      {
        label: label,
        data: [value],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  });
  const barChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Ticket Stats",
        font: {
          size: 12,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        barPercentage: 0.3,
        categoryPercentage: 0.5,
      },
      y: {
        beginAtZero: true,
        max: Math.max(stats?.totalUsers, stats?.bookedTickets, stats?.canceledTickets) + 100,
        stepSize: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 mt-20 flex justify-center text-blue-400">Admin Dashboard</h1>

      {stats ? (
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-500 mb-2">Total Users</h3>
            <Bar data={createBarChartData("Total Users", stats.totalUsers)} options={barChartOptions} />
            <p className="mt-2 text-center">Total Users: {stats.totalUsers}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-500 mb-2">Booked Tickets</h3>
            <Bar data={createBarChartData("Booked Tickets", stats.bookedTickets)} options={barChartOptions} />
            <p className="mt-2 text-center">Booked Tickets: {stats.bookedTickets}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Canceled Tickets</h3>
            <Bar data={createBarChartData("Canceled Tickets", stats.canceledTickets, "#FF6347")} options={barChartOptions} />
            <p className="mt-2 text-center">Canceled Tickets: {stats.canceledTickets}</p>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
      <button 
        className="bg-blue-500 text-white p-3 rounded-lg mb-6 relative"
        onClick={() => setShowFeedbacks(!showFeedbacks)}
      >
        View Feedbacks
        {feedbacks.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{feedbacks.length}</span>
        )}
      </button>
      {showFeedbacks && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-500 mb-4">User Feedbacks</h2>
          <ul>
            {feedbacks.map((feedback) => (
              <li key={feedback._id} className="bg-gray-700 p-4 rounded-md mb-4 flex justify-between items-center">
                <div>
                  <p><strong>Feedback:</strong> {feedback.feedback}</p>
                  <p><strong>Submitted on:</strong> {new Date(feedback.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveFeedback(feedback._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            className="bg-red-500 text-white p-3 rounded-lg mt-4"
            onClick={handleClearAllFeedbacks}
          >
            Clear All Feedbacks
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
