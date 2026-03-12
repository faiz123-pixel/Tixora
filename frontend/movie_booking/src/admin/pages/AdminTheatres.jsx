import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./css/AdminTheatres.css";
import { theatreApi } from "../../services/api";

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
    const data = await theatreApi.get("");
    setTheatres(data.data);
  };

  const onSubmit = async (data) => {
    try {
      if (editId) {
        await theatreApi.put(`/${editId}`, data);
        setEditId(null);
      } else {
        await theatreApi.post("", data);
      }

      reset();
      loadTheatres();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (theatre) => {
    setEditId(theatre.id);

    setValue("name", theatre.name);
    setValue("cityName", theatre.cityName);
    setValue("address", theatre.address);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this theatre?")) {
      await theatreApi.delete(`/${id}`);
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
        {errors.cityName && <p className="error">{errors.cityName.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}

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
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.cityName}</td>
                <td>{t.address}</td>
                <td>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(t.id)}
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
