import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/SeatSelection.css";
import { bookingSeatApi, seatsApi } from "../services/api";

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  const { show, movie, theatre,basePrice } = location.state || {};

  const [selected, setSelected] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🚫 Block direct access */
  useEffect(() => {
    if (!show) {
      navigate("/");
    }
  }, [show, navigate]);

  /* 🪑 Fetch seats */
  useEffect(() => {
    const loadSeats = async () => {
      try {
        const res = await seatsApi.get(`/shows/${show.id}`);
        const bookedRes = await bookingSeatApi.get(`/shows/${show.id}`);
        const bookedSeatIds = bookedRes.data;

        const formattedSeats = res.data.map((seat) => {
  const row = seat.seatNumber.charAt(0);
  const number = parseInt(seat.seatNumber.slice(1));

  let position = "middle";
  if (number <= 2) {
    position = "left";
  } else if (number <= 12) {
    position = "middle";
  } else {
    position = "right";
  }

  return {
    id: seat.id,
    label: seat.seatNumber,
    row,
    number,
    type: seat.seatType.toLowerCase(),
    booked: bookedSeatIds.includes(seat.id), // ✅ correct logic
    position,
  };
});

        setSeatsData(formattedSeats);
      } catch (err) {
        console.error("Seat loading failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (show) loadSeats();
  }, [show]);

  if (!show) return null;

  /* ⚡ Seat map for quick lookup */
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
        return prev.filter((id) => id !== seat.id);
      }

      if (prev.length >= 6) {
        alert("Maximum 6 seats allowed");
        return prev;
      }

      return [...prev, seat.id];
    });
  };

  /* 💰 Calculate price */
  const total = useMemo(() => {
  return selected.length * basePrice;
}, [selected, basePrice]);

  /* 🎟 Confirm booking */
  /* 🎟 Confirm booking */
const handleConfirm = () => {
  // Send seat IDs, not labels
  const selectedSeatIds = [...selected]; // `selected` already stores IDs

  // You can also optionally store seat labels for display
  const selectedSeatNames = selectedSeatIds.map((id) => seatMap[id].label);

  navigate("/checkout", {
    state: {
      showId: show.id,
      movie,
      theatre,
      show,
      seats: selectedSeatIds,   // <-- send IDs to Checkout
      seatNames: selectedSeatNames, // optional for UI display
      total,
    },
  });
};

  /* 🪑 Group seats by row */
  const groupedRows = useMemo(() => {
    const rows = {};

    seatsData.forEach((seat) => {
      if (!rows[seat.row]) rows[seat.row] = [];
      rows[seat.row].push(seat);
    });

    Object.keys(rows).forEach((row) => {
      rows[row].sort((a, b) => a.number - b.number);
    });

    return rows;
  }, [seatsData]);

  const sortedRows = Object.keys(groupedRows).sort();

  if (loading) {
    return <div className="loading">Loading seats...</div>;
  }

  return (
    <div className="seat-page container page-container">
      <div className="seat-header">
        <h2>{movie?.title}</h2>
        <p>{theatre?.name}</p>
        <span>
          Show ID: {show.id} | {new Date(show.showTime).toLocaleString()}
        </span>
      </div>

      <div className="screen">SCREEN</div>

      <div className="seat-layout">
        {sortedRows.map((row) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>

            {["left", "middle", "right"].map((section) => (
              <div key={section} className={`seat-group ${section}`}>
                {groupedRows[row]
                  .filter((seat) => seat.position === section)
                  .map((seat) => (
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
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="summary">
        <p>
          Seats:{" "}
          {selected.length
            ? selected.map((id) => seatMap[id]?.label).join(", ")
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
}

export default SeatSelection;
