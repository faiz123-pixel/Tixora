import { useEffect, useState } from "react";
import "./css/Seats.css";
import { seatsApi } from "../../services/api";

function Seats() {
  const [seats, setSeats] = useState([]);
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [screenFilter, setScreenFilter] = useState("");

  useEffect(() => {
    loadSeats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [screenFilter, seats]);

  const loadSeats = async () => {
    try {
      const response = await seatsApi.get("");
      setSeats(response.data);
      setFilteredSeats(response.data);
    } catch (error) {
      console.error("Failed to load seats", error);
      alert("Something went wrong");
    }
  };

  const applyFilters = () => {
    const filtered = seats.filter((seat) => {
      return !screenFilter || `${seat.screen?.name} (${seat.screen?.theatre?.name})` === screenFilter;
    });

    setFilteredSeats(filtered);
  };

  // Unique screen list with theatre names
  const uniqueScreens = [
    ...new Set(
      seats
        .map((seat) => seat.screen?.name && seat.screen?.theatre?.name
          ? `${seat.screen.name} (${seat.screen.theatre.name})`
          : null
        )
        .filter(Boolean)
    ),
  ];

  return (
    <div className="seats-container">
      <h2>Seats Management</h2>

      {/* ===== FILTER SECTION ===== */}
      <div className="filter-section">
        <select
          value={screenFilter}
          onChange={(e) => setScreenFilter(e.target.value)}
        >
          <option value="">All Screens</option>
          {uniqueScreens.map((screen, index) => (
            <option key={index} value={screen}>
              {screen}
            </option>
          ))}
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <table className="seats-table">
        <thead>
          <tr>
            <th>Seat Number</th>
            <th>Screen (Theatre)</th>
          </tr>
        </thead>
        <tbody>
          {filteredSeats.length === 0 ? (
            <tr>
              <td colSpan="2" className="empty-row">
                No seats found
              </td>
            </tr>
          ) : (
            filteredSeats.map((seat) => (
              <tr key={seat.id}>
                <td className="seat-number">{seat.seatNumber}</td>
                <td>
                  {seat.screen?.name} ({seat.screen?.theatre?.name})
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Seats;