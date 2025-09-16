import { useEffect, useRef, useState } from "react";

export default function MiniPortfolio({ images = [], fallbackImg }) {
  const safe = images?.length ? images : (fallbackImg ? [fallbackImg] : []);
  const [i, setI] = useState(0);
  const [displaySrc, setDisplaySrc] = useState(safe[0] || ""); // render this to avoid flicker
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, id: null });

  const prev = () => setI((n) => (n - 1 + safe.length) % safe.length);
  const next = () => setI((n) => (n + 1) % safe.length);

  // Keyboard (same as Portfolio)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset when the gallery list changes (new service)
  useEffect(() => {
    setI(0);
    setDisplaySrc(safe[0] || "");
  }, [safe]);

  // Warm up first few
  useEffect(() => {
    const n = Math.min(3, safe.length);
    for (let k = 0; k < n; k++) {
      const im = new Image();
      im.decoding = "async";
      im.src = safe[k];
    }
  }, [safe]);

  // Preload ±2 neighbors
  useEffect(() => {
    if (safe.length < 2) return;
    [1, 2].forEach((d) => {
      const a = (i + d) % safe.length;
      const b = (i - d + safe.length) % safe.length;
      [safe[a], safe[b]].forEach((src) => {
        const im = new Image();
        im.decoding = "async";
        im.src = src;
      });
    });
  }, [i, safe]);

  // No-flicker swap: decode new target before switching what we render
  useEffect(() => {
    const target = safe[i];
    if (!target || target === displaySrc) return;
    const im = new Image();
    im.src = target;
    const apply = () => setDisplaySrc(target);
    if (im.decode) im.decode().then(apply).catch(apply);
    else { im.onload = apply; im.onerror = apply; }
  }, [i, safe, displaySrc]);

  // Pointer-based swipe (works on touch + mouse)
  const onPointerDown = (e) => {
    drag.current = { active: true, startX: e.clientX, id: e.pointerId };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${dx * 0.15}px)`;
    }
  };
  const onPointerFinish = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (trackRef.current) trackRef.current.style.transform = "translateX(0)";
    drag.current.active = false;
    if (Math.abs(dx) > 50) (dx > 0 ? prev() : next());
  };

  if (!safe.length) return null;

  return (
    <section className="mini-pf">
      <div className="mini-pf-frame">
        <button className="pf-arrow pf-prev" type="button" aria-label="Previous" onClick={prev}>‹</button>

        <div
          className="mini-pf-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerFinish}
          onPointerCancel={onPointerFinish}
          style={{ touchAction: "pan-y" }}
        >
          <div className="mini-pf-track" ref={trackRef}>
            <img
              src={displaySrc}              // stays on old image until next is decoded
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
