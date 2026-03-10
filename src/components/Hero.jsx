import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─── count-up on mount ─── */
function useCountUp(target, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/* ─── parallax on mouse move ─── */
function useMouseParallax(strength = 14) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPos({
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [strength]);
  return pos;
}

/* ─── single stat cell ─── */
function StatItem({ value, suffix, label, delay }) {
  const count = useCountUp(value, 1600);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: "center" }}
    >
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)",
        color: "#F5F0E8",
        lineHeight: 1,
        letterSpacing: "0.04em",
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "clamp(0.6rem, 0.78vw, 0.72rem)",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(245,240,232,0.32)",
        marginTop: 5,
      }}>{label}</div>
    </motion.div>
  );
}

const STATS = [
  { value: 2000, suffix: "+",    label: "Happy Guests"   },
  { value: 50,   suffix: "+",    label: "Menu Items"     },
  { value: 4,    suffix: ".9★",  label: "Avg Rating"     },
  { value: 3,    suffix: " Yrs", label: "In Islamabad"   },
];

const BG   = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1800&auto=format&fit=crop";
const DISH = "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=900&auto=format&fit=crop";

export default function Hero({ setPage }) {
  const mouse = useMouseParallax(14);

  return (
    <>
      <section style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── Red top-line glow ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent 0%, #C8102E 30%, #E8591A 70%, transparent 100%)",
          zIndex: 20,
        }} />

        {/* ── Background photo with mouse parallax ── */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", inset: 0,
            transform: `translate(${mouse.x * -0.25}px, ${mouse.y * -0.25}px) scale(1.06)`,
            transition: "transform 0.12s linear",
            willChange: "transform",
          }}
        >
          <img
            src={BG}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
        </motion.div>

        {/* Overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(108deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.84) 35%, rgba(10,10,10,0.48) 60%, rgba(10,10,10,0.18) 100%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "42%",
          background: "linear-gradient(to top, #0A0A0A 0%, transparent 100%)",
        }} />
        {/* Crimson left glow */}
        <div style={{
          position: "absolute", top: "10%", left: "-15%",
          width: "60vw", height: "60vw",
          background: "radial-gradient(circle, rgba(200,16,46,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* ── Chinese watermark ── */}
        <div style={{
          position: "absolute",
          right: "-3rem", top: "50%",
          transform: "translateY(-54%)",
          fontFamily: "'Noto Serif SC', serif",
          fontSize: "clamp(14rem, 30vw, 30rem)",
          fontWeight: 900,
          color: "rgba(200,16,46,0.048)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 1,
        }}>火</div>

        {/* ── Floating dish image ── */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: -5 }}
          animate={{ opacity: 1, x: 0,  rotate: 0  }}
          transition={{ duration: 1.05, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-dish-float"
          style={{
            position: "absolute",
            right: "clamp(1.5rem, 7vw, 7rem)",
            top: "30%",
            transform: `translateY(-50%) translate(${mouse.x * 0.65}px, ${mouse.y * 0.65}px)`,
            transition: "transform 0.1s linear",
            zIndex: 4,
          }}
        >
          {/* Glow behind */}
          <div style={{
            position: "absolute", inset: -30, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,16,46,0.28) 0%, transparent 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }} />
          {/* Ring 1 */}
          <div style={{
            position: "absolute", inset: -20, borderRadius: "50%",
            border: "1px solid rgba(200,16,46,0.28)", pointerEvents: "none",
          }} />
          {/* Ring 2 */}
          <div style={{
            position: "absolute", inset: -44, borderRadius: "50%",
            border: "1px solid rgba(200,16,46,0.1)", pointerEvents: "none",
          }} />

          {/* Circle image */}
          <div style={{
            width: "clamp(200px, 24vw, 380px)",
            height: "clamp(200px, 24vw, 380px)",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 0 4px rgba(200,16,46,0.4), 0 40px 110px rgba(0,0,0,0.85)",
          }}>
            <img src={DISH} alt="Chicken Manchurian"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 1.2 }}
            style={{
              position: "absolute", bottom: "6%", right: "-8%",
              background: "#C8102E", color: "#fff",
              borderRadius: "50%",
              width: "clamp(48px,5vw,68px)", height: "clamp(48px,5vw,68px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 28px rgba(200,16,46,0.6)",
            }}
          >
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(0.95rem,1.3vw,1.25rem)",
              lineHeight: 1, letterSpacing: "0.04em",
            }}>4.9</span>
            <span style={{
              fontSize: "clamp(0.4rem,0.5vw,0.5rem)",
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.75)",
            }}>RATED</span>
          </motion.div>

          {/* "Bestseller" badge */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 1.35 }}
            style={{
              position: "absolute", top: "8%", left: "-18%",
              background: "rgba(12,12,12,0.9)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(200,16,46,0.3)",
              borderLeft: "3px solid #C8102E",
              padding: "0.45rem 0.85rem",
              borderRadius: "0 2px 2px 0",
            }}
          >
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(0.55rem,0.7vw,0.65rem)",
              fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#C8102E",
            }}>Bestseller</div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(0.8rem,1vw,0.95rem)",
              color: "#F5F0E8", letterSpacing: "0.05em", lineHeight: 1.2, marginTop: 2,
            }}>Chicken Manchurian</div>
          </motion.div>
        </motion.div>

        {/* ── MAIN TEXT ── */}
        <div
          className="hero-main"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
            padding: "calc(76px + 2rem) clamp(1.5rem, 8vw, 7rem) 2rem",
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}
          >
            <span style={{ display: "block", width: 36, height: 2, background: "#C8102E", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(0.7rem, 0.95vw, 0.88rem)",
              fontWeight: 700, letterSpacing: "0.26em",
              textTransform: "uppercase", color: "#E8163A",
            }}>Gulberg Greens · Islamabad · Pan-Asian Kitchen</span>
          </motion.div>

          {/* Headline — two lines mask-reveal */}
          <div style={{ overflow: "hidden", marginBottom: "0.35rem" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 8.5vw, 8.5rem)",
                lineHeight: 0.85, letterSpacing: "0.02em",
                color: "#F5F0E8", margin: 0,
              }}
            >Where Fire</motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 8.5vw, 8.5rem)",
                lineHeight: 0.85, letterSpacing: "0.02em",
                color: "#C8102E", margin: 0,
              }}
            >Meets Flavour</motion.h1>
          </div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.92rem, 1.25vw, 1.08rem)",
              color: "rgba(176,168,152,0.82)",
              lineHeight: 1.82,
              maxWidth: 430,
              marginBottom: "2.6rem",
            }}
          >
            Islamabad's boldest Pan-Asian kitchen — where wok hei meets desi fire.
            Authentic flavours, stunning ambiance, 100% Halal.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <motion.button
              onClick={() => setPage?.("Reservation")}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 48px rgba(200,16,46,0.52)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "#C8102E", color: "#fff",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(0.82rem, 1vw, 0.96rem)",
                fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.9rem 2.6rem",
                border: "none", borderRadius: "2px", cursor: "pointer",
                boxShadow: "0 4px 30px rgba(200,16,46,0.38)",
              }}
            >Book A Table</motion.button>

            <motion.button
              onClick={() => setPage?.("Menu")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "transparent", color: "#F5F0E8",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(0.82rem, 1vw, 0.96rem)",
                fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "calc(0.9rem - 2px) calc(2.6rem - 2px)",
                border: "2px solid rgba(245,240,232,0.18)",
                borderRadius: "2px", cursor: "pointer",
              }}
            >Explore Menu</motion.button>

            {/* Divider + scroll hint */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "0.55rem", marginLeft: "0.3rem",
            }}>
              <div style={{
                width: 1, height: 30,
                background: "linear-gradient(to bottom, #C8102E 0%, transparent 100%)",
              }} />
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(245,240,232,0.22)",
              }}>Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .hero-main {
          max-width: 58%;
        }
        @media (max-width: 1100px) {
          .hero-main { max-width: 68% !important; }
        }
        @media (max-width: 900px) {
          .hero-dish-float { display: none !important; }
          .hero-main { max-width: 100% !important; }
        }
        @media (max-width: 640px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .hero-stats > * { border: none !important; }
        }
      `}</style>
    </>
  );
}