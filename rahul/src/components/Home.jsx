import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import trainData from './trainData';
function Home() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("station");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [trainNumberOrName, setTrainNumberOrName] = useState("");
  const [travelDate, setTravelDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [pnr, setPnr] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pnrError, setPnrError] = useState("");
  const today = new Date();
  useEffect(() => {
    setFromStation("");
    setToStation("");
    setTrainNumberOrName("");
    setTravelDate(null);
    setPnr("");
    setErrorMessage("");
    setPnrError("");
  }, [searchType]);
  const handleReverseStations = () => {
    setFromStation(toStation);
    setToStation(fromStation);
  };
  const handleDateChange = (date) => {
    setTravelDate(date);
    setDatePickerOpen(false);
  };
  const handleDateInputClick = () => {
    setDatePickerOpen(true);
  };
  const handleClearDate = () => {
    setTravelDate(null);
  };
  const handleSearch = () => {
    if (searchType === "station") {
      if (!fromStation.trim() || !toStation.trim() || !travelDate) {
        setErrorMessage("Fill all the details");
        return;
      }
      navigate('/train-list', { state: { fromStation, toStation, travelDate } });
    } else if (searchType === "train") {
      if (!trainNumberOrName.trim()) {
        setErrorMessage("Fill all the details");
        return;
      }
      const validTrain = trainData.some(
        (train) =>
          train.number.toString() === trainNumberOrName.toString() ||
          train.name.toLowerCase() === trainNumberOrName.toLowerCase()
      );
      if (validTrain) {
        navigate('/train-details', { state: { trainNumberOrName, travelDate } });
      } else {
        setErrorMessage("Please enter a valid train number or name.");
      }
    } else if  (searchType === "pnr") {
      const storedTicket = localStorage.getItem("trips");
      if (storedTicket) {
        const tickets = JSON.parse(storedTicket);
        const pnrMatch = tickets.some(ticket => ticket.pnr.trim() === pnr.trim());
        if (pnrMatch) {
          navigate('/pnr-details', { state: { pnr } });
        } else {
          setPnrError("No such PNR found.");
        }
      } 
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-600 to-gray-900 text-white flex flex-col justify-between relative">
      <div className="absolute inset-0 bg-opacity-50 bg-black z-0" />
      <main className="flex-grow flex flex-col items-center justify-center z-10 text-center p-6">
        <h2 className="text-4xl font-bold text-white mb-8">Welcome to TravelEase</h2>
        <div className="w-full max-w-2xl p-8 bg-gradient-to-l from-gray-800 to-gray-900 rounded-lg shadow-xl space-y-6">
          <div className="flex space-x-2 mb-4 justify-center">
            {["station", "train", "pnr"].map((type) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-2 py-2 text-md rounded-full transition-colors ${searchType === type ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"} hover:bg-green-600`}>
                {type === "station" ? "Search by Station" : type === "train" ? "Search by Train" : "PNR Status"}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {searchType === "station" && (
              <div className="flex space-x-4 justify-center">
                <input
                  type="text"
                  placeholder="From Station"
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="w-1/3 px-2 h-11 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleReverseStations}
                  className="bg-gray-600 h-10 px-2 rounded-lg text-white hover:bg-gray-500">
                  <BiTransfer className="w-7 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="To Station"
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="w-1/3 h-11 px-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="relative">
                  <DatePicker
                    selected={travelDate}
                    onChange={handleDateChange}
                    className="p-3 h-11 rounded-lg text-black w-40 focus:outline-none focus:ring-2 focus:ring-green-500"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    open={datePickerOpen}
                    onCalendarClose={() => setDatePickerOpen(false)}
                    isClearable={false}
                    minDate={today}
                  />
                  {travelDate && (
                    <FaTimes
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                      onClick={handleClearDate}
                    />
                  )}
                  <FaCalendarAlt 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={handleDateInputClick}
                  />
                </div>
              </div>
            )}
            {searchType === "train" && (
              <div>
                <input
                  type="text"
                  placeholder="Enter train number or name"
                  value={trainNumberOrName}
                  onChange={(e) => setTrainNumberOrName(e.target.value)}
                  className="p-3 rounded-lg text-black w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ minWidth: "250px" }}
                />
              </div>
            )}
{searchType === "pnr" && (
  <div className="flex justify-center mt-4">
    <input
      type="text"
      placeholder="Enter PNR"
      value={pnr}
      onChange={(e) => setPnr(e.target.value)}
      className="p-3 rounded-lg text-black w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
      style={{ minWidth: "250px" }}/>
    {pnrError && <p className="text-red-500 mt-2">{pnrError}</p>}
  </div>)}
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <button 
            onClick={handleSearch}
            className="bg-green-600 px-6 py-2 rounded-lg text-white hover:bg-green-500 transition-colors mt-4">
            Search
          </button>
        </div>
      </main>
    </div>
  );
}
export default Home;
