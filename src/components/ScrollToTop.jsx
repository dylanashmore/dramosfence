import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function findScrollableCandidates() {
  // Try common containers first, then fall back to any scrollable ancestor.
  const preferred = [
    document.querySelector(".page"),
    document.querySelector(".app"),
    document.getElementById("root"),
    document.scrollingElement || document.documentElement,
    document.body,
  ].filter(Boolean);

  // Add any other actual scrollables we find in the DOM
  const extras = Array.from(document.querySelectorAll("*")).filter((el) => {
    const s = getComputedStyle(el);
    const canScroll =
      (s.overflowY === "auto" || s.overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight;
    return canScroll;
  });

  // De-dup while preserving order (preferred first)
  const set = new Set([...preferred, ...extras]);
  return Array.from(set);
}

function scrollTopAll({ smooth = false } = {}) {
  const behavior = smooth ? "smooth" : "auto";
  const targets = findScrollableCandidates();

  // Try window first
  try {
    window.scrollTo({ top: 0, left: 0, behavior });
  } catch {
    /* noop */
  }

  // Then any scrollable containers
  for (const el of targets) {
    try {
      if (typeof el.scrollTo === "function") {
        el.scrollTo({ top: 0, left: 0, behavior });
      } else {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      }
    } catch {
      /* noop */
    }
  }
}

export default function ScrollToTop({ smooth = false }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Wait for route content to paint, then scroll
    const run = () => {
      // If navigating to an in-page anchor, respect it
      if (hash) {
        const id = hash.slice(1);
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
          return;
        }
      }
      scrollTopAll({ smooth });
    };

    // Ensure DOM is updated before scrolling (covers lazy content/layout shifts)
    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
  }, [pathname, hash, smooth]);

  return null;
}
