import Link from "next/link";
import { FiArrowRight, FiAward, FiDroplet, FiMapPin } from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="about-page">
        <div className="about-container">
          <section className="about-hero">
            <p className="auth-eyebrow">THE AVIORR STORY</p>
            <h1>Crafted for the Road. Engineered to Last.</h1>
            <p className="about-lead">
              Aviorr is India&apos;s pioneering luxury automotive and personal
              fragrance house—combining 50% pure perfume oil concentration with
              timeless olfactory artistry.
            </p>
          </section>

          <section className="about-story-grid">
            <div className="about-story-img-wrap">
              <img
                src="/assets/productnew.jpg"
                alt="Aviorr Signature Fragrance"
                className="about-story-img"
              />
            </div>

            <div className="about-story-content">
              <h2>Redefining Every Journey</h2>
              <p>
                Born from a passion for fine perfumery and automotive excellence,
                Aviorr was created to transform everyday drives into memorable
                sensory experiences. Every bottle is formulated specifically for
                Indian weather—delivering crisp projection and 10–12 hour
                longevity without overwhelming the senses.
              </p>
              <p>
                From smoky woods and rich saffron to vibrant citrus and
                velvet florals, our signature blends are crafted using imported
                essential oils and housed in precision-finished vessels.
              </p>
              <Link href="/products/apex-prime-av101" className="about-cta-btn">
                <span>Explore Signature Collection</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </section>

          <section className="about-stats-grid">
            <div className="about-stat-card">
              <strong>75+</strong>
              <span>Stores Across India</span>
            </div>
            <div className="about-stat-card">
              <strong>50%</strong>
              <span>Pure Perfume Oil</span>
            </div>
            <div className="about-stat-card">
              <strong>132K+</strong>
              <span>Happy Customers</span>
            </div>
          </section>

          <section className="about-pillars-grid">
            <div className="about-pillar-card">
              <FiDroplet className="about-pillar-icon" />
              <h3>High Oil Concentration</h3>
              <p>
                Formulated with 50% Extrait de Parfum oils so your fragrance
                stays vibrant from morning commute to late evening.
              </p>
            </div>
            <div className="about-pillar-card">
              <FiMapPin className="about-pillar-icon" />
              <h3>India&apos;s 1st Perfume Bar</h3>
              <p>
                Experience personalized scent profiling and bespoke blends
                across our nationwide retail lounges.
              </p>
            </div>
            <div className="about-pillar-card">
              <FiAward className="about-pillar-icon" />
              <h3>Uncompromising Quality</h3>
              <p>
                Every batch undergoes strict quality checks for purity,
                stability, and effortless everyday luxury.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
