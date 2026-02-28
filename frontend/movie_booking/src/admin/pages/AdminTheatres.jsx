import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getTheatres,
  deleteTheatre,
  createTheatre,
  updateTheatre,
} from "../services/theatreService";
import "./css/AdminTheatres.css";

function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadTheatres();
  }, []);

  const loadTheatres = async () => {
    const data = await getTheatres();
    setTheatres(data);
  };

  const onSubmit = async (data) => {
    if (editId) {
      await updateTheatre(editId, data);
      setEditId(null);
    } else {
      await createTheatre(data);
    }

    reset();
    loadTheatres();
  };

  const handleEdit = (theatre) => {
    setEditId(theatre._id);

    setValue("name", theatre.name);
    setValue("cityName", theatre.cityName);
    setValue("address", theatre.address);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this theatre?")) {
      await deleteTheatre(id);
      loadTheatres();
    }
  };

  return (
    <div className="theatres-container">
      <h2>Theatres Management</h2>

      {/* Form */}
      <form className="theatre-form" onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          placeholder="Theatre Name"
          {...register("name", { required: "Theatre name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          type="text"
          placeholder="City Name"
          {...register("cityName", { required: "City name is required" })}
        />
        {errors.cityName && (
          <p className="error">{errors.cityName.message}</p>
        )}

        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && (
          <p className="error">{errors.address.message}</p>
        )}

        <button type="submit">
          {editId ? "Update Theatre" : "Add Theatre"}
        </button>
      </form>

      {/* Table */}
      <table className="theatres-table">
        <thead>
          <tr>
            <th>Theatre Name</th>
            <th>City Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {theatres.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-row">
                No theatres available
              </td>
            </tr>
          ) : (
            theatres.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.cityName}</td>
                <td>{t.address}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t._id)}
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

export default AdminTheatres;