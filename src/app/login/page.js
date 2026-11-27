"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function LoginPage() {
  // mode: "login" | "forgot-email" | "forgot-otp" | "forgot-reset"
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot password flow states
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const existing = JSON.parse(localStorage.getItem("aviorr_user") || "{}");
      localStorage.setItem(
        "aviorr_user",
        JSON.stringify({ ...existing, email })
      );
    } catch {
      // ignore
    }
    window.location.href = "/account";
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!forgotEmail.trim()) {
      setErrorMsg("Please enter your account email.");
      return;
    }
    setStatusMsg(`Verification OTP sent to ${forgotEmail}.`);
    setMode("forgot-otp");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (otp.trim().length < 4) {
      setErrorMsg("Please enter the verification code sent to your email.");
      return;
    }
    setStatusMsg("OTP verified. Please set your new password.");
    setMode("forgot-reset");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!PASSWORD_REGEX.test(newPassword)) {
      setErrorMsg(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special symbol."
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
    setStatusMsg("Password updated successfully. Please login with your new password.");
    setMode("login");
  };

  return (
    <>
      <Header />
      <main className="auth-page">
        <div className="auth-card">
          {mode === "login" && (
            <>
              <p className="auth-eyebrow">WELCOME BACK</p>
              <h1 className="auth-title">Login</h1>

              {statusMsg && <p className="auth-success">{statusMsg}</p>}
              {errorMsg && <p className="auth-error">{errorMsg}</p>}

              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="auth-forgot-row">
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => {
                      setErrorMsg("");
                      setStatusMsg("");
                      setForgotEmail(email);
                      setMode("forgot-email");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="auth-submit-btn">
                  Login
                </button>
              </form>

              <p className="auth-switch-text">
                Don&apos;t have an account?{" "}
                <Link href="/register">Create Account</Link>
              </p>
            </>
          )}

          {mode === "forgot-email" && (
            <>
              <p className="auth-eyebrow">ACCOUNT RECOVERY</p>
              <h1 className="auth-title">Forgot Password</h1>
              {errorMsg && <p className="auth-error">{errorMsg}</p>}

              <form onSubmit={handleSendOtp} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="forgot-email">Account Email</label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your registered email"
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  Send Verify Code (OTP)
                </button>

                <button
                  type="button"
                  className="auth-secondary-btn"
                  onClick={() => {
                    setErrorMsg("");
                    setStatusMsg("");
                    setMode("login");
                  }}
                >
                  Back to Login
                </button>
              </form>
            </>
          )}

          {mode === "forgot-otp" && (
            <>
              <p className="auth-eyebrow">EMAIL VERIFICATION</p>
              <h1 className="auth-title">Verify Code</h1>
              {statusMsg && <p className="auth-success">{statusMsg}</p>}
              {errorMsg && <p className="auth-error">{errorMsg}</p>}

              <form onSubmit={handleVerifyOtp} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="forgot-otp">OTP Code sent to {forgotEmail}</label>
                  <input
                    id="forgot-otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter verification code"
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  Verify
                </button>
              </form>
            </>
          )}

          {mode === "forgot-reset" && (
            <>
              <p className="auth-eyebrow">SET NEW PASSWORD</p>
              <h1 className="auth-title">Reset Password</h1>
              {statusMsg && <p className="auth-success">{statusMsg}</p>}
              {errorMsg && <p className="auth-error">{errorMsg}</p>}

              <form onSubmit={handleResetPassword} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 chars, A-Z, a-z, 0-9, symbol"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="confirm-new-password">Confirm Password</label>
                  <input
                    id="confirm-new-password"
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  Done
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
