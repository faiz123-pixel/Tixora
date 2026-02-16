import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import "./css/BookingSuccess.css";

function BookingSuccess() {
  const navigate = useNavigate();
  const { booking, clearBooking } = useBookingContext();

  const { movie, theatre, showtime, seats, total } = booking;

  // 🔒 Safety check
  if (!movie || !theatre || !seats.length) {
    navigate("/");
    return null;
  }

  const handleGoHome = () => {
    clearBooking();
    navigate("/");
  };

  return (
    <div className="success-page container page-container">
      <div className="success-card">

        {/* ✅ ICON */}
        <div className="success-icon">✔</div>

        <h2 className="success-title">Booking Confirmed!</h2>
        <p className="success-subtitle">
          Your tickets have been successfully booked 🎉
        </p>

        {/* 🎟 TICKET INFO */}
        <div className="ticket-card">
          <div className="ticket-row">
            <span>Movie</span>
            <strong>{movie.title}</strong>
          </div>

          <div className="ticket-row">
            <span>Theatre</span>
            <strong>{theatre}</strong>
          </div>

          <div className="ticket-row">
            <span>Showtime</span>
            <strong>{showtime}</strong>
          </div>

          <div className="ticket-row">
            <span>Seats</span>
            <strong>{seats.join(", ")}</strong>
          </div>

          <div className="ticket-total">
            <span>Total Paid</span>
            <strong>₹{total}</strong>
          </div>
        </div>

        {/* ACTION */}
        <button className="home-btn" onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;
