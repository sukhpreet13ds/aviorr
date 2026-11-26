"use client";

import Image from "next/image";
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
              <FiFacebook size={18} />
            </a>
            <a href="#" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>
            <a href="#" aria-label="YouTube">
              <FiYoutube size={18} />
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <div>
            <h4>Company Info</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blogs</a></li>
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
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Store Locator</a></li>
            <li><a href="#">Customer Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Return and Refund Policy</a></li>
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

      <div className="footer-bottom">
        <p>© 2026 Aviorr. All rights reserved.</p>
      </div>
    </footer>
  );
}
