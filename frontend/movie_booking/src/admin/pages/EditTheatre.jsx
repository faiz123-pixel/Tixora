import { useEffect, useState } from "react";
import { getTheatreById, updateTheatre } from "../services/theatreService";
import { useParams, useNavigate } from "react-router-dom";
import "./css/EditTheatre.css";

function EditTheatre() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [theatre, setTheatre] = useState({
    name: "",
    city: "",
    address: "",
    totalScreens: "",
    status: "Active",
  });

  useEffect(() => {
    getTheatreById(id).then((data) => {
      if (data) setTheatre(data);
    });
  }, [id]);

  const handleChange = (e) => {
    setTheatre({ ...theatre, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTheatre(id, theatre);
    navigate("/admin/theatres");
  };

  return (
    <div className="edit-theatre-wrapper">
      <form className="edit-theatre-card" onSubmit={handleSubmit}>
        <h2 className="edit-theatre-title">✏️ Edit Theatre</h2>

        <div className="form-group">
          <label>Theatre Name *</label>
          <input
            type="text"
            name="name"
            value={theatre.name}
            onChange={handleChange}
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
          />
        </div>

        <div className="form-group">
          <label>Total Screens</label>
          <input
            type="number"
            name="totalScreens"
            value={theatre.totalScreens}
            onChange={handleChange}
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
          <button type="submit" className="update-btn">
            Update Theatre
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

export default EditTheatre;
