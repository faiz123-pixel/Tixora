import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getShows,
  createShow,
  updateShow,
  deleteShow,
} from "../services/showsService";
import "./css/AdminShows.css";

function AdminShows() {
  const [shows, setShows] = useState([]);
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
  }, []);

  const loadShows = () => {
    getShows().then(setShows);
  };

  const onSubmit = (data) => {
    const showData = {
      movie: data.movie,
      screen: data.screen,
      showTime: data.showTime,
      basePrice: Number(data.basePrice),
    };

    if (editId) {
      updateShow(editId, showData).then(() => {
        setEditId(null);
        loadShows();
      });
    } else {
      createShow(showData).then(loadShows);
    }

    reset();
  };

  const handleEdit = (show) => {
    setEditId(show._id);

    setValue("movie", show.movie);
    setValue("screen", show.screen);
    setValue("showTime", show.showTime);
    setValue("basePrice", show.basePrice);
  };

  const handleDelete = (id) => {
    deleteShow(id).then(loadShows);
  };

  return (
    <div className="shows-container">
      <h2>Shows Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="show-form">
        <input
          type="text"
          placeholder="Movie"
          {...register("movie", { required: "Movie is required" })}
        />
        {errors.movie && <p className="error">{errors.movie.message}</p>}

        <input
          type="text"
          placeholder="Screen"
          {...register("screen", { required: "Screen is required" })}
        />
        {errors.screen && <p className="error">{errors.screen.message}</p>}

        <input
          type="datetime-local"
          {...register("showTime", { required: "Show time is required" })}
        />
        {errors.showTime && <p className="error">{errors.showTime.message}</p>}

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

        <button type="submit">{editId ? "Update Show" : "Add Show"}</button>
      </form>

      {/* Table */}
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
                <td>{show.movie?.name}</td>
                <td>{show.screen}</td>
                <td>{new Date(show.showTime).toLocaleString()}</td>
                <td>₹{show.basePrice}</td>
                <td>
                  <button onClick={() => handleEdit(show)}>Edit</button>
                  <button onClick={() => handleDelete(show._id)}>Delete</button>
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
