import React, { useEffect, useState } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import MovieGrid from "../components/movies/MovieGrid";
import "./css/MovieDetails.css";
import { movieApi } from "../services/api";


function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
const passedMovie = location.state?.movie;

  

  const [movie, setMovie] = useState(passedMovie || null);
  const [trailer, setTrailer] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);

      /* 🎬 Movie Details */
      const movieRes = await movieApi.get(`/${id}`);
      const movieData = await movieRes.data;
      
      setMovie({
        id: movieData.id,
        title: movieData.title,
        poster: movieData.posterUrl,
        overview: movieData.description,
        rating: 4,
        category: movieData.genre || "Movie",
      });
      
        setTrailer( null);
        
        /* 🔥 Related Movies */
        const relatedRes = await movieApi.get(`/genre/${id}`);
        const relatedData = await relatedRes.data;
        
        // console.log(relatedData);
      setRelatedMovies(
        relatedData.map((m) => ({
          id: m.id,
          title: m.title,
          poster: m.posterUrl,
        }))
      );
    } catch (err) {
      console.error("Error fetching movie details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    setMovie(movie);               // ✅ context
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return <p className="loading-text">Loading movie details...</p>;
  }

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
    <div className="movie-details-page container page-container">
      <div className="movie-details-card">

        {/* 🎬 VIDEO / POSTER */}
        <div className="poster-section">
          {trailer ? (
            <iframe
              className="movie-video"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={movie.poster} alt={movie.title} />
          )}
        </div>

        {/* INFO */}
        <div className="info-section">
          <h2 className="movie-title">{movie.title}</h2>

          <div className="movie-meta">
            <span className="badge">{movie.category}</span>
            <span className="rating">⭐ {movie.rating}</span>
          </div>

          <p className="movie-desc">{movie.overview}</p>

          <button
            className="book-btn"
            onClick={() => navigate(`/theatres/${movie.id}`)}
          >
            Book Tickets
          </button>
        </div>
      </div>

      {/* 🔥 RELATED MOVIES */}
      {relatedMovies.length > 0 && (
        <div className="related-section">
          <h3 className="category-title">
            Similar Movies
            <span className="category-line"></span>
          </h3>

          <MovieGrid movies={relatedMovies} onMovieClick={handleMovieClick} />
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
