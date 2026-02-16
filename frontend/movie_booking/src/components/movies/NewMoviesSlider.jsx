import React from "react";
import { Link } from "react-router-dom";

function NewMoviesSlider({ movies }) {
  if (!movies || !movies.length) return null;

  const movie = movies[0]; // 👈 ONLY FIRST MOVIE

  return (
    <div style={styles.wrapper}>
      {/* <Link to={`/movie/${movie.id}`} style={styles.card}> */}
        <video
          style={styles.video}
          muted
          autoPlay
          loop
          playsInline
        >
          <source src={movie.trailer} type="video/mp4" />
        </video>

        <div style={styles.overlay}>
          <h2 style={styles.title}>{movie.title}</h2>
          <p style={styles.sub}>Watch Trailer</p>
        </div>
      {/* </Link> */}
    </div>
  );
}

export default NewMoviesSlider;

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 7",
    overflow: "hidden",
    borderRadius: "18px",
    marginBottom: "40px",
    background: "#000",
  },

  card: {
    width: "100%",
    height: "100%",
    display: "block",
    position: "relative",
    textDecoration: "none",
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "40px 30px",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2), transparent)",
    color: "#fff",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "6px",
  },

  sub: {
    fontSize: "0.95rem",
    opacity: 0.85,
  },
};
