import { useRef } from "react";
import { Link } from "react-router-dom";

export default function ServicesSection() {
  const trackRef = useRef(null);

  const items = [
    { slug: "wood",       title: "Wood\nFences",        body: "Classic, private, and customizable.",                      img: "/wood.jpg" },
    { slug: "steel",      title: "Steel\nFences",       body: "Strong, secure, and elegant.",                              img: "/steel.jpg" },
    { slug: "vinyl",      title: "Vinyl (PVC)\nFences", body: "Low-maintenance privacy with a clean, modern look.",        img: "/vinyl.jpg" },
    { slug: "chain-link", title: "Chain Link\nFences",  body: "Cost-effective security for yards, pets, and perimeters.",  img: "/chain.jpg" },
    { slug: "aluminum",   title: "Aluminum\nFences",    body: "Rust-free, lightweight, durable.",                           img: "/aluminum.jpg" },
  ];

  const promo = {
    kind: "promo",
    title: "Explore Our\n Fences →",
    sub: "Scroll to browse styles",
    cta: "Gates & Access",
    bg: "/promo.jpg",
  };

  const cards = [promo, ...items];

  function scrollByCard(dir = 1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".svc-card");
    const delta = (card?.offsetWidth || 360) + 24;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  }

  return (
    <section className="svc" aria-label="Our Solutions">
      <div className="container">
        <h2 className="heading">Explore Our Services</h2>

        <div className="carousel-wrap">
          <button className="svc-nav svc-left" aria-label="Previous" onClick={() => scrollByCard(-1)}>
            &lsaquo;
          </button>

          <div className="track" ref={trackRef}>
            {cards.map((it) =>
              it.kind === "promo" ? (
                <article key="promo" className="svc-card promo">
                  <div
                    className="promo-bg"
                    aria-hidden="true"
                    style={{
                      backgroundImage:
                        `linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.45)), url(${it.bg})`,
                    }}
                  />
                  <div className="promo-content">
                    <h3 className="promo-title">
                      {it.title.split("\n").map((line, idx) => (
                        <span key={idx} className="line">{line}</span>
                      ))}
                    </h3>

                    {it.sub && (
                      <p className="promo-sub">
                        {it.sub}
                        <span className="promo-sub-line">
                          Click below to view our gates and access control
                        </span>
                      </p>
                    )}

                    <Link to="/services/gates" className="btn">
                      {it.cta}
                    </Link>
                  </div>
                </article>
              ) : (
                <article key={it.slug} className="svc-card">
                  <Link className="card-link" to={`/services/${it.slug}`}>
                    <div className="media">
                      <img src={it.img} alt={`${it.slug} fence`} loading="lazy" decoding="async" />
                    </div>
                    <div className="body">
                      <h3 className="card-title">
                        {it.title.split("\n").map((line, idx) => (
                          <span key={idx} className="line">{line}</span>
                        ))}
                      </h3>
                      <p className="desc">{it.body}</p>
                      <span className="more">Learn More</span>
                    </div>
                  </Link>
                </article>
              )
            )}
          </div>

          <button className="svc-nav svc-right" aria-label="Next" onClick={() => scrollByCard(1)}>
            &rsaquo;
          </button>
        </div>
      </div>
    </section>
  );
}
