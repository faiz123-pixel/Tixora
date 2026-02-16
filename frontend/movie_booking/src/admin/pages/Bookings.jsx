import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";
import "./css/Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then(setBookings);
  }, []);

  return (
    <div className="bookings-page">
      <h2 className="bookings-title">Bookings Management</h2>


      {/* ===== Mobile Cards ===== */}
      <div className="bookings-cards">
        {bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <h4>{b.movie?.name}</h4>
            <p><strong>User:</strong> {b.user?.email}</p>
            <p><strong>Seats:</strong> {b.seats?.join(", ")}</p>
            <p><strong>Amount:</strong> ₹ {b.amount}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status-badge ${
                  b.status === "Cancelled"
                    ? "status-cancelled"
                    : "status-confirmed"
                }`}
              >
                {b.status || "Confirmed"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
