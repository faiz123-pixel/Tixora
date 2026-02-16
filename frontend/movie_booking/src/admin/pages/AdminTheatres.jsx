import { useEffect, useState } from "react";
import {
  getTheatres,
  deleteTheatre,
  createTheatre,
  updateTheatre,
} from "../services/theatreService";
import "./css/AdminTheatres.css";

function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTheatres();
  }, []);

  const loadTheatres = async () => {
    const data = await getTheatres();
    setTheatres(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateTheatre(editId, form);
      setEditId(null);
    } else {
      await createTheatre(form);
    }

    setForm({ name: "", city: "" });
    loadTheatres();
  };

  const handleEdit = (theatre) => {
    setEditId(theatre._id);
    setForm({
      name: theatre.name,
      city: theatre.city,
    });
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

      {/* Add / Edit Form */}
      <form className="theatre-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Theatre Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />

        <button type="submit">
          {editId ? "Update Theatre" : "Add Theatre"}
        </button>
      </form>

      {/* Table */}
      <table className="theatres-table">
        <thead>
          <tr>
            <th>Theatre Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {theatres.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-row">
                No theatres available
              </td>
            </tr>
          ) : (
            theatres.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.city}</td>
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
