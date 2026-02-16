import React from "react";
import "./css/About.css";

function About() {
  return (
    <div className="about-page container page-container">
      
      {/* HERO */}
      <div className="about-hero">
        <h1>About <span>Tixora</span></h1>
        <p>Your seamless movie ticket booking experience</p>
      </div>

      {/* CONTENT */}
      <div className="about-content">
        
        <section className="about-card">
          <h3>🎬 Who We Are</h3>
          <p>
            Tixora is a modern movie ticket booking platform designed to make
            discovering movies, selecting theatres, and booking seats fast,
            simple, and enjoyable.
          </p>
        </section>

        <section className="about-card">
          <h3>🚀 Our Mission</h3>
          <p>
            Our mission is to deliver a smooth and visually engaging booking
            experience that feels premium, responsive, and effortless on every
            device.
          </p>
        </section>

        <section className="about-card">
          <h3>✨ What Makes Us Different</h3>
          <ul>
            <li>Modern & responsive UI</li>
            <li>Real-time movie data (TMDB)</li>
            <li>Clean seat selection experience</li>
            <li>Fast & intuitive booking flow</li>
          </ul>
        </section>

        <section className="about-card">
          <h3>💡 Built With</h3>
          <p>
            React, React Router, Context API, and a carefully designed UI using
            a custom dark theme color palette.
          </p>
        </section>

      </div>
    </div>
  );
}

export default About;
