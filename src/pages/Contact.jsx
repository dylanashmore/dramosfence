import { useState } from "react";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState(null);

  // allows Vite-only + separate API (set VITE_API_BASE=http://localhost:3000)
  const API_BASE = import.meta.env.VITE_API_BASE || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    // helpful metadata
    data.formSource = data.formSource || "Contact Page";
    data.serviceTitle = data.serviceTitle || "General Contact";

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
      setSucceeded(true);
      form.reset();
    } catch (err) {
      console.error("Contact submit failed:", err);
      setErrors("There was a problem sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (succeeded) {
    return (
      <section className="section contact-page">
        <div className="container">
          <header className="contact-hero">
            <h1>Contact Us</h1>
            <p>Thanks! We received your message and we’ll be in touch shortly.</p>
          </header>
        </div>
      </section>
    );
  }

  return (
    <section className="section contact-page">
      <div className="container">
        {/* Headline */}
        <header className="contact-hero">
          <h1>Contact Us</h1>
          <p>
            Prefer to talk?{" "}
            <a href="tel:18137540496" className="phone-link" aria-label="(813) 754-0496">
              Call us at <strong>(813) 754-0496</strong>
            </a>
          </p>
        </header>

        {/* Form Card */}
        <div className="contact-card" role="region" aria-labelledby="contactFormTitle">
          <h2 id="contactFormTitle" className="sr-only">Send us a message</h2>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hp" />

            {/* Helpful metadata */}
            <input type="hidden" name="formSource" value="Contact Page" />
            <input type="hidden" name="serviceTitle" value="General Contact" />

            <div className="row">
              <label>
                <span>First Name *</span>
                <input name="firstName" required autoComplete="given-name" placeholder="First Name" />
              </label>

              <label>
                <span>Last Name *</span>
                <input name="lastName" required autoComplete="family-name" placeholder="Last Name" />
              </label>
            </div>

            <div className="row">
              <label>
                <span>Phone</span>
                <input name="phone" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" />
              </label>

              <label>
                <span>Email *</span>
                <input id="email" type="email" name="email" required autoComplete="email" placeholder="you@email.com" />
              </label>
            </div>

            <label className="full">
              <span>Message</span>
              <textarea id="message" name="message" rows={5} required placeholder="Tell us about your project (type, length, timeline)…" />
            </label>

            <div className="actions">
              <button type="submit" className="btn-cta" disabled={submitting} aria-busy={submitting}>
                {submitting ? "Sending…" : "Send"}
              </button>
            </div>

            {errors && (
              <p className="form-status error" aria-live="polite">{errors}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
