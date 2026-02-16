import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../services/movieService";
import "./css/AddMovie.css";

function AddMovie() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: "",
    language: "",
    genre: "",
    duration: "",
    releaseDate: "",
    poster: "",
    description: "",
  });

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Romance",
    "Thriller",
    "Horror",
    "Sci-Fi",
    "Fantasy",
    "Adventure",
    "Animation",
  ];

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movie.name || !movie.language || !movie.genre) {
      alert("Please fill all required fields");
      return;
    }

    await createMovie(movie);
    alert("Movie added successfully!");
    navigate("/admin/movies");
  };

  return (
    <div className="add-movie-container">
      <h2 className="add-movie-title">➕ Add New Movie</h2>

      <form onSubmit={handleSubmit} className="add-movie-form">

        <div className="form-group">
          <label>Movie Name *</label>
          <input
            type="text"
            name="name"
            value={movie.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Language *</label>
          <input
            type="text"
            name="language"
            value={movie.language}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Genre *</label>
          <select
            name="genre"
            value={movie.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            {genres.map((g, index) => (
              <option key={index} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Poster URL</label>
          <input
            type="text"
            name="poster"
            value={movie.poster}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Movie
        </button>

      </form>
    </div>
  );
}

export default AddMovie;
