import React, { useState, useEffect, useMemo } from "react";
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

  /* 📅 Generate 7 days once */
  const dates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  /* 🔥 Fetch data */
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

  /* 🎬 Navigate to seat page */
  const handleShowtimeClick = (show, theatre) => {
    navigate(`/seatSelection/${movieId}`, {
      state: {
        show,
        movie,
        theatre,
        basePrice: show.basePrice
      },
    });
  };

  return (
    <div className="theatre-page container page-container">

      {/* 🎬 MOVIE HEADER */}
      {movie && (
        <div className="theatre-movie-header">
          <img src={movie.posterUrl} alt={movie.title} />
          <div>
            <h2>{movie.title}</h2>
            <span className="badge">{movie.genre}</span>
          </div>
        </div>
      )}

      {/* 📅 DATE SELECTOR */}
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

      {theatres.map((theatre) => {
        /* 🎥 Get all screens of theatre */
        const screenIds = theatre.screens?.map((s) => s.id) || [];
        /* 🎬 Filter shows by screen + selected date */
        const theatreShows = shows.filter((show) => {
          const showDate = new Date(show.showTime);
          // {console.log(screenIds,show.screenId)}
          return (
            screenIds.includes(show.screenId) &&
            showDate.toDateString() === selectedDate.toDateString()
          );
        });
        
        return (
          <div key={theatre.id} className="theatre-card">
            <div className="theatre-info">
              <h4>{theatre.name}</h4>
              <p className="location">{theatre.cityName}</p>
            </div>

            {/* {console.log(theatreShows)}; */}
            <div className="showtime-row">
              {theatreShows.length === 0 ? (
                <span className="no-shows">No shows available</span>
              ) : (
                theatreShows.map((show) => (
                  <button
                    key={show.id}
                    className="showtime-btn"
                    onClick={() => handleShowtimeClick(show, theatre)}
                  >
                    {new Date(show.showTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </button>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TheatreSelection;