import React from 'react';
function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">Privacy Policy</h1>
        <p className="text-lg text-center mb-8">
          Welcome to the TravelEase Privacy Policy. At TravelEase, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Information Collection</h2>
          <p className="text-lg leading-relaxed">
            We collect the following personal data from our users:
          </p>
          <ul className="list-disc pl-8 text-lg leading-relaxed">
            <li><strong>Email Address:</strong> Used for account creation, communication, and security purposes.</li>
            <li><strong>Name:</strong> Used for account identification and personalization.</li>
            <li><strong>Password:</strong> Used to secure your account and protect your personal information.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Use of Information</h2>
          <p className="text-lg leading-relaxed">
            The information we collect is used for:
          </p>
          <ul className="list-disc pl-8 text-lg leading-relaxed">
            <li><strong>Security:</strong> To ensure the security of your account and prevent unauthorized access.</li>
            <li><strong>Account Management:</strong> To manage your account, including the creation and maintenance of your user profile.</li>
            <li><strong>Communication:</strong> To communicate with you regarding your account, including updates, security alerts, and other relevant information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-lg">
            <strong>Email:</strong> <a href="mailto:support@travelease.com" className="text-green-500 hover:underline">support@travelease.com</a>
          </p>
          <p className="text-lg">
            <strong>Address:</strong> 123 TravelEase Lane, Travel City, 12345
          </p>
        </section>
      </div>
    </div>
  );
}
export default PrivacyPolicy;
