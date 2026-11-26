"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiShield,
  FiStar,
  FiTruck,
} from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const PRODUCTS = [
  {
    images: ["/assets/product1.png"],
    alt: "Aviorr Signature Product 1",
    delay: "0.05s",
  },
  {
    images: [
      "/assets/product2.png",
      "/assets/product2-1.png",
      "/assets/product2-2.png",
    ],
    alt: "Aviorr Signature Product 2",
    delay: "0.2s",
  },
  {
    images: ["/assets/product3.png"],
    alt: "Aviorr Signature Product 3",
    delay: "0.35s",
  },
];

const MARQUEE_NAMES = [
  "APEX PRIME",
  "MIDNIGHT EMBER",
  "WHITE HAVEN",
  "GOLDEN NOIR",
  "SPICED SILK",
  "TUSCAN SMOKE",
  "VELVET DAWN",
  "DESERT RAIN",
  "AVIORR ONYX",
  "AVIORR NEXO",
];

const SLIDES = [
  { src: "/assets/slide1.jpg", alt: "Aviorr Collection Slide 1" },
  { src: "/assets/slide2.jpg", alt: "Aviorr Collection Slide 2" },
  { src: "/assets/slide3.jpg", alt: "Aviorr Collection Slide 3" },
];

const SCENTS = [
  {
    title: "FRESH",
    subtitle: "Energize. Vitalize. Awaken.",
    image: "/assets/productnew.jpg",
  },
  {
    title: "FLORAL",
    subtitle: "Fruity. Bloom. Candylicious.",
    image: "/assets/product2.png",
  },
  {
    title: "WOODY",
    subtitle: "Exotic. Sensual. Subtle.",
    image: "/assets/product3.png",
  },
];

const BEST_SELLERS = [
  {
    name: "APEX PRIME",
    notes: "ORIENTAL | ALLDAY | UNISEX",
    rating: "4.8",
    price: "₹2,099.00",
    image: "/assets/productnew.jpg",
  },
  {
    name: "MIDNIGHT EMBER",
    notes: "WOODY | ALLDAY | UNISEX",
    rating: "4.6",
    price: "₹2,099.00",
    image: "/assets/product2.png",
  },
  {
    name: "WHITE HAVEN",
    notes: "FLORAL | ALLDAY | UNISEX",
    rating: "4.7",
    price: "₹2,099.00",
    image: "/assets/product2-1.png",
  },
  {
    name: "GOLDEN NOIR",
    notes: "FLORAL | ALLDAY | WOMEN",
    rating: "4.5",
    price: "₹1,799.00",
    image: "/assets/product3.png",
  },
  {
    name: "SPICED SILK",
    notes: "FRESH | ALLDAY | MEN",
    rating: "4.7",
    price: "₹1,899.00",
    image: "/assets/product2-2.png",
  },
];

const JOURNAL_SIDE = [
  {
    title: "Vanilla and Amber: Why Warm, Sweet Notes Win in India",
    image: "/assets/product2.png",
  },
  {
    title: "Fresh, Floral, Woody, Oriental: Perfume Families in Plain English",
    image: "/assets/productnew.jpg",
  },
  {
    title: "What Is a Gourmand Perfume? Why Sweet Scents Are Everywhere",
    image: "/assets/product3.png",
  },
];

const REVIEWS = [
  {
    quote: "Mere boyfriend ko ye perfume bahut pasand aaya, long lasting scent!",
    name: "Gitanjali R",
    product: "Apex Prime",
    image: "/assets/review1.jpg",
  },
  {
    quote: "Yeh perfume toh next level ka hai, yaar! Long-lasting fragrance.",
    name: "Kunal.S",
    product: "Midnight Ember",
    image: null,
  },
  {
    quote: "One of my fav perfume I ever used. Truly premium and fresh.",
    name: "Rahulranjith",
    product: "White Haven",
    image: "/assets/review2.jpg",
  },
  {
    quote: "Absolutely loved the fragrance. The woody notes stay all day.",
    name: "Aditya Shah",
    product: "Golden Noir",
    image: null,
  },
  {
    quote: "Best luxury car & personal fragrance collection in India.",
    name: "Meera Nair",
    product: "Spiced Silk",
    image: "/assets/review3.jpg",
  },
];

