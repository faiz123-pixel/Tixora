import { useEffect, useState } from "react";
import "./css/Bookings.css";
import { bookingApi } from "../../services/api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, statusFilter, sortOrder]);

  const loadBookings = async () => {
    try {
      const response = await bookingApi.get("");
      setBookings(response.data || []);
    } catch (error) {
      console.error("Failed to load bookings", error);
      alert("Something went wrong while fetching bookings");
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    if (statusFilter) {
      filtered = filtered.filter(
        (b) => (b.status || "CONFIRMED") === statusFilter
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredBookings(filtered);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "CANCELLED":
        return "status-badge status-cancelled";
      case "CONFIRMED":
      default:
        return "status-badge status-confirmed";
    }
  };

  return (
    <div className="bookings-page">
      <h2 className="bookings-title">Bookings Management</h2>

      {/* FILTERS */}
      <div className="bookings-filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button onClick={toggleSortOrder}>
          Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}
        </button>
      </div>

      {/* TABLE VIEW */}
      <div className="bookings-table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Show</th>
              <th>User</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="5">No bookings found</td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.show?.movie?.title || "N/A"}</td>
                  <td>{b.user?.name || b.user?.email || "Guest"}</td>
                  <td>₹ {b.totalAmount || 0}</td>
                  <td>
                    {b.dateTime
                      ? new Date(b.dateTime).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    <span className={getStatusClass(b.status)}>
                      {b.status || "CONFIRMED"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="bookings-cards">
        {filteredBookings.map((b) => (
          <div key={b.id} className="booking-card">
            <h4>{b.show?.movie?.title || "Movie"}</h4>

            <p>
              <strong>User:</strong>{" "}
              {b.user?.name || b.user?.email || "Guest"}
            </p>

            <p>
              <strong>Total:</strong> ₹ {b.totalAmount || 0}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {b.dateTime
                ? new Date(b.dateTime).toLocaleString()
                : "N/A"}
            </p>

            <p>
              <span className={getStatusClass(b.status)}>
                {b.status || "CONFIRMED"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;