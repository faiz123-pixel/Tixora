import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getScreens,
  createScreen,
  updateScreen,
  deleteScreen,
} from "../services/screenService";
import { getTheatres } from "../services/theatreService";

import "./css/Screens.css";

function Screens() {
  const [screens, setScreens] = useState([]);
  const [editId, setEditId] = useState(null);
  const [theatres, setTheatres] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadScreens();
    loadTheatres();
  }, []);

  const loadScreens = async () => {
    const data = await getScreens();
    setScreens(data || []);
  };

  const loadTheatres = async () => {
    const data = await getTheatres();
    setTheatres(data || []);
  };

  const onSubmit = async (data) => {
    try {
      if (editId) {
        await updateScreen(editId, data);
        setEditId(null);
      } else {
        await createScreen(data);
      }

      reset(); // clear form
      loadScreens(); // reload table
    } catch (error) {
      console.error("Error saving screen:", error);
    }
  };

  const handleEdit = (screen) => {
    setEditId(screen._id);

    setValue("name", screen.name);
    setValue("theatre", screen.theatre?._id); // must match dropdown value
    setValue("totalSeats", screen.totalSeats);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this screen?")) {
      await deleteScreen(id);
      loadScreens();
    }
  };

  return (
    <div className="screens-page">
      <h2>Screens Management</h2>

      {/* ===== FORM ===== */}
      <form className="screen-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Screen Name"
          {...register("name", { required: "Screen name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <select
          {...register("theatre", {
            required: "Theatre is required",
          })}
        >
          <option value="">-- Select Theatre --</option>
          {theatres.map((theatre) => (
            <option key={theatre._id} value={theatre._id}>
              {theatre.name}
            </option>
          ))}
        </select>
        {errors.theatre && <p className="error">{errors.theatre.message}</p>}

        <input
          type="number"
          placeholder="Total Seats"
          {...register("totalSeats", {
            required: "Total seats required",
            min: { value: 1, message: "Seats must be at least 1" },
          })}
        />
        {errors.totalSeats && (
          <p className="error">{errors.totalSeats.message}</p>
        )}

        <button type="submit" className="primary-btn">
          {editId ? "Update Screen" : "Create Screen"}
        </button>

        {editId && (
          <button
            type="button"
            className="cancel-btn"
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
      <table className="screens-table">
        <thead>
          <tr>
            <th>Screen</th>
            <th>Theatre</th>
            <th>Total Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {screens.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-row">
                No screens available
              </td>
            </tr>
          ) : (
            screens.map((screen) => (
              <tr key={screen._id}>
                <td>{screen.name}</td>
                <td>{screen.theatre?.name || "N/A"}</td>
                <td className="total-seats">{screen.totalSeats}</td>
                <td>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(screen)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(screen._id)}
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

export default Screens;