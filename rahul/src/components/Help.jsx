import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
function Help() {
  const questionsAndAnswers = [
    {
      question: "Are you facing trouble booking a train?",
      answer:
        "check your internet connection. Retry the booking process if needed.",
    },
    {
      question: "Do you need assistance with payment?",
      answer:
        "Verify the card details entered or try a different payment method. Contact your bank for further assistance.",
    },
    {
      question: "Having trouble with your account login?",
      answer:
        "Make sure that you enter correct password",
    },
    {
      question: "Need help with booking dates or schedules?",
      answer:
        "Use the date and schedule filters available on the booking page to find the desired train options.",
    },
    {
      question: "Can’t find the train you're looking for?",
      answer:
        "Search using the train number or name. If unavailable, check if the train operates on the selected date.",
    },
    {
      question: "Facing issues with train status updates?",
      answer:
        "Ensure your app or browser is updated. Refresh the page or use alternative train tracking tools.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleContact = () => {
    setIsContactVisible(!isContactVisible);
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-green-400 mb-10 mt-16">
        Help & Support
      </h2>
      <div className="space-y-4 w-full max-w-3xl">
        {questionsAndAnswers.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleDropdown(index)} >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              {openIndex === index ? (
                <FaChevronUp className="text-green-400 text-xl" />
              ) : (
                <FaChevronDown className="text-green-400 text-xl" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-10 text-gray-400 text-center text-lg">
        If you need further assistance, feel free to reach out to customer
        support.
      </p>
      <div className="mt-2 relative">
        <button
          onClick={toggleContact}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500 transition">
          Contact Us
        </button>
        {isContactVisible && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-gray-800 rounded-lg shadow-lg border border-green-500 text-center w-72">
            <p className="text-md text-gray-300">
              Phone:{" "}
              <span className="text-white font-semibold">+1 234-567-890</span>
            </p>
            <p className="text-md text-gray-300 mt-2">
              Email:{" "}
              <span className="text-white font-semibold">
                support@travelease.com
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Help;
