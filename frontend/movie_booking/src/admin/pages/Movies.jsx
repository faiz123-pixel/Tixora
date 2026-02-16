import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this movie?")) {
      await deleteMovie(id);
      loadMovies();
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
        <h2 style={styles.title}>Movies Management</h2>
        <button
          style={styles.addBtn}
          onClick={() => navigate("/admin/movies/add")}
        >
          + Add Movie
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Movie Name</th>
              <th style={styles.th}>Language</th>
              <th style={styles.th}>Release Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td colSpan="4" style={styles.empty}>
                  No movies available
                </td>
              </tr>
            ) : (
              movies.map((movie) => (
                <tr key={movie._id}>
                  <td style={styles.td}>{movie.name}</td>
                  <td style={styles.td}>{movie.language}</td>
                  <td style={styles.td}>
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        style={styles.editBtn}
                        onClick={() =>
                          navigate(`/admin/movies/edit/${movie._id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(movie._id)}
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

export default Movies;
