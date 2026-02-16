import { useEffect, useState } from "react";
// import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    movies: 0,
    theatres: 0,
    shows: 0,
    bookings: 0,
    revenue: 0,
    todayBookings: 0,
    todayRevenue: 0,
    activeCities: 0,
  });

  useEffect(() => {
    // 🔥 Replace with real backend API later
    setStats({
      movies: 12,
      theatres: 5,
      shows: 28,
      bookings: 320,
      revenue: 85000,
      todayBookings: 24,
      todayRevenue: 6200,
      activeCities: 3,
    });
  }, []);

  const styles = {
    container: { color: "#2C2B30" },
    title: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "6px",
      color: "#F2C4CE",
    },
    subtitle: {
      fontSize: "14px",
      color: "#F2C4CE",
      marginBottom: "25px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    icon: { fontSize: "26px" },
    label: { fontSize: "14px", color: "#4F4F51" },
    value: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#2C2B30",
    },
    highlight: {
      color: "#F2C4CE",
      fontWeight: "600",
      fontSize: "13px",
    },
    quickBox: {
      marginTop: "30px",
      backgroundColor: "#2C2B30",
      color: "#D6D6D6",
      borderRadius: "18px",
      padding: "20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
    },
    quickItem: {
      backgroundColor: "#4F4F51",
      padding: "15px",
      borderRadius: "14px",
    },
    quickValue: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#F2C4CE",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Super Admin Dashboard</h2>
      <p style={styles.subtitle}>
        Complete control and overview of your movie booking system
      </p>

      {/* Main Stats */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <span style={styles.icon}>🎬</span>
          <span style={styles.label}>Total Movies</span>
          <span style={styles.value}>{stats.movies}</span>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>🏢</span>
          <span style={styles.label}>Total Theatres</span>
          <span style={styles.value}>{stats.theatres}</span>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>🎥</span>
          <span style={styles.label}>Active Shows</span>
          <span style={styles.value}>{stats.shows}</span>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>🎟️</span>
          <span style={styles.label}>Total Bookings</span>
          <span style={styles.value}>{stats.bookings}</span>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>💰</span>
          <span style={styles.label}>Total Revenue</span>
          <span style={styles.value}>₹{stats.revenue}</span>
        </div>
      </div>

      {/* Quick Insights */}
      <div style={styles.quickBox}>
        <div style={styles.quickItem}>
          <span>🔥 Today’s Bookings</span>
          <div style={styles.quickValue}>{stats.todayBookings}</div>
        </div>

        <div style={styles.quickItem}>
          <span>💵 Today’s Revenue</span>
          <div style={styles.quickValue}>₹{stats.todayRevenue}</div>
        </div>

        <div style={styles.quickItem}>
          <span>📍 Active Cities</span>
          <div style={styles.quickValue}>{stats.activeCities}</div>
        </div>

        <div style={styles.quickItem}>
          <span>⭐ System Status</span>
          <div style={styles.quickValue}>Operational</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
