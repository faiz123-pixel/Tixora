let bookings = [
  {
    _id: "1",
    user: { email: "user1@gmail.com" },
    movie: { name: "Avengers: Endgame" },
    seats: ["A1", "A2"],
    amount: 500,
  },
  {
    _id: "2",
    user: { email: "user2@gmail.com" },
    movie: { name: "KGF Chapter 2" },
    seats: ["C4", "C5", "C6"],
    amount: 750,
  },
];

/* Get all bookings */
export const getBookings = () => {
  return Promise.resolve([...bookings]);
};

/* Get booking by ID */
export const getBookingById = (id) => {
  const booking = bookings.find((b) => b._id === id);
  return Promise.resolve({ ...booking });
};
