import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error('Please enter your feedback!');
      return;
    }
    axios.post('http://localhost:8000/feedback', { feedback })
      .then((response) => {
       toast.success("Feedback submitted successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored",
    });
        setFeedback('');
      })
      .catch(() => {
        toast.error('Error occurred while submitting feedback!');
      });
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white justify-center items-center">
      <div className="max-w-lg w-full p-6">
        <h1 className="text-4xl font-semibold text-center mb-8">We Value Your Feedback</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback..."
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
            rows="6"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-6 rounded-md text-lg hover:bg-green-500 transition duration-300"
          >
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
export default FeedbackPage;