export default function Home() {
  const videoRef = useRef(null);
  const productsSectionRef = useRef(null);
  const showcaseRef = useRef(null);
  const bestSellersRef = useRef(null);
  const scentsRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scentsCanPrev, setScentsCanPrev] = useState(false);
  const [scentsCanNext, setScentsCanNext] = useState(true);

  const handleScentsScroll = () => {
    const el = scentsRef.current;
    if (!el) return;
    setScentsCanPrev(el.scrollLeft > 10);
    setScentsCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scrollScents = (direction) => {
    const el = scentsRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const scrollBestSellers = (direction) => {
    const el = bestSellersRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  const scrollProducts = (direction) => {
    const el = showcaseRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };
  const [showProducts, setShowProducts] = useState(false);
  const [product2Index, setProduct2Index] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const lastScrolledRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolledRef.current) {
        lastScrolledRef.current = scrolled;
        setIsScrolled(scrolled);

        const video = videoRef.current;
        if (video) {
          if (scrolled) {
            if (!video.paused) video.pause();
          } else if (video.paused) {
            video.play().catch(() => {});
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const section = productsSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowProducts(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showProducts) return;
    const interval = setInterval(() => {
      setProduct2Index((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, [showProducts]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <>
      <Header />

      {/* Fixed background video + dark overlay */}
      <div className="hero-bg-fixed" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          src="/assets/hero-vide.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className={`hero-dark-layer ${isScrolled ? "is-active" : ""}`} />
      </div>

      <main className="page-content">
        {/* First 100vh: Hero Section */}
        <section className="hero-section">
          <div className={`hero-overlay-content ${isScrolled ? "is-faded" : ""}`}>
            <p className="hero-eyebrow">THE AVIORR COLLECTION</p>
            <h1 className="hero-title">Crafted for the Road</h1>
            <p className="hero-subtitle">
              Elevated automotive &amp; personal fragrances engineered for unforgettable journeys.
            </p>
            <a
              href="#products"
              className="hero-cta"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Discover more
            </a>
          </div>
        </section>

        {/* Next 100vh: Products Section in front of stopped, darkened video */}
        <section id="products" ref={productsSectionRef} className="products-section">
          <button
            type="button"
            className="mobile-slider-arrow prev"
            aria-label="Previous product"
            onClick={() => scrollProducts(-1)}
          >
            <FiChevronLeft size={24} />
          </button>

          <div ref={showcaseRef} className="hero-products-showcase">
            {PRODUCTS.map((product, idx) => (
              <div
                key={product.alt}
                className={`hero-product-card ${
                  showProducts ? "animate__animated animate__fadeInUp" : "is-hidden"
                }`}
                style={{ animationDelay: product.delay }}
              >
                {product.images.map((imgSrc, imgIdx) => {
                  const isActive =
                    product.images.length === 1 || imgIdx === product2Index;
                  return (
                    <img
                      key={imgSrc}
                      src={imgSrc}
                      alt={product.alt}
                      decoding="async"
                      className={`hero-product-img ${
                        product.images.length > 1
                          ? isActive
                            ? "is-slide-active"
                            : "is-slide-inactive"
                          : ""
                      }`}
                    />
                  );
                })}

                <div className="product-hover-curtain-top" aria-hidden="true" />
                <div className="product-hover-curtain-bottom" aria-hidden="true" />

                <a href="#products" className="product-shop-btn">
                  <span>Shop</span>
                  <FiArrowUpRight className="product-shop-arrow" />
                </a>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mobile-slider-arrow next"
            aria-label="Next product"
            onClick={() => scrollProducts(1)}
          >
            <FiChevronRight size={24} />
          </button>
        </section>

        {/* Seamless Collection Marquee */}
        <section className="collection-marquee-section" aria-label="Aviorr Collections">
          <div className="collection-marquee-track">
            {[...MARQUEE_NAMES, ...MARQUEE_NAMES].map((name, i) => (
              <span key={`${name}-${i}`} className="collection-marquee-item">
                <span>{name}</span>
                <FiArrowUpRight className="collection-marquee-arrow" />
              </span>
            ))}
          </div>
        </section>

        {/* White Background Auto-Sliding Showcase */}
        <section className="white-slider-section">
          <div className="white-slider-container">
            {SLIDES.map((slide, idx) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                className={`white-slider-img ${
                  idx === activeSlide ? "is-active" : ""
                }`}
              />
            ))}

            <div className="white-slider-controls" role="tablist" aria-label="Slide navigation">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeSlide}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`white-slider-bar ${
                    idx === activeSlide ? "is-active" : ""
                  }`}
                  onClick={() => setActiveSlide(idx)}
                >
                  <span
                    key={idx === activeSlide ? `fill-${activeSlide}` : `idle-${idx}`}
                    className="white-slider-bar-fill"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Scents */}
        <section className="light-section explore-scents-section">
          <div className="section-inner">
            <h2 className="section-heading">EXPLORE SCENTS</h2>
            <div className="scents-slider-wrap">
              {scentsCanPrev && (
                <button
                  type="button"
                  className="scents-mobile-arrow prev"
                  aria-label="Previous scent"
                  onClick={() => scrollScents(-1)}
                >
                  <FiChevronLeft size={26} />
                </button>
              )}

              <div
                ref={scentsRef}
                className="scents-grid"
                onScroll={handleScentsScroll}
              >
                {SCENTS.map((scent) => (
                  <a key={scent.title} href="#products" className="scent-card">
                    <img
                      src={scent.image}
                      alt={scent.title}
                      loading="lazy"
                      decoding="async"
                      className="scent-card-img"
                    />
                    <div className="scent-card-overlay">
                      <div>
                        <h3 className="scent-card-title">{scent.title}</h3>
                        <p className="scent-card-sub">{scent.subtitle}</p>
                      </div>
                      <FiArrowRight className="scent-card-arrow" />
                    </div>
                  </a>
                ))}
              </div>

              {scentsCanNext && (
                <button
                  type="button"
                  className="scents-mobile-arrow next"
                  aria-label="Next scent"
                  onClick={() => scrollScents(1)}
                >
                  <FiChevronRight size={26} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Our Best Sellers */}
        <section className="light-section best-sellers-section">
          <div className="section-inner">
            <div className="best-sellers-header">
              <h2 className="section-heading">OUR BEST SELLERS</h2>
              <div className="best-sellers-arrows">
                <button
                  type="button"
                  className="circle-arrow-btn"
                  aria-label="Previous"
                  onClick={() => scrollBestSellers(-1)}
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="circle-arrow-btn"
                  aria-label="Next"
                  onClick={() => scrollBestSellers(1)}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>

            <div ref={bestSellersRef} className="best-sellers-grid">
              {BEST_SELLERS.map((item) => (
                <div key={item.name} className="best-seller-card">
                  <div className="best-seller-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="best-seller-img"
                    />
                  </div>
                  <div className="best-seller-body">
                    <div className="best-seller-title-row">
                      <h3 className="best-seller-name">{item.name}</h3>
                      <span className="best-seller-rating">
                        <FiStar className="rating-star" /> {item.rating}
                      </span>
                    </div>
                    <p className="best-seller-notes">{item.notes}</p>
                    <p className="best-seller-price">{item.price}</p>
                    <div className="best-seller-sizes">
                      <span className="size-pill">50ml</span>
                      <span className="size-pill is-active">100ml</span>
                      <span className="size-pill">Personalized</span>
                    </div>
                    <button type="button" className="quick-add-btn">
                      Quick Add
                    </button>
                    <button type="button" className="buy-now-btn">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}

              <a href="#products" className="best-seller-card explore-all-card">
                <span>Explore All</span>
                <FiArrowRight size={22} />
              </a>
            </div>

            {/* Stores Banner */}
            <div className="stores-banner">
              <div className="stores-banner-left">
                <h3 className="stores-title">
                  <span>81 STORES</span> ACROSS INDIA
                </h3>
                <a href="#products" className="stores-btn">
                  Locate Our Stores <FiArrowRight />
                </a>
              </div>
              <div className="stores-banner-right">
                <p className="stores-desc">
                  Aviorr is India&apos;s pioneering fragrance house offering top-notch,
                  value-for-money scents with exceptional expertise in the art &amp;
                  science of perfumery.
                </p>
                <p className="stores-tagline">INDIA&apos;S FIRST PERFUME BAR</p>
              </div>
            </div>
          </div>
        </section>

        {/* From The Journal */}
        <section className="light-section journal-section">
          <div className="section-inner">
            <h2 className="section-heading">
              FROM THE <span>JOURNAL</span>
            </h2>

            <div className="journal-grid">
              <a href="#products" className="journal-featured">
                <img
                  src="/assets/product2-2.png"
                  alt="Saffron in Perfume"
                  loading="lazy"
                  decoding="async"
                  className="journal-featured-img"
                />
                <div className="journal-featured-overlay">
                  <h3>
                    Saffron (Kesar) in Perfume: What It Smells Like and Why It Costs So Much
                  </h3>
                  <span>Read more</span>
                </div>
              </a>

              <div className="journal-side-list">
                {JOURNAL_SIDE.map((post) => (
                  <a key={post.title} href="#products" className="journal-side-card">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="journal-side-img"
                    />
                    <div className="journal-side-content">
                      <h4>{post.title}</h4>
                      <span>Read more</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Happy Customers */}
        <section className="light-section reviews-section">
          <div className="section-inner">
            <h2 className="section-heading centered-heading">HAPPY CUSTOMERS</h2>
            <p className="reviews-summary">★★★★★ 4.78 ★ (132,553)</p>

            <div className="reviews-marquee">
              <div className="reviews-marquee-track">
                {[...REVIEWS, ...REVIEWS].map((rev, idx) => (
                  <div
                    key={`${rev.name}-${idx}`}
                    className={`review-card ${!rev.image ? "is-text-only" : ""}`}
                  >
                    {rev.image && (
                      <div className="review-img-wrap">
                        <img
                          src={rev.image}
                          alt={rev.name}
                          loading="lazy"
                          decoding="async"
                          className="review-img"
                        />
                      </div>
                    )}
                    <div className="review-body">
                      <p className="review-quote">{rev.quote}</p>
                      <div className="review-stars">★★★★★</div>
                      <p className="review-name">{rev.name}</p>
                      <p className="review-product">{rev.product}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="trust-bar-wrapper">
          <div className="trust-bar-section">
            <div className="section-inner trust-bar-grid">
              <div className="trust-item">
                <FiTruck className="trust-icon" />
                <div>
                  <h4>
                    FREE SHIPPING
                    <svg className="trust-underline" viewBox="0 0 120 8" fill="none">
                      <path d="M2 6C35 1.5 85 1.5 118 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </h4>
                  <p>Free shipping on orders above ₹599 across India</p>
                </div>
              </div>
              <div className="trust-item">
                <FiRefreshCw className="trust-icon" />
                <div>
                  <h4>
                    EASY RETURNS
                    <svg className="trust-underline" viewBox="0 0 120 8" fill="none">
                      <path d="M2 6C35 1.5 85 1.5 118 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </h4>
                  <p>Simple return process with the perfumes</p>
                </div>
              </div>
              <div className="trust-item">
                <FiShield className="trust-icon" />
                <div>
                  <h4>
                    SECURE PAYMENT
                    <svg className="trust-underline" viewBox="0 0 120 8" fill="none">
                      <path d="M2 6C35 1.5 85 1.5 118 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </h4>
                  <p>Your payment information is processed through secure payment gateway</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
