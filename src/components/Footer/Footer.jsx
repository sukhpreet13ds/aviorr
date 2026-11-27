"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <Image
            src="/assets/aviorr1.png"
            alt="Aviorr"
            width={150}
            height={45}
            className="footer-logo"
          />
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <FiFacebook size={28} />
            </a>
            <a href="#" aria-label="Instagram">
              <FiInstagram size={28} />
            </a>
            <a href="#" aria-label="YouTube">
              <FiYoutube size={28} />
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <div>
            <h4>Company Info</h4>
            <ul>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/all-products">Products</Link></li>
              
            </ul>
          </div>

          <div className="footer-connect">
            <h4>Let&apos;s Connect</h4>
            <a href="tel:+917306900600" className="footer-contact-link">
              +91 730 690 0600
            </a>
            <a href="mailto:support@aviorr.com" className="footer-contact-link">
              support@aviorr.com
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><Link href="/customer-services">Customer Services</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions">Terms Conditions</Link></li>
            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
            <li><Link href="/return-refund-policy">Return and Refund Policy</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter-col">
          <h3>STAY IN THE LOOP FOR EXCITING OFFERS, COUPONS AND MUCH MORE</h3>
          <form
            className="footer-newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
            />
            <button type="submit" aria-label="Subscribe">
              <FiArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom" >
        <p>© 2026 Aviorr. All rights reserved. </p> <p>Designed & Developed by <a href="https://skullsolution.com" target="_blank" style={{color: "#DFA080"}}>Skull Solution</a></p>
      </div>
    </footer>
  );
}
