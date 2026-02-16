import { useEffect, useState } from "react";
import { getMovieById, updateMovie } from "../services/movieService";
import { useParams, useNavigate } from "react-router-dom";
import "./css/EditMovie.css";

function EditMovie() {
  const { id } = useParams();
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

  useEffect(() => {
    getMovieById(id).then((data) => {
      if (data) setMovie(data);
    });
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMovie(id, movie);
    navigate("/admin/movies");
  };

  return (
    <div className="edit-wrapper">
      <form className="edit-card" onSubmit={handleSubmit}>
        <h2 className="edit-title">✏️ Edit Movie</h2>

        <div className="form-group">
          <label>Movie Name</label>
          <input
            type="text"
            name="name"
            value={movie.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Language</label>
          <input
            type="text"
            name="language"
            value={movie.language}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <select
            name="genre"
            value={movie.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            {genres.map((g, i) => (
              <option key={i} value={g}>
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
            value={
              movie.releaseDate
                ? movie.releaseDate.substring(0, 10)
                : ""
            }
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

        <div className="actions">
          <button type="submit" className="update-btn">
            Update Movie
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/movies")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMovie;
