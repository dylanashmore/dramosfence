import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  // <-- uses your real Formspree form ID
  const [state, handleSubmit] = useForm("xwpngpgy");

  // simple success UI in-place (keep your styling)
  if (state.succeeded) {
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

          {/* hook wires the submit */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot to deter bots (Formspree ignores unknown fields) */}
            <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hp" />

            {/* Optional static subject / reply-to (Formspree respects these) */}
            <input type="hidden" name="_subject" value="Website inquiry from Ramos Fencing" />
            {/* If you want Formspree’s reply-to set automatically, it will also use the 'email' field below */}

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
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                />
              </label>
            </div>

            <ValidationError prefix="Email" field="email" errors={state.errors} />

            <label className="full">
              <span>Message</span>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about your project (type, length, timeline)…"
              />
            </label>

            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <div className="actions">
              <button
                type="submit"
                className="btn-cta"
                disabled={state.submitting}
                aria-busy={state.submitting}
              >
                {state.submitting ? "Sending…" : "Send"}
              </button>
            </div>

            {/* Inline status helper (optional) */}
            {state.errors?.length > 0 && (
              <p className="form-status error" aria-live="polite">
                There was a problem sending your message. Please check the fields and try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
