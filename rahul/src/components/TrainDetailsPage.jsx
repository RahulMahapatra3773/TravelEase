import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import trainData from './trainData';
const TrainDetailsPage = () => {
    const location = useLocation();
    const { trainNumberOrName } = location.state;
    const trainDetails = trainData.find(
        (train) =>
            train.number.toString() === trainNumberOrName.toString() ||
            train.name.toLowerCase() === trainNumberOrName.toLowerCase());
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white p-6">
            <div className="mx-auto max-w-4xl w-full mt-20">
                <h2 className="text-4xl font-bold text-center text-green-400 mb-8">Train Details</h2>
                <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
                    <h3 className="text-3xl font-bold text-green-500 mb-4">
                        {trainDetails.name}
                    </h3>
                    <div className="border-t border-gray-600 pt-4">
                        <p className="mt-2 text-lg">
                            <span className="font-bold text-green-400">Train Number:</span> {trainDetails.number}
                        </p>
                        <p className="mt-2 text-lg">
                            <span className="font-bold text-green-400">Route:</span> {trainDetails.from} to {trainDetails.to}
                        </p>
                        <p className="mt-2 text-lg">
                            <span className="font-bold text-green-400">Departure Time:</span> {trainDetails.depTime}
                        </p>
                        <p className="mt-2 text-lg">
                            <span className="font-bold text-green-400">Arrival Time:</span> {trainDetails.arrTime}
                        </p>
                        <p className="mt-2 text-lg">
                            <span className="font-bold text-green-400">Duration:</span> {trainDetails.duration}
                        </p>
                        <p className="mt-2 text-lg">
                            <span className="font-bold text-green-400">Operating Days:</span> {trainDetails.days.join(', ')}
                        </p>
                    </div>
                    <h4 className="text-2xl font-bold text-green-400 mt-6">Classes Available</h4>
                    <ul className="list-disc list-inside mt-2 text-gray-300">
                {trainDetails.classes?.map((cls, idx) => (
              <li key={idx}>{typeof cls === 'object' ? JSON.stringify(cls) : cls}</li>))}
                </ul>
                </div>
                <Link
                    to="/"
                    className="mt-8 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-500 flex justify-center items-center mx-auto max-w-40">
                    Go Back
                </Link>
            </div>
        </div>
    );
};
export default TrainDetailsPage;
