import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, InView } from "../utils/animations";

const TEAM = [
  {
    name: "Chef Tariq Mehmood",
    role: "Founder & Executive Chef",
    initial: "T",
    note: "20 years spanning Karachi's Chinatown, Beijing, and Chengdu. The architect of Wokin's soul.",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Li Wei",
    role: "Head Wok Chef",
    initial: "L",
    note: "Trained under three Michelin-starred kitchens in Shanghai. Brings technical precision to every flame.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Nadia Iqbal",
    role: "Pastry & Desserts",
    initial: "N",
    note: "Blending the sweetness of desi halwai tradition with the delicacy of Chinese confectionery.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ahmed Raza",
    role: "Restaurant Manager",
    initial: "A",
    note: "Hospitality is in his blood — ensuring every guest leaves feeling like family.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
];

const PRINCIPLES = [
  {
    title: "Authenticity",
    icon: "◈",
    desc: "Every recipe traces its roots. We don't compromise origin for convenience — each dish must honour the tradition it comes from.",
  },
  {
    title: "Craft",
    icon: "◉",
    desc: "Each dish is prepared with deliberate technique — nothing half-done, nothing rushed. The wok demands full attention.",
  },
  {
    title: "Hospitality",
    icon: "◎",
    desc: "Pakistani warmth defines our service. You are not a customer here — you are a guest in our home.",
  },
  {
    title: "Freshness",
    icon: "◇",
    desc: "Seasonal, local produce forms the backbone of our daily menu. We source what is best today, not what is cheapest.",
  },
];

const MILESTONES = [
  { year: "2003", label: "Karachi", text: "Tariq begins his journey in Karachi's old Chinatown, learning wok technique from Cantonese families who've called Pakistan home for generations." },
  { year: "2010", label: "Beijing", text: "A two-year apprenticeship in Beijing exposes him to the refined northern Chinese palate — mild, precise, and deeply savoury." },
  { year: "2015", label: "Chengdu", text: "Chengdu changes everything. The numbing heat of Szechuan peppercorn fused with Pakistani chilli becomes the core of what Wokin would one day serve." },
  { year: "2023", label: "Opening", text: "Wokin opens its doors — a restaurant born from 20 years of travel, study, and an unshakeable belief that two cuisines were always meant to meet." },
];

export default function About() {
  const [activeTeam, setActiveTeam] = useState(null);

  return (
    <div style={{ paddingTop: 72 }}>

      {/* ── Hero ── */}
      <section style={{
        background: "var(--charcoal)",
        padding: "5rem clamp(1rem,7vw,7rem) 4rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 75% 50%, rgba(184,147,90,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "-20%", right: "5%",
          width: "45%", height: "140%",
          background: "rgba(184,147,90,0.03)",
          transform: "rotate(15deg)", borderRadius: "80px",
          pointerEvents: "none",
        }} />

        <motion.div initial="hidden" animate="show" variants={stagger} style={{ position: "relative", zIndex: 1 }}>
          <motion.p variants={fadeUp} className="section-label" style={{ color: "var(--gold-light)" }}>
            Our Story
          </motion.p>
          <motion.div variants={fadeUp} className="divider" />
          <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: 700, color: "var(--cream)" }}>
            About <em style={{ color: "var(--gold)" }}>Wokin</em>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: "rgba(247,243,238,.4)", maxWidth: 480, marginTop: "1rem", lineHeight: 1.85, fontSize: ".92rem" }}>
            A restaurant born from twenty years of wandering between two great food cultures — and the conviction that they belong together.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Split: Origin Story + Quote ── */}
      <section style={{ padding: "6rem clamp(1rem,7vw,7rem)", background: "var(--ivory)" }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start", maxWidth: 1060, margin: "0 auto" }}>
          <InView>
            <p className="section-label">Origin</p>
            <div className="divider" />
            <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 600, lineHeight: 1.35, marginBottom: "1.4rem" }}>
              A Culinary Bridge Between Two Great Traditions
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.95, marginBottom: "1.1rem", fontSize: ".92rem" }}>
              Wokin was founded in 2023 by Chef Tariq Mehmood, who spent two decades studying Chinese cooking — first in Karachi's Chinatown, then across the kitchens of Beijing and Chengdu.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.95, fontSize: ".92rem", marginBottom: "2rem" }}>
              Every dish tells a story of cultural convergence, where bold Pakistani spice meets the precision and restraint of Chinese culinary art.
            </p>

            {/* Two cities */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                {
                  city: "Lahore",
                  flag: "🇵🇰",
                  desc: "Bold spice, communal fire, centuries of Mughal flavour",
                  img: "https://images.unsplash.com/photo-1625216932225-90809ddb4d7d?q=80&w=600&auto=format&fit=crop",
                },
                {
                  city: "Shanghai",
                  flag: "🇨🇳",
                  desc: "Wok precision, umami depth, refined culinary artistry",
                  img: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=600&auto=format&fit=crop",
                },
              ].map((c) => (
                <div key={c.city} style={{ position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                  <img src={c.img} alt={c.city} style={{ width: "100%", height: "130px", objectFit: "cover", display: "block" }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(28,28,28,0.85) 0%, rgba(28,28,28,0.2) 60%)",
                  }} />
                  <div style={{ position: "absolute", bottom: "0.75rem", left: "0.9rem" }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: ".9rem", fontWeight: 700, color: "var(--cream)" }}>
                      {c.flag} {c.city}
                    </p>
                    <p style={{ fontSize: ".62rem", color: "rgba(247,243,238,.55)", lineHeight: 1.4, marginTop: "2px" }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </InView>

          <InView delay={0.15}>
            {/* Quote block */}
            <div style={{
              background: "var(--cream)",
              padding: "2.5rem",
              border: "1px solid var(--border)",
              borderLeft: "2px solid var(--gold)",
              position: "relative",
              marginBottom: "1.5rem",
            }}>
              <div style={{ position: "absolute", top: -7, left: -7, right: 7, bottom: 7, border: "1px solid var(--border)", zIndex: -1 }} />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.08rem", fontStyle: "italic", lineHeight: 1.9 }}>
                "The wok is a unifying tool. In Pakistan, we cook with bold fire. In China, they cook with precise fire. At Wokin, we cook with both."
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "white", fontSize: ".95rem" }}>T</span>
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: ".86rem" }}>Chef Tariq Mehmood</p>
                  <p style={{ fontSize: ".7rem", color: "var(--muted)" }}>Founder & Executive Chef</p>
                </div>
              </div>
            </div>

            {/* Kitchen image */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop"
                alt="Wokin kitchen"
                style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(28,28,28,0.5) 0%, transparent 60%)",
              }} />
              <div style={{
                position: "absolute", bottom: "1rem", left: "1.2rem",
                background: "rgba(28,28,28,0.6)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(184,147,90,0.3)",
                padding: ".45rem 1rem",
              }}>
                <p style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}>
                  Our Kitchen · Est. 2023
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* ── Journey Timeline ── */}
      <section style={{ background: "var(--charcoal)", padding: "6rem clamp(1rem,7vw,7rem)" }}>
        <InView style={{ marginBottom: "3.5rem" }}>
          <p className="section-label" style={{ color: "var(--gold-light)" }}>The Journey</p>
          <div className="divider" />
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, color: "var(--cream)" }}>
            Twenty Years in the Making
          </h2>
        </InView>

        <div style={{ position: "relative", maxWidth: 800 }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: "80px", top: 0, bottom: 0,
            width: "1px", background: "rgba(184,147,90,0.2)",
          }} />

          {MILESTONES.map((m, i) => (
            <InView key={m.year} delay={i * 0.1}>
              <div style={{ display: "flex", gap: "2.5rem", marginBottom: "2.75rem", alignItems: "flex-start" }}>
                {/* Year */}
                <div style={{ width: "80px", flexShrink: 0, textAlign: "right", paddingRight: "1.5rem", position: "relative" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>
                    {m.year}
                  </p>
                  <p style={{ fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold-light)", marginTop: 3 }}>
                    {m.label}
                  </p>
                  {/* Dot on line */}
                  <div style={{
                    position: "absolute", right: "-5px", top: "6px",
                    width: "9px", height: "9px", borderRadius: "50%",
                    background: "var(--gold)", border: "2px solid var(--charcoal)",
                  }} />
                </div>
                {/* Text */}
                <div style={{
                  flex: 1,
                  background: "var(--charcoal-soft)",
                  borderLeft: "1px solid rgba(184,147,90,0.2)",
                  padding: "1.25rem 1.5rem",
                }}>
                  <p style={{ color: "rgba(247,243,238,.55)", fontSize: ".88rem", lineHeight: 1.85 }}>
                    {m.text}
                  </p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* ── Spice & Atmosphere image break ── */}
      <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1400&auto=format&fit=crop"
          alt="spices"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, var(--charcoal) 0%, transparent 30%, transparent 70%, var(--cream) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "rgba(28,28,28,0.55)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(184,147,90,0.25)",
            padding: "1.5rem 3rem",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1rem,2.5vw,1.5rem)",
              fontStyle: "italic",
              color: "var(--cream)",
              lineHeight: 1.7,
            }}>
              "Spice is not merely heat — it is memory, identity, and culture on a plate."
            </p>
          </div>
        </div>
      </div>

      {/* ── Principles ── */}
      <section style={{ background: "var(--cream)", padding: "6rem clamp(1rem,7vw,7rem)" }}>
        <InView style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-label" style={{ textAlign: "center" }}>What We Stand For</p>
          <div className="divider divider-center" />
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600 }}>Our Principles</h2>
        </InView>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
          {PRINCIPLES.map((v, i) => (
            <InView key={v.title} delay={i * 0.1}>
              <div className="card-hover" style={{
                padding: "2.25rem 2rem",
                background: "var(--ivory)",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
                height: "100%",
              }}>
                {/* Gold corner accent */}
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "3px", height: "100%",
                  background: "var(--gold)",
                }} />
                <span style={{ fontSize: "1.5rem", color: "var(--gold)", display: "block", marginBottom: ".9rem" }}>
                  {v.icon}
                </span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: ".5rem" }}>
                  {v.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: ".83rem", lineHeight: 1.75 }}>
                  {v.desc}
                </p>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ padding: "6rem clamp(1rem,7vw,7rem)", background: "var(--ivory)" }}>
        <InView>
          <p className="section-label">Meet the Team</p>
          <div className="divider" />
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, marginBottom: ".6rem" }}>
            The People Behind Wokin
          </h2>
          <p style={{ color: "var(--muted)", fontSize: ".88rem", maxWidth: 480, lineHeight: 1.8, marginBottom: "3rem" }}>
            A small, devoted team united by one obsession — creating food that is worthy of the traditions it draws from.
          </p>
        </InView>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
          {TEAM.map((p, i) => (
            <InView key={p.name} delay={i * 0.1}>
              <div
                className="card-hover"
                onMouseEnter={() => setActiveTeam(p.name)}
                onMouseLeave={() => setActiveTeam(null)}
                style={{
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                  background: "var(--cream)",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  borderTop: activeTeam === p.name ? "2px solid var(--gold)" : "2px solid transparent",
                }}
              >
                {/* Portrait image */}
                <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
                      transition: "transform 0.5s ease",
                      transform: activeTeam === p.name ? "scale(1.06)" : "scale(1)",
                      filter: "grayscale(20%)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, var(--cream) 0%, transparent 50%)",
                  }} />
                  {/* Initial badge */}
                  <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    width: "36px", height: "36px",
                    background: "var(--charcoal)",
                    border: "1px solid var(--gold)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--gold)", fontSize: ".9rem" }}>
                      {p.initial}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "1.25rem 1.5rem 1.75rem" }}>
                  <h3 style={{ fontSize: ".9rem", fontWeight: 600, marginBottom: ".3rem" }}>{p.name}</h3>
                  <p style={{
                    fontSize: ".62rem", color: "var(--gold)",
                    letterSpacing: ".1em", textTransform: "uppercase",
                    marginBottom: ".75rem",
                  }}>{p.role}</p>
                  <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.7 }}>{p.note}</p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
        background: "var(--charcoal)",
        padding: "5rem clamp(1rem,7vw,7rem)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 100%, rgba(184,147,90,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <InView style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <p className="section-label" style={{ color: "var(--gold-light)", textAlign: "center" }}>Come Find Us</p>
          <div className="divider divider-center" />
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 600, color: "var(--cream)", marginBottom: "1rem" }}>
            A Table is Waiting for You
          </h2>
          <p style={{ color: "rgba(247,243,238,.4)", fontSize: ".9rem", lineHeight: 1.85, maxWidth: 420, margin: "0 auto 2.5rem" }}>
            Whether it's a quiet dinner for two or a celebration with family, Wokin is where stories are shared over extraordinary food.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                padding: ".9rem 2.5rem",
                background: "var(--gold)",
                border: "none",
                color: "var(--charcoal)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".78rem",
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s",
                boxShadow: "0 4px 20px rgba(184,147,90,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--gold-light)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Reserve a Table
            </button>
            <button
              style={{
                padding: ".9rem 2.5rem",
                background: "transparent",
                border: "1px solid rgba(184,147,90,0.35)",
                color: "rgba(247,243,238,.65)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".78rem",
                fontWeight: 500,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(184,147,90,0.35)"; e.currentTarget.style.color = "rgba(247,243,238,.65)"; }}
            >
              View Menu
            </button>
          </div>
        </InView>
      </section>
    </div>
  );
}