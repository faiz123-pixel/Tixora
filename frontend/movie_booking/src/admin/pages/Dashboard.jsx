import { useContext, useEffect, useState } from "react";
import "./css/Dashboard.css";

import {
  movieApi,
  theatreApi,
  showApi,
  bookingApi,
  paymentApi,
} from "../../services/api";

import { LoginContext } from "../../context/LoginContext"; // adjust path

function Dashboard() {
  const { user, isAuthenticated } = useContext(LoginContext);
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
    if (isAuthenticated) {
      loadDashboardStats();
    }
  }, [isAuthenticated]);

  const loadDashboardStats = async () => {
    try {
      const [moviesRes, theatresRes, showsRes, bookingsRes, paymentsRes] =
        await Promise.all([
          movieApi.get(""),
          theatreApi.get(""),
          showApi.get(""),
          bookingApi.get(""),
          paymentApi.get(""),
        ]);

      const movies = moviesRes.data || [];
      const theatres = theatresRes.data || [];
      const shows = showsRes.data || [];
      const bookings = bookingsRes.data || [];
      // const payments = paymentsRes.data || [];

      // Total revenue from bookings
      const totalRevenue = bookings
        .filter((b) => b.status === "CONFIRMED") // only confirmed bookings
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

      // Today's date
      const today = new Date().toDateString();

      // Today's revenue from bookings
      const todayRevenue = bookings
        .filter(
          (b) =>
            b.status === "CONFIRMED" &&
            new Date(b.dateTime).toDateString() === today,
        )
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

      const todayBookings = bookings.filter(
        (b) => new Date(b.dateTime).toDateString() === today,
      );

      const activeCities = new Set(theatres.map((t) => t.city)).size;

      setStats({
        movies: movies.length,
        theatres: theatres.length,
        shows: shows.length,
        bookings: bookings.length,
        revenue: totalRevenue,
        todayBookings: todayBookings.length,
        todayRevenue: todayRevenue,
        activeCities,
      });
    } catch (error) {
      console.error("Dashboard API error:", error);
    }
  };

  if (!isAuthenticated) {
    return <div>Please login to access the dashboard.</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, {user?.name || "Admin"}!</h2>
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
          <span className="dashboard-value">₹{stats.revenue}</span>
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
          <div className="quick-value">₹{stats.todayRevenue}</div>
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
