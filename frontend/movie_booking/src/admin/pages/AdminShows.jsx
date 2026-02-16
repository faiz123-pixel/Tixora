import { useEffect, useState } from "react";
import { getShows, deleteShow } from "../services/showsService";
import { useNavigate } from "react-router-dom";

function AdminShows() {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    const data = await getShows();
    setShows(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this show?")) {
      await deleteShow(id);
      loadShows();
    }
  };

  const styles = {
    page: {
      backgroundColor: "var(--dark-primary)",
      padding: "30px",
      minHeight: "100vh",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    },

    title: {
      fontSize: "26px",
      fontWeight: "700",
      color: "var(--accent-strong)",
    },

    addBtn: {
      backgroundColor: "var(--accent-soft)",
      border: "none",
      padding: "10px 18px",
      borderRadius: "25px",
      fontWeight: "600",
      cursor: "pointer",
      color: "var(--dark-primary)",
    },

    tableWrapper: {
      backgroundColor: "#ffffff",
      borderRadius: "18px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      overflow: "hidden",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    th: {
      backgroundColor: "var(--dark-secondary)",
      color: "var(--light-gray)",
      textAlign: "left",
      padding: "16px",
      fontSize: "15px",
    },

    td: {
      padding: "16px",
      borderBottom: "1px solid var(--light-gray)",
      fontSize: "14px",
      color: "var(--dark-primary)",
    },

    actions: {
      display: "flex",
      gap: "10px",
    },

    editBtn: {
      backgroundColor: "var(--accent-strong)",
      color: "#ffffff",
      border: "none",
      padding: "7px 14px",
      borderRadius: "18px",
      cursor: "pointer",
      fontSize: "13px",
    },

    deleteBtn: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
      border: "none",
      padding: "7px 14px",
      borderRadius: "18px",
      cursor: "pointer",
      fontSize: "13px",
    },

    empty: {
      padding: "30px",
      textAlign: "center",
      color: "var(--dark-secondary)",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Shows Management</h2>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Movie</th>
              <th style={styles.th}>Theatre</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {shows.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  No shows available
                </td>
              </tr>
            ) : (
              shows.map((show) => (
                <tr key={show._id}>
                  <td style={styles.td}>{show.movie?.name}</td>
                  <td style={styles.td}>{show.theatre?.name}</td>
                  <td style={styles.td}>
                    {new Date(show.date).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>{show.time}</td>
                  <td style={styles.td}>₹ {show.price}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      

                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(show._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminShows;
