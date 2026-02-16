import { useEffect, useState } from "react";
import {
  getShows,
  createShow,
  updateShow,
  deleteShow
} from "../services/showsService";
import "./css/AdminShows.css";

function AdminShows() {
  const [shows, setShows] = useState([]);
  const [form, setForm] = useState({
    movieName: "",
    theatre: "",
    showTime: "",
    price: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = () => {
    getShows().then(setShows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const showData = {
      movie: { name: form.movieName },
      theatre: form.theatre,
      showTime: form.showTime,
      price: Number(form.price)
    };

    if (editId) {
      updateShow(editId, showData).then(() => {
        setEditId(null);
        loadShows();
      });
    } else {
      createShow(showData).then(loadShows);
    }

    setForm({ movieName: "", theatre: "", showTime: "", price: "" });
  };

  const handleEdit = (show) => {
    setEditId(show._id);
    setForm({
      movieName: show.movie.name,
      theatre: show.theatre,
      showTime: show.showTime,
      price: show.price
    });
  };

  const handleDelete = (id) => {
    deleteShow(id).then(loadShows);
  };

  return (
    <div className="shows-container">
      <h2>Shows Management</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="show-form">
        <input
          type="text"
          placeholder="Movie Name"
          value={form.movieName}
          onChange={(e) => setForm({ ...form, movieName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Theatre"
          value={form.theatre}
          onChange={(e) => setForm({ ...form, theatre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Show Time"
          value={form.showTime}
          onChange={(e) => setForm({ ...form, showTime: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <button type="submit">
          {editId ? "Update Show" : "Add Show"}
        </button>
      </form>

      {/* Shows Table */}
      <table className="shows-table">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Theatre</th>
            <th>Time</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shows.map(show => (
            <tr key={show._id}>
              <td>{show.movie.name}</td>
              <td>{show.theatre}</td>
              <td>{show.showTime}</td>
              <td>₹{show.price}</td>
              <td>
                <button onClick={() => handleEdit(show)}>Edit</button>
                <button onClick={() => handleDelete(show._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminShows;
