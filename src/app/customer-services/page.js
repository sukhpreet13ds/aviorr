"use client";

import { useState } from "react";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function CustomerServicesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Header />
      <main className="cs-page">
        <div className="cs-container">
          <div className="cs-header">
            <p className="auth-eyebrow">WE&apos;RE HERE TO HELP</p>
            <h1>Customer Services</h1>
            <p className="cs-lead">
              Have a question about your order, fragrances, or store locations?
              Reach out to our team.
            </p>
          </div>

          <div className="cs-grid">
            {/* Left: Contact Form */}
            <form className="cs-form-card" onSubmit={handleSubmit}>
              <h2>Send us a Message</h2>
              {submitted && (
                <p className="auth-success">
                  Thank you for reaching out. Our support team will get back to you
                  shortly.
                </p>
              )}

              <div className="auth-field">
                <label htmlFor="cs-name">Name</label>
                <input
                  id="cs-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="cs-email">Email</label>
                <input
                  id="cs-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="cs-phone">Phone Number</label>
                <input
                  id="cs-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="cs-message">Message</label>
                <textarea
                  id="cs-message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                Send Message
              </button>
            </form>

            {/* Right: Company Details */}
            <aside className="cs-info-card">
              <h2>Contact Details</h2>
              <p className="cs-info-sub">
                Connect directly with Aviorr Customer Care for order tracking,
                returns, and fragrance recommendations.
              </p>

              <div className="cs-info-list">
                <div className="cs-info-item">
                  <FiPhone className="cs-info-icon" />
                  <div>
                    <strong>Phone</strong>
                    <a href="tel:+917306900600">+91 730 690 0600</a>
                  </div>
                </div>

                <div className="cs-info-item">
                  <FiMail className="cs-info-icon" />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:support@aviorr.com">support@aviorr.com</a>
                  </div>
                </div>

                <div className="cs-info-item">
                  <FiClock className="cs-info-icon" />
                  <div>
                    <strong>Support Hours</strong>
                    <span>Monday – Saturday, 10:00 AM – 7:00 PM IST</span>
                  </div>
                </div>

                <div className="cs-info-item">
                  <FiMapPin className="cs-info-icon" />
                  <div>
                    <strong>Headquarters</strong>
                    <span>Aviorr Fragrance House, Mumbai, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
