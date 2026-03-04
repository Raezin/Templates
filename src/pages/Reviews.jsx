import { motion } from "framer-motion";
import { fadeUp, stagger, InView, Stars } from "../utils/animations";
import { REVIEWS } from "../data/constants";

export default function Reviews() {
  return (
    <div style={{ paddingTop: 72 }}>
      <section
        style={{
          background: "var(--charcoal)",
          padding: "5rem clamp(1rem,7vw,7rem) 4rem",
        }}
      >
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="section-label"
            style={{ color: "var(--gold-light)" }}
          >
            Guest Experiences
          </motion.p>
          <motion.div variants={fadeUp} className="divider" />
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2rem,6vw,4rem)",
              fontWeight: 700,
              color: "var(--cream)",
            }}
          >
            Reviews
          </motion.h1>
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".9rem",
              marginTop: "1.2rem",
            }}
          >
            <Stars n={5} />
            <span style={{ color: "rgba(247,243,238,.4)", fontSize: ".86rem" }}>
              4.9 average across 2,000+ guests
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section
        style={{
          background: "var(--cream)",
          padding: "3rem clamp(1rem,7vw,7rem)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="rating-row"
          style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}
        >
          {[
            { label: "Food Quality", pct: 97 },
            { label: "Service", pct: 95 },
            { label: "Ambiance", pct: 94 },
            { label: "Value", pct: 91 },
          ].map((item) => (
            <div key={item.label} style={{ flex: "1 1 130px", minWidth: 120 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span
                  style={{
                    fontSize: ".7rem",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: ".7rem",
                    fontWeight: 600,
                    color: "var(--gold)",
                  }}
                >
                  {item.pct}%
                </span>
              </div>
              <div
                style={{ height: 2, background: "var(--border)", borderRadius: 2 }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  style={{
                    height: "100%",
                    background: "var(--gold)",
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "5rem clamp(1rem,7vw,7rem)",
          background: "var(--ivory)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
            gap: "1.5rem",
          }}
        >
          {REVIEWS.map((r, i) => (
            <InView key={r.name} delay={(i % 3) * 0.1}>
              <div
                style={{
                  border: "1px solid var(--border)",
                  padding: "2rem",
                  background: "var(--cream)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                    gap: ".5rem",
                  }}
                >
                  <Stars n={r.rating} />
                  <span style={{ fontSize: ".67rem", color: "var(--muted)" }}>
                    {r.date}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--charcoal-soft)",
                    lineHeight: 1.85,
                    fontSize: ".86rem",
                  }}
                >
                  "{r.text}"
                </p>
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: ".5rem",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, fontSize: ".84rem" }}>
                      {r.name}
                    </p>
                    <p
                      style={{
                        fontSize: ".7rem",
                        color: "var(--gold)",
                        marginTop: 2,
                      }}
                    >
                      {r.location}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: ".6rem",
                      background: "rgba(184,147,90,.08)",
                      color: "var(--gold)",
                      padding: "3px 9px",
                      border: "1px solid rgba(184,147,90,.28)",
                      letterSpacing: ".07em",
                      textTransform: "uppercase",
                    }}
                  >
                    Verified Guest
                  </div>
                </div>
              </div>
            </InView>
          ))}
        </div>
        <InView>
          <div
            style={{
              marginTop: "3rem",
              padding: "3rem clamp(1rem,4vw,3rem)",
              background: "var(--charcoal)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                color: "var(--cream)",
                marginBottom: ".7rem",
              }}
            >
              Dined with us recently?
            </p>
            <p
              style={{
                color: "rgba(247,243,238,.4)",
                fontSize: ".86rem",
                marginBottom: "1.5rem",
              }}
            >
              We'd love to hear about your experience.
            </p>
            <button
              style={{
                padding: "12px 30px",
                background: "var(--gold)",
                border: "none",
                color: "var(--charcoal)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".77rem",
                letterSpacing: ".13em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Write a Review
            </button>
          </div>
        </InView>
      </section>
    </div>
  );
}