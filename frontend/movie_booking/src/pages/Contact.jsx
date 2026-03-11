import React from "react";
import { useForm } from "react-hook-form";
import "./css/Contact.css";
import { messageApi } from "../services/api";

function Contact() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit =async (data) => {
    console.log("Contact Form Data:", data);

    try {
      const response = await messageApi.post("",data);
      alert("Message sent successfully!");
      console.log(response);
      
    } catch (error) {
      return "Somthing went wrong";
      
    }

    alert("Message sent successfully!");

    reset();
  };

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
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <h3>✉ Send a Message</h3>

          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <textarea
            placeholder="Your Message"
            rows="4"
            {...register("text", {
              required: "Message cannot be empty",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters"
              }
            })}
          />
          {errors.text && <p className="error">{errors.text.message}</p>}

          <button type="submit">Send Message</button>
        </form>

      </div>
    </div>
  );
}

export default Contact;