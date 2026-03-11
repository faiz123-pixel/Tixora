import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import {
//   getMovies,
//   deleteMovie,
//   createMovie,
//   updateMovie,
// } from "../services/movieService";
import "./css/Movies.css";
import { movieApi } from "../../services/api";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await movieApi.get("");
    // console.log(data.data);
    setMovies(data.data);
  };

  const onSubmit = async (data) => {
    if (editId) {
      await movieApi.put(`/${editId}`,data);
      setEditId(null);
    } else {
      await movieApi.post("",data);
    }

    reset();
    loadMovies();
  };

  const handleEdit = (movie) => {
    setEditId(movie.id);

    setValue("title", movie.title);
    setValue("description", movie.description);
    setValue("duration", movie.duration);
    setValue("language", movie.language);
    setValue("genre", movie.genre);
    setValue(
      "releaseDate",
      movie.releaseDate ? movie.releaseDate.substring(0, 10) : "",
    );
    setValue("posterUrl", movie.posterUrl);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this movie?")) {
      await movieApi.delete(`/${id}`);
      loadMovies();
    }
  };

  return (
    <div className="movies-container">
      <h2>Movies Management</h2>

      {/* Add / Edit Form */}
      <form className="movie-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <input
          type="number"
          placeholder="Duration (minutes)"
          {...register("duration", {
            required: "Duration is required",
            min: { value: 1, message: "Must be greater than 0" },
          })}
        />
        {errors.duration && <p className="error">{errors.duration.message}</p>}

        <input
          type="text"
          placeholder="Language"
          {...register("language", { required: "Language is required" })}
        />
        {errors.language && <p className="error">{errors.language.message}</p>}

        <select {...register("genre", { required: "Genre is required" })}>
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Fantasy">Fantasy</option>
        </select>

        {errors.genre && <p className="error">{errors.genre.message}</p>}

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]} // 👈 prevents past dates
          {...register("releaseDate", {
            required: "Release date is required",
          })}
        />

        {errors.releaseDate && (
          <p className="error">{errors.releaseDate.message}</p>
        )}

        <input
          type="text"
          placeholder="Poster URL"
          {...register("posterUrl", {
            required: "Poster URL is required",
          })}
        />
        {errors.posterUrl && (
          <p className="error">{errors.posterUrl.message}</p>
        )}

        <button type="submit">{editId ? "Update Movie" : "Add Movie"}</button>
      </form>

      {/* Movies Table */}
      <table className="movies-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Language</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-row">
                No movies available
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.language}</td>
                <td>{movie.genre}</td>
                <td>{movie.duration} mins</td>
                <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(movie.id)}
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
