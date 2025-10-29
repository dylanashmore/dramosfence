import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { getService } from "../data/servicesData";
import { galleryUrlsBySlug } from "../data/serviceGalleries";
import MiniGallery from "../components/MiniPortfolio";

const displayNameFor = (svc) =>
  svc?.title?.replace(/\s*Fences?$/i, "").trim() ||
  (svc?.slug || "").replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

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

  const [inqSubmitting, setInqSubmitting] = useState(false);
  const [inqSucceeded, setInqSucceeded] = useState(false);
  const [inqErrors, setInqErrors] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "";

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInqSubmitting(true);
    setInqErrors(null);

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    // add context if missing
    if (!data.serviceTitle) data.serviceTitle = svc.title;
    if (!data.formSource) data.formSource = "ServicePage sidebar";
    if (!data.serviceSlug) data.serviceSlug = slug;

    try {
      const r = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err.error || "Network response was not ok");
      }

      setInqSucceeded(true);
      form.reset();
    } catch (err) {
      console.error("Inquiry submit failed:", err);
      setInqErrors("There was a problem sending your message. Please check the fields and try again.");
    } finally {
      setInqSubmitting(false);
    }
  };

  return (
    <>
      <section className="svc-hero-band">
        <div className="container svc-hero-wrap">
          <div className="svc-hero-left">
            <h1 className="svc-hero-title">{svc.teaser}</h1>
          </div>
          <div className="svc-hero-right">
            <img src="/logo.png" alt="Ramos Enterprises" className="svc-logo" />
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
                <Link className="btn-cta" to="/contact">Contact Us For A Quote</Link>
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

          {/* RIGHT: inquiry sidebar */}
          <aside className="service-aside">
            <div className="inquiry-card">
              <p className="inq-eyebrow">Ready to Go?</p>
              <h3 className="inq-title">Let's Build Your Fence.</h3>

              {inqSucceeded ? (
                <p className="form-status success" aria-live="polite">
                  Thanks! We received your message.
                  We’ll reach out shortly.
                </p>
              ) : (
                <form className="inq-form" onSubmit={handleInquirySubmit} noValidate>
                  {/* Honeypot */}
                  <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hp" />

                  {/* Helpful metadata for the email */}
                  <input type="hidden" name="_subject" value={`Website inquiry — ${svc.title}`} />
                  <input type="hidden" name="formSource" value="ServicePage sidebar" />
                  <input type="hidden" name="serviceSlug" value={slug} />
                  <input type="hidden" name="serviceTitle" value={svc.title} />

                  <label>
                    <span>First Name *</span>
                    <input name="firstName" required placeholder="First Name" autoComplete="given-name" />
                  </label>

                  <label>
                    <span>Last Name</span>
                    <input name="lastName" placeholder="Last Name" autoComplete="family-name" />
                  </label>

                  <label>
                    <span>Phone</span>
                    <input name="phone" inputMode="tel" placeholder="(555) 555-5555" autoComplete="tel" />
                  </label>

                  <label>
                    <span>Email *</span>
                    <input id="inq-email" type="email" name="email" required placeholder="you@email.com" autoComplete="email" />
                  </label>

                  <label>
                    <span>Message</span>
                    <textarea id="inq-message" name="message" rows={4} placeholder="Tell us about your project" required />
                  </label>

                  <button className="btn-cta" type="submit" disabled={inqSubmitting} aria-busy={inqSubmitting}>
                    {inqSubmitting ? "Sending…" : "Send"}
                  </button>

                  {inqErrors && (
                    <p className="form-status error" aria-live="polite">
                      {inqErrors}
                    </p>
                  )}
                </form>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
