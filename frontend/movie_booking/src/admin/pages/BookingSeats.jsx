import { useEffect, useState } from "react";
import "./css/BookingSeats.css";
import { bookingSeatApi } from "../../services/api";

function BookingSeats() {
  const [bookingSeats, setBookingSeats] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showFilter, setShowFilter] = useState("");

  useEffect(() => {
    loadBookingSeats();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [showFilter, bookingSeats]);

  const loadBookingSeats = async () => {
  try {
    const response = await bookingSeatApi.get("");
    setBookingSeats(response.data || []);
    setFilteredData(response.data || []);
  } catch (error) {
    console.error("Failed to load booking seats", error);
    alert("Somthing went wrong");
  }
};

  const applyFilter = () => {
    let data = [...bookingSeats];

    if (showFilter) {
      data = data.filter((bs) => bs.show?.movieTitle === showFilter);
    }

    setFilteredData(data);
  };

  const uniqueShows = [
    ...new Set(bookingSeats.map((bs) => bs.show?.movieTitle).filter(Boolean)),
  ];

  return (
    <div className="booking-seats-container">
      <h2>Booking Seats</h2>

      {/* ===== Filter ===== */}
      <div className="filter-section">
        <select
          value={showFilter}
          onChange={(e) => setShowFilter(e.target.value)}
        >
          <option value="">All Shows</option>
          {uniqueShows.map((show, index) => (
            <option key={index} value={show}>
              {show}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Table ===== */}
      <table className="booking-seats-table">
        <thead>
          <tr>
            <th>Booking</th>
            <th>Show</th>
            <th>Seat</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-row">
                No booking seats found
              </td>
            </tr>
          ) : (
            filteredData.map((bs) => (
              <tr key={bs.id}>
                <td>{bs.booking?.bookingNumber || "N/A"}</td>
                <td>{bs.show?.movieTitle || "N/A"}</td>
                <td>{bs.seat?.seatNumber || "N/A"}</td>
                <td className="price-cell">₹ {bs.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingSeats;
