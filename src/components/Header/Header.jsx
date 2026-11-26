"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    FiMenu,
    FiSearch,
    FiShoppingBag,
    FiUser,
    FiX,
    FiGlobe,
} from "react-icons/fi";

const FEATURED_ITEMS = [
    {
        name: "Aviorr Aroma Diffuser",
        image: "/assets/product1.png",
        href: "#products",
    },
    {
        name: "Aviorr Midnight Ember",
        image: "/assets/product2.png",
        href: "#products",
    },
    {
        name: "White Haven",
        image: "/assets/product2-1.png",
        href: "#products",
    },
    {
        name: "Aviorr GT",
        image: "/assets/product3.png",
        href: "#products",
    },
];

const MENU_LINKS = [
    "Aviorr Products & Accessories",
    "Craftsmanship",
    "The Aviorr Story",
    "About Aviorr",
    "Collections",
    "Buying & Servicing",
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [lang, setLang] = useState("EN");

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        const value = menuOpen ? "hidden" : "";
        document.documentElement.style.overflow = value;
        document.body.style.overflow = value;
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            <a href="#products" className="top-marquee-bar" aria-label="Black Friday Sale">
                <div className="top-marquee-track">
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                    <span>Black Friday Sale is LIVE! Grab the Deals Before 30 Nov</span>
                </div>
            </a>

            <header className="site-header">
                <div className="header-inner">
                    <div className="header-left-group">
                        <button
                            type="button"
                            className="header-action header-menu-btn"
                            aria-label="Menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(true)}
                        >
                            <FiMenu size={18} />
                            <span className="header-action-text">Menu</span>
                        </button>

                        <button
                            type="button"
                            className="header-action header-search-mobile"
                            aria-label="Search"
                        >
                            <FiSearch size={17} />
                        </button>
                    </div>

                    <a href="#" className="header-logo" aria-label="Aviorr Home">
                        <Image
                            src="/assets/aviorr.png"
                            alt="Aviorr"
                            width={180}
                            height={54}
                            priority
                            className="header-logo-img"
                        />
                    </a>

                    <nav className="header-nav" aria-label="Header actions">
                        <button
                            type="button"
                            className="header-action header-search-desktop"
                            aria-label="Search"
                        >
                            <FiSearch size={17} />
                            <span className="header-action-text">Search</span>
                        </button>

                        <div className="lang-switcher" role="group" aria-label="Language switcher">
                            <FiGlobe size={14} className="lang-globe-icon" />
                            <button
                                type="button"
                                className={`lang-btn ${lang === "EN" ? "is-active" : ""}`}
                                onClick={() => setLang("EN")}
                            >
                                EN
                            </button>
                            <span className="lang-divider">/</span>
                            <button
                                type="button"
                                className={`lang-btn ${lang === "AR" ? "is-active" : ""}`}
                                onClick={() => setLang("AR")}
                            >
                                AR
                            </button>
                        </div>

                        <button type="button" className="header-action" aria-label="Cart">
                            <FiShoppingBag size={17} />
                            <span className="header-action-text">Cart</span>
                        </button>

                        <button
                            type="button"
                            className="header-action header-login-btn"
                            aria-label="Login"
                        >
                            <FiUser size={16} />
                            <span className="header-action-text">Login</span>
                        </button>
                    </nav>
                </div>
            </header>

            {/* Mega Menu Overlay */}
            <div
                className={`mega-menu-backdrop ${menuOpen ? "is-open" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden={!menuOpen}
            >
                <div
                    className={`mega-menu-panel ${menuOpen ? "is-open" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation Menu"
                >
                    {/* Left Navigation Column */}
                    <div className="mega-menu-left">
                        <div className="mega-menu-top">
                            <p className="mega-menu-eyebrow">Featured</p>
                            <ul className="mega-menu-list">
                                {MENU_LINKS.map((label) => (
                                    <li key={label}>
                                        <a
                                            href="#products"
                                            className="mega-menu-link"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="mega-menu-secondary">
                                <a href="#products" onClick={() => setMenuOpen(false)}>
                                    Configure your Aviorr
                                </a>
                                <a href="#products" onClick={() => setMenuOpen(false)}>
                                    Contact us
                                </a>
                            </div>

                            <div className="mega-menu-lang">
                                <FiGlobe size={15} />
                                <button
                                    type="button"
                                    className={lang === "EN" ? "is-active" : ""}
                                    onClick={() => setLang("EN")}
                                >
                                    English
                                </button>
                                <span>/</span>
                                <button
                                    type="button"
                                    className={lang === "AR" ? "is-active" : ""}
                                    onClick={() => setLang("AR")}
                                >
                                    العربية
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Center Featured Products Grid */}
                    <div className="mega-menu-right">
                        <p className="mega-menu-grid-title">Featured products</p>
                        <div className="mega-menu-grid">
                            {FEATURED_ITEMS.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="mega-menu-card"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <img src={item.image} alt={item.name} />
                                    <span className="mega-menu-card-label">{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mega-menu-close"
                        aria-label="Close menu"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FiX size={20} />
                    </button>
                </div>
            </div>
        </>
    );
}
