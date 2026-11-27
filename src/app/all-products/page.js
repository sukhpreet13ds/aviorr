"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiSliders, FiStar, FiX } from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { PRODUCTS_CATALOG, formatINR } from "@/data/products";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  { key: "ALL", label: "All Scents", image: "/assets/productnew.jpg" },
  { key: "ORIENTAL", label: "Oriental", image: "/assets/product1.png" },
  { key: "WOODY", label: "Woody", image: "/assets/product2.png" },
  { key: "FLORAL", label: "Floral", image: "/assets/product3.png" },
];

const EXTENDED_PRODUCTS = [
  ...PRODUCTS_CATALOG,
  ...PRODUCTS_CATALOG.map((p, i) => ({
    ...p,
    id: `${p.id}-ext-${i}`,
    name: `${p.name} EDITION II`,
  })),
];

export default function AllProductsPage() {
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [selectedFamilies, setSelectedFamilies] = useState([]);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [idealFor, setIdealFor] = useState("ALL");
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("FEATURED");
  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const popularRef = useRef(null);
  const picksRef = useRef(null);
  const { addToCart, setCartOpen } = useCart();

  const toggleFamily = (fam) => {
    setSelectedFamilies((prev) =>
      prev.includes(fam) ? prev.filter((f) => f !== fam) : [...prev, fam]
    );
  };

  const toggleSize = (sz) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const resetFilters = () => {
    setSelectedCat("ALL");
    setSelectedFamilies([]);
    setMaxPrice(3000);
    setIdealFor("ALL");
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSelectedSizes([]);
    setSortBy("FEATURED");
  };

  const applyFilters = (list) => {
    let res = list.filter((item) => {
      const notes = item.notes.toUpperCase();
      if (selectedCat !== "ALL" && !notes.includes(selectedCat)) return false;
      if (
        selectedFamilies.length > 0 &&
        !selectedFamilies.some((f) => notes.includes(f))
      ) {
        return false;
      }
      if (item.price > maxPrice) return false;
      if (idealFor !== "ALL" && !notes.includes(idealFor)) return false;
      if (parseFloat(item.rating) < minRating) return false;
      const discNum = parseInt(item.discountLabel, 10) || 0;
      if (discNum < minDiscount) return false;
      return true;
    });

    if (sortBy === "PRICE_ASC") res = [...res].sort((a, b) => a.price - b.price);
    if (sortBy === "PRICE_DESC") res = [...res].sort((a, b) => b.price - a.price);
    if (sortBy === "RATING") {
      res = [...res].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }
    return res;
  };

  const filteredPopular = applyFilters(PRODUCTS_CATALOG);
  const filteredAll = applyFilters(EXTENDED_PRODUCTS);
  const visibleAllProducts = filteredAll.slice(0, visibleCount);

  const scrollRow = (ref, dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const renderCard = (item, extraClass = "") => (
    <div key={item.id} className={`best-seller-card ${extraClass}`}>
      <Link href={`/products/${item.slug}`} className="best-seller-img-wrap">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="best-seller-img"
        />
      </Link>
      <div className="best-seller-body">
        <div className="best-seller-title-row">
          <Link href={`/products/${item.slug}`} className="best-seller-link">
            <h3 className="best-seller-name">{item.name}</h3>
          </Link>
          <span className="best-seller-rating">
            <FiStar className="rating-star" /> {item.rating}
          </span>
        </div>
        <p className="best-seller-notes">{item.notes}</p>
        <div className="best-seller-price-row">
          <span className="best-seller-price">{formatINR(item.price)}</span>
          <span className="best-seller-original">{formatINR(item.originalPrice)}</span>
          <span className="best-seller-discount">{item.discountLabel}</span>
        </div>
        <button
          type="button"
          className="quick-add-btn"
          onClick={() => {
            addToCart(item, "100ml", 1);
            setCartOpen(true);
          }}
        >
          Quick Add
        </button>
      </div>
    </div>
  );

  const filterPanelContent = (
    <div className="ap-filter-inner">
      <div className="ap-filter-top">
        <h3>FILTERS</h3>
        <button type="button" className="ap-filter-reset" onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className="ap-filter-group">
        <h4>Scent Family</h4>
        {["ORIENTAL", "WOODY", "FLORAL", "FRESH"].map((fam) => (
          <label key={fam} className="ap-filter-check">
            <input
              type="checkbox"
              checked={selectedFamilies.includes(fam)}
              onChange={() => toggleFamily(fam)}
            />
            <span>{fam.charAt(0) + fam.slice(1).toLowerCase()}</span>
          </label>
        ))}
      </div>

      <div className="ap-filter-group">
        <div className="ap-price-head">
          <h4>Price Range</h4>
          <span>Up to ₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min={1500}
          max={3000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="ap-price-slider"
          aria-label="Maximum price"
        />
        <div className="ap-price-bounds">
          <span>₹1,500</span>
          <span>₹3,000</span>
        </div>
      </div>

      <div className="ap-filter-group">
        <h4>Discount</h4>
        {[
          { val: 0, label: "All Offers" },
          { val: 20, label: "20% OFF or more" },
          { val: 24, label: "24% OFF or more" },
        ].map((d) => (
          <label key={d.val} className="ap-filter-check">
            <input
              type="radio"
              name="minDiscount"
              checked={minDiscount === d.val}
              onChange={() => setMinDiscount(d.val)}
            />
            <span>{d.label}</span>
          </label>
        ))}
      </div>

      <div className="ap-filter-group">
        <h4>Pack Size</h4>
        {["50ml", "100ml", "Personalized"].map((sz) => (
          <label key={sz} className="ap-filter-check">
            <input
              type="checkbox"
              checked={selectedSizes.includes(sz)}
              onChange={() => toggleSize(sz)}
            />
            <span>{sz}</span>
          </label>
        ))}
      </div>

      <div className="ap-filter-group">
        <h4>Availability</h4>
        <label className="ap-filter-check">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      <div className="ap-filter-group">
        <h4>Ideal For</h4>
        {["ALL", "UNISEX", "MEN", "WOMEN"].map((g) => (
          <label key={g} className="ap-filter-check">
            <input
              type="radio"
              name="idealFor"
              checked={idealFor === g}
              onChange={() => setIdealFor(g)}
            />
            <span>{g === "ALL" ? "Everyone" : g.charAt(0) + g.slice(1).toLowerCase()}</span>
          </label>
        ))}
      </div>

      <div className="ap-filter-group">
        <h4>Minimum Rating</h4>
        {[
          { val: 0, label: "All Ratings" },
          { val: 4.6, label: "4.6★ & Above" },
          { val: 4.7, label: "4.7★ & Above" },
        ].map((r) => (
          <label key={r.val} className="ap-filter-check">
            <input
              type="radio"
              name="minRating"
              checked={minRating === r.val}
              onChange={() => setMinRating(r.val)}
            />
            <span>{r.label}</span>
          </label>
        ))}
      </div>

      <div className="ap-filter-group">
        <h4>Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="ap-filter-select"
        >
          <option value="FEATURED">Featured</option>
          <option value="PRICE_ASC">Price: Low to High</option>
          <option value="PRICE_DESC">Price: High to Low</option>
          <option value="RATING">Top Rated</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="all-products-page">
        <div className="all-products-container">
          {/* 1. Categories in 4 Big Round Shapes */}
          <section className="ap-section">
            <h1 className="ap-page-title">ALL PRODUCTS</h1>
            <div className="ap-categories-row">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`ap-cat-btn ${
                    selectedCat === cat.key ? "is-active" : ""
                  }`}
                  onClick={() => setSelectedCat(cat.key)}
                >
                  <span className="ap-cat-circle">
                    <img src={cat.image} alt={cat.label} />
                  </span>
                  <span className="ap-cat-label">{cat.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Mobile Filter Trigger */}
          <div className="ap-mobile-filter-bar">
            <button
              type="button"
              className="ap-mobile-filter-btn"
              onClick={() => setMobileFilterOpen(true)}
            >
              <FiSliders size={16} />
              <span>Filter &amp; Sort</span>
            </button>
          </div>

          {/* Main 2-Column Layout: Desktop Left Mega Filter + Right Sections */}
          <div className="ap-main-layout">
            <aside className="ap-desktop-sidebar">{filterPanelContent}</aside>

            <div className="ap-right-content">
              {/* 2. Popular Products (Horizontal 3-card row with arrows) */}
              <section className="ap-section">
                <div className="ap-row-header">
                  <h2 className="section-heading">POPULAR PRODUCTS</h2>
                  <div className="ap-row-arrows">
                    <button
                      type="button"
                      className="circle-arrow-btn"
                      aria-label="Previous popular"
                      onClick={() => scrollRow(popularRef, -1)}
                    >
                      <FiChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="circle-arrow-btn"
                      aria-label="Next popular"
                      onClick={() => scrollRow(popularRef, 1)}
                    >
                      <FiChevronRight size={18} />
                    </button>
                  </div>
                </div>
                <div ref={popularRef} className="ap-horizontal-3">
                  {filteredPopular.map((item) => renderCard(item, "ap-h-card"))}
                </div>
              </section>

              {/* 3. Aviorr Pick's (Black Rounded Section with arrows, 3-card horizontal) */}
              <section className="ap-picks-section">
                <div className="ap-row-header">
                  <h2 className="ap-picks-heading">AVIORR PICK&apos;S</h2>
                  <div className="ap-row-arrows">
                    <button
                      type="button"
                      className="circle-arrow-btn ap-dark-arrow"
                      aria-label="Previous pick"
                      onClick={() => scrollRow(picksRef, -1)}
                    >
                      <FiChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="circle-arrow-btn ap-dark-arrow"
                      aria-label="Next pick"
                      onClick={() => scrollRow(picksRef, 1)}
                    >
                      <FiChevronRight size={18} />
                    </button>
                  </div>
                </div>
                <div ref={picksRef} className="ap-horizontal-3">
                  {PRODUCTS_CATALOG.map((item) =>
                    renderCard({ ...item, id: `pick-${item.id}` }, "ap-h-card ap-pick-card")
                  )}
                </div>
              </section>

              {/* 4. All Products (3-column grid, 6 by default + Load More) */}
              <section className="ap-section">
                <h2 className="section-heading">EXPLORE ALL FRAGRANCES</h2>
                <div className="ap-grid-3">
                  {visibleAllProducts.map((item) => renderCard(item))}
                </div>

                {visibleCount < filteredAll.length && (
                  <div className="ap-load-more-wrap">
                    <button
                      type="button"
                      className="ap-load-more-btn"
                      onClick={() => setVisibleCount((c) => c + 3)}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Full-Screen Filter Drawer */}
      {mobileFilterOpen && (
        <div className="ap-mobile-filter-overlay" role="dialog" aria-modal="true">
          <div className="ap-mobile-filter-head">
            <span>FILTER &amp; SORT</span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              aria-label="Close filter"
            >
              <FiX size={20} />
            </button>
          </div>
          <div className="ap-mobile-filter-body">{filterPanelContent}</div>
          <div className="ap-mobile-filter-foot">
            <button
              type="button"
              className="auth-submit-btn"
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
