import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   PROGRESS BAR (per slide autoplay)
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function HeroCarousel({ onSlideChange }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
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
  }, [onSlideChange]);

  const prev = useCallback(() => {
    setCurrent((p) => {
      const n = (p - 1 + SLIDES.length) % SLIDES.length;
      if (onSlideChange) onSlideChange(n);
      return n;
    });
  }, [onSlideChange]);

  const goTo = (i) => { setCurrent(i); if (onSlideChange) onSlideChange(i); };

  useEffect(() => {
    if (playing) { intervalRef.current = setInterval(next, DURATION); }
    return () => clearInterval(intervalRef.current);
  }, [playing, next]);

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
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
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${current}`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <img
              src={slide.image}
              alt={slide.titleBottom}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* Heavy dark overlay so text is always readable */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.65) 45%, rgba(10,10,10,0.35) 100%)",
            }} />
            {/* Bottom fade */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "35%",
              background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)",
            }} />
            {/* Accent color radial glow */}
            <motion.div
              key={`glow-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}18 0%, transparent 60%)`,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Slide counter (top right) ── */}
        {/* <div style={{
          position: "absolute",
          top: "calc(76px + 1.5rem)",
          right: "clamp(1rem, 5vw, 4rem)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.6rem",
            color: "#F5F0E8",
            lineHeight: 1,
            letterSpacing: "0.06em",
          }}>
            {String(current + 1).padStart(2, "0")}
          </span>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(245,240,232,0.3)",
            letterSpacing: "0.1em",
          }}>
            / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div> */}

        {/* ── Vertical dot indicators (left) ── */}
        <div style={{
          position: "absolute",
          left: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          alignItems: "center",
        }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: 3,
                height: i === current ? 32 : 6,
                borderRadius: 3,
                background: i === current ? slide.accent : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* ── Main content ── */}
        <div
          className="hero-content"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 5,
            padding: "calc(76px + 2rem) clamp(1rem, 7vw, 6rem) 2rem clamp(3rem, 8vw, 7rem)",
            gap: "3rem",
          }}
        >
          {/* LEFT: Main text */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >

                {/* Headline */}
                <h1 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                  lineHeight: 0.88,
                  letterSpacing: "0.03em",
                  color: "#F5F0E8",
                  margin: 0,
                  marginBottom: "1.8rem",
                }}>
                  {slide.titleTop}<br />
                  <span style={{ color: slide.accent }}>{slide.titleBottom}</span>
                </h1>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: `0 8px 32px ${slide.accent}55` }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: slide.accent,
                      color: "#fff",
                      border: "none",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "0.85rem 2.4rem",
                      borderRadius: "2px",
                      cursor: "pointer",
                      boxShadow: `0 4px 24px ${slide.accent}44`,
                    }}
                  >
                    Order Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: "transparent",
                      color: "#F5F0E8",
                      border: "2px solid rgba(255,255,255,0.2)",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "calc(0.85rem - 2px) calc(2.4rem - 2px)",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    View Menu
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER: Dish image circle */}
          <div style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }} className="hero-dish">
            <AnimatePresence mode="wait">
              <motion.div
                key={`dish-${current}`}
                initial={{ opacity: 0, scale: 0.78, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotate: 8 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative" }}
              >
                {/* Outer glow ring */}
                <div style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  border: `1px solid ${slide.accent}30`,
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute",
                  inset: -32,
                  borderRadius: "50%",
                  border: `1px solid ${slide.accent}15`,
                  pointerEvents: "none",
                }} />
                {/* Circle image */}
                <div style={{
                  width: "clamp(200px, 26vw, 340px)",
                  height: "clamp(200px, 26vw, 340px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: `
                    0 0 0 4px ${slide.accent}40,
                    0 24px 80px rgba(0,0,0,0.7)
                  `,
                }}>
                  <img
                    src={slide.image}
                    alt={slide.titleBottom}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                {/* Rating badge on circle */}
                <div style={{
                  position: "absolute",
                  bottom: "8%",
                  right: "-8%",
                  background: slide.accent,
                  color: "#fff",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 20px ${slide.accent}66`,
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem",
                    lineHeight: 1,
                    letterSpacing: "0.04em",
                  }}>{slide.rating}</span>
                  <span style={{
                    fontSize: "0.55rem",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.75)",
                  }}>RATED</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Info card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${current}`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="hero-card"
              style={{
                flex: "0 0 auto",
                width: "clamp(200px, 20vw, 260px)",
                background: "rgba(20,20,20,0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: `3px solid ${slide.accent}`,
                padding: "1.6rem",
                borderRadius: "0 0 4px 4px",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {/* Card header */}
              <div>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: slide.accent,
                  marginBottom: "0.5rem",
                }}>Dish Overview</p>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.5rem",
                  color: "#F5F0E8",
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                }}>
                  {slide.titleTop} {slide.titleBottom}
                </h3>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

              {/* Review quote */}
              <p style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: "0.88rem",
                fontStyle: "italic",
                color: "rgba(245,240,232,0.55)",
                lineHeight: 1.75,
              }}>"{slide.review}"</p>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

              {/* Chef attribution */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{
                  width: 32, height: 32,
                  background: `${slide.accent}22`,
                  border: `1px solid ${slide.accent}40`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  flexShrink: 0,
                }}>👨‍🍳</div>
                <div>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#F5F0E8",
                    letterSpacing: "0.03em",
                    lineHeight: 1,
                  }}>{slide.chef}</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: "rgba(245,240,232,0.35)",
                    marginTop: 2,
                  }}>Wokin Kitchen</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Responsive CSS ── */}
      <style>{`
        .hero-card { display: flex !important; }
        .hero-dish { display: flex !important; }
        .hero-thumbs { display: flex !important; }

        @media (max-width: 1024px) {
          .hero-card { display: none !important; }
        }
        @media (max-width: 768px) {
          .hero-dish { display: none !important; }
          .hero-thumbs { gap: 0.4rem !important; }
          .hero-content {
            padding-left: clamp(2.5rem, 8vw, 4rem) !important;
            padding-right: clamp(1rem, 5vw, 2rem) !important;
          }
        }
        @media (max-width: 480px) {
          .hero-thumbs { display: none !important; }
        }
      `}</style>
    </>
  );
}