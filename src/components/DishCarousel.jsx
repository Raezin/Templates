import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   SLIDES
───────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    titleTop: "Chicken",
    titleBottom: "Manchurian",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    chef: "Chef Tariq Mehmood",
    review: "A perfect harmony of bold Pakistani spices and the delicate wok technique that defines our kitchen.",
    tag: "Bestseller",
    accent: "#C8102E",
  },
  {
    id: 2,
    titleTop: "Tom Yum",
    titleBottom: "Prawn Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop",
    rating: "4.7",
    chef: "Chef Ayesha Raza",
    review: "Every bowl tells a story — depth, warmth, and the kind of acidity that lingers beautifully.",
    tag: "Signature",
    accent: "#C9952A",
  },
  {
    id: 3,
    titleTop: "Mongolian",
    titleBottom: "Lamb",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    rating: "4.6",
    chef: "Chef Tariq Mehmood",
    review: "Wok-charred to perfection. The hoisin glaze with scallions is something truly unforgettable.",
    tag: "Chef's Pick",
    accent: "#E8591A",
  },
  {
    id: 4,
    titleTop: "Szechuan",
    titleBottom: "Prawns",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    rating: "4.5",
    chef: "Chef Ayesha Raza",
    review: "The numbing heat of Szechuan peppercorn meets the richness of desi spice — a revelation.",
    tag: "New",
    accent: "#C9952A",
  },
];

/*
  ANIMATION TIMING (ms)
  ─────────────────────
  Phase 1 — text/card fade OUT          : 300ms
  Phase 2 — wheel rotates               : 750ms   (after 300ms delay)
  Phase 3 — text/card fade IN           : 400ms   (after wheel lands, +100ms cushion)

  Total cycle before text appears again : 300 + 750 + 100 = 1150ms
*/
const T_OUT    = 300;   // text fade-out duration
const T_WHEEL  = 750;   // wheel rotation duration
const T_GAP    = 100;   // cushion between wheel landing and text appearing
const T_IN     = 400;   // text fade-in duration
const T_TOTAL  = T_OUT + T_WHEEL + T_GAP; // when to switch `current` + start fade-in

