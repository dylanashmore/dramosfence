import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// NOTE: the space in "ramos photo" is fine here.
// Add `import: "default"` so each module is already a URL string.
const modules = import.meta.glob(
  "/src/assets/ramos photo/*.{jpg,jpeg,png,webp,svg}",
  { eager: true, import: "default" }
);

const IMAGES = Object.keys(modules).sort().map((k) => modules[k]);

export default function Portfolio() {
  const [i, setI] = useState(0);
  const trackRef = useRef(null);
  const touch = useRef({ x: 0, active: false });

  const prev = () => setI(n => (n - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setI(n => (n + 1) % IMAGES.length);

  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
  if (IMAGES.length < 2) return;
  const nextIdx = (i + 1) % IMAGES.length;
  const prevIdx = (i - 1 + IMAGES.length) % IMAGES.length;
  [IMAGES[nextIdx], IMAGES[prevIdx]].forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  });
}, [i]);

  const onTouchStart = e => { touch.current = { x: e.touches[0].clientX, active: true }; };
  const onTouchMove  = e => {
    if (!touch.current.active) return;
    const dx = e.touches[0].clientX - touch.current.x;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dx * 0.15}px)`;
  };
  const onTouchEnd = e => {
    if (!touch.current.active) return;
    const dx = (e.changedTouches?.[0]?.clientX || 0) - touch.current.x;
    if (trackRef.current) trackRef.current.style.transform = "translateX(0)";
    touch.current.active = false;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
  };

  if (IMAGES.length === 0) return null;

  const pct = IMAGES.length > 1 ? (i / (IMAGES.length - 1)) * 100 : 0;

  return (
    <section className="pf pf-center">
      <h2 className="pf-mh only-mobile">Recent Projects</h2>

      <div className="pf-frame">
        <button className="pf-arrow pf-prev" aria-label="Previous" onClick={prev}>‹</button>

        <div
          className="pf-viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="pf-track" ref={trackRef}>
            <img src={IMAGES[i]} alt="Portfolio item" loading="lazy" draggable={false} />
          </div>
        </div>

        <button className="pf-arrow pf-next" aria-label="Next" onClick={next}>›</button>
      </div>

      <div className="pf-dots" role="tablist" aria-label="Select image">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === i}
            className={`pf-dot ${idx === i ? "is-active" : ""}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>

      <div className="pf-scrub" aria-hidden={IMAGES.length < 2}>
        <input
          className="pf-range"
          type="range"
          min="0"
          max={Math.max(0, IMAGES.length - 1)}
          step="1"
          value={i}
          onChange={(e) => setI(+e.target.value)}
          onInput={(e) => setI(+e.target.value)}
          aria-label="Slide position"
          style={{ "--pct": pct }}
        />
      </div>

            <div className="pf-mobile-copy">
        <p>
          Ready for ideas? Browse our recent jobs. Each project is planned for your property’s grade
          and daily use so it looks right and works from day one. Use the slider to
          explore, then tell us which styles you’re drawn to when you request a quote.
        </p>
        <Link className="btn-cta" to="/contact">Get a Quote</Link>
      </div>
    </section>
  );
}
