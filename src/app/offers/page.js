"use client";

import Link from "next/link";
import { FiStar, FiTag } from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { PRODUCTS_CATALOG, formatINR } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function OffersPage() {
  const { addToCart, setCartOpen } = useCart();

  return (
    <>
      <Header />
      <main className="offers-page">
        <div className="offers-container">
          <div className="offers-header">
            <span className="offers-pill">
              <FiTag size={13} /> LIMITED TIME DEALS
            </span>
            <h1>Exclusive Offers</h1>
            <p>
              Grab up to 25% off on Aviorr&apos;s signature automotive &amp; personal
              fragrances.
            </p>
          </div>

          <div className="offers-grid">
            {PRODUCTS_CATALOG.map((item) => (
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
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
