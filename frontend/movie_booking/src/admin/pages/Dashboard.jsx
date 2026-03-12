import { useEffect, useState } from "react";
import "./css/Dashboard.css";

import {
  movieApi,
  theatreApi,
  showApi,
  bookingApi,
  paymentApi,
} from "../../services/api";

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
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const moviesRes = await movieApi.get("");
      const theatresRes = await theatreApi.get("");
      const showsRes = await showApi.get("");
      const bookingsRes = await bookingApi.get("");
      const paymentsRes = await paymentApi.get("");

      const movies = moviesRes.data || [];
      const theatres = theatresRes.data || [];
      const shows = showsRes.data || [];
      const bookings = bookingsRes.data || [];
      const payments = paymentsRes.data || [];

      // Total revenue (only successful payments)
      const totalRevenue = payments
        .filter((p) => p.status === "SUCCESS")
        .reduce((sum, p) => sum + (p.amount || 0), 0);

      const today = new Date().toDateString();

      // Today's bookings
      const todayBookings = bookings.filter(
        (b) => new Date(b.dateTime).toDateString() === today
      );

      // Today's revenue
      const todayRevenue = payments
        .filter(
          (p) =>
            p.status === "SUCCESS" &&
            new Date(p.paidAt).toDateString() === today
        )
        .reduce((sum, p) => sum + (p.amount || 0), 0);

      // Active cities
      const cities = new Set(theatres.map((t) => t.city));

      setStats({
        movies: movies.length,
        theatres: theatres.length,
        shows: shows.length,
        bookings: bookings.length,
        revenue: totalRevenue,
        todayBookings: todayBookings.length,
        todayRevenue: todayRevenue,
        activeCities: cities.size,
      });
    } catch (error) {
      console.error("Dashboard API error:", error);
    }
  };

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