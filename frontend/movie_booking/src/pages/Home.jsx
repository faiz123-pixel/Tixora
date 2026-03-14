import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButtons from "../components/movies/FilterButtons";
import NewMoviesSlider from "../components/movies/NewMoviesSlider";
import MovieGrid from "../components/movies/MovieGrid";
import { useBookingContext } from "../context/BookingContext";
import moviesData from "../data/movies"
import "./css/Home.css";
import { movieApi } from "../services/api";

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

    const res = await movieApi.get("");
    const data = res.data;

    console.log(data);
    const formatted = data.map((m) => ({
      id: m.id,
      title: m.title,
      poster: m.posterUrl,
      category: m.genre,
      isNew: m.isNew
    }));

    setMovies(formatted);

  } catch (err) {
    console.error("API fetch error:", err);
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
