import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { REVIEWS } from "../data/constants";

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────── */
function Eyebrow({ children, center = false }) {
  return (
    <motion.div variants={fadeUp} style={{
      display: "flex", alignItems: "center", gap: 12,
      justifyContent: center ? "center" : "flex-start",
      marginBottom: "1.1rem",
    }}>
      {!center && <span style={{ display: "block", width: 36, height: 2, background: "#C8102E", flexShrink: 0 }} />}
      <span style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.9rem", fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: "#E8163A",
      }}>{children}</span>
      {center && <span style={{ display: "block", width: 36, height: 2, background: "#C8102E", flexShrink: 0 }} />}
    </motion.div>
  );
}

function InViewSection({ children, bg = "#0A0A0A", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} style={{
      background: bg,
      padding: "6rem clamp(1rem, 7vw, 6rem)",
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
        {children}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   STARS
───────────────────────────────────────── */
function Stars({ n = 5, size = "1.1rem" }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{
          fontSize: size,
          color: i < n ? "#C9952A" : "#2A2A2A",
        }}>★</span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────── */
const CARD_ACCENTS = ["#C8102E", "#E8591A", "#C9952A"];

function ReviewCard({ r, index }) {
  const [hovered, setHovered] = useState(false);
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#141414",
        border: `1px solid ${hovered ? `${accent}35` : "rgba(255,255,255,0.06)"}`,
        borderTop: `3px solid ${hovered ? accent : "rgba(255,255,255,0.08)"}`,
        borderRadius: "0 0 4px 4px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint quote watermark */}
      <div style={{
        position: "absolute", bottom: "-1rem", right: "-0.5rem",
        fontFamily: "'Noto Serif SC', serif",
        fontSize: "6rem", color: `${accent}08`,
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>"</div>

      {/* Top row: stars + date */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.5rem",
      }}>
        <Stars n={r.rating} />
        <span style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.78rem", fontWeight: 600,
          letterSpacing: "0.1em", color: "#3D3D3D",
          textTransform: "uppercase",
        }}>{r.date}</span>
      </div>

      {/* Review text */}
      <p style={{
        fontFamily: "'Noto Serif SC', serif",
        fontStyle: "italic",
        color: "rgba(245,240,232,0.65)",
        fontSize: "clamp(0.95rem, 1.1vw, 1rem)",
        lineHeight: 1.85,
        flex: 1,
        position: "relative", zIndex: 1,
      }}>"{r.text}"</p>

      {/* Bottom: name + verified badge */}
      <div style={{
        marginTop: "1.5rem",
        paddingTop: "1.2rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", gap: "0.5rem",
      }}>
        <div>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1rem", fontWeight: 700,
            color: "#F5F0E8", letterSpacing: "0.04em",
            lineHeight: 1,
          }}>{r.name}</p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem", color: accent,
            marginTop: 4,
          }}>{r.location}</p>
        </div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.68rem", fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          background: `${accent}12`,
          color: accent,
          border: `1px solid ${accent}30`,
          padding: "4px 10px",
          borderRadius: "2px",
        }}>Verified Guest</div>
      </div>

      {/* Bottom accent bar on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: hovered ? 2 : 0,
        background: `linear-gradient(90deg, ${accent}, #E8591A)`,
        transition: "height 0.3s ease",
      }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   WRITE REVIEW FORM
───────────────────────────────────────── */
const inputStyle = {
  width: "100%",
  background: "#1E1E1E",
  border: "1px solid rgba(255,255,255,0.08)",
  borderBottom: "1px solid rgba(255,255,255,0.15)",
  color: "#F5F0E8",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "1rem",
  padding: "0.85rem 1rem",
  borderRadius: "2px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.25s, background 0.25s",
};

function Field({ label, children }) {
  return (
    <div>
      <label style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.82rem", fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "#6B6B6B", display: "block", marginBottom: 8,
      }}>{label}</label>
      {children}
    </div>
  );
}

