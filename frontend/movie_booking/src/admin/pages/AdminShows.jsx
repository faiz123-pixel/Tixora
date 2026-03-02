import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getShows,
  createShow,
  updateShow,
  deleteShow,
} from "../services/showsService";

import { getMovies } from "../services/movieService";
import { getScreens } from "../services/screenService";

import "./css/AdminShows.css";

function AdminShows() {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadShows();
    loadMovies();
    loadScreens();
  }, []);

  const loadShows = async () => {
    const data = await getShows();
    setShows(data || []);
  };

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data || []);
  };

  const loadScreens = async () => {
    const data = await getScreens();
    setScreens(data || []);
  };

  const onSubmit = async (data) => {
    const showData = {
      movie: data.movie,      // movie ID
      screen: data.screen,    // screen ID
      showTime: data.showTime,
      basePrice: Number(data.basePrice),
    };

    if (editId) {
      await updateShow(editId, showData);
      setEditId(null);
    } else {
      await createShow(showData);
    }

    reset();
    loadShows();
  };

  const handleEdit = (show) => {
    setEditId(show._id);

    setValue("movie", show.movie?._id);
    setValue("screen", show.screen?._id);
    setValue(
      "showTime",
      show.showTime?.slice(0, 16) // required for datetime-local
    );
    setValue("basePrice", show.basePrice);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      await deleteShow(id);
      loadShows();
    }
  };

  return (
    <div className="shows-container">
      <h2>Shows Management</h2>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit(onSubmit)} className="show-form">
        
        {/* Movie Dropdown */}
        <select {...register("movie", { required: "Movie is required" })}>
          <option value="">-- Select Movie --</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.name}
            </option>
          ))}
        </select>
        {errors.movie && <p className="error">{errors.movie.message}</p>}

        {/* Screen Dropdown */}
        <select {...register("screen", { required: "Screen is required" })}>
          <option value="">-- Select Screen --</option>
          {screens.map((screen) => (
            <option key={screen._id} value={screen._id}>
              {screen.name}
            </option>
          ))}
        </select>
        {errors.screen && <p className="error">{errors.screen.message}</p>}

        {/* Show Time */}
        <input
          type="datetime-local"
          {...register("showTime", { required: "Show time is required" })}
        />
        {errors.showTime && (
          <p className="error">{errors.showTime.message}</p>
        )}

        {/* Base Price */}
        <input
          type="number"
          placeholder="Base Price"
          {...register("basePrice", {
            required: "Base price is required",
            min: { value: 1, message: "Price must be greater than 0" },
          })}
        />
        {errors.basePrice && (
          <p className="error">{errors.basePrice.message}</p>
        )}

        <button type="submit">
          {editId ? "Update Show" : "Add Show"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              reset();
              setEditId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ===== TABLE ===== */}
      <table className="shows-table">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Screen</th>
            <th>Show Time</th>
            <th>Base Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shows.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-row">
                No shows available
              </td>
            </tr>
          ) : (
            shows.map((show) => (
              <tr key={show._id}>
                <td>{show.movie?.name || "N/A"}</td>
                <td>{show.screen?.name || "N/A"}</td>
                <td>{new Date(show.showTime).toLocaleString()}</td>
                <td>₹{show.basePrice}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(show)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(show._id)}
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

export default AdminShows;