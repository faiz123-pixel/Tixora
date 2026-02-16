import { useEffect, useState } from "react";
import { getTheatres, deleteTheatre } from "../services/theatreService";
import { useNavigate } from "react-router-dom";

function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getTheatres();
    setTheatres(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this theatre?")) {
      await deleteTheatre(id);
      load();
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
      transition: "0.3s",
    },

    card: {
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

    row: {
      transition: "0.2s",
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
      transition: "0.3s",
    },

    deleteBtn: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
      border: "none",
      padding: "7px 14px",
      borderRadius: "18px",
      cursor: "pointer",
      fontSize: "13px",
      transition: "0.3s",
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
        <h2 style={styles.title}>Theatres Management</h2>
        <button
          style={styles.addBtn}
          onClick={() => navigate("/admin/theatres/add")}
        >
          + Add Theatre
        </button>
      </div>

      {/* Table */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Theatre Name</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {theatres.length === 0 ? (
              <tr>
                <td colSpan="3" style={styles.empty}>
                  No theatres available
                </td>
              </tr>
            ) : (
              theatres.map((t) => (
                <tr key={t._id} style={styles.row}>
                  <td style={styles.td}>{t.name}</td>
                  <td style={styles.td}>{t.city}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        style={styles.editBtn}
                        onClick={() =>
                          navigate(`/admin/theatres/edit/${t._id}`)
                        }
                      >
                        Update
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(t._id)}
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

export default AdminTheatres;
