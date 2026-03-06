import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const TEAM = [
  {
    name: "Chef Tariq Mehmood",
    role: "Founder & Executive Chef",
    initial: "T",
    note: "20 years spanning Karachi's Chinatown, Beijing, and Chengdu. The architect of Wokin's soul.",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=600&auto=format&fit=crop",
    accent: "#C8102E",
  },
  {
    name: "Li Wei",
    role: "Head Wok Chef",
    initial: "L",
    note: "Trained under three Michelin-starred kitchens in Shanghai. Brings technical precision to every flame.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop",
    accent: "#E8591A",
  },
  {
    name: "Nadia Iqbal",
    role: "Pastry & Desserts",
    initial: "N",
    note: "Blending the sweetness of desi halwai tradition with the delicacy of Chinese confectionery.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop",
    accent: "#C9952A",
  },
  {
    name: "Ahmed Raza",
    role: "Restaurant Manager",
    initial: "A",
    note: "Hospitality is in his blood — ensuring every guest leaves feeling like family.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    accent: "#C8102E",
  },
];

const PRINCIPLES = [
  {
    title: "Authenticity",
    icon: "🔥",
    accent: "#C8102E",
    desc: "Every recipe traces its roots. We don't compromise origin for convenience — each dish must honour the tradition it comes from.",
  },
  {
    title: "Craft",
    icon: "🥢",
    accent: "#E8591A",
    desc: "Each dish is prepared with deliberate technique — nothing half-done, nothing rushed. The wok demands full attention.",
  },
  {
    title: "Hospitality",
    icon: "🏮",
    accent: "#C9952A",
    desc: "Pakistani warmth defines our service. You are not a customer here — you are a guest in our home.",
  },
  {
    title: "Freshness",
    icon: "🌿",
    accent: "#C8102E",
    desc: "Seasonal, local produce forms the backbone of our daily menu. We source what is best today, not what is cheapest.",
  },
];

const MILESTONES = [
  {
    year: "2003",
    label: "Karachi",
    text: "Tariq begins his journey in Karachi's old Chinatown, learning wok technique from Cantonese families who've called Pakistan home for generations.",
    accent: "#C8102E",
  },
  {
    year: "2010",
    label: "Beijing",
    text: "A two-year apprenticeship in Beijing exposes him to the refined northern Chinese palate — mild, precise, and deeply savoury.",
    accent: "#E8591A",
  },
  {
    year: "2015",
    label: "Chengdu",
    text: "Chengdu changes everything. The numbing heat of Szechuan peppercorn fused with Pakistani chilli becomes the core of what Wokin would one day serve.",
    accent: "#C9952A",
  },
  {
    year: "2023",
    label: "Islamabad",
    text: "Wokin opens its doors — a restaurant born from 20 years of travel, study, and an unshakeable belief that two cuisines were always meant to meet.",
    accent: "#C8102E",
  },
];

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────── */
function Section({ children, bg = "#0A0A0A", style = {}, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section
      ref={ref}
      style={{ background: bg, padding: "6rem clamp(1rem, 7vw, 6rem)", position: "relative", overflow: "hidden", ...style }}
      {...rest}
    >
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
        {children}
      </motion.div>
    </section>
  );
}

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

