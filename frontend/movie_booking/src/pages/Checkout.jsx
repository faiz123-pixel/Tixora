import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/Checkout.css";
import { bookingApi, seatsApi } from "../services/api";
import { LoginContext } from "../context/LoginContext";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(LoginContext);
  const [seatNames, setSeatNames] = useState([]);

  const { showId, movie, theatre, show, seats, total } = location.state || {};

  /* 🔒 Protect Checkout */
  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/checkout",
          checkoutData: location.state,
        },
      });
      return;
    }

    if (!showId || !seats) {
      navigate("/");
    }
  }, [user, showId, seats, navigate, location.state]);

  /* 🎟 Fetch Seat Names */
  useEffect(() => {
    const fetchSeatNames = async () => {
      try {
        const res = await seatsApi.post("/names", seats);
        setSeatNames(res.data);
      } catch (error) {
        console.error("Error fetching seat names", error);
      }
    };

    if (seats && seats.length > 0) {
      fetchSeatNames();
    }
  }, [seats]);

  if (!showId) return null;

  /* 📅 Format date + time */
  const formattedDateTime = new Date(show.showTime).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  /* 💳 Handle Payment */
  const handlePayment = async () => {
    try {
      const res = await bookingApi.post(
        `/createBooking?userId=${user.id}&showId=${showId}`,
        seats
      );

      navigate("/bookingSuccess", {
        state: { movie, theatre, show, seats, total },
      });

    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="checkout-page container page-container">

      {/* 🎬 MOVIE HEADER */}
      <div className="checkout-header">
        <img src={movie.posterUrl} alt={movie.title} />
        <div>
          <h3>{movie.title}</h3>
          <p>{theatre.name}</p>
          <span>{formattedDateTime}</span>
        </div>
      </div>

      <h2 className="page-title">Checkout</h2>

      <div className="checkout-card">

        <div className="checkout-row">
          <span>Movie</span>
          <strong>{movie.title}</strong>
        </div>

        <div className="checkout-row">
          <span>Theatre</span>
          <strong>{theatre.name}</strong>
        </div>

        <div className="checkout-row">
          <span>Show Time</span>
          <strong>{formattedDateTime}</strong>
        </div>

        <div className="checkout-row">
          <span>Show ID</span>
          <strong>{showId}</strong>
        </div>

        <div className="checkout-row">
          <span>Seats</span>
          <strong>
            {seatNames.length > 0 ? seatNames.join(", ") : "Loading..."}
          </strong>
        </div>

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