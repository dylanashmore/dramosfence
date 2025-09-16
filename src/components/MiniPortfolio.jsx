import { useEffect, useRef, useState } from "react";

export default function MiniPortfolio({ images = [], fallbackImg }) {
  const safe = images?.length ? images : (fallbackImg ? [fallbackImg] : []);
  const [i, setI] = useState(0);
  const [displaySrc, setDisplaySrc] = useState(safe[0] || ""); // what we actually render
  const trackRef = useRef(null);
  const touch = useRef({ x: 0, active: false });

  const prev = () => setI((n) => (n - 1 + safe.length) % safe.length);
  const next = () => setI((n) => (n + 1) % safe.length);

  // If the image list changes (new service), reset shown image
  useEffect(() => {
    if (safe.length) setDisplaySrc(safe[0]);
    setI(0);
  }, [safe]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Warm up first few on mount / when list changes
  useEffect(() => {
    const n = Math.min(3, safe.length);
    for (let k = 0; k < n; k++) {
      const img = new Image();
      img.decoding = "async";
      img.src = safe[k];
    }
  }, [safe]);

  // Preload ±2 neighbors whenever index changes
  useEffect(() => {
    if (safe.length < 2) return;
    [1, 2].forEach((d) => {
      const nextIdx = (i + d) % safe.length;
      const prevIdx = (i - d + safe.length) % safe.length;
      [safe[nextIdx], safe[prevIdx]].forEach((src) => {
        const im = new Image();
        im.decoding = "async";
        im.src = src;
      });
    });
  }, [i, safe]);

  // ✨ NO-FLICKER SWAP: preload+decode target before we switch displaySrc
  useEffect(() => {
    const target = safe[i];
    if (!target || target === displaySrc) return;

    const im = new Image();
    im.src = target;

    const apply = () => setDisplaySrc(target);
    if (im.decode) {
      im.decode().then(apply).catch(apply);
    } else {
      im.onload = apply;
      im.onerror = apply;
    }
  }, [i, safe, displaySrc]);

  // Touch swipe
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, active: true }; };
  const onTouchMove  = (e) => {
    if (!touch.current.active) return;
    const dx = e.touches[0].clientX - touch.current.x;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dx * 0.15}px)`;
  };
  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    const dx = (e.changedTouches?.[0]?.clientX || 0) - touch.current.x;
    if (trackRef.current) trackRef.current.style.transform = "translateX(0)";
    touch.current.active = false;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
  };

  if (!safe.length) return null;

  return (
    <section className="mini-pf">
      <div className="mini-pf-frame">
        <button className="pf-arrow pf-prev" type="button" aria-label="Previous" onClick={prev}>‹</button>

        <div
          className="mini-pf-viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          <div className="mini-pf-track" ref={trackRef}>
            <img
              src={displaySrc}                 // stays on previous until next is decoded
              alt="Project photo"
              decoding="async"
              {...(i === 0 ? { fetchPriority: "high" } : {})}
              loading={i === 0 ? undefined : "lazy"}
              draggable={false}
            />
          </div>
        </div>

        <button className="pf-arrow pf-next" type="button" aria-label="Next" onClick={next}>›</button>
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
