import React from 'react';
const TermsOfServices = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">Terms of Service</h1>

        <p className="text-lg mb-8 text-center">
          Welcome to TravelEase! By accessing or using our website, you agree to comply with and be bound by these terms and conditions.
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">1. Acceptance of Terms</h2>
          <p className="text-lg leading-relaxed">
            These terms govern your use of our services. If you disagree with any part of these terms, please do not use our platform.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">2. Use of Services</h2>
          <p className="text-lg leading-relaxed">
            You may not use the services for illegal purposes. Misuse, unauthorized access, or violation of laws is prohibited.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">3. Changes to Terms</h2>
          <p className="text-lg leading-relaxed">
            We reserve the right to update these terms at any time. Please review them regularly.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">4. Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions regarding these terms, please contact us at <a href="mailto:support@travelease.com" className="text-green-500 hover:underline">support@travelease.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
export default TermsOfServices;