/* ─────────────────────────────────────────
   FERRIS WHEEL — exact user geometry preserved
   wheelDeg accumulates monotonically so Framer
   ALWAYS travels in the same direction.
───────────────────────────────────────── */
function FerrisWheelDish({ slides, displayIdx, wheelDeg }) {
  const DISH_SIZE = 300;
  const R = DISH_SIZE;

  return (
    <div style={{ position: "relative", width: DISH_SIZE, height: DISH_SIZE, overflow: "visible" }}>
      <motion.div
        animate={{ rotate: wheelDeg }}
        transition={{ duration: T_WHEEL / 1000, ease: [0.77, 0, 0.175, 1] }}
        style={{
          position: "absolute",
          top: "-140%",
          left: "20%",
          width: 0,
          height: 0,
          transformOrigin: "0 0",
        }}
      >
        {slides.map((s, i) => {
          /*
            displayIdx = the slide currently at the BOTTOM spoke.
            Slot 0 → bottom (90°) — always the visible dish.
            We assign slots relative to displayIdx.
          */
          const slotIndex     = (i - displayIdx + slides.length) % slides.length;
          const BASE_ANGLES   = [90, 180, 270, 0];
          const spokeAngleDeg = BASE_ANGLES[slotIndex];
          const spokeAngleRad = (spokeAngleDeg * Math.PI) / 180;
          const cx = R * Math.cos(spokeAngleRad);
          const cy = R * Math.sin(spokeAngleRad);
          const isBottom = i === displayIdx;

          return (
            <div
              key={s.id}
              style={{
                position: "absolute",
                left: cx * 1.8 - DISH_SIZE / 2,
                top:  cy * 1.8 - DISH_SIZE / 2,
                width:  DISH_SIZE,
                height: DISH_SIZE,
                /* counter-rotate so images stay upright */
                transform: `rotate(${-wheelDeg}deg)`,
                transition: `transform ${T_WHEEL}ms cubic-bezier(0.77,0,0.175,1)`,
                transformOrigin: "center center",
              }}
            >
              {/* glow rings on the bottom dish */}
              {isBottom && (
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

              <div style={{
                width: "100%", height: "100%",
                borderRadius: "50%", overflow: "hidden",
                boxShadow: isBottom
                  ? `0 0 0 4px ${s.accent}40, 0 24px 80px rgba(0,0,0,0.7)`
                  : `0 8px 32px rgba(0,0,0,0.5)`,
                transition: `box-shadow 0.4s ease`,
              }}>
                <img src={s.image} alt={s.titleBottom}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>

              {isBottom && (
                <div style={{
                  position: "absolute", bottom: "8%", right: "-8%",
                  background: s.accent, color: "#fff",
                  borderRadius: "50%", width: 56, height: 56,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: `0 4px 20px ${s.accent}66`,
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem", lineHeight: 1, letterSpacing: "0.04em",
                  }}>{s.rating}</span>
                  <span style={{
                    fontSize: "0.55rem", fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)",
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

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function HeroCarousel({ onSlideChange }) {
  /*
    `current`    — the slide whose DATA (text/card) is shown
    `displayIdx` — the slide currently at the bottom spoke of the wheel
                   (lags behind `current` during the animation sequence)
    `wheelDeg`   — monotonically accumulates: +90 per next step (clockwise),
                   -90 per prev step. Never normalised so Framer always knows
                   the direction and never takes a shortcut the wrong way.
    `textVisible` — controls whether the left text / right card is shown
  */
  const [current,     setCurrent]     = useState(0);
  const [displayIdx,  setDisplayIdx]  = useState(0);
  const [wheelDeg,    setWheelDeg]    = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [touchStart,  setTouchStart]  = useState(null);
  const [touchEnd,    setTouchEnd]    = useState(null);

  // Single source of truth for the real current index.
  // React state is async — reading `current` inside a timer closure gives
  // a stale value. This ref is always up-to-date and lets us compute the
  // next index synchronously before any timer fires.
  const idxRef = useRef(0);

  const busyRef      = useRef(false);
  const timersRef    = useRef([]);
  const intervalRef  = useRef(null);
  const AUTOPLAY_MS  = 5000;

  /* Clear all pending timers */
  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const advance = useCallback((direction) => {
    if (busyRef.current) return;
    busyRef.current = true;
    clearTimers();

    // Compute the target index RIGHT NOW from the ref — always accurate
    const nextIndex = ((idxRef.current + direction) % SLIDES.length + SLIDES.length) % SLIDES.length;

    // Update ref immediately so rapid calls (autoplay + manual) never drift
    idxRef.current = nextIndex;

    /* Phase 1: hide text */
    setTextVisible(false);

    /* Phase 2: rotate wheel — dish visuals stay on old dish during spin */
    const t1 = setTimeout(() => {
      setWheelDeg((d) => d - direction * 90);
    }, T_OUT);

    /* Phase 3: wheel landed — flip to new dish, reveal text */
    const t2 = setTimeout(() => {
      setCurrent(nextIndex);
      if (onSlideChange) onSlideChange(nextIndex);
      setTextVisible(true);
      busyRef.current = false;
    }, T_TOTAL);

    timersRef.current = [t1, t2];
  }, [onSlideChange]);

  const next = useCallback(() => advance(+1), [advance]);
  const prev = useCallback(() => advance(-1), [advance]);

  const goTo = useCallback((i) => {
    if (i === idxRef.current) return;
    const fwd = ((i - idxRef.current) % SLIDES.length + SLIDES.length) % SLIDES.length;
    const bwd = SLIDES.length - fwd;
    advance(fwd <= bwd ? +1 : -1);
  }, [advance]);

  /* Autoplay — always on, never paused by hover */
  useEffect(() => {
    intervalRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  /* Touch swipe */
  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove  = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd   = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (Math.abs(d) > 50) d > 0 ? next() : prev();
    setTouchStart(null); setTouchEnd(null);
  };

  const slide = SLIDES[current];

  const arrowStyle = (accent) => ({
    width: 44, height: 44,
    borderRadius: "50%",
    background: "rgba(10,10,10,0.55)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${accent}55`,
    color: "#F5F0E8",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    fontSize: "1.3rem",
    lineHeight: 1,
    flexShrink: 0,
    userSelect: "none",
  });

  return (
    <>
      <section
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
        {/* ── Background ── */}
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <img src={slide.image} alt={slide.titleBottom}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}18 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* ── Dot indicators ── */}
        <div style={{
          position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column", gap: "0.6rem", alignItems: "center",
        }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
              style={{
                width: 3, height: i === current ? 32 : 6, borderRadius: 3,
                background: i === current ? slide.accent : "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* ── Main layout ── */}
        <div
          className="hero-content"
          style={{
            flex: 1, display: "flex", alignItems: "center",
            position: "relative", zIndex: 5,
            padding: "calc(76px + 2rem) clamp(1rem, 7vw, 6rem) 2rem clamp(3rem, 8vw, 7rem)",
            gap: "3rem",
          }}
        >
          {/* LEFT: text — fades out then in as a unit */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <motion.div
              animate={{
                opacity: textVisible ? 1 : 0,
                y: textVisible ? 0 : -16,
              }}
              transition={{
                duration: textVisible ? T_IN / 1000 : T_OUT / 1000,
                ease: [0.16, 1, 0.3, 1],
              }}
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

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
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

                {/* Prev / Next arrows */}
                <div style={{ display: "flex", gap: "0.5rem", marginLeft: "0.25rem" }}>
                  <motion.button
                    onClick={prev}
                    whileHover={{ scale: 1.1, background: `${slide.accent}22`, borderColor: slide.accent }}
                    whileTap={{ scale: 0.93 }}
                    aria-label="Previous"
                    style={arrowStyle(slide.accent)}
                  >‹</motion.button>
                  <motion.button
                    onClick={next}
                    whileHover={{ scale: 1.1, background: `${slide.accent}22`, borderColor: slide.accent }}
                    whileTap={{ scale: 0.93 }}
                    aria-label="Next"
                    style={arrowStyle(slide.accent)}
                  >›</motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CENTER: Ferris wheel — always visible, never fades */}
          <div
            className="hero-dish"
            style={{
              flex: "0 0 auto",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "visible",
            }}
          >
            <FerrisWheelDish
              slides={SLIDES}
              displayIdx={displayIdx}
              wheelDeg={wheelDeg}
            />
          </div>

          {/* RIGHT: info card — fades with text */}
          <motion.div
            className="hero-card"
            animate={{
              opacity: textVisible ? 1 : 0,
              x: textVisible ? 0 : 16,
            }}
            transition={{
              duration: textVisible ? T_IN / 1000 : T_OUT / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
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