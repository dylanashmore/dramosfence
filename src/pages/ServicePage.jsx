import { useParams, Navigate } from "react-router-dom";
import { getService } from "../data/servicesData";
import { galleryUrlsBySlug } from "../data/serviceGalleries"; 
import MiniGallery from "../components/MiniPortfolio";

const displayNameFor = (svc) =>
  svc?.title?.replace(/\s*Fences?$/i, "").trim() ||
  (svc?.slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());

export default function ServicePage() {
  const { slug } = useParams();
  const svc = getService(slug);
  if (!svc) return <Navigate to="/services" replace />;

  const heroImg = svc.hero || svc.cardImg;

  const folderImgs = galleryUrlsBySlug?.[slug] || [];
  const images =
    (folderImgs.length && folderImgs) ||
    (svc.gallery?.length && svc.gallery) ||
    [heroImg];

  return (
    <>
      <section className="svc-hero-band">
        <div className="container svc-hero-wrap">
          <div className="svc-hero-left">
            <h1 className="svc-hero-title">{svc.teaser}</h1>
          </div>
          <div className="svc-hero-right">
  <img
    src="/logo.png"   
    alt="Ramos Enterprises"
    className="svc-logo"
  />
</div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section service">
        <div className="container service-grid">
          {/* LEFT: content */}
          <article className="service-main">
            <header className="svc-header">
              <h1 className="svc-title">{svc.title}</h1>
              <p className="svc-lead">{svc.intro}</p>
              <div className="svc-cta-row">
                <a className="btn-cta" href="/contact">Contact Us For A Quote</a>
              </div>
            </header>

            {svc.bullets?.length > 0 && (
              <section className="svc-section">
                <h2 className="svc-h2">Advantages of {displayNameFor(svc)}:</h2>
                <ul className="svc-bullets">
                  {svc.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* MINI PORTFOLIO */}
            <section className="svc-section">
              <MiniGallery images={images} fallbackImg={heroImg} />
            </section>
          </article>

          <aside className="service-aside">
            <div className="inquiry-card">
              <p className="inq-eyebrow">Ready to Go?</p>
              <h3 className="inq-title">Let's Build Your Fence.</h3>

              <form className="inq-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                  <span>First Name *</span>
                  <input required placeholder="First Name" />
                </label>
                <label>
                  <span>Last Name</span>
                  <input placeholder="Last Name" />
                </label>
                <label>
                  <span>Phone</span>
                  <input inputMode="tel" placeholder="(555) 555-5555" />
                </label>
                <label>
                  <span>Email *</span>
                  <input type="email" required placeholder="you@email.com" />
                </label>
                <label>
                  <span>Message</span>
                  <textarea rows={4} placeholder="Tell us about your project" />
                </label>
                <button className="btn-cta" type="submit">Send</button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
