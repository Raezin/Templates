import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    rank: "Most Loved Dish",
    titleTop: "Chicken",
    titleBottom: "Manchurian",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    chef: "Chef Tariq Mehmood",
    review: "A perfect harmony of bold Pakistani spices and the delicate wok technique that defines our kitchen.",
    tag: "Bestseller",
    tagColor: "#C8102E",
    accent: "#C8102E",
  },
  {
    id: 2,
    rank: "House Signature",
    titleTop: "Tom Yum",
    titleBottom: "Prawn Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop",
    rating: "4.7",
    chef: "Chef Ayesha Raza",
    review: "Every bowl tells a story — depth, warmth, and the kind of acidity that lingers beautifully.",
    tag: "Signature",
    tagColor: "#C9952A",
    accent: "#C9952A",
  },
  {
    id: 3,
    rank: "Chef's Pick",
    titleTop: "Mongolian",
    titleBottom: "Lamb",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    rating: "4.6",
    chef: "Chef Tariq Mehmood",
    review: "Wok-charred to perfection. The hoisin glaze with scallions is something truly unforgettable.",
    tag: "Chef's Pick",
    tagColor: "#E8591A",
    accent: "#E8591A",
  },
  {
    id: 4,
    rank: "New Addition",
    titleTop: "Szechuan",
    titleBottom: "Prawns",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    rating: "4.5",
    chef: "Chef Ayesha Raza",
    review: "The numbing heat of Szechuan peppercorn meets the richness of desi spice — a revelation.",
    tag: "New",
    tagColor: "#C9952A",
    accent: "#C9952A",
  },
];

