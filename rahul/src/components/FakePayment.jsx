import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
const FakePayment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const paymentMethods = [
    {
      id: "gpay",
      name: "Google Pay",
      icon: "https://static.vecteezy.com/system/resources/previews/017/221/853/original/google-pay-logo-transparent-free-png.png",
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: "https://th.bing.com/th/id/OIP.t495xLIA106IkxfUs-2_OAHaCy?rs=1&pid=ImgDetMain",
    },
    {
      id: "phonepe",
      name: "PhonePe",
      icon: "https://image.pngaaa.com/590/95590-middle.png",
    },
  ];
  const handlePay = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      return;
    }
    toast.success("Payment Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored",
    });
    axios.post('http://localhost:8000/updateBookedTickets')
      .then(response => {
        console.log('Booked ticket count updated successfully');
      })
      .catch(err => {
        console.error('Error updating booked ticket count', err);
      });
  
    setTimeout(() => {
      toast.success("Ticket Booked Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      navigate("/my-trips");
    }, 1000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-lg text-center max-w-lg w-full shadow-lg">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          Fake Payment Gateway
        </h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Select Payment Method:</h3>
          <div className="flex flex-col gap-4">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition ${
                  selectedMethod === method.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="hidden"/>
                <img
                  src={method.icon}
                  alt={`${method.name} logo`}
                  className="w-12 h-12 object-contain"/>
                <span className="text-lg font-medium">{method.name}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handlePay}
          className="px-6 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Pay
        </button>
      </div>
    </div>
  );
};
export default FakePayment;
