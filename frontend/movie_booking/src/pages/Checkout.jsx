import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Checkout.css";
import { useBookingContext } from "../context/BookingContext";

function Checkout() {
  const navigate = useNavigate();
  const { booking } = useBookingContext();

  const { movie, theatre, showtime, seats, total } = booking;

  // 🔒 safety check
  if (!movie || !theatre || !seats.length) {
    navigate("/");
    return null;
  }

  const handlePayment = () => {
    // 🔥 fake payment success
    navigate("/bookingSuccess");
  };
  // console.log(booking);

  return (
    <div className="checkout-page container page-container">
      <div className="checkout-header">
  <img src={movie.poster} alt={movie.title} />
  <div>
    <h3>{movie.title}</h3>
    <p>{theatre}</p>
    <span>{showtime}</span>
  </div>
</div>

      <h2 className="page-title">Checkout</h2>

      <div className="checkout-card">
        {/* 🎬 MOVIE */}
        <div className="checkout-row">
          <span>Movie</span>
          <strong>{movie.title}</strong>
        </div>

        {/* 🏛 THEATRE */}
        <div className="checkout-row">
          <span>Theatre</span>
          <strong>{theatre}</strong>
        </div>

        {/* 🕒 SHOWTIME */}
        <div className="checkout-row">
          <span>Showtime</span>
          <strong>{showtime}</strong>
        </div>

        {/* 🪑 SEATS */}
        <div className="checkout-row">
          <span>Seats</span>
          <strong>{seats.join(", ")}</strong>
        </div>

        {/* 💰 TOTAL */}
        <div className="checkout-total">
          <span>Total Payable</span>
          <strong>₹{total}</strong>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
