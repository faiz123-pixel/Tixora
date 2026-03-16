
import React from "react";

function FilterDropdown({ active, setActive }) {
  const filters = [
    "All",
    "Action",
    "Sci-Fi",
    "Drama",
    "Comedy",
    "Horror",
    "Thriller",
    "Adventure",
    "Animation",
    "Fantasy",
  ];

  return (
    <div style={styles.container}>
      <select
        value={active}
        onChange={(e) => setActive(e.target.value)}
        style={styles.dropdown}
      >
        {filters.map((f) => (
          <option key={f} value={f} style={styles.option}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "15px",
  },

  dropdown: {
    backgroundColor: "#1e1e2f",
    color: "#ffffff",
    border: "1px solid #444",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    outline: "none",
  },

  option: {
    backgroundColor: "#1e1e2f",
    color: "#ffffff",
  },
};
