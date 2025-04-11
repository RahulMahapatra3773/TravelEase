import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TrainList from './components/TrainList';
import Help from './components/Help';
import AboutUs from './components/AboutUs';
import TrainDetailsPage from './components/TrainDetailsPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Navbar from './components/Navbar';
import Account from './components/Account';
import MyTrips from './components/MyTrips';
import TermsOfServices from './components/TermsofServices';
import BookingPage from './components/BookingPage';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './components/AuthContext';
import TicketDetails from './components/TicketDetails';
import PnrDetailsPage from './components/PnrDetailsPage';
import FakePayment from './components/FakePayment';
import FeedbackPage from './components/FeedbackPage';
import AdminDashboard from './components/AdminDashboard';
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    toast.error('You must be logged in to access this page.', {
      toastId: 'auth-error',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: 'colored',
    });
    return <Navigate to="/login" />;
  }
  return children;
}

function App2() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const noNavbarRoutes = ['/login', '/signup'];

  return (
    <>
      <ToastContainer />
      {!noNavbarRoutes.includes(location.pathname) && (
        <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/train-list" element={<TrainList />} />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ticket-details" element={<TicketDetails />} />
        <Route path="/train-details" element={<TrainDetailsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pnr-details"
          element={
            <ProtectedRoute>
              <PnrDetailsPage />
            </ProtectedRoute>
          }
        />
         <Route path="/fakepayment" element={<FakePayment />} />
        <Route path="/terms" element={<TermsOfServices />} />
        <Route path="/feedback" element={<FeedbackPage/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
      {!noNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App2;
