import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./css/Screens.css";
import { screenApi, theatreApi } from "../../services/api";

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
    const data = await screenApi.get("");
    console.log(data.data);
    setScreens(data.data || []);
  };

  const loadTheatres = async () => {
    const data = await theatreApi.get("");
    setTheatres(data.data || []);
  };

  const onSubmit = async (data) => {
    try {
      if (editId) {
        await screenApi.put(`/${editId}`,data);
        setEditId(null);
      } else {
        await screenApi.post("",data);
      }

      reset(); // clear form
      loadScreens(); // reload table
    } catch (error) {
      console.error("Error saving screen:", error);
      alert("Somthing went wrong");
    }
  };

  const handleEdit = (screen) => {
    setEditId(screen.id);

    setValue("name", screen.name);
    setValue("theatreId", screen.theatreId); // must match dropdown value
    setValue("totalSeats", screen.totalSeats);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this screen?")) {
      await screenApi.delete(`/${id}`);
      loadScreens();
    }
  };

 const getTheatreName = (id) => {
  const theatre = theatres.find((t) => t.id === id);
  return theatre ? theatre.name : "N/A";
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
          {...register("theatreId", {
            required: "Theatre is required",
          })}
        >
          <option value="">-- Select Theatre --</option>
          {theatres.map((theatre) => (
            <option key={theatre.id} value={theatre.id}>
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
              
              <tr key={screen.id}>
                <td>{screen.name}</td>
                <td>{getTheatreName(screen.theatreId)}</td>
        
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
                    onClick={() => handleDelete(screen.id)}
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