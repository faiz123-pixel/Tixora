import { useEffect, useState } from "react";
import "./css/Dashboard.css";

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
    // Replace with backend API later
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

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Super Admin Dashboard</h2>
      <p className="dashboard-subtitle">
        Complete control and overview of your movie booking system
      </p>

      {/* Main Stats */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="dashboard-icon">🎬</span>
          <span className="dashboard-label">Total Movies</span>
          <span className="dashboard-value">{stats.movies}</span>
        </div>

        <div className="dashboard-card">
          <span className="dashboard-icon">🏢</span>
          <span className="dashboard-label">Total Theatres</span>
          <span className="dashboard-value">{stats.theatres}</span>
        </div>

        <div className="dashboard-card">
          <span className="dashboard-icon">🎥</span>
          <span className="dashboard-label">Active Shows</span>
          <span className="dashboard-value">{stats.shows}</span>
        </div>

        <div className="dashboard-card">
          <span className="dashboard-icon">🎟️</span>
          <span className="dashboard-label">Total Bookings</span>
          <span className="dashboard-value">{stats.bookings}</span>
        </div>

        <div className="dashboard-card">
          <span className="dashboard-icon">💰</span>
          <span className="dashboard-label">Total Revenue</span>
          <span className="dashboard-value">
            ₹{stats.revenue}
          </span>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="quick-box">
        <div className="quick-item">
          <span>🔥 Today’s Bookings</span>
          <div className="quick-value">{stats.todayBookings}</div>
        </div>

        <div className="quick-item">
          <span>💵 Today’s Revenue</span>
          <div className="quick-value">
            ₹{stats.todayRevenue}
          </div>
        </div>

        <div className="quick-item">
          <span>📍 Active Cities</span>
          <div className="quick-value">{stats.activeCities}</div>
        </div>

        <div className="quick-item">
          <span>⭐ System Status</span>
          <div className="quick-value">Operational</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