function WriteReview() {
  const [form, setForm] = useState({ name: "", location: "", rating: 5, text: "" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const focusStyle = (k) => ({
    ...inputStyle,
    borderColor: focused === k ? "rgba(200,16,46,0.5)" : "rgba(255,255,255,0.08)",
    borderBottomColor: focused === k ? "#C8102E" : "rgba(255,255,255,0.15)",
    background: focused === k ? "#242424" : "#1E1E1E",
  });

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "#1E1E1E",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "3px solid #C8102E",
          borderRadius: "0 0 4px 4px",
          padding: "4rem 2rem",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", bottom: "-1rem", right: "-0.5rem",
          fontFamily: "'Noto Serif SC', serif",
          fontSize: "8rem", color: "rgba(200,16,46,0.05)",
          lineHeight: 1, userSelect: "none",
        }}>谢</div>

        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(200,16,46,0.1)",
          border: "2px solid #C8102E",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.2rem",
          boxShadow: "0 0 24px rgba(200,16,46,0.25)",
        }}>
          <span style={{ color: "#C8102E", fontSize: "1.4rem" }}>✓</span>
        </div>
        <h4 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "2.2rem", letterSpacing: "0.06em",
          color: "#F5F0E8", marginBottom: "0.6rem",
        }}>Thank You!</h4>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#6B6B6B", fontSize: "1rem", lineHeight: 1.7,
          maxWidth: 320, margin: "0 auto 1.8rem",
        }}>
          Thanks, <span style={{ color: "#F5F0E8" }}>{form.name}</span>. Your review has been submitted and will appear shortly.
        </p>
        <motion.button
          onClick={() => { setSubmitted(false); setForm({ name: "", location: "", rating: 5, text: "" }); }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "transparent",
            border: "2px solid rgba(255,255,255,0.12)",
            color: "#6B6B6B",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.9rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "0.85rem 2rem",
            borderRadius: "2px", cursor: "pointer",
          }}
        >Write Another</motion.button>
      </motion.div>
    );
  }

  return (
    <div style={{
      background: "#1E1E1E",
      border: "1px solid rgba(255,255,255,0.06)",
      borderTop: "3px solid #C8102E",
      borderRadius: "0 0 4px 4px",
      padding: "2.5rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Watermark */}
      <div style={{
        position: "absolute", bottom: "-1rem", right: "-0.5rem",
        fontFamily: "'Noto Serif SC', serif",
        fontSize: "7rem", color: "rgba(200,16,46,0.05)",
        lineHeight: 1, userSelect: "none",
      }}>评</div>

      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.82rem", fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "#C8102E", marginBottom: "1.5rem",
      }}>Share Your Experience</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }} className="review-form-cols">
          <Field label="Your Name">
            <input type="text" placeholder="Your name" value={form.name} onChange={upd("name")}
              onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} style={focusStyle("name")} />
          </Field>
          <Field label="Location">
            <input type="text" placeholder="e.g. Islamabad" value={form.location} onChange={upd("location")}
              onFocus={() => setFocused("location")} onBlur={() => setFocused(null)} style={focusStyle("location")} />
          </Field>
        </div>

        {/* Star rating picker */}
        <Field label="Your Rating">
          <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem 0" }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "1.8rem",
                  color: n <= form.rating ? "#C9952A" : "#2A2A2A",
                  transition: "color 0.2s, transform 0.15s",
                  transform: n <= form.rating ? "scale(1.15)" : "scale(1)",
                  padding: 0,
                }}
              >★</button>
            ))}
          </div>
        </Field>

        <Field label="Your Review">
          <textarea rows={4} placeholder="Tell us about your experience..."
            value={form.text} onChange={upd("text")}
            onFocus={() => setFocused("text")} onBlur={() => setFocused(null)}
            style={{ ...focusStyle("text"), resize: "vertical", minHeight: 120 }}
          />
        </Field>

        <motion.button
          onClick={() => form.name && form.text && setSubmitted(true)}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(200,16,46,0.45)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "#C8102E", color: "#fff",
            border: "none",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "1.1rem",
            borderRadius: "2px", cursor: "pointer",
            boxShadow: "0 4px 24px rgba(200,16,46,0.3)",
          }}
        >Submit Review →</motion.button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Reviews({ setPage }) {
  const heroRef = useRef(null);

  const RATING_BARS = [
    { label: "Food Quality", pct: 97, accent: "#C8102E" },
    { label: "Service",      pct: 95, accent: "#E8591A" },
    { label: "Ambiance",     pct: 94, accent: "#C9952A" },
    { label: "Value",        pct: 91, accent: "#C8102E" },
  ];

  return (
    <>
      <style>{`
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .reviews-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 4rem;
          align-items: start;
        }
        .review-form-cols {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 1100px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .reviews-bottom-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 640px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
          .review-form-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: 76 }}>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section ref={heroRef} style={{
          position: "relative",
          background: "#0A0A0A",
          padding: "5rem clamp(1rem, 7vw, 6rem) 5rem",
          overflow: "hidden",
          minHeight: "55vh",
          display: "flex",
          alignItems: "center",
        }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
              alt="Wokin restaurant ambiance"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(105deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 55%, rgba(10,10,10,0.55) 100%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 70% 50%, rgba(200,16,46,0.07) 0%, transparent 60%)",
            }} />
          </div>

          {/* Top red line */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "60%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C8102E, transparent)",
          }} />

          {/* Watermark */}
          <div style={{
            position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(8rem, 20vw, 18rem)",
            fontWeight: 900, color: "rgba(200,16,46,0.05)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 1,
          }}>评价</div>

          <motion.div
            initial="hidden" animate="show" variants={stagger}
            style={{ position: "relative", zIndex: 2, maxWidth: 620 }}
          >
            <Eyebrow>Guest Experiences</Eyebrow>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              color: "#F5F0E8",
              lineHeight: 0.88, letterSpacing: "0.04em",
              marginBottom: "1.5rem",
            }}>
              What Our<br /><span style={{ color: "#C8102E" }}>Guests Say</span>
            </motion.h1>

            {/* Rating row */}
            <motion.div variants={fadeUp} style={{
              display: "flex", alignItems: "center",
              gap: "1.2rem", flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}>
              <div style={{
                background: "#C8102E",
                padding: "0.6rem 1.2rem",
                borderRadius: "2px",
                display: "flex", alignItems: "baseline", gap: "0.3rem",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2rem", color: "#fff",
                  letterSpacing: "0.06em", lineHeight: 1,
                }}>4.9</span>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.82rem", color: "rgba(255,255,255,0.7)",
                  fontWeight: 600,
                }}>/5</span>
              </div>
              <div>
                <Stars n={5} size="1.3rem" />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem", color: "#6B6B6B",
                  marginTop: 4,
                }}>Across 2,000+ verified guests</p>
              </div>
            </motion.div>

            {/* Hero stats */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[["2,000+", "Reviews"], ["4.9★", "Average"], ["97%", "Recommend"]].map(([n, l]) => (
                <div key={l}>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)",
                    color: "#E8163A", lineHeight: 1, letterSpacing: "0.04em",
                  }}>{n}</p>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.78rem", letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "#3D3D3D",
                    marginTop: 5, fontWeight: 600,
                  }}>{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            RATING BARS
        ══════════════════════════════════════ */}
        <InViewSection bg="#141414" style={{ padding: "3.5rem clamp(1rem, 7vw, 6rem)" }}>
          {/* Gold top line */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "40%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C9952A, transparent)",
          }} />

          <motion.div variants={fadeUp} style={{
            display: "flex", gap: "3rem", flexWrap: "wrap",
          }}>
            {RATING_BARS.map((item) => (
              <div key={item.label} style={{ flex: "1 1 160px", minWidth: 140 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: 8, alignItems: "baseline",
                }}>
                  <span style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.88rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#6B6B6B",
                  }}>{item.label}</span>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.2rem", letterSpacing: "0.06em",
                    color: item.accent,
                  }}>{item.pct}%</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${item.accent}, #E8591A)`,
                      borderRadius: 2,
                      boxShadow: `0 0 8px ${item.accent}55`,
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </InViewSection>

        {/* ══════════════════════════════════════
            REVIEW CARDS GRID
        ══════════════════════════════════════ */}
        <InViewSection bg="#0A0A0A">
          {/* Watermark */}
          <div style={{
            position: "absolute", left: "-2rem", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(8rem, 16vw, 14rem)",
            fontWeight: 900, color: "rgba(200,16,46,0.03)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>声</div>

          <Eyebrow>Reviews</Eyebrow>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9, letterSpacing: "0.04em",
            marginBottom: "3rem",
          }}>
            Straight From<br /><span style={{ color: "#C8102E" }}>Our Guests</span>
          </motion.h2>

          <div className="reviews-grid">
            {(REVIEWS || FALLBACK_REVIEWS).map((r, i) => (
              <ReviewCard key={r.name + i} r={r} index={i} />
            ))}
          </div>
        </InViewSection>

        {/* ══════════════════════════════════════
            WRITE REVIEW + CTA
        ══════════════════════════════════════ */}
        <InViewSection bg="#141414">
          {/* Gold top line */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "40%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C9952A, transparent)",
          }} />

          <div className="reviews-bottom-grid">
            {/* Left: CTA block */}
            <div>
              <Eyebrow>Share Your Story</Eyebrow>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "#F5F0E8",
                lineHeight: 0.9, letterSpacing: "0.04em",
                marginBottom: "1rem",
              }}>
                Dined With<br /><span style={{ color: "#C8102E" }}>Us Recently?</span>
              </motion.h2>

              <motion.p variants={fadeUp} style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#6B6B6B",
                fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                lineHeight: 1.85, maxWidth: 420,
                marginBottom: "3rem",
              }}>
                We'd love to hear about your experience at Wokin. Every review helps us do better — and lets other guests know what to look forward to.
              </motion.p>

              {/* Satisfaction stats */}
              <motion.div variants={fadeUp} style={{
                display: "flex", flexDirection: "column", gap: "1rem",
              }}>
                {[
                  { n: "97%", label: "Would recommend Wokin to friends and family", accent: "#C8102E" },
                  { n: "95%", label: "Said they'd return for another visit", accent: "#E8591A" },
                  { n: "94%", label: "Rated the wok cooking technique outstanding", accent: "#C9952A" },
                ].map((stat) => (
                  <div key={stat.n} style={{
                    display: "flex", alignItems: "center", gap: "1.2rem",
                    background: "#1E1E1E",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: `3px solid ${stat.accent}`,
                    borderRadius: "0 4px 4px 0",
                    padding: "1rem 1.4rem",
                  }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.8rem", color: stat.accent,
                      letterSpacing: "0.04em", lineHeight: 1,
                      flexShrink: 0,
                    }}>{stat.n}</span>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#6B6B6B", fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}>{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div variants={fadeUp}>
              <WriteReview />
            </motion.div>
          </div>
        </InViewSection>

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <InViewSection bg="#0A0A0A" style={{ padding: "5rem clamp(1rem, 7vw, 6rem)", textAlign: "center" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(200,16,46,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "2rem", left: "2rem", right: "2rem", bottom: "2rem",
            border: "1px solid rgba(200,16,46,0.06)", borderRadius: "4px",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow center>Ready To Visit?</Eyebrow>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              color: "#F5F0E8",
              lineHeight: 0.9, letterSpacing: "0.04em",
              marginBottom: "1rem",
            }}>
              Come Make Your<br /><span style={{ color: "#C8102E" }}>Own Memory</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6B6B6B",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.75, maxWidth: 440,
              margin: "0 auto 2.5rem",
            }}>
              Join 2,000+ guests who've made Wokin their favourite table in Islamabad.
            </motion.p>
            <motion.div variants={fadeUp} style={{
              display: "flex", gap: "1rem",
              justifyContent: "center", flexWrap: "wrap",
            }}>
              <motion.button
                onClick={() => setPage && setPage("Reservation")}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(200,16,46,0.45)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#C8102E", color: "#fff",
                  border: "none",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "1.1rem 3.2rem",
                  borderRadius: "2px", cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(200,16,46,0.35)",
                }}
              >Reserve A Table</motion.button>
              <motion.button
                onClick={() => setPage && setPage("Menu")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent", color: "#B0A898",
                  border: "2px solid rgba(255,255,255,0.15)",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "calc(1.1rem - 2px) calc(3.2rem - 2px)",
                  borderRadius: "2px", cursor: "pointer",
                }}
              >View Menu</motion.button>
            </motion.div>
          </div>
        </InViewSection>

      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   FALLBACK REVIEWS (if REVIEWS is empty)
