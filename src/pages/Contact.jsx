import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });

    const form = new FormData(e.currentTarget);
    if (form.get("_gotcha")) {
      setStatus({ state: "success", msg: "Thanks! We’ll be in touch shortly." });
      e.currentTarget.reset();
      return;
    }

    await new Promise(r => setTimeout(r, 700)); 

    setStatus({ state: "success", msg: "Thanks! We received your message." });
    e.currentTarget.reset();
  }

  return (
    <section className="section contact-page">
      <div className="container">
        {/* Headline */}
        <header className="contact-hero">
          <h1>Contact Us</h1>
          <p>
            Prefer to talk?{" "}
            <a href="tel:55555555" className="phone-link" aria-label="Call us at 555-55555">
              Call us at <strong>(813) 297-0747</strong>
            </a>
          </p>
        </header>

        {/* Form Card */}
        <div className="contact-card" role="region" aria-labelledby="contactFormTitle">
          <h2 id="contactFormTitle" className="sr-only">Send us a message</h2>

          <form className="contact-form" onSubmit={onSubmit} noValidate>
            {/* Honeypot */}
            <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hp" />

            <div className="row">
              <label>
                <span>First Name *</span>
                <input
                  name="firstName"
                  required
                  autoComplete="given-name"
                  placeholder="First Name"
                />
              </label>

              <label>
                <span>Last Name *</span>
                <input
                  name="lastName"
                  required
                  autoComplete="family-name"
                  placeholder="Last Name"
                />
              </label>
            </div>

            <div className="row">
              <label>
                <span>Phone</span>
                <input
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                />
              </label>

              <label>
                <span>Email *</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                />
              </label>
            </div>

            <label className="full">
              <span>Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project (type, length, timeline)…"
              />
            </label>

            <div className="actions">
              <button
                type="submit"
                className="btn-cta"
                disabled={status.state === "loading"}
                aria-busy={status.state === "loading"}
              >
                {status.state === "loading" ? "Sending…" : "Send"}
              </button>

              
            </div>

            <p className={`form-status ${status.state}`} aria-live="polite">
              {status.msg}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}