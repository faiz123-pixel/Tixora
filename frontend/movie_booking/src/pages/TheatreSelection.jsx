import React, { useState, useEffect } from "react";
import "./css/TheatreSelection.css";
import { useNavigate, useParams } from "react-router-dom";
import { movieApi, showApi } from "../services/api";

function TheatreSelection() {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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

  /* 🔥 FETCH MOVIE + THEATRES */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await movieApi.get(`/${movieId}`);
        const showRes = await showApi.get(`/${movieId}/shows`);
        const theatreRes = await showApi.get(`/${movieId}/theatres`);

        setMovie(movieRes.data);
        setShows(showRes.data);
        setTheatres(theatreRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) {
    return <p className="loading-text">Loading theatres...</p>;
  }

  /* 🎬 Send show object */
  const handleShowtimeClick = (show) => {
    navigate(`/seatSelection/${movieId}`, {
      state: { show },
    });
  };

  return (
    <div className="theatre-page container page-container">

      {/* MOVIE HEADER */}
      {movie && (
        <div className="theatre-movie-header">
          <img src={movie.posterUrl} alt={movie.title} />
          <div>
            <h2>{movie.title}</h2>
            <span className="badge">{movie.genre}</span>
          </div>
        </div>
      )}

      {/* DATE SELECTOR */}
      <div className="date-selector">
        {dates.map((date) => {
          const isActive =
            date.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={date.toISOString()}
              className={`date-btn ${isActive ? "active" : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="day">
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>
              <span className="date">{date.getDate()}</span>
            </button>
          );
        })}
      </div>

      <h3 className="section-title">Select Theatre & Showtime</h3>

      {theatres.map((theatre) => (
        <div key={theatre.id} className="theatre-card">
          <div className="theatre-info">
            <h4>{theatre.name}</h4>
            <p className="location">{theatre.cityName}</p>
          </div>

          <div className="showtime-row">
            {shows
              .filter((show) => show.screenId === theatre.screens[0].id)
              .map((show) => (
                <button
                  key={show.id}
                  className="showtime-btn"
                  onClick={() => handleShowtimeClick(show)}
                >
                  {new Date(show.showTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TheatreSelection;