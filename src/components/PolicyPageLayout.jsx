import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function PolicyPageLayout({ title, updatedAt, children }) {
  return (
    <>
      <Header />
      <main className="policy-page">
        <article className="policy-container">
          <h1>{title}</h1>
          <p className="policy-updated">{updatedAt}</p>
          <div className="policy-content">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
