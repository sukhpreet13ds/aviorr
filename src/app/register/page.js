"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { COUNTRY_CODES } from "@/data/countryCodes";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    country: "",
    city: "",
    zipCode: "",
    fullAddress: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!PASSWORD_REGEX.test(form.password)) {
      setErrorMsg(
        "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special symbol."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Password and Confirm Password do not match.");
      return;
    }

    setSuccessMsg("Registration submitted successfully (ready for backend integration).");
  };

  return (
    <>
      <Header />
      <main className="auth-page">
        <div className="auth-card auth-card-wide">
          <p className="auth-eyebrow">JOIN AVIORR</p>
          <h1 className="auth-title">Create Account</h1>

          {errorMsg && <p className="auth-error">{errorMsg}</p>}
          {successMsg && <p className="auth-success">{successMsg}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-grid-2">
              <div className="auth-field">
                <label htmlFor="reg-first-name">First Name</label>
                <input
                  id="reg-first-name"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  placeholder="First Name"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-last-name">Last Name</label>
                <input
                  id="reg-last-name"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="reg-phone">Phone Number</label>
              <div className="auth-phone-row">
                <select
                  aria-label="Country code"
                  value={form.countryCode}
                  onChange={handleChange("countryCode")}
                >
                  {COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  id="reg-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="auth-grid-3">
              <div className="auth-field">
                <label htmlFor="reg-country">Country</label>
                <input
                  id="reg-country"
                  type="text"
                  required
                  value={form.country}
                  onChange={handleChange("country")}
                  placeholder="Country"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-city">City</label>
                <input
                  id="reg-city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange("city")}
                  placeholder="City"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-zip">Zip Code</label>
                <input
                  id="reg-zip"
                  type="text"
                  required
                  value={form.zipCode}
                  onChange={handleChange("zipCode")}
                  placeholder="Zip code"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="reg-address">Full Address</label>
              <textarea
                id="reg-address"
                rows={3}
                required
                value={form.fullAddress}
                onChange={handleChange("fullAddress")}
                placeholder="House no., Street, Landmark"
              />
            </div>

            <div className="auth-grid-2">
              <div className="auth-field">
                <label htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="Min 8 chars, A-Z, a-z, 0-9, symbol"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-confirm-password">Confirm Password</label>
                <input
                  id="reg-confirm-password"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Submit
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
