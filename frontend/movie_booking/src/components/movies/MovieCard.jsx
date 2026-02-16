import React, { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered
          ? "0 12px 30px rgba(0,0,0,0.6)"
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          ...styles.image,
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      />

      <div style={styles.overlay}>
        <div style={styles.topRow}>
          <span style={styles.rating}>⭐ 8.4</span>
        </div>

        <h6
          style={{
            ...styles.title,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          {movie.title}
        </h6>

        <Link
          to={`/movie/${movie.id}`}
          state={{movie}}
          style={{
            ...styles.button,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.9)",
          }}
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;

const styles = {
  card: {
    width: "100%",
    height: "100%",
    borderRadius: "14px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.35s ease",
    background: "#000",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "12px",
    gap: "6px",
  },

  title: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#fff",
    transition: "all 0.3s ease",
  },

  button: {
    alignSelf: "center",
    textDecoration: "none",
    background: "linear-gradient(135deg, #ff512f, #f09819)",
    color: "#fff",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "0.75rem",
    fontWeight: 600,
    transition: "all 0.3s ease",
  },
};
