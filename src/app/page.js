"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "@/components/Header/Header";

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

export default function Home() {
  const videoRef = useRef(null);
  const productsSectionRef = useRef(null);
  const showcaseRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollProducts = (direction) => {
    const el = showcaseRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };
  const [showProducts, setShowProducts] = useState(false);
  const [product2Index, setProduct2Index] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);

      const video = videoRef.current;
      if (!video) return;

      if (scrolled) {
        if (!video.paused) video.pause();
      } else {
        if (video.paused) {
          video.play().catch(() => {});
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
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProduct2Index((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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
        />
        <div className={`hero-dark-layer ${isScrolled ? "is-active" : ""}`} />
      </div>

      <main className="page-content">
        {/* First 100vh: Hero Section */}
        <section className="hero-section">
          <div className={`hero-overlay-content ${isScrolled ? "is-faded" : ""}`}>
            <p className="hero-eyebrow">THE AVIORR COLLECTION</p>
            <h1 className="hero-title">Crafted for the Road</h1>
            <a href="#products" className="hero-cta">
              Discover more
            </a>
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
      </main>
    </>
  );
}
