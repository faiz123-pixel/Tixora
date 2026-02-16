import { useState } from "react";
import { createTheatre } from "../services/theatreService";
import { useNavigate } from "react-router-dom";
import "./css/AddTheatre.css";

function AddTheatre() {
  const navigate = useNavigate();

  const [theatre, setTheatre] = useState({
    name: "",
    city: "",
    address: "",
    totalScreens: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setTheatre({ ...theatre, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!theatre.name || !theatre.city) {
      alert("Please fill required fields");
      return;
    }

    await createTheatre(theatre);
    navigate("/admin/theatres");
  };

  return (
    <div className="theatre-wrapper">
      <form className="theatre-card" onSubmit={handleSubmit}>
        <h2 className="theatre-title">🎭 Add Theatre</h2>

        <div className="form-group">
          <label>Theatre Name *</label>
          <input
            type="text"
            name="name"
            value={theatre.name}
            onChange={handleChange}
            placeholder="Enter theatre name"
            required
          />
        </div>

        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={theatre.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={theatre.address}
            onChange={handleChange}
            placeholder="Enter full address"
          />
        </div>

        <div className="form-group">
          <label>Total Screens</label>
          <input
            type="number"
            name="totalScreens"
            value={theatre.totalScreens}
            onChange={handleChange}
            placeholder="Enter number of screens"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={theatre.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="actions">
          <button type="submit" className="add-btn">
            Add Theatre
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/theatres")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTheatre;