/* ─────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────── */
export default function About({ setPage }) {
  const [activeTeam, setActiveTeam] = useState(null);
  const heroRef = useRef(null);

  return (
    <>
      <style>{`
        .about-origin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .about-cities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .about-principles-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .about-timeline {
          position: relative;
          max-width: 860px;
        }

        @media (max-width: 1100px) {
          .about-team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-principles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 860px) {
          .about-origin-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 640px) {
          .about-team-grid {
            grid-template-columns: 1fr !important;
          }
          .about-principles-grid {
            grid-template-columns: 1fr !important;
          }
          .about-cities-grid {
            grid-template-columns: 1fr !important;
          }
          .timeline-item {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .timeline-year-col {
            width: auto !important;
            text-align: left !important;
            padding-right: 0 !important;
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
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}>
          {/* Background image with heavy overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop"
              alt="Wokin restaurant interior"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(105deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.5) 100%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 70% 50%, rgba(200,16,46,0.08) 0%, transparent 60%)",
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
          }}>故事</div>

          <motion.div
            initial="hidden" animate="show" variants={stagger}
            style={{ position: "relative", zIndex: 2, maxWidth: 620 }}
          >
            <Eyebrow>Our Story</Eyebrow>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              color: "#F5F0E8",
              lineHeight: 0.88,
              letterSpacing: "0.04em",
              marginBottom: "1.5rem",
            }}>
              About<br /><span style={{ color: "#C8102E" }}>Wokin</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6B6B6B",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              maxWidth: 480,
              lineHeight: 1.85,
              marginBottom: "2.5rem",
            }}>
              A restaurant born from twenty years of wandering between two great food cultures — and the conviction that they belong together.
            </motion.p>

            {/* Hero stats strip */}
            <motion.div variants={fadeUp} style={{
              display: "flex", gap: "2.5rem", flexWrap: "wrap",
            }}>
              {[["20+", "Years of Journey"], ["2023", "Est. Islamabad"], ["100%", "Halal Certified"]].map(([n, l]) => (
                <div key={l}>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
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
            ORIGIN STORY
        ══════════════════════════════════════ */}
        <Section bg="#141414">
          <div className="about-origin-grid">
            {/* Left: text */}
            <div>
              <Eyebrow>Origin</Eyebrow>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "#F5F0E8",
                lineHeight: 0.92,
                letterSpacing: "0.04em",
                marginBottom: "1.5rem",
              }}>
                A Culinary Bridge<br />
                <span style={{ color: "#C8102E" }}>Between Two Worlds</span>
              </motion.h2>

              <motion.p variants={fadeUp} style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#6B6B6B",
                fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                lineHeight: 1.9, marginBottom: "1.2rem",
              }}>
                Wokin was founded in 2023 by Chef Tariq Mehmood, who spent two decades studying Chinese cooking — first in Karachi's Chinatown, then across the kitchens of Beijing and Chengdu.
              </motion.p>
              <motion.p variants={fadeUp} style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#6B6B6B",
                fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                lineHeight: 1.9, marginBottom: "2.5rem",
              }}>
                Every dish tells a story of cultural convergence, where bold Pakistani spice meets the precision and restraint of Chinese culinary art.
              </motion.p>

              {/* Two cities */}
              <motion.div variants={fadeUp} className="about-cities-grid">
                {[
                  {
                    city: "Lahore",
                    flag: "🇵🇰",
                    desc: "Bold spice, communal fire, centuries of Mughal flavour",
                    img: "https://images.unsplash.com/photo-1625216932225-90809ddb4d7d?q=80&w=600&auto=format&fit=crop",
                    accent: "#C8102E",
                  },
                  {
                    city: "Shanghai",
                    flag: "🇨🇳",
                    desc: "Wok precision, umami depth, refined culinary artistry",
                    img: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=600&auto=format&fit=crop",
                    accent: "#E8591A",
                  },
                ].map((c) => (
                  <div key={c.city} style={{ position: "relative", overflow: "hidden", borderRadius: "4px" }}>
                    <img src={c.img} alt={c.city}
                      style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.25) 55%)",
                    }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "0.9rem 1rem",
                    }}>
                      <p style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.25rem", color: "#F5F0E8",
                        letterSpacing: "0.06em", lineHeight: 1,
                      }}>{c.flag} {c.city}</p>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
                        lineHeight: 1.5, marginTop: 3,
                      }}>{c.desc}</p>
                    </div>
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      height: 3, background: c.accent,
                    }} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: quote + kitchen image */}
            <div>
              {/* Founder quote */}
              <motion.div variants={fadeUp} style={{
                background: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "3px solid #C8102E",
                borderRadius: "0 4px 4px 0",
                padding: "2.5rem",
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Big quote mark */}
                <div style={{
                  position: "absolute", top: "-0.5rem", right: "1rem",
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: "6rem", color: "rgba(200,16,46,0.07)",
                  lineHeight: 1, userSelect: "none",
                }}>"</div>

                <p style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                  fontStyle: "italic",
                  color: "rgba(245,240,232,0.8)",
                  lineHeight: 1.9,
                  marginBottom: "1.8rem",
                  position: "relative", zIndex: 1,
                }}>
                  "The wok is a unifying tool. In Pakistan, we cook with bold fire. In China, they cook with precise fire. At Wokin, we cook with both."
                </p>

                <div style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  paddingTop: "1.2rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: "#C8102E",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 20px rgba(200,16,46,0.4)",
                  }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.2rem", color: "#fff", letterSpacing: "0.04em",
                    }}>T</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1rem", fontWeight: 700,
                      color: "#F5F0E8", letterSpacing: "0.04em", lineHeight: 1,
                    }}>Chef Tariq Mehmood</p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem", color: "#6B6B6B", marginTop: 3,
                    }}>Founder & Executive Chef</p>
                  </div>
                </div>
              </motion.div>

              {/* Kitchen image */}
              <motion.div variants={fadeUp} style={{ position: "relative", overflow: "hidden", borderRadius: "4px" }}>
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop"
                  alt="Wokin kitchen"
                  style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, transparent 60%)",
                }} />
                <div style={{
                  position: "absolute", bottom: "1.2rem", left: "1.2rem",
                  background: "rgba(10,10,10,0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(200,16,46,0.3)",
                  padding: "0.55rem 1.2rem",
                  borderRadius: "2px",
                }}>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.82rem", letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "#C8102E", fontWeight: 700,
                  }}>Our Kitchen · Est. 2023</p>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            TIMELINE
        ══════════════════════════════════════ */}
        <Section bg="#0A0A0A">
          {/* Red top glow */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "50%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C8102E, transparent)",
          }} />
          {/* Watermark */}
          <div style={{
            position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(8rem, 18vw, 16rem)",
            fontWeight: 900, color: "rgba(200,16,46,0.04)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>旅</div>

          <Eyebrow>The Journey</Eyebrow>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9, letterSpacing: "0.04em",
            marginBottom: "4rem",
          }}>
            Twenty Years<br /><span style={{ color: "#C8102E" }}>In The Making</span>
          </motion.h2>

          <div className="about-timeline">
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: 96, top: 8, bottom: 8,
              width: 1,
              background: "linear-gradient(to bottom, transparent, rgba(200,16,46,0.4) 15%, rgba(200,16,46,0.4) 85%, transparent)",
            }} />

            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeUp}
                className="timeline-item"
                style={{
                  display: "flex", gap: "2.5rem",
                  marginBottom: i < MILESTONES.length - 1 ? "2.5rem" : 0,
                  alignItems: "flex-start",
                  position: "relative", zIndex: 1,
                }}
              >
                {/* Year column */}
                <div
                  className="timeline-year-col"
                  style={{
                    width: 96, flexShrink: 0,
                    textAlign: "right", paddingRight: "1.8rem",
                    position: "relative",
                  }}
                >
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.5rem", color: m.accent,
                    lineHeight: 1, letterSpacing: "0.04em",
                  }}>{m.year}</p>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.78rem", letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#3D3D3D",
                    marginTop: 4, fontWeight: 600,
                  }}>{m.label}</p>
                  {/* Dot */}
                  <div style={{
                    position: "absolute", right: -6, top: 8,
                    width: 11, height: 11, borderRadius: "50%",
                    background: m.accent,
                    border: "2px solid #0A0A0A",
                    boxShadow: `0 0 10px ${m.accent}66`,
                  }} />
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderLeft: `2px solid ${m.accent}`,
                  padding: "1.4rem 1.8rem",
                  borderRadius: "0 4px 4px 0",
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#6B6B6B",
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    lineHeight: 1.85,
                  }}>{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════
            ATMOSPHERE IMAGE BREAK
        ══════════════════════════════════════ */}
        <div style={{ position: "relative", height: "clamp(250px, 35vw, 380px)", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1600&auto=format&fit=crop"
            alt="spices and wok"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #0A0A0A 0%, rgba(10,10,10,0.5) 30%, rgba(10,10,10,0.5) 70%, #141414 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 clamp(1rem, 7vw, 6rem)",
          }}>
            <div style={{
              background: "rgba(10,10,10,0.65)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200,16,46,0.2)",
              borderTop: "2px solid #C8102E",
              padding: "2rem 3rem",
              textAlign: "center",
              maxWidth: 680,
            }}>
              <p style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: "clamp(1.05rem, 2vw, 1.4rem)",
                fontStyle: "italic",
                color: "rgba(245,240,232,0.85)",
                lineHeight: 1.75,
              }}>
                "Spice is not merely heat — it is memory, identity, and culture on a plate."
              </p>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.82rem", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#C8102E",
                marginTop: "1rem", fontWeight: 700,
              }}>— Chef Tariq Mehmood</p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            PRINCIPLES
        ══════════════════════════════════════ */}
        <Section bg="#141414">
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "40%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C9952A, transparent)",
          }} />

          <Eyebrow center>What We Stand For</Eyebrow>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9, letterSpacing: "0.04em",
            marginBottom: "3.5rem",
            textAlign: "center",
          }}>
            Our <span style={{ color: "#C8102E" }}>Principles</span>
          </motion.h2>

          <div className="about-principles-grid">
            {PRINCIPLES.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: `${v.accent}44` }}
                style={{
                  background: "#1E1E1E",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderTop: `3px solid ${v.accent}`,
                  borderRadius: "0 0 4px 4px",
                  padding: "2rem 1.8rem",
                  transition: "border-color 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Faint icon watermark */}
                <div style={{
                  position: "absolute", bottom: "-0.5rem", right: "0.5rem",
                  fontSize: "4rem", opacity: 0.06, userSelect: "none",
                }}>{v.icon}</div>

                <div style={{ fontSize: "2rem", marginBottom: "1.1rem" }}>{v.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.5rem", letterSpacing: "0.06em",
                  color: "#F5F0E8", marginBottom: "0.7rem",
                }}>{v.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6B6B6B",
                  fontSize: "clamp(0.95rem, 1.2vw, 1rem)",
                  lineHeight: 1.75,
                }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════
            TEAM
        ══════════════════════════════════════ */}
        <Section bg="#0A0A0A">
          {/* Watermark */}
          <div style={{
            position: "absolute", left: "-2rem", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(8rem, 16vw, 14rem)",
            fontWeight: 900, color: "rgba(200,16,46,0.04)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>人</div>

          <Eyebrow>Meet The Team</Eyebrow>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9, letterSpacing: "0.04em",
            marginBottom: "0.8rem",
          }}>
            The People<br /><span style={{ color: "#C8102E" }}>Behind Wokin</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#6B6B6B",
            fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
            maxWidth: 500, lineHeight: 1.8,
            marginBottom: "3.5rem",
          }}>
            A small, devoted team united by one obsession — creating food that is worthy of the traditions it draws from.
          </motion.p>

          <div className="about-team-grid">
            {TEAM.map((p, i) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                onMouseEnter={() => setActiveTeam(p.name)}
                onMouseLeave={() => setActiveTeam(null)}
                style={{
                  background: "#141414",
                  border: `1px solid ${activeTeam === p.name ? `${p.accent}40` : "rgba(255,255,255,0.06)"}`,
                  borderTop: `3px solid ${activeTeam === p.name ? p.accent : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "0 0 4px 4px",
                  overflow: "hidden",
                  transform: activeTeam === p.name ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: activeTeam === p.name ? `0 16px 48px rgba(0,0,0,0.5)` : "none",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "default",
                }}
              >
                {/* Portrait */}
                <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                  <img
                    src={p.image} alt={p.name}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center top",
                      display: "block",
                      transform: activeTeam === p.name ? "scale(1.06)" : "scale(1)",
                      transition: "transform 0.5s ease",
                      filter: "grayscale(15%)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(20,20,20,0.9) 0%, transparent 55%)",
                  }} />

                  {/* Initial badge */}
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    width: 40, height: 40,
                    background: p.accent,
                    borderRadius: "2px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 16px ${p.accent}55`,
                  }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.2rem", color: "#fff",
                      letterSpacing: "0.04em",
                    }}>{p.initial}</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "1.4rem 1.5rem 1.8rem" }}>
                  <h3 style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.15rem", fontWeight: 700,
                    color: "#F5F0E8", letterSpacing: "0.04em",
                    marginBottom: "0.35rem",
                  }}>{p.name}</h3>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.78rem", letterSpacing: "0.14em",
                    textTransform: "uppercase", color: p.accent,
                    marginBottom: "0.8rem", fontWeight: 700,
                  }}>{p.role}</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#6B6B6B",
                    fontSize: "0.95rem", lineHeight: 1.7,
                  }}>{p.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <Section bg="#0A0A0A" style={{ textAlign: "center" }}>
          {/* Ambient glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(200,16,46,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "2rem", left: "2rem", right: "2rem", bottom: "2rem",
            border: "1px solid rgba(200,16,46,0.08)", borderRadius: "4px",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow center>Come Find Us</Eyebrow>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              color: "#F5F0E8",
              lineHeight: 0.9, letterSpacing: "0.04em",
              marginBottom: "1rem",
            }}>
              A Table Is<br /><span style={{ color: "#C8102E" }}>Waiting For You</span>
            </motion.h2>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6B6B6B",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.75, maxWidth: 440,
              margin: "0 auto 2.5rem",
            }}>
              Whether it's a quiet dinner for two or a celebration with family, Wokin is where stories are shared over extraordinary food.
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
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "1.1rem 3.2rem",
                  border: "none", borderRadius: "2px", cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(200,16,46,0.35)",
                }}
              >Reserve A Table</motion.button>

              <motion.button
                onClick={() => setPage && setPage("Menu")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent", color: "#B0A898",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "calc(1.1rem - 2px) calc(3.2rem - 2px)",
                  border: "2px solid rgba(255,255,255,0.15)",
                  borderRadius: "2px", cursor: "pointer",
                }}
              >View Menu</motion.button>
            </motion.div>
          </div>
        </Section>

      </div>
    </>
  );
}