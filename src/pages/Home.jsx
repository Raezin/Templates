import { motion } from "framer-motion";
import { InView, fadeUp, stagger, Stars } from "../utils/animations";
import HeroCarousel from "../components/HeroCarousel";
import { REVIEWS } from "../data/constants";

const SIGNATURES = [
  {
    name: "Chicken Manchurian Dry",
    desc: "Our most-loved starter — crispy chicken in tangy manchurian glaze",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Hot & Sour Soup",
    desc: "A signature bowl of depth, warmth and perfect acidity",
    tag: "Signature",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mongolian Lamb",
    desc: "Wok-charred lamb with scallions, hoisin and sesame",
    tag: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Home({ setPage }) {
  return (
    <div>
      {/* Hero Carousel Section */}
      <HeroCarousel onSlideChange={(index) => console.log("Slide changed:", index)} />

      {/* Stats Section */}
      <section
        style={{
          background: "var(--cream)",
          padding: "3.5rem clamp(1rem,7vw,7rem)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "2rem",
          }}
        >
          {[
            { num: "50+", label: "Menu Items" },
            { num: "4.9", label: "Average Rating" },
            { num: "2,000+", label: "Happy Guests" },
            { num: "3", label: "Years of Excellence" },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              style={{ textAlign: "center" }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {item.num}
              </p>
              <p
                style={{
                  fontSize: ".68rem",
                  letterSpacing: ".13em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: 5,
                }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Signatures Section */}
      <section
        style={{
          padding: "6rem clamp(1rem,7vw,7rem)",
          background: "var(--ivory)",
        }}
      >
        <InView>
          <p className="section-label">From the Kitchen</p>
          <div className="divider" />
          <h2
            style={{
              fontSize: "clamp(1.6rem,4vw,2.5rem)",
              fontWeight: 600,
              maxWidth: 420,
            }}
          >
            House Signatures
          </h2>
        </InView>

        <div
          className="three-col"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.5rem",
            marginTop: "3rem",
            alignItems: "stretch",
          }}
        >
          {SIGNATURES.map((dish, i) => (
            <InView key={dish.name} delay={i * 0.1} style={{ height: "100%" }}>
              <div
                className="card-hover"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Gold left accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 3,
                    height: "100%",
                    background: "var(--gold)",
                    zIndex: 1,
                  }}
                />

                {/* Dish image */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  {/* Subtle gradient overlay at bottom of image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "60px",
                      background: "linear-gradient(to top, var(--cream), transparent)",
                    }}
                  />
                </div>

                {/* Text content */}
                <div style={{ padding: "1.5rem 2rem 2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span
                    className="menu-tag"
                    style={{ marginBottom: "0.85rem", display: "inline-block" }}
                  >
                    {dish.tag}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      marginBottom: ".5rem",
                    }}
                  >
                    {dish.name}
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: ".84rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {dish.desc}
                  </p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "6rem clamp(1rem,7vw,7rem)",
        }}
      >
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <InView>
            <p className="section-label" style={{ color: "var(--gold-light)" }}>
              Our Story
            </p>
            <div className="divider" />
            <h2
              style={{
                fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
                fontWeight: 600,
                color: "var(--cream)",
                lineHeight: 1.3,
              }}
            >
              Two Culinary Traditions,
              <br />
              <em style={{ color: "var(--gold)" }}>One Vision</em>
            </h2>
            <p
              style={{
                color: "rgba(247,243,238,.45)",
                marginTop: "1.5rem",
                lineHeight: 1.95,
                fontSize: ".92rem",
              }}
            >
              Wokin was born from a simple belief: that Pakistani and Chinese
              cuisines share a profound common language — the language of spice,
              heat, and communal warmth.
            </p>
          </InView>
          <InView delay={0.2}>
            <div
              style={{
                background: "var(--charcoal-soft)",
                borderLeft: "2px solid var(--gold)",
                padding: "2.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  left: 8,
                  bottom: 8,
                  border: "1px solid rgba(184,147,90,.1)",
                  zIndex: -1,
                }}
              />
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "var(--cream)",
                  lineHeight: 1.9,
                }}
              >
                "Food is not merely sustenance — it is memory, identity, and a
                bridge between worlds."
              </p>
              <p
                style={{
                  marginTop: "1.2rem",
                  fontSize: ".68rem",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                — Chef Tariq Mehmood, Founder
              </p>
            </div>
          </InView>
        </div>
      </section>

      {/* Reviews Teaser */}
      <section
        style={{
          padding: "6rem clamp(1rem,7vw,7rem)",
          background: "var(--cream)",
        }}
      >
        <InView style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-label" style={{ textAlign: "center" }}>
            What Guests Say
          </p>
          <div className="divider divider-center" />
          <h2
            style={{
              fontSize: "clamp(1.6rem,4vw,2.4rem)",
              fontWeight: 600,
            }}
          >
            Voices of Wokin
          </h2>
        </InView>
        <div
          className="three-col"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.5rem",
          }}
        >
          {REVIEWS.slice(0, 3).map((r, i) => (
            <InView key={r.name} delay={i * 0.1}>
              <div
                style={{
                  background: "var(--ivory)",
                  border: "1px solid var(--border)",
                  padding: "2rem",
                  height: "100%",
                }}
              >
                <Stars n={r.rating} />
                <p
                  style={{
                    marginTop: "1rem",
                    color: "var(--charcoal-soft)",
                    lineHeight: 1.85,
                    fontSize: ".87rem",
                  }}
                >
                  "{r.text}"
                </p>
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <p style={{ fontWeight: 600, fontSize: ".84rem" }}>
                    {r.name}
                  </p>
                  <p style={{ fontSize: ".7rem", color: "var(--muted)", marginTop: 2 }}>
                    {r.location} · {r.date}
                  </p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </section>
    </div>
  );
}