"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { PRODUCTS_CATALOG, formatINR } from "@/data/products";

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, addToCart, updateQuantity, totalAmount } =
    useCart();
  const moreRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setCartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const scrollMore = (direction) => {
    const el = moreRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 220, behavior: "smooth" });
  };

  return (
    <div
      className={`cart-drawer-backdrop ${cartOpen ? "is-open" : ""}`}
      onClick={() => setCartOpen(false)}
      aria-hidden={!cartOpen}
    >
      <aside
        className={`cart-drawer-panel ${cartOpen ? "is-open" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <div className="cart-drawer-header">
          <h2>YOUR CART ({cartItems.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button
            type="button"
            className="cart-close-btn"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {/* Saved Cart Products (Vertical, full width) */}
          {cartItems.length === 0 ? (
            <p className="cart-empty-text">Your cart is currently empty.</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item-row">
                  <Link
                    href={`/products/${item.slug}`}
                    className="cart-item-img-wrap"
                    onClick={() => setCartOpen(false)}
                  >
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </Link>

                  <div className="cart-item-info">
                    <Link
                      href={`/products/${item.slug}`}
                      className="cart-item-title"
                      onClick={() => setCartOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <p className="cart-item-size">{item.size}</p>
                    <p className="cart-item-price">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="cart-item-qty">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                    >
                      <FiMinus size={13} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.size, 1)}
                    >
                      <FiPlus size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* More Products Horizontal Carousel */}
          <div className="cart-more-section">
            <div className="cart-more-header">
              <h3>MORE PRODUCTS</h3>
              <div className="cart-more-arrows">
                <button
                  type="button"
                  aria-label="Previous product"
                  onClick={() => scrollMore(-1)}
                >
                  <FiChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next product"
                  onClick={() => scrollMore(1)}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>

            <div ref={moreRef} className="cart-more-track">
              {PRODUCTS_CATALOG.map((prod) => (
                <div key={prod.id} className="cart-more-card">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="cart-more-img-wrap"
                    onClick={() => setCartOpen(false)}
                  >
                    <img src={prod.image} alt={prod.name} loading="lazy" />
                  </Link>
                  <div className="cart-more-info">
                    <p className="cart-more-name">{prod.name}</p>
                    <p className="cart-more-price">{formatINR(prod.price)}</p>
                    <button
                      type="button"
                      className="cart-more-add-btn"
                      onClick={() => addToCart(prod, "100ml", 1)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Sum Total */}
        <div className="cart-drawer-footer">
          <div className="cart-total-row">
            <span>Subtotal</span>
            <strong>{formatINR(totalAmount)}</strong>
          </div>
          <button type="button" className="cart-checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
