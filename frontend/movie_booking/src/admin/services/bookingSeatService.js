export const getBookingSeats = async () => {
  return [
    {
      _id: "1",
      booking: {
        bookingNumber: "BK001",
      },
      show: {
        movieTitle: "Avengers: Endgame",
      },
      seat: {
        seatNumber: "A1",
      },
      price: 250,
    },
    {
      _id: "2",
      booking: {
        bookingNumber: "BK002",
      },
      show: {
        movieTitle: "Pathaan",
      },
      seat: {
        seatNumber: "B5",
      },
      price: 180,
    },
    {
      _id: "3",
      booking: {
        bookingNumber: "BK003",
      },
      show: {
        movieTitle: "KGF Chapter 2",
      },
      seat: {
        seatNumber: "C3",
      },
      price: 300,
    },
  ];
};