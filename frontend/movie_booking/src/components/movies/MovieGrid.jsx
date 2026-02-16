import React from "react";
import MovieCard from "./MovieCard";

function MovieGrid({ movies, onMovieClick }) {
  if (!movies.length) {
    return <p style={styles.empty}>No movies found</p>;
  }

  return (
    <div style={styles.grid}>
      {movies.map((m) => (
        <div key={m.id} style={styles.cardWrapper} onClick={()=>onMovieClick(m)}>
          <MovieCard movie={m} />
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;

/* 🎨 Modern responsive grid */
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
    marginTop: "10px",
  },

  cardWrapper: {
    width: "100%",
  },

  empty: {
    textAlign: "center",
    color: "var(--light-gray)",
    opacity: 0.7,
    marginTop: "20px",
  },
};
