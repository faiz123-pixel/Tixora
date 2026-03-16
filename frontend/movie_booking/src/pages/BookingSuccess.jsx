import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/BookingSuccess.css";

function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { movie, theatre, show, seats = [], total } = location.state || {};

  /* 🔒 Prevent direct access */
  useEffect(() => {
    if (!movie || !theatre || seats.length === 0) {
      navigate("/");
    }
  }, [movie, theatre, seats, navigate]);

  if (!movie) return null;

  /* 📅 Format date + time */
  const formattedDateTime = new Date(show.showTime).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleGoHome = () => {
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
            <strong>{theatre.name}</strong>
          </div>

          <div className="ticket-row">
            <span>Showtime</span>
            <strong>{formattedDateTime}</strong>
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