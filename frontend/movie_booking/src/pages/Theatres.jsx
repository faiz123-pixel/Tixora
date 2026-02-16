import React from "react";
import "./css/Theatres.css";
import { useNavigate } from "react-router-dom";

/* 🎭 SAMPLE DATA (can be replaced by API later) */
const theatres = [
  {
    id: 1,
    name: "INOX: City Center",
    location: "Mumbai",
    movies: [
      {
        id: 101,
        title: "Interstellar",
        poster: "/posters/interstellar.jpg",
        category: "Sci-Fi",
      },
      {
        id: 102,
        title: "John Wick 4",
        poster: "/posters/johnwick.jpg",
        category: "Action",
      },
    ],
  },
  {
    id: 2,
    name: "PVR Cinemas",
    location: "Delhi",
    movies: [
      {
        id: 103,
        title: "Oppenheimer",
        poster: "/posters/oppenheimer.jpg",
        category: "Drama",
      },
      {
        id: 104,
        title: "Avengers: Endgame",
        poster: "/posters/endgame.jpg",
        category: "Action",
      },
    ],
  },
];

function Theatres() {
  const navigate = useNavigate();

  return (
    <div className="theatrewise-page container page-container">
      <h1 className="page-title">🎭 Theatres & Movies</h1>

      {theatres.map((theatre) => (
        <div key={theatre.id} className="theatre-block">

          {/* THEATRE HEADER */}
          <div className="theatre-header">
            <h2>{theatre.name}</h2>
            <span>{theatre.location}</span>
          </div>

          {/* MOVIES */}
          <div className="theatre-movies">
            {theatre.movies.map((movie) => (
              <div
                key={movie.id}
                className="theatre-movie-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img src={movie.poster} alt={movie.title} />
                <div className="movie-info">
                  <h4>{movie.title}</h4>
                  <span>{movie.category}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

export default Theatres;
