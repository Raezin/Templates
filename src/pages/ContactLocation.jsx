import { motion } from "framer-motion";
import { fadeUp, stagger, InView } from "../utils/animations";

export default function ContactLocation() {
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
            Get In Touch
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
            Contact & Location
          </motion.h1>
        </motion.div>
      </section>

      <section
        style={{
          padding: "6rem clamp(1rem,7vw,7rem)",
          background: "var(--ivory)",
        }}
      >
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            maxWidth: 1060,
            margin: "0 auto",
          }}
        >
          <InView>
            <p className="section-label">Contact Us</p>
            <div className="divider" />
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "2rem",
              }}
            >
              We'd Love to Hear From You
            </h2>
            {[
              {
                icon: "📍",
                label: "Address",
                value:
                  "12 Liberty Market Road\nGulberg III, Lahore\nPunjab, Pakistan",
              },
              {
                icon: "📞",
                label: "Phone",
                value: "+92 42 3500 0000\n+92 300 000 0000",
              },
              {
                icon: "✉️",
                label: "Email",
                value: "hello@wokin.pk\nreservations@wokin.pk",
              },
              {
                icon: "🕐",
                label: "Hours",
                value:
                  "Mon–Sun: 12:00 PM – 11:00 PM\nLunch 12–3 PM  ·  Dinner 7–11 PM",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  marginBottom: "1.75rem",
                }}
              >
                <span style={{ fontSize: "1rem", marginTop: 2 }}>
                  {item.icon}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: ".67rem",
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </p>
                  {item.value.split("\n").map((l, i) => (
                    <p
                      key={i}
                      style={{
                        color: "var(--muted)",
                        fontSize: ".86rem",
                        lineHeight: 1.8,
                      }}
                    >
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </InView>

          <InView delay={0.15}>
            <div
              style={{
                background: "var(--cream)",
                border: "1px solid var(--border)",
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
                {[33, 66].map((y) => (
                  <div
                    key={y}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: `${y}%`,
                      height: 1,
                      background: "var(--muted)",
                    }}
                  />
                ))}
                {[20, 40, 60, 80].map((x) => (
                  <div
                    key={x}
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: `${x}%`,
                      width: 1,
                      background: "var(--muted)",
                    }}
                  />
                ))}
              </div>
              <div style={{ position: "relative", textAlign: "center" }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    background: "var(--red-acc)",
                    borderRadius: "50%",
                    margin: "0 auto 7px",
                    boxShadow: "0 0 0 5px rgba(139,46,46,.2)",
                  }}
                />
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: ".86rem" }}>
                  Wokin Restaurant
                </p>
                <p style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: 3 }}>
                  Gulberg III, Lahore
                </p>
              </div>
            </div>
            <h3
              style={{
                fontSize: ".92rem",
                fontWeight: 600,
                marginBottom: "1.2rem",
              }}
            >
              Send a Message
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".85rem",
              }}
            >
              <input
                type="text"
                className="input-field"
                placeholder="Your name"
              />
              <input
                type="email"
                className="input-field"
                placeholder="Email address"
              />
              <textarea
                className="input-field"
                rows={4}
                placeholder="Your message..."
                style={{ resize: "vertical" }}
              />
              <button
                style={{
                  padding: "13px",
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
                Send Message
              </button>
            </div>
          </InView>
        </div>
      </section>
    </div>
  );
}