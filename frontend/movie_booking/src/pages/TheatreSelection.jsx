import React, { useState } from "react";
import "./css/TheatreSelection.css";
import { useNavigate } from "react-router-dom";
import theatresData from "../data/showtimesData";
import { useBookingContext } from "../context/BookingContext";

function TheatreSelection() {
  const navigate = useNavigate();
  const { booking, setTheatre } = useBookingContext();

  const today = new Date();

  const generateDates = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i);
      return d;
    });
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const movie = booking.movie;

  // ❗ Safety check (refresh / direct access)
  if (!movie) {
    return <p className="empty-state">Please select a movie first</p>;
  }

  /**
   * 🔑 IMPORTANT FIX:
   * We map theatres using a LOCAL movieKey
   * not TMDB random movie.id
   */
  const theatreBlock = theatresData.find((t) => t.movieKey === movie.localId);

  if (!theatreBlock) {
    return <p className="empty-state">No theatres available</p>;
  }

  const handleShowtimeClick = (theatre, time) => {
  // ✅ Save theatre + showtime + date globally
  setTheatre(
    {
      id: theatre.id,
      theatre: theatre.name,
      location: theatre.location,
      price: theatre.price,
      showtime: time,
      date: selectedDate.toDateString(), // 📅 store date here
    },
    time
  );

  // ➡️ Navigate to seat selection
  // console.log(booking);
  navigate(`/seatSelection/${movie.id}`);
};


  return (
    <div className="theatre-page container page-container">
      {/* 🎬 MOVIE HEADER */}
      <div className="theatre-movie-header">
        <img src={movie.poster} alt={movie.title} />
        <div>
          <h2>{movie.title}</h2>
          <span className="badge">{movie.category}</span>
        </div>
      </div>
      {/* 📅 DATE SELECTION */}
      <div className="date-selector">
        {dates.map((date) => {
          const isActive = date.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={date}
              className={`date-btn ${isActive ? "active" : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="day">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="date">{date.getDate()}</span>
            </button>
          );
        })}
      </div>

      <h3 className="section-title">Select Theatre & Showtime</h3>

      {theatreBlock.theatres.map((theatre) => (
        <div key={theatre.id} className="theatre-card">
          <div className="theatre-info">
            <h4>{theatre.name}</h4>
            <p className="location">{theatre.location}</p>
          </div>

          <div className="showtime-row">
            {theatre.showtimes.map((time) => (
              <button
                key={time}
                className="showtime-btn"
                onClick={() => handleShowtimeClick(theatre, time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TheatreSelection;
