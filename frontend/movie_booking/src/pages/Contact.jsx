import React from "react";
import "./css/Contact.css";

function Contact() {
  return (
    <div className="contact-page container page-container">

      {/* HERO */}
      <div className="contact-hero">
        <h1>Contact <span>Tixora</span></h1>
        <p>We’d love to hear from you</p>
      </div>

      <div className="contact-wrapper">

        {/* INFO */}
        <div className="contact-info">
          <h3>📍 Get in Touch</h3>

          <p>
            Have a question, suggestion, or facing an issue while booking?
            Reach out to us anytime.
          </p>

          <div className="info-item">
            <span>📧</span>
            <p>support@tixora.com</p>
          </div>

          <div className="info-item">
            <span>📞</span>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-item">
            <span>📍</span>
            <p>India</p>
          </div>
        </div>

        {/* FORM */}
        <form className="contact-form">
          <h3>✉ Send a Message</h3>

          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required />

          <button type="submit">Send Message</button>
        </form>

      </div>
    </div>
  );
}

export default Contact;
