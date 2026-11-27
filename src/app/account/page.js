"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiGrid,
  FiHeadphones,
  FiLogOut,
  FiPackage,
  FiShoppingBag,
  FiTag,
  FiUser,
} from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useCart } from "@/context/CartContext";

const DEFAULT_USER = {
  firstName: "Aviorr",
  lastName: "Member",
  email: "member@aviorr.com",
  phone: "+91 98765 43210",
  country: "India",
  city: "Mumbai",
  zipCode: "400001",
  fullAddress: "12 Marine Drive, Nariman Point",
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(DEFAULT_USER);
  const [savedMsg, setSavedMsg] = useState("");
  const [orders] = useState([]);
  const { setCartOpen, totalCount } = useCart();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aviorr_user");
      if (stored) {
        setUser((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("aviorr_user", JSON.stringify(user));
    } catch {
      // ignore
    }
    setSavedMsg("Your profile details have been updated.");
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("aviorr_user");
    } catch {
      // ignore
    }
    window.location.href = "/login";
  };

  return (
    <>
      <Header />
      <main className="account-page">
        <div className="account-container">
          <div className="account-header">
            <div>
              <p className="auth-eyebrow">MY ACCOUNT</p>
              <h1>
                Welcome, {user.firstName} {user.lastName}
              </h1>
            </div>
          </div>

          <div className="account-layout">
            {/* Left Vertical Sharp Attached Sidebar */}
            <aside className="account-sidebar" role="tablist" aria-label="Account menu">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "profile"}
                className={`account-side-btn ${activeTab === "profile" ? "is-active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <FiUser size={16} />
                <span>Profile Details</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "orders"}
                className={`account-side-btn ${activeTab === "orders" ? "is-active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <FiPackage size={16} />
                <span>Your Orders</span>
              </button>

              <button
                type="button"
                className="account-side-btn"
                onClick={() => setCartOpen(true)}
              >
                <FiShoppingBag size={16} />
                <span>My Cart ({totalCount})</span>
              </button>

              <Link href="/offers" className="account-side-btn">
                <FiTag size={16} />
                <span>Exclusive Offers</span>
              </Link>

              <Link href="/all-products" className="account-side-btn">
                <FiGrid size={16} />
                <span>All Products</span>
              </Link>

              <Link href="/customer-services" className="account-side-btn">
                <FiHeadphones size={16} />
                <span>Customer Services</span>
              </Link>

              <button
                type="button"
                className="account-side-btn account-side-logout"
                onClick={handleLogout}
              >
                <FiLogOut size={16} />
                <span>Logout</span>
              </button>
            </aside>

            {/* Right Content Area */}
            <div className="account-content-panel">
              {activeTab === "profile" && (
                <form className="account-card" onSubmit={handleSave}>
                  <h2>Personal Information</h2>
                  {savedMsg && <p className="auth-success">{savedMsg}</p>}

                  <div className="auth-grid-2">
                    <div className="auth-field">
                      <label htmlFor="acc-first">First Name</label>
                      <input
                        id="acc-first"
                        type="text"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                      />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="acc-last">Last Name</label>
                      <input
                        id="acc-last"
                        type="text"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="auth-grid-2">
                    <div className="auth-field">
                      <label htmlFor="acc-email">Email (Cannot be changed)</label>
                      <input
                        id="acc-email"
                        type="email"
                        value={user.email}
                        disabled
                        className="account-disabled-input"
                      />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="acc-phone">Phone Number</label>
                      <input
                        id="acc-phone"
                        type="tel"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="auth-grid-3">
                    <div className="auth-field">
                      <label htmlFor="acc-country">Country</label>
                      <input
                        id="acc-country"
                        type="text"
                        value={user.country}
                        onChange={(e) => setUser({ ...user, country: e.target.value })}
                      />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="acc-city">City</label>
                      <input
                        id="acc-city"
                        type="text"
                        value={user.city}
                        onChange={(e) => setUser({ ...user, city: e.target.value })}
                      />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="acc-zip">Zip Code</label>
                      <input
                        id="acc-zip"
                        type="text"
                        value={user.zipCode}
                        onChange={(e) => setUser({ ...user, zipCode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label htmlFor="acc-address">Full Address</label>
                    <textarea
                      id="acc-address"
                      rows={3}
                      value={user.fullAddress}
                      onChange={(e) => setUser({ ...user, fullAddress: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="auth-submit-btn account-save-btn">
                    Save Changes
                  </button>
                </form>
              )}

              {activeTab === "orders" && (
                <div className="account-card account-orders-empty">
                  {orders.length === 0 ? (
                    <>
                      <div className="empty-cart-anim" aria-hidden="true">
                        <svg viewBox="0 0 220 160" className="empty-cart-svg">
                          <g className="anim-box">
                            <rect x="92" y="28" width="44" height="34" rx="4" fill="#D59755" />
                            <rect x="92" y="36" width="44" height="26" rx="2" fill="#9F7140" />
                          </g>
                          <g className="anim-cart">
                            <path
                              d="M36 44h22l16 64h78l16-48H70"
                              fill="none"
                              stroke="#8FA3AD"
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="84" cy="126" r="10" fill="#4E6874" />
                            <circle cx="84" cy="126" r="5" fill="#BFD4DE" />
                            <circle cx="144" cy="126" r="10" fill="#4E6874" />
                            <circle cx="144" cy="126" r="5" fill="#BFD4DE" />
                          </g>
                        </svg>
                      </div>

                      <h3>No Orders Yet</h3>
                      <p>You haven&apos;t placed any orders yet.</p>
                      <Link href="/all-products" className="account-explore-link">
                        <span>Explore Products</span>
                        <FiArrowRight size={17} />
                      </Link>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
