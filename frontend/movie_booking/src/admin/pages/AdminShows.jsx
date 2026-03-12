import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./css/AdminShows.css";
import { movieApi, screenApi, showApi } from "../../services/api";

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
    const data = await showApi.get("");
    console.log(data.data);
    setShows(data.data || []);
  };

  const loadMovies = async () => {
    const data = await movieApi.get("");
    console.log(data.data);
    setMovies(data.data || []);
  };

  const loadScreens = async () => {
    const data = await screenApi.get("");
    console.log(data.data);
    setScreens(data.data || []);
  };

  const onSubmit = async (data) => {

  try {
    if (editId) {
      await showApi.put(`/${editId}`, data);
      setEditId(null);
    } else {
      await showApi.post("", data);
    }

    reset();
    loadShows();
  } catch (error) {
    console.error("Error saving show", error);
    alert("Somthin went wrong");
  }
};

  const handleEdit = (show) => {
    setEditId(show.id);

    setValue("movieId", show.movie?.id);
    setValue("screenId", show.screen?.id);
    setValue(
      "showTime",
      show.showTime?.slice(0, 16) // required for datetime-local
    );
    setValue("basePrice", show.basePrice);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      await showApi.delete(`/${id}`);
      loadShows();
    }
  };

  const getMovieName = (id) => {
  const movie = movies.find((m) => m.id === id);
  return movie ? movie.title : "N/A";
};

const getScreenName = (id) => {
  const screen = screens.find((s) => s.id === id);
  return screen ? screen.name : "N/A";
};

  return (
    <div className="shows-container">
      <h2>Shows Management</h2>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit(onSubmit)} className="show-form">
        
        {/* Movie Dropdown */}
        <select {...register("movieId", { required: "Movie is required" })}>
          <option value="">-- Select Movie --</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
        {errors.movieId && <p className="error">{errors.movieId.message}</p>}

        {/* Screen Dropdown */}
        <select {...register("screenId", { required: "Screen is required" })}>
          <option value="">-- Select Screen --</option>
          {screens.map((screen) => (
            <option key={screen.id} value={screen.id}>
              {screen.name}
            </option>
          ))}
        </select>
        {errors.screenId && <p className="error">{errors.screenId.message}</p>}

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
              <tr key={show.id}>
                <td>{getMovieName(show.movieId)}</td>
                <td>{getScreenName(show.screenId)}</td>
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
                    onClick={() => handleDelete(show.id)}
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