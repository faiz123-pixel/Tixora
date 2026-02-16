import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Sidebar({ isMobile, closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: "📊" },
    { name: "Movies", path: "movies", icon: "🎬" },
    { name: "Theatres", path: "theatres", icon: "🏢" },
    { name: "Shows", path: "shows", icon: "🎥" },
    { name: "Bookings", path: "bookings", icon: "🎟️" },
    { name: "Admins", path: "admins", icon: "👑" },
    { name: "Reports", path: "reports", icon: "📈" },
  ];

  const styles = {
    sidebar: {
      width: "250px",
      backgroundColor: "#2C2B30",
      color: "#D6D6D6",
      padding: "20px",
      height: "100vh",
      position: isMobile ? "fixed" : "relative",
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: isMobile ? "4px 0 15px rgba(0,0,0,0.4)" : "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    closeBtn: {
      display: isMobile ? "block" : "none",
      textAlign: "right",
      cursor: "pointer",
      fontSize: "20px",
      marginBottom: "10px",
    },

    brand: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "30px",
    },

    logoImg: {
      width: "40px",
      height: "40px",
      borderRadius: "8px",
      objectFit: "cover",
    },

    brandName: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#F2C4CE",
    },

    navSection: {
      flexGrow: 1,
    },

    link: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px",
      marginBottom: "8px",
      borderRadius: "8px",
      textDecoration: "none",
      color: "#D6D6D6",
      transition: "all 0.3s ease",
    },

    active: {
      backgroundColor: "#F2C4CE",
      color: "#2C2B30",
      fontWeight: "600",
    },

    logoutBtn: {
      padding: "12px",
      backgroundColor: "#4F4F51",
      borderRadius: "8px",
      cursor: "pointer",
      textAlign: "center",
      marginTop: "20px",
    },
  };

  return (
    <aside style={styles.sidebar}>
      <div>
        <div style={styles.closeBtn} onClick={closeSidebar}>
          ✕
        </div>

        {/* Brand */}
        <div style={styles.brand}>
          <img src={logo} alt="App Logo" style={styles.logoImg} />
          <span style={styles.brandName}>Tixora Admin</span>
        </div>

        {/* Navigation */}
        <div style={styles.navSection}>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={`/admin/${item.path}`}
              onClick={isMobile ? closeSidebar : undefined}
              style={({ isActive }) =>
                isActive
                  ? { ...styles.link, ...styles.active }
                  : styles.link
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
