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
        color: "#6B6B6B", display: "block",
        marginBottom: 8,
      }}>{label}</label>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT INFO ITEMS
───────────────────────────────────────── */
const CONTACT_ITEMS = [
  {
    icon: "📍",
    label: "Address",
    lines: ["Gulberg Greens, Islamabad", "Punjab, Pakistan"],
    accent: "#C8102E",
  },
  {
    icon: "📞",
    label: "Phone",
    lines: ["+92 51 1234 5678", "+92 300 000 0000"],
    accent: "#E8591A",
  },
  {
    icon: "✉️",
    label: "Email",
    lines: ["hello@wokin.pk", "reservations@wokin.pk"],
    accent: "#C9952A",
  },
  {
    icon: "🕐",
    label: "Hours",
    lines: ["Mon – Sun  ·  12:00 PM – 11:00 PM", "Lunch 12–3 PM  ·  Dinner 7–11 PM"],
    accent: "#C8102E",
  },
];

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ContactLocation({ setPage }) {
  const [msg, setMsg] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const heroRef = useRef(null);

  const upd = (k) => (e) => setMsg((m) => ({ ...m, [k]: e.target.value }));
  const focusStyle = (k) => ({
    ...inputStyle,
    borderColor: focused === k ? "rgba(200,16,46,0.5)" : "rgba(255,255,255,0.08)",
    borderBottomColor: focused === k ? "#C8102E" : "rgba(255,255,255,0.15)",
    background: focused === k ? "#242424" : "#1E1E1E",
  });

  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .contact-info-items {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
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
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop"
              alt="Wokin restaurant"
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

          {/* Top red accent line */}
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
          }}>联系</div>

          <motion.div
            initial="hidden" animate="show" variants={stagger}
            style={{ position: "relative", zIndex: 2, maxWidth: 620 }}
          >
            <Eyebrow>Get In Touch</Eyebrow>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              color: "#F5F0E8",
              lineHeight: 0.88, letterSpacing: "0.04em",
              marginBottom: "1.5rem",
            }}>
              Contact<br />
              <span style={{ color: "#C8102E" }}>&amp; Location</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6B6B6B",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              maxWidth: 460, lineHeight: 1.85,
              marginBottom: "2.5rem",
            }}>
              We'd love to hear from you. Reach out for reservations, feedback, or just to say hello — we're always here.
            </motion.p>

            {/* Quick contact strip */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[["📍", "Gulberg Greens, Isb"], ["📞", "+92 51 1234 5678"], ["🕐", "Open Daily"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.9rem", fontWeight: 700,
                    color: "#B0A898", letterSpacing: "0.06em",
                  }}>{text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            CONTACT + MAP SECTION
        ══════════════════════════════════════ */}
        <InViewSection bg="#141414">
          {/* Gold top glow */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "40%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C9952A, transparent)",
          }} />

          <div className="contact-grid">

            {/* ── LEFT: Contact Info ── */}
            <div>
              <Eyebrow>Contact Us</Eyebrow>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#F5F0E8",
                lineHeight: 0.9, letterSpacing: "0.04em",
                marginBottom: "0.8rem",
              }}>
                We'd Love To<br /><span style={{ color: "#C8102E" }}>Hear From You</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#6B6B6B",
                fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                lineHeight: 1.8, maxWidth: 440,
                marginBottom: "3rem",
              }}>
                Whether you want to make a reservation, give us feedback, or simply find out more about what we do — we're always listening.
              </motion.p>

              {/* Contact items */}
              <motion.div variants={fadeUp} className="contact-info-items">
                {CONTACT_ITEMS.map((item, i) => (
                  <div key={item.label} style={{
                    display: "flex",
                    gap: "1.5rem",
                    padding: "1.5rem 0",
                    borderBottom: i < CONTACT_ITEMS.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                    alignItems: "flex-start",
                  }}>
                    {/* Icon bubble */}
                    <div style={{
                      width: 48, height: 48, flexShrink: 0,
                      background: `${item.accent}15`,
                      border: `1px solid ${item.accent}30`,
                      borderRadius: "4px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.3rem",
                    }}>{item.icon}</div>

                    <div>
                      <p style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.78rem", fontWeight: 700,
                        letterSpacing: "0.18em", textTransform: "uppercase",
                        color: item.accent, marginBottom: "0.4rem",
                      }}>{item.label}</p>
                      {item.lines.map((line, j) => (
                        <p key={j} style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: j === 0 ? "#B0A898" : "#6B6B6B",
                          fontSize: "1rem", lineHeight: 1.75,
                        }}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social strip */}
              <motion.div variants={fadeUp} style={{
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", gap: "0.75rem", flexWrap: "wrap",
              }}>
                {[
                  { label: "Instagram", color: "#C8102E" },
                  { label: "Facebook", color: "#E8591A" },
                  { label: "TikTok", color: "#C9952A" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.82rem", fontWeight: 700,
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      color: s.color,
                      background: `${s.color}10`,
                      border: `1px solid ${s.color}30`,
                      padding: "0.55rem 1.2rem",
                      borderRadius: "2px",
                      textDecoration: "none",
                      transition: "background 0.25s",
                    }}
                  >
                    {s.label} →
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Map + Message Form ── */}
            <div>
              {/* Map placeholder */}
              <motion.div variants={fadeUp} style={{
                position: "relative",
                height: 280,
                overflow: "hidden",
                borderRadius: "4px",
                marginBottom: "2rem",
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?q=80&w=900&auto=format&fit=crop"
                  alt="Islamabad Gulberg Greens"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    opacity: 0.45,
                    filter: "grayscale(30%) sepia(20%)",
                  }}
                />
                {/* Grid overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(200,16,46,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(200,16,46,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "48px 48px",
                }} />
                {/* Dark vignette */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)",
                }} />

                {/* Pin + label */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: "#C8102E",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 0.6rem",
                        boxShadow: "0 0 0 8px rgba(200,16,46,0.15), 0 0 24px rgba(200,16,46,0.4)",
                        fontSize: "1.2rem",
                      }}
                    >📍</motion.div>
                    <div style={{
                      background: "rgba(10,10,10,0.8)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(200,16,46,0.3)",
                      padding: "0.5rem 1.2rem",
                      borderRadius: "2px",
                    }}>
                      <p style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.1rem", letterSpacing: "0.06em",
                        color: "#F5F0E8", lineHeight: 1,
                      }}>Wokin Restaurant</p>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem", color: "#6B6B6B",
                        marginTop: 3,
                      }}>Gulberg Greens, Islamabad</p>
                    </div>
                  </div>
                </div>

                {/* Directions button overlay */}
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  style={{
                    position: "absolute", bottom: "1rem", right: "1rem",
                    background: "#C8102E",
                    color: "#fff",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.78rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "0.55rem 1.2rem",
                    borderRadius: "2px",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(200,16,46,0.4)",
                  }}
                >Get Directions →</motion.a>
              </motion.div>

              {/* Message form */}
              <motion.div variants={fadeUp} style={{
                background: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: "3px solid #C8102E",
                borderRadius: "0 0 4px 4px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Watermark */}
                <div style={{
                  position: "absolute", bottom: "-1rem", right: "-0.5rem",
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: "6rem", color: "rgba(200,16,46,0.05)",
                  lineHeight: 1, userSelect: "none",
                }}>信</div>

                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.82rem", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#C8102E", marginBottom: "1.5rem",
                }}>Send A Message</p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      textAlign: "center",
                      padding: "2rem 1rem",
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "rgba(200,16,46,0.1)",
                      border: "2px solid #C8102E",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}>
                      <span style={{ color: "#C8102E", fontSize: "1.3rem" }}>✓</span>
                    </div>
                    <h4 style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.8rem", letterSpacing: "0.06em",
                      color: "#F5F0E8", marginBottom: "0.5rem",
                    }}>Message Sent</h4>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#6B6B6B", fontSize: "0.95rem", lineHeight: 1.7,
                    }}>
                      Thanks, <span style={{ color: "#F5F0E8" }}>{msg.name}</span>! We'll get back to you at{" "}
                      <span style={{ color: "#C9952A" }}>{msg.email}</span> soon.
                    </p>
                  </motion.div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    <Field label="Your Name">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={msg.name}
                        onChange={upd("name")}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("name")}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={msg.email}
                        onChange={upd("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={focusStyle("email")}
                      />
                    </Field>
                    <Field label="Message">
                      <textarea
                        rows={4}
                        placeholder="Your message..."
                        value={msg.message}
                        onChange={upd("message")}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        style={{ ...focusStyle("message"), resize: "vertical", minHeight: 110 }}
                      />
                    </Field>

                    <motion.button
                      onClick={() => msg.name && msg.email && setSent(true)}
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
                    >
                      Send Message →
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </InViewSection>

        {/* ══════════════════════════════════════
            HOURS + QUICK FACTS STRIP
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
          <div style={{
            position: "absolute", top: "2rem", left: "2rem", right: "2rem", bottom: "2rem",
            border: "1px solid rgba(200,16,46,0.06)", borderRadius: "4px",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow center>Opening Hours</Eyebrow>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#F5F0E8",
              lineHeight: 0.9, letterSpacing: "0.04em",
              marginBottom: "3rem",
              textAlign: "center",
            }}>
              We're Open<br /><span style={{ color: "#C8102E" }}>Every Day</span>
            </motion.h2>

            <motion.div variants={fadeUp} style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
              maxWidth: 860,
              margin: "0 auto",
            }}>
              {[
                { time: "12:00 PM", label: "Lunch Opens", sub: "Monday – Sunday", accent: "#C9952A", icon: "🌤️" },
                { time: "3:00 PM",  label: "Lunch Closes", sub: "Last orders 2:45 PM", accent: "#E8591A", icon: "🥢" },
                { time: "7:00 PM",  label: "Dinner Opens", sub: "Monday – Sunday", accent: "#C8102E", icon: "🏮" },
                { time: "11:00 PM", label: "Dinner Closes", sub: "Last orders 10:30 PM", accent: "#C8102E", icon: "🌙" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -6, borderColor: `${item.accent}44` }}
                  style={{
                    background: "#141414",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderTop: `3px solid ${item.accent}`,
                    borderRadius: "0 0 4px 4px",
                    padding: "1.8rem",
                    textAlign: "center",
                    transition: "border-color 0.3s, transform 0.35s",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>{item.icon}</div>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2rem", color: item.accent,
                    letterSpacing: "0.06em", lineHeight: 1,
                    marginBottom: "0.3rem",
                  }}>{item.time}</p>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1rem", fontWeight: 700,
                    color: "#F5F0E8", letterSpacing: "0.04em",
                    marginBottom: "0.3rem",
                  }}>{item.label}</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem", color: "#6B6B6B",
                    lineHeight: 1.6,
                  }}>{item.sub}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom note */}
            <motion.p variants={fadeUp} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem", color: "#3D3D3D",
              textAlign: "center",
              marginTop: "2.5rem",
              lineHeight: 1.7,
            }}>
              🌿 Walk-ins always welcome · Reservations recommended on Fri–Sun ·{" "}
              <span
                onClick={() => setPage && setPage("Reservation")}
                style={{ color: "#C8102E", cursor: "pointer", fontWeight: 600 }}
              >
                Book online →
              </span>
            </motion.p>
          </div>
        </InViewSection>

      </div>
    </>
  );
}