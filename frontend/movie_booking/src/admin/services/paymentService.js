// src/services/paymentService.js

// 🔹 Dummy Payments Data
export const getPayments = async () => {
  return [
    {
      _id: "1",
      bookingId: "BOOK12345",
      method: "UPI",
      transactionId: "TXN987654321",
      status: "SUCCESS",
      paidAt: "2026-02-26T10:30:00",
    },
    {
      _id: "2",
      bookingId: "BOOK67890",
      method: "Credit Card",
      transactionId: "TXN123456789",
      status: "FAILED",
      paidAt: "2026-02-25T14:15:00",
    },
    {
      _id: "3",
      bookingId: "BOOK54321",
      method: "Net Banking",
      transactionId: "TXN456789123",
      status: "SUCCESS",
      paidAt: "2026-02-24T18:45:00",
    },
  ];
};