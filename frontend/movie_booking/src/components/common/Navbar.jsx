import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { LoginContext } from "../../context/LoginContext";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useContext(LoginContext);

  return (
    <nav className="navbar custom-navbar fixed-top">
      <div className="container-fluid navbar-container">
        {/* LOGO */}
        <Link className="navbar-brand logo" to="/">
          <img src={logo} alt="Tixora" className="logo-img" />
          <span className="logo-text">Tixora</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="nav-links d-none d-md-flex">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/theatres" className="nav-item">
            Theatres
          </Link>
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn d-md-none ms-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* USER MENU */}
        <div className="user-menu">
          {/* USER ICON */}
          <button
            className="user-icon-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaUserCircle size={26} />
          </button>

          {/* USER DROPDOWN */}
          {showMenu && (
            <div className="user-dropdown">
              {isAuthenticated ? (
                <>
                  <div className="dropdown-user">
                    <FaUserCircle size={20} />
                    <span>{user?.name}</span>
                  </div>

                  <hr />
                  <Link
                    to="/my-bookings"
                    className="dropdown-link"
                    onClick={() => setShowMenu(false)}
                  >
                    My Bookings
                  </Link>
                  <hr />

                  <button
                    className="dropdown-logout"
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setShowMenu(false)}>
                    Login
                  </Link>

                  <Link to="/register" onClick={() => setShowMenu(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}

          {/* MOBILE NAV */}
          {menuOpen && (
            <div className="mobile-nav">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/theatres" onClick={() => setMenuOpen(false)}>
                Theatres
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>

              <hr />

              {isAuthenticated ? (
                <>
                  <div className="mobile-user">
                    <FaUserCircle size={18} />
                    <span>{user?.name}</span>
                  </div>

                  <Link
                    to="/my-bookings"
                    onClick={() => setMenuOpen(false)}
                    className="mobile-link"
                  >
                    My Bookings
                  </Link>

                  <button
                    className="mobile-logout"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
