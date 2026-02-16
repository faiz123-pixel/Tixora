import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar custom-navbar fixed-top">
      <div className="container-fluid navbar-container">

        {/* LEFT: Logo */}
        <Link className="navbar-brand logo" to="/">
          <img src={logo} alt="Tixora" className="logo-img" />
          <span className="logo-text">Tixora</span>
        </Link>

        {/* CENTER: NAV LINKS (Desktop) */}
        <div className="nav-links d-none d-md-flex">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/theatres" className="nav-item">Theatres</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn d-md-none ms-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* RIGHT: LOGIN ICON */}
        <div className="user-menu">
          <button
            className="user-icon-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaUserCircle size={26} />
          </button>

          {showMenu && (
            <div className="user-dropdown">
              <Link to="/login" onClick={() => setShowMenu(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setShowMenu(false)}>
                Sign Up
              </Link>
            </div>
          )}

          {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/theatres" onClick={() => setMenuOpen(false)}>Theatres</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <hr />
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
        </div>
      )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
