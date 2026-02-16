import React, { useEffect, useState } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import MovieGrid from "../components/movies/MovieGrid";
import "./css/MovieDetails.css";


const API_KEY = "a84c9863d3bfde07f9537e1751f6f2d1";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

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
      const movieRes = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const movieData = await movieRes.json();
      
      setMovie({
        id: movieData.id,
        title: movieData.title,
        poster: IMAGE_BASE + movieData.poster_path,
        overview: movieData.overview,
        rating: movieData.vote_average.toFixed(1),
        category: movieData.genres[0]?.name || "Movie",
      });
      
      /* 🎥 Trailer */
      const videoRes = await fetch(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
      );
      const videoData = await videoRes.json();
      // console.log(videoData);
      
      const youtubeTrailer = videoData.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(youtubeTrailer?.key || null);

      /* 🔥 Related Movies */
      const relatedRes = await fetch(
        `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
      );
      const relatedData = await relatedRes.json();

      setRelatedMovies(
        relatedData.results.map((m) => ({
          id: m.id,
          title: m.title,
          poster: IMAGE_BASE + m.poster_path,
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
            onClick={() => navigate(`/theatres/${1}`)}
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
