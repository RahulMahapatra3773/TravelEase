import React from 'react';
const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center text-green-400 mt-16 mb-8">About</h1>
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-green-400 mb-4">Purpose</h2>
          <p className="text-base leading-relaxed">
            TravelEase is a platform that helps users plan their travel by providing tools to search for and book train tickets with ease.
          </p>
        </section>
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-green-400 mb-4">Features</h2>
          <ul className="list-disc pl-8 text-base space-y-2">
            <li>Train search and booking functionality</li>
            <li>Station-based filtering for travel planning</li>
            <li>Bookmarking feature to save travel preferences</li>
            <li>User-friendly interface for a seamless experience</li>
          </ul>
        </section>
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-green-400 mb-4">Contact</h2>
          <p className="text-base leading-relaxed">
            For any questions or feedback, feel free to send an email.
          </p>
          <p className="text-base mt-2">Email: <a href="mailto:support@travelease.com" className="text-green-500 hover:underline">support@travelease.com</a></p>
        </section>
      </div>
    </div>
  );
};
export default About;
