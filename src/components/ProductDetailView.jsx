"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiStar,
  FiTag,
  FiTruck,
} from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { PRODUCTS_CATALOG, formatINR } from "@/data/products";
import { useCart } from "@/context/CartContext";

const SIZES = [
  { label: "50ml", multiplier: 0.65 },
  { label: "100ml", badge: "2x More Value", multiplier: 1 },
  { label: "Personalized", multiplier: 1.15 },
];

export default function ProductDetailView({ product }) {
  const { addToCart, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState("100ml");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImagePreview, setReviewImagePreview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const relatedRef = useRef(null);
  const thumbsRef = useRef(null);

  const handleMainMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
    if (!isZoomed) setIsZoomed(true);
  };

  const scrollThumbs = (direction) => {
    const el = thumbsRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 180, behavior: "smooth" });
  };

  const currentSizeObj = SIZES.find((s) => s.label === selectedSize) || SIZES[1];
  const currentPrice = Math.round(product.price * currentSizeObj.multiplier);
  const currentOriginal = Math.round(product.originalPrice * currentSizeObj.multiplier);
  const emiAmount = Math.round(currentPrice / 3);

  const relatedProducts = PRODUCTS_CATALOG.filter((p) => p.slug !== product.slug);

  const scrollRelated = (direction) => {
    const el = relatedRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <main className="pd-page">
        <div className="pd-container">
          {/* Top 2-Column Product Detail */}
          <section className="pd-top-grid">
            {/* Left Gallery: Main Image + Thumbnails Below */}
            <div className="pd-gallery">
              <div
                className="pd-main-img-wrap"
                onMouseMove={handleMainMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className={`pd-main-img ${isZoomed ? "is-zoomed" : ""}`}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                />
                {isZoomed && (
                  <div
                    className="pd-zoom-lens"
                    style={{
                      left: `${zoomPos.x}%`,
                      top: `${zoomPos.y}%`,
                    }}
                    aria-hidden="true"
                  />
                )}
                <span className="pd-img-caption">
                  50% PERFUME OIL | BUILT FOR INDIAN WEATHER
                </span>
              </div>

              <div className="pd-thumbs-bar">
                {product.gallery.length > 3 && (
                  <button
                    type="button"
                    className="pd-thumbs-arrow prev"
                    aria-label="Previous image"
                    onClick={() => scrollThumbs(-1)}
                  >
                    <FiChevronLeft size={18} />
                  </button>
                )}

                <div ref={thumbsRef} className="pd-thumbs-track">
                  {product.gallery.map((imgSrc, idx) => (
                    <button
                      key={`${imgSrc}-${idx}`}
                      type="button"
                      className={`pd-thumb-btn ${
                        activeImage === imgSrc ? "is-active" : ""
                      }`}
                      onClick={() => setActiveImage(imgSrc)}
                    >
                      <img
                        src={imgSrc}
                        alt={`${product.name} view ${idx + 1}`}
                        className="pd-thumb-img"
                      />
                    </button>
                  ))}
                </div>

                {product.gallery.length > 3 && (
                  <button
                    type="button"
                    className="pd-thumbs-arrow next"
                    aria-label="Next image"
                    onClick={() => scrollThumbs(1)}
                  >
                    <FiChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Info & Purchase */}
            <div className="pd-info">
              <h1 className="pd-title">{product.name}</h1>

              <div className="pd-rating-row">
                <div className="pd-stars">
                  {"★★★★★"}
                </div>
                <span className="pd-rating-text">
                  {product.rating} &nbsp;|&nbsp; {product.reviewCount} reviews
                </span>
              </div>

              <div className="pd-size-block">
                <p className="pd-size-label">Size:</p>
                <div className="pd-size-options">
                  {SIZES.map((sz) => (
                    <button
                      key={sz.label}
                      type="button"
                      className={`pd-size-btn ${
                        selectedSize === sz.label ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedSize(sz.label)}
                    >
                      {sz.badge && <span className="pd-size-badge">{sz.badge}</span>}
                      <span>{sz.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pd-price-grid">
                <div>
                  <p className="pd-pay-label">PAY IN FULL</p>
                  <div className="pd-price-values">
                    <span className="pd-price-current">
                      ₹{currentPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="pd-price-original">
                      ₹{currentOriginal.toLocaleString("en-IN")}
                    </span>
                    <span className="pd-discount-pill">{product.discountLabel}</span>
                  </div>
                  <p className="pd-tax-note">Incl. of all taxes</p>
                </div>

                <div className="pd-emi-box">
                  <p className="pd-pay-label">OR PAY IN 3</p>
                  <p className="pd-emi-price">
                    ₹{emiAmount.toLocaleString("en-IN")} <span>× 3</span>
                  </p>
                  <p className="pd-tax-note">0% interest</p>
                </div>
              </div>

              <div className="pd-cart-row">
                <div className="pd-qty-box">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <FiMinus size={14} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className="pd-add-cart-btn"
                  onClick={() => {
                    addToCart(
                      { ...product, price: currentPrice },
                      selectedSize,
                      quantity
                    );
                    setCartOpen(true);
                  }}
                >
                  Add to cart
                </button>
              </div>

              <button type="button" className="pd-buy-now-btn">
                Buy it Now
              </button>

              <div className="pd-perks-list">
                <p>
                  <FiTruck size={15} />
                  <span>Free Delivery on order above ₹599</span>
                </p>
                <p>
                  <FiRefreshCw size={15} />
                  <span>14 Days Replacement T&amp;C</span>
                </p>
              </div>

              {/* Requested 3 Trust Badges */}
              <div className="pd-trust-badges">
                <div className="pd-trust-badge">
                  <FiShield size={18} />
                  <div>
                    <small>Trust Badge</small>
                    <strong>Secure Payment</strong>
                  </div>
                </div>
                <div className="pd-trust-badge">
                  <FiMapPin size={18} />
                  <div>
                    <small>Trust Badge</small>
                    <strong>75+ Stores Across India</strong>
                  </div>
                </div>
                <div className="pd-trust-badge">
                  <FiAward size={18} />
                  <div>
                    <small>Trust Badge</small>
                    <strong>India&apos;s 1st Perfume Bar</strong>
                  </div>
                </div>
              </div>

              {/* Super Saver Deal */}
              <div className="pd-saver-wrap">
                <p className="pd-saver-heading">Super Saver Deal</p>
                <div className="pd-saver-box">
                  <div className="pd-saver-left">
                    <FiTag size={16} />
                    <span>PACK OF 5 AT 3999</span>
                  </div>
                  <button type="button" className="pd-saver-btn">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Product Information: Paragraph + Tabular Form */}
          <section className="pd-details-section">
            <h2 className="pd-section-heading">PRODUCT INFORMATION</h2>
            <p className="pd-description">{product.description}</p>

            <div className="pd-table-wrap">
              <table className="pd-specs-table">
                <tbody>
                  {product.specs.map((row) => (
                    <tr key={row.label}>
                      <th>{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Clicked Product Reviews */}
          <section className="pd-reviews-section">
            <div className="pd-reviews-header">
              <div>
                <h2 className="pd-section-heading">CUSTOMER REVIEWS</h2>
                <p className="pd-reviews-sub">
                  ★ {product.rating} out of 5 ({product.reviewCount} verified reviews for{" "}
                  {product.name})
                </p>
              </div>
            </div>

            <div className="pd-reviews-grid">
              {product.reviews.map((rev) => (
                <div key={rev.name} className="pd-review-card">
                  <div className="pd-review-top">
                    <span className="pd-review-stars">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </span>
                    <span className="pd-review-date">{rev.date}</span>
                  </div>
                  <p className="pd-review-comment">&ldquo;{rev.comment}&rdquo;</p>
                  <p className="pd-review-author">{rev.name}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form (Frontend Preview) */}
            <form
              className="pd-write-review-form"
              onSubmit={(e) => {
                e.preventDefault();
                setReviewSubmitted(true);
                setReviewName("");
                setReviewComment("");
                setReviewImagePreview("");
                setReviewRating(5);
              }}
            >
              <h3>Write a Review</h3>
              {reviewSubmitted && (
                <p className="pd-review-success">
                  Thank you! Your review has been submitted (frontend preview).
                </p>
              )}

              <div className="pd-review-form-stars" role="group" aria-label="Select rating">
                <span>Your Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`pd-star-pick ${star <= reviewRating ? "is-filled" : ""}`}
                    onClick={() => setReviewRating(star)}
                    aria-label={`${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <div className="pd-review-form-row">
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Your Name"
                />
                <label className="pd-review-upload-label">
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setReviewImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>

              {reviewImagePreview && (
                <div className="pd-review-preview-wrap">
                  <img
                    src={reviewImagePreview}
                    alt="Review upload preview"
                    className="pd-review-preview-img"
                  />
                </div>
              )}

              <textarea
                rows={3}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this fragrance..."
              />

              <button type="submit" className="pd-review-submit-btn">
                Submit Review
              </button>
            </form>
          </section>

          {/* Divided Related Products Section */}
          <section className="pd-related-section">
            <div className="pd-related-header">
              <h2 className="pd-section-heading">RELATED PRODUCTS</h2>
              <div className="best-sellers-arrows pd-related-arrows">
                <button
                  type="button"
                  className="circle-arrow-btn"
                  aria-label="Previous related product"
                  onClick={() => scrollRelated(-1)}
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="circle-arrow-btn"
                  aria-label="Next related product"
                  onClick={() => scrollRelated(1)}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>

            <div ref={relatedRef} className="best-sellers-grid">
              {relatedProducts.map((item) => (
                <div key={item.id} className="best-seller-card">
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
                      <span className="best-seller-original">
                        {formatINR(item.originalPrice)}
                      </span>
                      <span className="best-seller-discount">{item.discountLabel}</span>
                    </div>
                    <Link href={`/products/${item.slug}`} className="quick-add-btn pd-card-link-btn">
                      View Product
                    </Link>
                  </div>
                </div>
              ))}

              <Link href="/#products" className="best-seller-card explore-all-card">
                <span>Explore More</span>
                <FiArrowRight size={22} />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
