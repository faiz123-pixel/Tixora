import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButtons from "../components/movies/FilterButtons";
import NewMoviesSlider from "../components/movies/NewMoviesSlider";
import MovieGrid from "../components/movies/MovieGrid";
import { useBookingContext } from "../context/BookingContext";
import moviesData from "../data/movies"
import "./css/Home.css";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const API_KEY = "a84c9863d3bfde07f9537e1751f6f2d1";

/* 🎭 GENRE MAP */
const GENRE_MAP = {
  28: "Action",
  878: "Sci-Fi",
  18: "Drama",
};

function Home() {
  const navigate = useNavigate();
  const { setMovie } = useBookingContext();

  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();

      const formatted = data.results.map((m) => {
        const genreId = m.genre_ids.find((id) => GENRE_MAP[id]);

        return {
          id: m.id,
          title: m.title,
          poster: m.poster_path
            ? IMAGE_BASE + m.poster_path
            : "/placeholder.jpg",
          category: GENRE_MAP[genreId] || "Drama",
          isNew: true,
        };
      });

      setMovies(formatted);
    } catch (err) {
      console.error("TMDB fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 FILTERING */
  const filteredMovies = movies.filter((movie) => {
    const matchCategory =
      filter === "All" || movie.category === filter;

    const matchSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const categories = [
    ...new Set(filteredMovies.map((m) => m.category)),
  ];

  /* 🎬 CLICK HANDLER */
  const handleMovieClick = (movie) => {
    setMovie(movie);               // ✅ context
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return <p className="loading-text">Loading movies...</p>;
  }

  return (
    <div className="home-page container page-container" style={{ marginTop: "50px" }}>
      {/* 🔍 SEARCH + FILTER */}
      <div className="search-filter-row">
        <div className="search-box">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="search-icon-btn">
            🔍
          </button>
        </div>

        <FilterButtons active={filter} setActive={setFilter} />
      </div>

      {/* 🎬 HERO SLIDER */}
      {movies.length > 0 && (
        <NewMoviesSlider movies={moviesData.filter((m) => m.isNew)} />
      )}

      {/* 🎞 CATEGORY SECTIONS */}
      {categories.map((category) => {
        const moviesInCategory = filteredMovies.filter(
          (m) => m.category === category
        );

        return (
          <div key={category} className="category-section">
            <h3 className="category-title">
              {category}
              <span className="category-line"></span>
            </h3>

            <MovieGrid
              movies={moviesInCategory}
              onMovieClick={handleMovieClick}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
