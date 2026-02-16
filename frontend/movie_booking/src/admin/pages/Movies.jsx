import { useEffect, useState } from "react";
import {
  getMovies,
  deleteMovie,
  createMovie,
  updateMovie,
} from "../services/movieService";
import "./css/Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    language: "",
    releaseDate: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateMovie(editId, form);
      setEditId(null);
    } else {
      await createMovie(form);
    }

    setForm({ name: "", language: "", releaseDate: "" });
    loadMovies();
  };

  const handleEdit = (movie) => {
    setEditId(movie._id);
    setForm({
      name: movie.name,
      language: movie.language,
      releaseDate: movie.releaseDate || "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this movie?")) {
      await deleteMovie(id);
      loadMovies();
    }
  };

  return (
    <div className="movies-container">
      <h2>Movies Management</h2>

      {/* Add / Edit Form */}
      <form className="movie-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Language"
          value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })}
          required
        />

        <input
          type="date"
          value={form.releaseDate}
          onChange={(e) =>
            setForm({ ...form, releaseDate: e.target.value })
          }
        />

        <button type="submit">
          {editId ? "Update Movie" : "Add Movie"}
        </button>
      </form>

      {/* Movies Table */}
      <table className="movies-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-row">
                No movies available
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.name}</td>
                <td>{movie.language}</td>
                <td>
                  {movie.releaseDate
                    ? new Date(movie.releaseDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Movies;
