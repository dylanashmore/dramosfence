import { useEffect, useRef, useState } from "react";

export default function MiniPortfolio({ images = [], fallbackImg }) {
  const safe = images?.length ? images : (fallbackImg ? [fallbackImg] : []);
  const [i, setI] = useState(0);
  const trackRef = useRef(null);
  const touch = useRef({ x: 0, active: false });

  const prev = () => setI((n) => (n - 1 + safe.length) % safe.length);
  const next = () => setI((n) => (n + 1) % safe.length);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
  if (safe.length < 2) return;
  const nextIdx = (i + 1) % safe.length;
  const prevIdx = (i - 1 + safe.length) % safe.length;
  [safe[nextIdx], safe[prevIdx]].forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  });
}, [i, safe]);

  // touch swipe
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, active: true };
  };
  const onTouchMove = (e) => {
    if (!touch.current.active) return;
    const dx = e.touches[0].clientX - touch.current.x;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${dx * 0.15}px)`;
  };
  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    const dx =
      (e.changedTouches?.[0]?.clientX || 0) - touch.current.x;
    if (trackRef.current)
      trackRef.current.style.transform = "translateX(0)";
    touch.current.active = false;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
  };

  if (safe.length === 0) return null;

  return (
    <section className="mini-pf">
      <div className="mini-pf-frame">
        <button className="pf-arrow pf-prev" aria-label="Previous" onClick={prev}>‹</button>

        <div
          className="mini-pf-viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="mini-pf-track" ref={trackRef}>
            <img
              src={safe[i]}
              alt="Project photo"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>

       <button className="pf-arrow pf-next" aria-label="Next" onClick={next}>›</button>
      </div>

      <div className="mini-pf-dots" role="tablist" aria-label="Select image">
        {safe.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === i}
            className={`mini-pf-dot ${idx === i ? "is-active" : ""}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </section>
  );
}