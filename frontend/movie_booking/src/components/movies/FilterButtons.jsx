import React from "react";

function FilterButtons({ active, setActive }) {
  const filters = ["All", "Action", "Sci-Fi", "Drama"];

  return (
    <div style={styles.container}>
      {filters.map((f) => {
        const isActive = active === f;

        return (
          <button
            key={f}
            style={{
              ...styles.button,
              ...(isActive ? styles.active : {}),
            }}
             
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;

/* 🎨 Clean + Modern Styles */
const styles = {
  container: {
    display: "flex",
    gap: "12px",
    whiteSpace: "nowrap",
    overflow: "hidden", // ❌ scrollbar removed
  },
  

  button: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "var(--light-gray)",
    padding: "7px 18px",
    borderRadius: "999px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.25s ease, color 0.25s ease, border 0.25s ease",
  },

  active: {
    background: "var(--accent-strong)",
    color: "var(--dark-primary)",
    border: "1px solid var(--accent-strong)",
  },
  

};
