import React, { useEffect, useState, useContext } from "react";
import { bookingApi } from "../services/api";
import { LoginContext } from "../context/LoginContext";
import "./css/MyBookings.css"

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useContext(LoginContext);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchBookings(user.id);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchBookings = async (userId) => {
    try {
      const res = await bookingApi.get(`/user/${userId}`);
      console.log(res.data[0]);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <h2>My Bookings</h2>
        <p>Please login to see your bookings</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <h2>My Bookings</h2>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <h3>{booking.show.movie.title}</h3>
            <p>Theatre: {booking.show.screen.theatre.name}</p>
            <p>Show Time: {booking.show.showTime}</p>
            <p><strong>Amount:</strong> ₹{booking.totalAmount}</p>
            <p>Status: {booking.status}</p>
            <div className="booking-footer">
                Booking ID: #{booking.id}
              </div>
          </div>
          
          
        ))
      )}
    </div>
  );
};

export default MyBookings;