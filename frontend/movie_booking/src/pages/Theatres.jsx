import React, { useEffect, useState } from "react";
import "./css/Theatres.css";
import { useNavigate } from "react-router-dom";
import { screenApi, theatreApi } from "../services/api";

function Theatres() {
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch movies for a specific theatre
  const fetchMovies = async (theatreId) => {
    try {
      const res = await screenApi.get(`/${theatreId}/screens`);
      const screens = res.data;

      const movieMap = new Map();

      screens.forEach((screen) => {
        screen.shows?.forEach((show) => {
          movieMap.set(show.movie.id, show.movie);
        });
      });

      return Array.from(movieMap.values());
    } catch (err) {
      console.error("Error fetching movies:", err);
      return [];
    }
  };

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await theatreApi.get("");
        const theatreData = response.data;

        // 🔹 Fetch movies for each theatre
        const theatresWithMovies = await Promise.all(
          theatreData.map(async (theatre) => {
            const movies = await fetchMovies(theatre.id);

            return {
              ...theatre,
              movies: movies,
            };
          })
        );

        setTheatres(theatresWithMovies);
      } catch (err) {
        console.error("Error fetching theatres:", err);
        setError("Failed to load theatres");
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading theatres...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="theatrewise-page container page-container">
      <h1 className="page-title">🎭 Theatres & Movies</h1>

      {theatres.map((theatre) => (
        <div key={theatre.id} className="theatre-block">
          
          {/* 🎭 Theatre Header */}
          <div className="theatre-header">
            <h2>{theatre.name}</h2>
            <span>{theatre.cityName}</span>
          </div>

          {/* 🎬 Movies */}
          <div className="theatre-movies">
            {theatre.movies?.length > 0 ? (
              theatre.movies.map((movie) => (
                <div
                  key={movie.id}
                  className="theatre-movie-card"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img src={movie.posterUrl} alt={movie.title} />

                  <div className="movie-info">
                    <h4>{movie.title}</h4>
                    <span>{movie.genre}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-movies">No movies available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Theatres;