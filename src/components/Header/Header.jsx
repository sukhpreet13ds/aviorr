"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FiMenu,
    FiSearch,
    FiShoppingBag,
    FiUser,
    FiX,
    FiGlobe,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { PRODUCTS_CATALOG, formatINR } from "@/data/products";

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
    { label: "Aviorr Products & Accessories", href: "/all-products" },
    { label: "Craftsmanship", href: "/about-us" },
    { label: "The Aviorr Story", href: "/about-us" },
    { label: "About Aviorr", href: "/about-us" },
    { label: "Collections", href: "/all-products" },
    { label: "Buying & Servicing", href: "/customer-services" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [lang, setLang] = useState("EN");
    const searchInputRef = useRef(null);
    const { setCartOpen, totalCount } = useCart();

    const filteredProducts = PRODUCTS_CATALOG.filter((item) => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;
        return (
            item.name.toLowerCase().includes(q) ||
            item.notes.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        );
    });

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
                setSearchOpen(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        const locked = menuOpen || searchOpen;
        const value = locked ? "hidden" : "";
        document.documentElement.style.overflow = value;
        document.body.style.overflow = value;
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [menuOpen, searchOpen]);

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 80);
        }
    }, [searchOpen]);

    return (
        <>
            <Link href="/offers" className="top-marquee-bar" aria-label="Black Friday Sale">
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
            </Link>

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
                            onClick={() => setSearchOpen(true)}
                        >
                            <FiSearch size={17} />
                        </button>
                    </div>

                    <a href="/" className="header-logo" aria-label="Aviorr Home">
                        <Image
                            src="/assets/aviorr1.png"
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
                            onClick={() => setSearchOpen(true)}
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

                        <button
                            type="button"
                            className="header-action header-cart-btn"
                            aria-label="Cart"
                            onClick={() => setCartOpen(true)}
                        >
                            <FiShoppingBag size={17} />
                            <span className="header-action-text">Cart</span>
                            {totalCount > 0 && <span className="cart-badge-count">{totalCount}</span>}
                        </button>

                        <Link
                            href="/login"
                            className="header-action header-login-btn"
                            aria-label="Login"
                        >
                            <FiUser size={16} />
                            <span className="header-action-text">Login</span>
                        </Link>
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
                                <li>
                                    <Link
                                        href="/offers"
                                        className="mega-menu-link mega-menu-offers-shine"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Offers
                                    </Link>
                                </li>
                                 <li>
                                    <Link
                                        href="/all-products"
                                        className="mega-menu-link"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        All Products
                                    </Link>
                                </li>
                                {MENU_LINKS.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="mega-menu-link"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
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
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        decoding="async"
                                    />
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

            {/* Search Overlay */}
            <div
                className={`search-overlay-backdrop ${searchOpen ? "is-open" : ""}`}
                onClick={() => setSearchOpen(false)}
                aria-hidden={!searchOpen}
            >
                <div
                    className={`search-overlay-modal ${searchOpen ? "is-open" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search Products"
                >
                    <div className="search-input-row">
                        <FiSearch size={19} className="search-input-icon" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search perfumes, notes, collections..."
                            aria-label="Search perfumes"
                        />
                        <button
                            type="button"
                            className="search-close-btn"
                            aria-label="Close search"
                            onClick={() => setSearchOpen(false)}
                        >
                            <FiX size={18} />
                        </button>
                    </div>

                    <div className="search-suggestions">
                        <p className="search-suggestions-label">
                            {searchQuery.trim() ? "Suggested Products" : "Popular Fragrances"}
                        </p>

                        {filteredProducts.length === 0 ? (
                            <p className="search-empty">No products found matching &ldquo;{searchQuery}&rdquo;.</p>
                        ) : (
                            <div className="search-suggestions-list">
                                {filteredProducts.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/products/${item.slug}`}
                                        className="search-suggestion-item"
                                        onClick={() => setSearchOpen(false)}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="search-suggestion-img"
                                        />
                                        <div className="search-suggestion-meta">
                                            <h4>{item.name}</h4>
                                            <p>{item.notes}</p>
                                        </div>
                                        <div className="search-suggestion-price">
                                            <span>{formatINR(item.price)}</span>
                                            <small>{formatINR(item.originalPrice)}</small>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
