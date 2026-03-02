// Dummy Seat Data Service

export const getSeats = async () => {
  return [
    {
      _id: "1",
      seatNumber: "A1",
      screen: { name: "Screen 1" },
      type: "REGULAR",
    },
    {
      _id: "2",
      seatNumber: "A2",
      screen: { name: "Screen 1" },
      type: "REGULAR",
    },
    {
      _id: "3",
      seatNumber: "B1",
      screen: { name: "Screen 2" },
      type: "VIP",
    },
    {
      _id: "4",
      seatNumber: "C1",
      screen: { name: "Screen 3" },
      type: "PREMIUM",
    },
  ];
};