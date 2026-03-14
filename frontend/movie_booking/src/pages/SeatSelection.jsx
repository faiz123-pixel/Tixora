import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateSeats, seatPrices } from "../data/seats";
import "./css/SeatSelection.css";

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  const { show } = location.state || {};

  const [selected, setSelected] = useState([]);

  /* 🚫 Block direct access */
  if (!show) {
    navigate("/");
    return null;
  }

  const showId = show.id;

  /* 🪑 Generate seats */
  const seatsData = useMemo(() => generateSeats(), []);

  /* ⚡ Seat map for fast lookup */
  const seatMap = useMemo(() => {
    const map = {};
    seatsData.forEach((s) => (map[s.id] = s));
    return map;
  }, [seatsData]);

  /* 🪑 Toggle seat */
  const toggleSeat = (seat) => {
    if (seat.booked) return;

    setSelected((prev) => {
      if (prev.includes(seat.id)) {
        return prev.filter((s) => s !== seat.id);
      }

      if (prev.length >= 6) {
        alert("You can select maximum 6 seats");
        return prev;
      }

      return [...prev, seat.id];
    });
  };

  /* 💰 Total price */
  const total = selected.reduce((sum, id) => {
    const seat = seatMap[id];
    return seat ? sum + seatPrices[seat.type] : sum;
  }, 0);

  /* 🎟 Confirm booking */
  const handleConfirm = () => {
    const selectedSeats = selected.map((id) => seatMap[id].label);

    navigate("/checkout", {
      state: {
        showId,
        seats: selectedSeats,
        total,
      },
    });
  };

  /* 🪑 Group seats by row */
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
        <h3>Show ID: {showId}</h3>
        <p>
          {new Date(show.showTime).toLocaleString()}
        </p>
      </div>

      {/* 🎥 SCREEN */}
      <div className="screen">SCREEN</div>

      {/* 🪑 SEAT LAYOUT */}
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

      {/* 💰 PRICE */}
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
            ? selected.map((id) => seatMap[id]?.label).sort().join(", ")
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

  /* 🎟 Seat renderer */
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