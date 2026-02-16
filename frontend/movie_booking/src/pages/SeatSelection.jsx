import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateSeats, seatPrices } from "../data/seats";
import { useBookingContext } from "../context/BookingContext";
import "./css/SeatSelection.css";
function SeatSelection() {
  const navigate = useNavigate();
  const { booking, setSeats } = useBookingContext();

  const [selected, setSelected] = useState([]);

  /* 🚫 Block direct access */
  useEffect(() => {
    if (!booking.movie || !booking.theatre || !booking.showtime) {
      navigate("/");
    }
  }, [booking, navigate]);

  /* 🪑 Generate seats once */
  const seatsData = useMemo(() => generateSeats(), []);

  const toggleSeat = (seat) => {
    if (seat.booked) return;

    setSelected((prev) =>
      prev.includes(seat.id)
        ? prev.filter((s) => s !== seat.id)
        : [...prev, seat.id]
    );
  };

  /* 💰 Calculate total */
  const total = selected.reduce((sum, id) => {
    const seat = seatsData.find((s) => s.id === id);
    return sum + seatPrices[seat.type];
  }, 0);

  /* 🧠 Save seats to context */
  const handleConfirm = () => {
    const selectedSeats = selected.map((id) => {
      const seat = seatsData.find((s) => s.id === id);
      return seat.label;
    });

    setSeats(selectedSeats, total);
    // console.log(selectedSeats,total);
    navigate("/checkout"); 
  };

  /* 🪑 Group rows */
  const groupedRows = seatsData.reduce((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const sortedRows = Object.keys(groupedRows).sort();

  return (
    <div className="seat-page container page-container">
      {/* 🎬 HEADER */}
      <div className="seat-header">
        <h3>{booking.movie?.title}</h3>
        <p>
          {booking.theatre?.name} • {booking.theatre?.date} •{" "}
          {booking.showtime}
        </p>
      </div>

      {/* 🎥 SCREEN */}
      <div className="screen">SCREEN</div>

      {/* 🪑 SEATS */}
      <div className="seat-layout">
        {sortedRows.map((row) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>

            <div className="seat-group left">
              {groupedRows[row]
                .filter((s) => s.position === "left")
                .map(renderSeat)}
            </div>

            <div className="seat-group middle">
              {groupedRows[row]
                .filter((s) => s.position === "middle")
                .map(renderSeat)}
            </div>

            <div className="seat-group right">
              {groupedRows[row]
                .filter((s) => s.position === "right")
                .map(renderSeat)}
            </div>
          </div>
        ))}
      </div>

      {/* 💰 PRICE LEGEND */}
      <div className="price-bar">
        <div className="price-item silver">Silver ₹150</div>
        <div className="price-item gold">Gold ₹220</div>
        <div className="price-item recliner">Recliner ₹350</div>
      </div>

      {/* 🧾 SUMMARY */}
      <div className="summary">
        <p>
          Seats:{" "}
          {selected.length
            ? selected
                .map((id) => seatsData.find((s) => s.id === id)?.label)
                .join(", ")
            : "None"}
        </p>

        <p>
          Total: <strong>₹{total}</strong>
        </p>

        <button
          className="confirm-btn"
          disabled={!selected.length}
          onClick={handleConfirm}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );

 function renderSeat(seat) {
  return (
    <button
      key={seat.id}
      className={`seat-icon
        ${seat.booked ? "reserved" : "available"}
        ${selected.includes(seat.id) ? "selected" : ""}
      `}
      onClick={() => toggleSeat(seat)}
      disabled={seat.booked}
      title={seat.label}
    >
      <span className="seat-back"></span>
      <span className="seat-bottom"></span>
    </button>
  );
}

}

export default SeatSelection;
