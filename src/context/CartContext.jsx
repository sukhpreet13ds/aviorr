"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS_CATALOG } from "@/data/products";

const CartContext = createContext(null);

const DEFAULT_CART = [
  {
    id: PRODUCTS_CATALOG[0].id,
    slug: PRODUCTS_CATALOG[0].slug,
    name: PRODUCTS_CATALOG[0].name,
    price: PRODUCTS_CATALOG[0].price,
    image: PRODUCTS_CATALOG[0].image,
    size: "100ml",
    quantity: 1,
  },
  {
    id: PRODUCTS_CATALOG[1].id,
    slug: PRODUCTS_CATALOG[1].slug,
    name: PRODUCTS_CATALOG[1].name,
    price: PRODUCTS_CATALOG[1].price,
    image: PRODUCTS_CATALOG[1].image,
    size: "100ml",
    quantity: 1,
  },
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(DEFAULT_CART);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aviorr_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCartItems(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("aviorr_cart", JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  const addToCart = (product, size = "100ml", qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + qty,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: qty,
        },
      ];
    });
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        totalAmount,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
