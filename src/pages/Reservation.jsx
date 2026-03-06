import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

function Eyebrow({ children, center = false }) {
  return (
    <motion.div variants={fadeUp} style={{
      display: "flex", alignItems: "center",
      gap: 12,
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
   INPUT COMPONENT (dark styled)
───────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div>
      <label style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.82rem", fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "#6B6B6B", display: "block",
        marginBottom: 8,
      }}>{label}</label>
      {children}
    </div>
  );
}

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
  appearance: "none",
  WebkitAppearance: "none",
};

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Reservation({ setPage }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    date: "", time: "", guests: "",
    occasion: "", requests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const heroRef = useRef(null);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const focusStyle = (k) => ({
    ...inputStyle,
    borderColor: focused === k ? "rgba(200,16,46,0.6)" : "rgba(255,255,255,0.08)",
    borderBottomColor: focused === k ? "#C8102E" : "rgba(255,255,255,0.15)",
    background: focused === k ? "#242424" : "#1E1E1E",
  });

  return (
    <>
      <style>{`
        .res-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 4rem;
          align-items: start;
        }
        .res-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .res-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          gap: 1rem;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4);
          cursor: pointer;
        }
        select option {
          background: #1E1E1E;
          color: #F5F0E8;
        }
        textarea { resize: vertical; }

        @media (max-width: 900px) {
          .res-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .res-form-grid {
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
          {/* Background image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop"
              alt="Wokin dining table"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(105deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 55%, rgba(10,10,10,0.55) 100%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 75% 50%, rgba(200,16,46,0.07) 0%, transparent 60%)",
            }} />
          </div>

          {/* Top accent line */}
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
          }}>桌</div>

          <motion.div
            initial="hidden" animate="show" variants={stagger}
            style={{ position: "relative", zIndex: 2, maxWidth: 620 }}
          >
            <Eyebrow>Book A Table</Eyebrow>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              color: "#F5F0E8",
              lineHeight: 0.88, letterSpacing: "0.04em",
              marginBottom: "1.5rem",
            }}>
              Reservations<br />
              <span style={{ color: "#C8102E" }}>At Wokin</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6B6B6B",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              maxWidth: 460, lineHeight: 1.85,
              marginBottom: "2.5rem",
            }}>
              Reserve your table and let us prepare an exceptional evening for you. Walk-ins always welcome — reservations recommended on weekends.
            </motion.p>

            {/* Hero info strip */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[["12–3 PM", "Lunch"], ["7–11 PM", "Dinner"], ["7 Days", "Open Always"]].map(([n, l]) => (
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
            FORM SECTION
        ══════════════════════════════════════ */}
        <InViewSection bg="#141414">
          {/* Gold top glow */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "40%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C9952A, transparent)",
          }} />

          <div className="res-grid">

            {/* ── FORM or SUCCESS ── */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: "#1E1E1E",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderTop: "3px solid #C8102E",
                    padding: "4rem 3rem",
                    textAlign: "center",
                    borderRadius: "0 0 4px 4px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Glow */}
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "60%", height: "60%",
                    background: "radial-gradient(circle, rgba(200,16,46,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />
                  {/* Watermark */}
                  <div style={{
                    position: "absolute", bottom: "-1rem", right: "-1rem",
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: "8rem", color: "rgba(200,16,46,0.05)",
                    lineHeight: 1, userSelect: "none",
                  }}>✓</div>

                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(200,16,46,0.12)",
                    border: "2px solid #C8102E",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    boxShadow: "0 0 24px rgba(200,16,46,0.25)",
                  }}>
                    <span style={{ color: "#C8102E", fontSize: "1.5rem" }}>✓</span>
                  </div>

                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2.5rem", letterSpacing: "0.06em",
                    color: "#F5F0E8", marginBottom: "0.8rem",
                  }}>Reservation Received</h3>

                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#6B6B6B",
                    fontSize: "1.05rem", lineHeight: 1.75,
                    maxWidth: 380, margin: "0 auto 2rem",
                  }}>
                    Thank you, <span style={{ color: "#F5F0E8" }}>{form.name}</span>. We'll confirm your table at{" "}
                    <span style={{ color: "#C9952A" }}>{form.email}</span> within 24 hours.
                  </p>

                  <motion.button
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: "transparent",
                      border: "2px solid rgba(255,255,255,0.12)",
                      color: "#6B6B6B",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.9rem", fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      padding: "0.9rem 2.5rem",
                      borderRadius: "2px", cursor: "pointer",
                    }}
                  >Make Another Reservation</motion.button>
                </motion.div>
              ) : (
                <div>
                  <motion.div variants={fadeUp} style={{ marginBottom: "2.5rem" }}>
                    <h2 style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      color: "#F5F0E8", letterSpacing: "0.04em",
                      marginBottom: "0.5rem",
                    }}>Your Details</h2>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#6B6B6B", fontSize: "1rem",
                    }}>Fill in the form below and we'll reserve your table.</p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="res-form-grid">
                    {/* Name */}
                    <Field label="Full Name">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={upd("name")}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("name")}
                      />
                    </Field>

                    {/* Email */}
                    <Field label="Email">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={upd("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("email")}
                      />
                    </Field>

                    {/* Phone */}
                    <Field label="Phone">
                      <input
                        type="tel"
                        placeholder="+92 300 0000000"
                        value={form.phone}
                        onChange={upd("phone")}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("phone")}
                      />
                    </Field>

                    {/* Date */}
                    <Field label="Date">
                      <input
                        type="date"
                        value={form.date}
                        onChange={upd("date")}
                        onFocus={() => setFocused("date")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("date")}
                      />
                    </Field>

                    {/* Time */}
                    <Field label="Preferred Time">
                      <select
                        value={form.time}
                        onChange={upd("time")}
                        onFocus={() => setFocused("time")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("time")}
                      >
                        <option value="">Select time</option>
                        {["12:00 PM","12:30 PM","1:00 PM","1:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"].map(t => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>

                    {/* Guests */}
                    <Field label="Guests">
                      <select
                        value={form.guests}
                        onChange={upd("guests")}
                        onFocus={() => setFocused("guests")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("guests")}
                      >
                        <option value="">Number of guests</option>
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                        ))}
                        <option value="8+">8+ guests</option>
                      </select>
                    </Field>

                    {/* Occasion - full width */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="Occasion">
                        <select
                          value={form.occasion}
                          onChange={upd("occasion")}
                          onFocus={() => setFocused("occasion")}
                          onBlur={() => setFocused(null)}
                          style={focusStyle("occasion")}
                        >
                          <option value="">None / Regular Dining</option>
                          {["Birthday","Anniversary","Business Dinner","Family Gathering","Date Night","Other"].map(o => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Special Requests - full width */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="Special Requests">
                        <textarea
                          rows={4}
                          placeholder="Dietary requirements, seating preferences, allergies..."
                          value={form.requests}
                          onChange={upd("requests")}
                          onFocus={() => setFocused("requests")}
                          onBlur={() => setFocused(null)}
                          style={{
                            ...focusStyle("requests"),
                            resize: "vertical",
                            minHeight: 110,
                          }}
                        />
                      </Field>
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp} style={{ marginTop: "2rem" }}>
                    <motion.button
                      onClick={() => form.name && form.email && setSubmitted(true)}
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(200,16,46,0.45)" }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: "#C8102E", color: "#fff",
                        border: "none",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem", fontWeight: 700,
                        letterSpacing: "0.18em", textTransform: "uppercase",
                        padding: "1.1rem 3.5rem",
                        borderRadius: "2px", cursor: "pointer",
                        boxShadow: "0 4px 24px rgba(200,16,46,0.35)",
                      }}
                    >
                      Request Reservation →
                    </motion.button>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem", color: "#3D3D3D",
                      marginTop: "1rem",
                    }}>
                      We'll confirm your booking within 24 hours via email.
                    </p>
                  </motion.div>
                </div>
              )}
            </div>

            {/* ── INFO SIDEBAR ── */}
            <div>
              {/* Info card */}
              <motion.div variants={fadeUp} style={{
                background: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: "3px solid #C8102E",
                borderRadius: "0 0 4px 4px",
                padding: "2rem",
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Watermark */}
                <div style={{
                  position: "absolute", bottom: "-0.5rem", right: "-0.5rem",
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: "5rem", color: "rgba(200,16,46,0.05)",
                  lineHeight: 1, userSelect: "none",
                }}>桌</div>

                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.82rem", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#C8102E", marginBottom: "1.2rem",
                }}>Reservation Info</p>

                {[
                  { label: "Lunch", value: "12:00 PM – 3:00 PM" },
                  { label: "Dinner", value: "7:00 PM – 11:00 PM" },
                  { label: "Open", value: "Monday – Sunday" },
                  { label: "Phone", value: "+92 51 1234 5678" },
                  { label: "Email", value: "reservations@wokin.pk" },
                ].map((item) => (
                  <div key={item.label} className="res-info-row">
                    <span style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.78rem", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#3D3D3D", whiteSpace: "nowrap",
                    }}>{item.label}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: "#B0A898",
                      textAlign: "right",
                    }}>{item.value}</span>
                  </div>
                ))}

                {/* Note */}
                <div style={{
                  marginTop: "1.2rem",
                  background: "rgba(200,16,46,0.06)",
                  border: "1px solid rgba(200,16,46,0.15)",
                  borderLeft: "2px solid #C8102E",
                  padding: "1rem 1.2rem",
                  borderRadius: "0 2px 2px 0",
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem", color: "#6B6B6B",
                    lineHeight: 1.7,
                  }}>
                    Tables held <span style={{ color: "#F5F0E8" }}>15 min</span> past booking. For parties of{" "}
                    <span style={{ color: "#F5F0E8" }}>8+</span>, please call us directly.
                  </p>
                </div>
              </motion.div>

              {/* Location card */}
              <motion.div variants={fadeUp} style={{
                background: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: "3px solid #C9952A",
                borderRadius: "0 0 4px 4px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.82rem", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#C9952A", marginBottom: "1.2rem",
                }}>Find Us</p>

                {/* Map-style placeholder */}
                <div style={{
                  position: "relative",
                  height: 160, overflow: "hidden",
                  borderRadius: "2px",
                  marginBottom: "1.2rem",
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?q=80&w=600&auto=format&fit=crop"
                    alt="Gulberg Greens Islamabad"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(10,10,10,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: "#C8102E",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 0.5rem",
                        boxShadow: "0 0 20px rgba(200,16,46,0.5)",
                        fontSize: "1rem",
                      }}>📍</div>
                      <p style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.9rem", fontWeight: 700,
                        color: "#F5F0E8", letterSpacing: "0.08em",
                      }}>Gulberg Greens</p>
                    </div>
                  </div>
                </div>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem", color: "#6B6B6B",
                  lineHeight: 1.7, marginBottom: "1rem",
                }}>
                  Gulberg Greens, Islamabad, Pakistan
                </p>

                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  style={{
                    display: "block",
                    background: "transparent",
                    border: "1px solid rgba(201,149,42,0.4)",
                    color: "#C9952A",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.88rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "0.85rem",
                    borderRadius: "2px",
                    textAlign: "center",
                    textDecoration: "none",
                    transition: "all 0.25s",
                  }}
                >
                  Get Directions →
                </motion.a>
              </motion.div>
            </div>
          </div>
        </InViewSection>

        {/* ══════════════════════════════════════
            EXPERIENCE STRIP
        ══════════════════════════════════════ */}
        <InViewSection bg="#0A0A0A" style={{ padding: "5rem clamp(1rem, 7vw, 6rem)" }}>
          {/* Ambient glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(200,16,46,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <Eyebrow center>Why Book With Us</Eyebrow>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9, letterSpacing: "0.04em",
            marginBottom: "3rem",
            textAlign: "center",
          }}>
            Every Visit Is<br /><span style={{ color: "#C8102E" }}>An Experience</span>
          </motion.h2>

          <motion.div variants={fadeUp} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}>
            {[
              { icon: "🔥", title: "Live Wok Kitchen", desc: "Watch your food come alive over real wok hei — open flame, high heat, expert hands.", accent: "#C8102E" },
              { icon: "🐉", title: "Dragon Mural Ambiance", desc: "Dine beneath a stunning hand-painted mural that brings Pan-Asian culture to life.", accent: "#E8591A" },
              { icon: "🍜", title: "50+ Dishes", desc: "From Szechuan Prawns to Mongolian Lamb — a full Pan-Asian menu crafted with heart.", accent: "#C9952A" },
              { icon: "🏮", title: "Iftar & Family Buffets", desc: "Special seasonal spreads and family platters for those moments worth gathering for.", accent: "#C8102E" },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6, borderColor: `${item.accent}44` }}
                style={{
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderTop: `3px solid ${item.accent}`,
                  borderRadius: "0 0 4px 4px",
                  padding: "2rem 1.8rem",
                  transition: "border-color 0.3s, transform 0.35s",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", bottom: "-0.5rem", right: "0.5rem",
                  fontSize: "4rem", opacity: 0.06, userSelect: "none",
                }}>{item.icon}</div>

                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{item.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.5rem", letterSpacing: "0.04em",
                  color: "#F5F0E8", marginBottom: "0.6rem",
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6B6B6B",
                  fontSize: "0.95rem", lineHeight: 1.75,
                }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </InViewSection>

      </div>
    </>
  );
}