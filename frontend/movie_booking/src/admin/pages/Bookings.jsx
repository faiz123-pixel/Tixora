import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";
import "./css/Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    getBookings().then(setBookings);
  };

  return (
    <div className="bookings-page">
      <h2 className="bookings-title">Bookings Management</h2>

      <div className="bookings-cards">
        {bookings.length === 0 ? (
          <p className="empty-row">No bookings available</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} className="booking-card">
              
              <h4>Show: {b.show?.movie?.name || b.show}</h4>

              <p>
                <strong>User:</strong>{" "}
                {b.user?.name || b.user?.email || b.user}
              </p>

              <p>
                <strong>Total Amount:</strong> ₹ {b.totalAmount}
              </p>

              <p>
                <strong>Date & Time:</strong>{" "}
                {b.dateTime
                  ? new Date(b.dateTime).toLocaleString()
                  : "N/A"}
              </p>

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
          ))
        )}
      </div>
    </div>
  );
}

export default Bookings;