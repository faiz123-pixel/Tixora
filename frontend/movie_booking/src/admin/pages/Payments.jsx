import { useEffect, useState } from "react";
import "./css/Payments.css";
import { paymentApi } from "../../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [statusFilter, payments]);

  const loadPayments = async () => {
    try {
      const response = await paymentApi.get("");
      setPayments(response.data || []);
      setFilteredPayments(response.data || []);
    } catch (error) {
      console.error("Failed to load payments", error);
    }
  };

  const applyFilter = () => {
    const filtered = payments.filter((payment) => {
      return !statusFilter || payment.status === statusFilter;
    });

    setFilteredPayments(filtered);
  };

  const uniqueStatuses = [
    ...new Set(payments.map((p) => p.status).filter(Boolean)),
  ];

  return (
    <div className="payments-container">
      <h2>Payments Details</h2>

      {/* ===== Filter ===== */}
      <div className="filter-section">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {uniqueStatuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Table ===== */}
      <table className="payments-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Method</th>
            <th>Transaction ID</th>
            <th>Status</th>
            <th>Paid At</th>
          </tr>
        </thead>

        <tbody>
          {filteredPayments.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-row">
                No payments found
              </td>
            </tr>
          ) : (
            filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="booking-id">
                  {payment.bookingId?.id || payment.bookingId}
                </td>

                <td>{payment.method || "N/A"}</td>
                <td>{payment.transactionId || "N/A"}</td>

                <td>
                  <span
                    className={`status-badge ${
                      payment.status === "FAILED"
                        ? "status-failed"
                        : payment.status === "PENDING"
                          ? "status-pending"
                          : "status-success"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>

                <td>
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
