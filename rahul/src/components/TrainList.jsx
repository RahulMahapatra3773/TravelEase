import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import trainData from './trainData';
const TrainList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromStation = '', toStation = '', travelDate } = location.state || {};
    const filteredTrains = trainData.filter(
        train =>
            train.from.toLowerCase() === fromStation.toLowerCase() &&
            train.to.toLowerCase() === toStation.toLowerCase());
    const generateRandomNumber = () => Math.floor(Math.random() * 20) + 1;
    const handleBooking = (train, classType, availability) => {
        navigate('/book', {
            state: {
                train,
                fromStation,
                toStation,
                travelDate,
                classType,
                availability,
            },
        });
    };
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-4xl font-bold text-green-400 mb-8 text-center mt-20">
                Trains from {fromStation.toUpperCase()} to {toStation.toUpperCase()} on{' '}
                {travelDate ? new Date(travelDate).toLocaleDateString() : 'N/A'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrains.length > 0 ? (
                    filteredTrains.map((train, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <h3 className="text-xl font-semibold text-green-400 mb-4">
                                {train.number} - {train.name}
                            </h3>
                            <p className="mb-2 text-lg text-gray-300">
                                Departure: {train.depTime}
                            </p>
                            <p className="text-lg text-gray-300">
                                From {train.from.toUpperCase()} to {train.to.toUpperCase()}
                            </p>
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {train.classes.map((card, idx) => {
                                    const availability =
                                        card.status === 'AVL'
                                            ? `AVL ${generateRandomNumber()}`
                                            : `RL/WL ${generateRandomNumber()}`;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                handleBooking(train, card.type, availability)
                                            }
                                            className={`flex-col items-center w-24 h-20 rounded-md text-center text-white ${
                                                card.status === 'AVL'
                                                    ? 'bg-green-600'
                                                    : 'bg-red-600'
                                            } flex justify-center`}>
                                            <p className="font-semibold">{card.type}</p>
                                            <p className="mt-1">{availability}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-400 mt-8">
                        No trains found for this route.
                    </p>
                )}
            </div>
        </div>
    );
};
export default TrainList;