function FerrisWheelDish({ slides, current, wheelRotation }) {
  const DISH_SIZE = 300; // px — matches clamp max
  const R = DISH_SIZE;   // radius: pivot at top, dish hangs R px below

  const slide = slides[current];

  return (
    <div style={{
      position: "relative",
      width: DISH_SIZE,
      height: DISH_SIZE,
      overflow: "visible",
    }}>
      <motion.div
        animate={{ rotate: wheelRotation }}
        transition={{
          duration: 0.85,
          ease: [0.77, 0, 0.175, 1], // sharp cubic-bezier = crisp Ferris wheel feel
        }}
        style={{
          position: "absolute",
          top: "-140%",
          left: "20%",
          width: 0,
          height: 0,
          transformOrigin: "0 0", // pivot is exactly this point (top-center)
        }}
      >
        {slides.map((s, i) => {
          /*
            Spoke angle for slot i (in degrees):
              Slot 0 → bottom  → 90°  (current visible)
              Slot 1 → left    → 180° (exits left on next)
              Slot 2 → top     → 270° (fully hidden above)
              Slot 3 → right   → 0°   (enters from right on next)

            We assign slots relative to `current` so slot 0 is always
            the active dish regardless of which slide is showing.
          */
          const slotIndex = (i - current + slides.length) % slides.length;
          // Base angles: bottom=90, left=180, top=270, right=0(360)
          const BASE_ANGLES = [90, 180, 270, 0];
          const spokeAngleDeg = BASE_ANGLES[slotIndex];
          const spokeAngleRad = (spokeAngleDeg * Math.PI) / 180;

          // Position of this dish's CENTER relative to the pivot (0,0)
          const cx = R * Math.cos(spokeAngleRad); // x offset from pivot
          const cy = R * Math.sin(spokeAngleRad); // y offset from pivot

          const isActive = i === current;

          return (
            <div
              key={s.id}
              style={{
                position: "absolute",
                /*
                  Place the dish so its CENTER lands at (cx, cy).
                  Since the dish is DISH_SIZE × DISH_SIZE, offset by half.
                */
                left: cx*1.8  - DISH_SIZE  / 2,
                top:  cy*1.8 - DISH_SIZE / 2,
                width:  DISH_SIZE,
                height: DISH_SIZE,
                /*
                  Counter-rotate each image by the negative of the wheel rotation
                  so they always stay upright (like gondolas on a real Ferris wheel).
                */
                transform: `rotate(${-wheelRotation}deg)`,
                transition: `transform 0.85s cubic-bezier(0.77,0,0.175,1)`,
                transformOrigin: "center center",
              }}
            >
              {/* Outer glow rings — only render for active to keep it clean */}
              {isActive && (
                <>
                  <div style={{
                    position: "absolute", inset: -16, borderRadius: "50%",
                    border: `1px solid ${s.accent}30`, pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", inset: -32, borderRadius: "50%",
                    border: `1px solid ${s.accent}15`, pointerEvents: "none",
                  }} />
                </>
              )}

              {/* Circle image */}
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: isActive
                  ? `0 0 0 4px ${s.accent}40, 0 24px 80px rgba(0,0,0,0.7)`
                  : `0 8px 32px rgba(0,0,0,0.5)`,
                transition: "box-shadow 0.4s ease",
              }}>
                <img
                  src={s.image}
                  alt={s.titleBottom}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Rating badge — active dish only */}
              {isActive && (
                <div style={{
                  position: "absolute",
                  bottom: "8%", right: "-8%",
                  background: s.accent,
                  color: "#fff",
                  borderRadius: "50%",
                  width: 56, height: 56,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: `0 4px 20px ${s.accent}66`,
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem", lineHeight: 1, letterSpacing: "0.04em",
                  }}>{s.rating}</span>
                  <span style={{
                    fontSize: "0.55rem",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.75)",
                  }}>RATED</span>
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function ProgressBar({ active, duration = 5000 }) {
  return (
    <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
      {active && (
        <motion.div
          key={`progress-${active}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          style={{ height: "100%", background: "#C8102E", borderRadius: 2 }}
        />
      )}
    </div>
  );
}

export default function HeroCarousel({ onSlideChange }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);
  const DURATION = 5000;

  const next = useCallback(() => {
    setCurrent((p) => {
      const n = (p + 1) % SLIDES.length;
      if (onSlideChange) onSlideChange(n);
      return n;
    });
    // Rotate wheel clockwise: -90° per step (accumulate for smooth multi-step)
    setWheelRotation((r) => r - 90);
  }, [onSlideChange]);

  const prev = useCallback(() => {
    setCurrent((p) => {
      const n = (p - 1 + SLIDES.length) % SLIDES.length;
      if (onSlideChange) onSlideChange(n);
      return n;
    });
    setWheelRotation((r) => r + 90);
  }, [onSlideChange]);

  const goTo = useCallback((i) => {
    setCurrent((prev) => {
      const diff = i - prev;
      const steps = ((diff % SLIDES.length) + SLIDES.length) % SLIDES.length;
      // Take shortest path
      const clockwise = steps <= SLIDES.length / 2 ? steps : steps - SLIDES.length;
      setWheelRotation((r) => r - clockwise * 90);
      if (onSlideChange) onSlideChange(i);
      return i;
    });
  }, [onSlideChange]);

  useEffect(() => {
    if (playing) { intervalRef.current = setInterval(next, DURATION); }
    return () => clearInterval(intervalRef.current);
  }, [playing, next]);

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove  = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd   = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (Math.abs(d) > 50) { d > 0 ? next() : prev(); }
    setTouchStart(null); setTouchEnd(null);
  };

  const slide = SLIDES[current];

  return (
    <>
      <section
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Full-bleed background image ── */}
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <img
            src={slide.image}
            alt={slide.titleBottom}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.65) 45%, rgba(10,10,10,0.35) 100%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
            background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)",
          }} />
          <motion.div
            key={`glow-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}18 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* ── Vertical dot indicators (left) ── */}
        <div style={{
          position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column", gap: "0.6rem", alignItems: "center",
        }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: 3, height: i === current ? 32 : 6, borderRadius: 3,
                background: i === current ? slide.accent : "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* ── Main content ── */}
        <div
          className="hero-content"
          style={{
            flex: 1, display: "flex", alignItems: "center",
            position: "relative", zIndex: 5,
            padding: "calc(76px + 2rem) clamp(1rem, 7vw, 6rem) 2rem clamp(3rem, 8vw, 7rem)",
            gap: "3rem",
          }}
        >
          {/* LEFT: Main text */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                lineHeight: 0.88, letterSpacing: "0.03em",
                color: "#F5F0E8", margin: 0, marginBottom: "1.8rem",
              }}>
                {slide.titleTop}<br />
                <span style={{ color: slide.accent }}>{slide.titleBottom}</span>
              </h1>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: `0 8px 32px ${slide.accent}55` }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: slide.accent, color: "#fff", border: "none",
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem",
                    fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "0.85rem 2.4rem", borderRadius: "2px", cursor: "pointer",
                    boxShadow: `0 4px 24px ${slide.accent}44`,
                  }}
                >Order Now</motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "transparent", color: "#F5F0E8",
                    border: "2px solid rgba(255,255,255,0.2)",
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem",
                    fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "calc(0.85rem - 2px) calc(2.4rem - 2px)",
                    borderRadius: "2px", cursor: "pointer",
                  }}
                >View Menu</motion.button>
              </div>
            </motion.div>
          </div>

          {/* CENTER: Dish — Ferris wheel */}
          <div
            className="hero-dish"
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <FerrisWheelDish
              slides={SLIDES}
              current={current}
              wheelRotation={wheelRotation}
            />
          </div>

          {/* RIGHT: Info card */}
          <motion.div
            key={`card-${current}`}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="hero-card"
            style={{
              flex: "0 0 auto", width: "clamp(200px, 20vw, 260px)",
              background: "rgba(20,20,20,0.9)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderTop: `3px solid ${slide.accent}`,
              padding: "1.6rem", borderRadius: "0 0 4px 4px",
              display: "flex", flexDirection: "column", gap: "1.2rem",
            }}
          >
            <div>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: slide.accent, marginBottom: "0.5rem",
              }}>Dish Overview</p>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem",
                color: "#F5F0E8", lineHeight: 1, letterSpacing: "0.04em",
              }}>{slide.titleTop} {slide.titleBottom}</h3>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            <p style={{
              fontFamily: "'Noto Serif SC', serif", fontSize: "0.88rem",
              fontStyle: "italic", color: "rgba(245,240,232,0.55)", lineHeight: 1.75,
            }}>"{slide.review}"</p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: 32, height: 32, background: `${slide.accent}22`,
                border: `1px solid ${slide.accent}40`, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem", flexShrink: 0,
              }}>👨‍🍳</div>
              <div>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem",
                  fontWeight: 700, color: "#F5F0E8", letterSpacing: "0.03em", lineHeight: 1,
                }}>{slide.chef}</p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem",
                  color: "rgba(245,240,232,0.35)", marginTop: 2,
                }}>Wokin Kitchen</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Responsive CSS ── */}
      <style>{`
        .hero-card { display: flex !important; }
        .hero-dish { display: flex !important; }

        @media (max-width: 1024px) {
          .hero-card { display: none !important; }
        }
        @media (max-width: 768px) {
          .hero-dish { display: none !important; }
          .hero-content {
            padding-left: clamp(2.5rem, 8vw, 4rem) !important;
            padding-right: clamp(1rem, 5vw, 2rem) !important;
          }
        }
      `}</style>
    </>
  );
}