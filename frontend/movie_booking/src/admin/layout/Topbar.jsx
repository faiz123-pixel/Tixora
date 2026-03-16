import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

function Topbar({ isMobile, toggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(LoginContext);

  const styles = {
    topbar: {
      height: "60px",
      backgroundColor: "#2C2B30",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 15px",
      color: "#D6D6D6",
    },
    left: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    hamburger: {
      fontSize: "22px",
      cursor: "pointer",
      display: isMobile ? "block" : "none",
    },
    title: {
      fontWeight: "700",
      color: "#F2C4CE",
      fontSize: "16px",
    },
    logout: {
      backgroundColor: "#F2C4CE",
      color: "#2C2B30",
      border: "none",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  const handleLogout = () => {
    logout(); // clear context and localStorage
    navigate("/"); // redirect to login page
  };

  return (
    <header style={styles.topbar}>
      <div style={styles.left}>
        <span style={styles.hamburger} onClick={toggleSidebar}>
          ☰
        </span>
        <span style={styles.title}>
          
          {user ? `${user.role.userRole} : ${user.name}` : "Admin Dashboard"}
        </span>
      </div>

      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Topbar;