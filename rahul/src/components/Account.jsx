import React, { useState, useEffect } from "react";
function Account() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    address: "",
    profilePic: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setUserData(storedData);
      setIsEditing(false);
    }
    setLoading(false);
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  const calculateCompletion = () => {
    const totalFields = Object.keys(userData).length;
    const filledFields = Object.values(userData).filter((val) => val).length;
    return Math.round((filledFields / totalFields) * 100);
  };
  const profileCompletion = calculateCompletion();
  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsEditing(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24 flex flex-col items-center">
      {isEditing && (
        <div className="w-2/3 mb-6">
          <p className="text-lg text-center mb-2">
            {profileCompletion === 100
              ? "Your profile is complete!"
              : `Your profile is ${profileCompletion}% complete.`}
          </p>
          <div className="w-full bg-gray-800 h-4 rounded-lg overflow-hidden">
            <div
              className="bg-green-500 h-4 transition-all duration-500 ease-out"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
        </div>
      )}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 relative space-y-2">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
        )}
        <div className="flex justify-center mb-4">
          <img
            src={
              userData.profilePic ||
              "https://via.placeholder.com/150?text=Upload+Image"
            }
            alt="Profile"
            className="rounded-full w-20 h-20 object-cover border-4 border-green-500 cursor-pointer hover:opacity-90"
            onClick={() =>
              isEditing && document.getElementById("profilePicInput").click()
            }
          />
          {isEditing && (
            <input
              type="file"
              id="profilePicInput"
              style={{ display: "none" }}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  profilePic: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          )}
        </div>
        {isEditing ? (
          <>
            {["name", "email", "mobile", "address"].map((field) => (
              <div key={field} className="flex flex-col">
                <label
                  htmlFor={field}
                  className="text-sm font-medium text-gray-300 mb-1 capitalize"
                >
                  {field}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={userData[field]}
                  onChange={handleInputChange}
                  className={`text-md px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                    userData[field] ? "border-green-500" : "border-red-500"
                  } bg-gray-900 text-white`}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Gender
              </label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={userData.gender === option}
                      onChange={handleInputChange}
                      className="text-green-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="dob"
                className="text-sm font-medium text-gray-300 mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={userData.dob}
                onChange={handleInputChange}
                className={`text-md px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                  userData.dob ? "border-green-500" : "border-red-500"
                } bg-gray-900 text-white`}
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full mt-4 bg-green-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-green-600"
            >
              Save
            </button>
          </>
        ) : (
          <>
            {["Name", "Email", "Mobile", "Address", "Gender", "Date of Birth"].map(
              (field, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-600 py-2"
                >
                  <p className="text-md font-medium">{field}</p>
                  <p className="text-md">
                    {userData[field.toLowerCase().replace(/ /g, "")] || "N/A"}
                  </p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default Account;
