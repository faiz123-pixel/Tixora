import { useEffect, useState } from "react";
import "./css/Seats.css";
import { seatsApi } from "../../services/api";

function Seats() {
  const [seats, setSeats] = useState([]);
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [screenFilter, setScreenFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    loadSeats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [screenFilter, typeFilter, seats]);

  const loadSeats = async () => {
    try {
      const response = await seatsApi.get("");
      setSeats(response.data);
      setFilteredSeats(response.data);
    } catch (error) {
      console.error("Failed to load seats", error);
      alert("Somthing went wrong");
    }
  };

  const applyFilters = () => {
    const filtered = seats.filter((seat) => {
      return (
        (!screenFilter || seat.screen?.name === screenFilter) &&
        (!typeFilter || seat.type === typeFilter)
      );
    });

    setFilteredSeats(filtered);
  };

  // Unique screen list
  const uniqueScreens = [
    ...new Set(seats.map((seat) => seat.screen?.name).filter(Boolean)),
  ];

  const uniqueTypes = [...new Set(seats.map((seat) => seat.type))];

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

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <table className="seats-table">
        <thead>
          <tr>
            <th>Seat Number</th>
            <th>Screen</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredSeats.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-row">
                No seats found
              </td>
            </tr>
          ) : (
            filteredSeats.map((seat) => (
              <tr key={seat.id}>
                <td className="seat-number">{seat.seatNumber}</td>
                <td>{seat.screen?.name}</td>
                <td className="seat-type">{seat.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Seats;
