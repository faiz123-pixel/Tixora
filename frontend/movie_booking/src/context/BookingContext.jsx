import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    movie: null,
    theatre: null,
    showtime: null,
    seats: [],
    total: 0,
  });

  const setMovie = (movie) => {
    setBooking((prev) => ({
      ...prev,
      movie,
    }));
  };

  const setTheatre = ({ theatre, showtime }) => {
    setBooking((prev) => ({
      ...prev,
      theatre,
      showtime,
    }));
  };

  const setSeats = (seats,total) => {
    setBooking((prev) => ({
      ...prev,
      seats,
      total,
    }));
  };

  const clearBooking = () => {
    setBooking({
      movie: null,
      theatre: null,
      showtime: null,
      seats: [],
      total: 0,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setMovie,
        setTheatre,
        setSeats,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used inside BookingProvider");
  }
  return context;
};