───────────────────────────────────────── */
const FALLBACK_REVIEWS = [
  { name: "Sana Malik", location: "Islamabad", rating: 5, date: "Feb 2025", text: "The Mongolian Lamb was absolutely extraordinary. The wok technique is unlike anything I've had in Pakistan — deeply smoky, perfectly charred, and the spice balance is immaculate." },
  { name: "Bilal Ahmed", location: "Lahore", rating: 5, date: "Jan 2025", text: "Came for a birthday dinner and left utterly impressed. The ambiance, the service, the food — every element was exceptional. Wokin has set a new benchmark for dining in the city." },
  { name: "Zara Hussain", location: "Rawalpindi", rating: 5, date: "Jan 2025", text: "The Hot & Sour Soup alone is worth the trip. Rich, deeply layered, and the perfect opener to a meal. We'll be back — and we'll be bringing everyone we know." },
  { name: "Omar Farooq", location: "Islamabad", rating: 5, date: "Dec 2024", text: "Finally a restaurant that actually understands wok cooking. The Szechuan Prawns had genuine numbing heat and perfect texture. Authentic, bold, unforgettable." },
  { name: "Ayesha Khan", location: "Lahore", rating: 5, date: "Dec 2024", text: "We booked for an anniversary and Wokin made it truly special. The team went above and beyond — surprise dessert, attentive service, and food that made us forget everything else." },
  { name: "Hassan Raza", location: "Islamabad", rating: 4, date: "Nov 2024", text: "Excellent food and a beautiful space. The Dragon Mural creates an atmosphere that feels genuinely special. The Kung Pao Chicken was bold and punchy — everything a wok dish should be." },
];