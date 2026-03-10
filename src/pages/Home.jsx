import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DishCarousel from "../components/DishCarousel";
import Hero from "../components/Hero";

const SIGNATURES = [
  {
    name: "Chicken Manchurian",
    desc: "Crispy wok-fried chicken in our house manchurian glaze — saucy, smoky, addictive.",
    tag: "Bestseller",
    tagColor: "#C8102E",
    emoji: "🔥",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Tom Yum Prawn",
    desc: "Thai-inspired hot & sour broth with whole prawns, lemongrass and fresh coriander.",
    tag: "Signature",
    tagColor: "#C9952A",
    emoji: "🍜",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mongolian Beef",
    desc: "Wok-charred tender beef with scallions, dark soy, hoisin and toasted sesame.",
    tag: "Chef's Pick",
    tagColor: "#E8591A",
    emoji: "🥢",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Chowmein Noodles",
    desc: "Stir-fried egg noodles with seasonal vegetables in aromatic wok sauce.",
    tag: "Family Fave",
    tagColor: "#C9952A",
    emoji: "🍝",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop",
  },
];

const STATS = [
  { num: "50+",  label: "Menu Items" },
  { num: "4.9★", label: "Avg Rating" },
  { num: "2K+",  label: "Happy Guests" },
  { num: "3",    label: "Yrs of Excellence" },
];

const REVIEWS = [
  {
    name: "Aisha K.",
    location: "Islamabad",
    date: "Feb 2025",
    rating: 5,
    text: "The Mongolian Beef was out of this world. Ambiance feels like you've been transported — dragon mural, the wok smoke, the whole vibe is unmatched in Islamabad.",
  },
  {
    name: "Bilal R.",
    location: "Rawalpindi",
    date: "Jan 2025",
    rating: 5,
    text: "Came for family dinner — the buffet spread was incredible. Dynamite Chicken, dumplings, fried rice... we cleaned every dish. Worth every rupee.",
  },
  {
    name: "Sara M.",
    location: "F-7, Islamabad",
    date: "Mar 2025",
    rating: 5,
    text: "Wokin is not just food, it's an experience. The interior is stunning, service is warm and the Tom Yum soup is genuinely the best I've had outside Thailand.",
  },
];

const EXPERIENCE_ITEMS = [
  {
    icon: "🐉",
    title: "Dragon Mural Dining",
    desc: "Dine beneath a hand-painted dragon mural — the heart of Wokin's bold Pan-Asian identity.",
  },
  {
    icon: "🔥",
    title: "Live Wok Kitchen",
    desc: "Watch your food come alive over open flame. Every dish made fresh, with real wok hei.",
  },
  {
    icon: "👨‍🍳",
    title: "Pan-Asian Mastery",
    desc: "From Thai to Chinese, Mongolian to Japanese — our chefs master the full breadth of Asia.",
  },
  {
    icon: "🏮",
    title: "Iftar & Family Buffet",
    desc: "Special Ramadan buffets and family meal packages crafted for the whole table to feast.",
  },
];

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────
   SHARED SUB-COMPONENTS
───────────────────────────────────────── */
function SectionEyebrow({ children, center = false }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      justifyContent: center ? "center" : "flex-start",
      marginBottom: "1rem",
    }}>
      {!center && <span style={{ display: "block", width: 36, height: 2, background: "#C8102E", flexShrink: 0 }} />}
      <span style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.9rem",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#E8163A",
      }}>{children}</span>
      {center && <span style={{ display: "block", width: 36, height: 2, background: "#C8102E", flexShrink: 0 }} />}
    </div>
  );
}

function StarRow({ n }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: "#C9952A", fontSize: "1.1rem" }}>★</span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION: STATS BAR
───────────────────────────────────────── */
function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      background: "#C8102E",
      padding: "2.5rem clamp(1rem, 7vw, 6rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 60px)",
        pointerEvents: "none",
      }} />
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          position: "relative",
          zIndex: 1,
        }}
        className="stats-grid"
      >
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp} style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}>{s.num}</p>
            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              marginTop: 6,
              fontWeight: 600,
            }}>{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: SIGNATURE DISHES
───────────────────────────────────────── */
function SignaturesSection({ setPage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{
      background: "#0A0A0A",
      padding: "6rem clamp(1rem, 7vw, 6rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Noto Serif SC', serif",
        fontSize: "clamp(10rem, 22vw, 20rem)",
        fontWeight: 900,
        color: "rgba(200,16,46,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>菜</div>

      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={staggerContainer}>
        <motion.div variants={fadeUp}>
          <SectionEyebrow>From The Kitchen</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
            marginBottom: "0.6rem",
          }}>
            House<br /><span style={{ color: "#C8102E" }}>Signatures</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#6B6B6B",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            maxWidth: 420,
            lineHeight: 1.75,
            marginBottom: "3rem",
          }}>
            Dishes that define us — perfected over years, ordered again and again.
          </p>
        </motion.div>

        <div className="sig-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
        }}>
          {SIGNATURES.map((dish, i) => (
            <motion.div
              key={dish.name}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                <motion.img
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.6 }}
                  src={dish.image}
                  alt={dish.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)",
                }} />
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: dish.tagColor, color: "#fff",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.75rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "4px 12px", borderRadius: "2px",
                }}>{dish.tag}</div>
                <div style={{ position: "absolute", bottom: 12, right: 14, fontSize: "1.6rem" }}>{dish.emoji}</div>
              </div>

              <div style={{ padding: "1.5rem 1.6rem 2rem" }}>
                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#F5F0E8",
                  letterSpacing: "0.04em",
                  marginBottom: "0.6rem",
                }}>{dish.name}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6B6B6B",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                }}>{dish.desc}</p>
              </div>

              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 2,
                background: "linear-gradient(90deg, #C8102E, #E8591A)",
              }} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} style={{ marginTop: "3rem", textAlign: "center" }}>
          <motion.button
            onClick={() => setPage && setPage("Menu")}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(200,16,46,0.45)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "transparent",
              border: "2px solid #C8102E",
              color: "#E8163A",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "1rem 3rem",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            Explore Full Menu →
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: EXPERIENCE
───────────────────────────────────────── */
function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{
      background: "#141414",
      padding: "6rem clamp(1rem, 7vw, 6rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, #C8102E, transparent)",
      }} />

      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={staggerContainer}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionEyebrow center>The Wokin Experience</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
            marginBottom: "1rem",
          }}>
            More Than A Meal.<br /><span style={{ color: "#C8102E" }}>A Journey.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#6B6B6B",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.75,
          }}>
            From the moment you walk in, every detail — the mural, the aroma, the flame — is designed to transport you across Asia.
          </p>
        </motion.div>

        <div className="exp-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}>
          {/* Image */}
          <motion.div variants={fadeUp} style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: "4px", overflow: "hidden", aspectRatio: "4/5" }}>
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900&auto=format&fit=crop"
                alt="Wokin interior"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(200,16,46,0.18) 0%, transparent 60%)",
              }} />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              style={{
                position: "absolute", bottom: "-1.5rem", right: "-1.5rem",
                background: "#C8102E", color: "#fff",
                padding: "1.3rem 1.6rem", borderRadius: "4px",
                boxShadow: "0 8px 40px rgba(200,16,46,0.4)",
                textAlign: "center",
              }}
            >
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", lineHeight: 1, letterSpacing: "0.04em" }}>Gulberg</p>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)", marginTop: 4, fontWeight: 600,
              }}>Greens · Islamabad</p>
            </motion.div>
          </motion.div>

          {/* Feature grid */}
          <motion.div variants={staggerContainer} style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
          }}>
            {EXPERIENCE_ITEMS.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ borderColor: "rgba(200,16,46,0.4)", y: -4 }}
                style={{
                  background: "#1E1E1E",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                  padding: "1.6rem",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.9rem" }}>{item.icon}</div>
                <h4 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: "#F5F0E8",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}>{item.title}</h4>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6B6B6B",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: FAMILY MEALS BANNER
───────────────────────────────────────── */
function FamilyMealsBanner({ setPage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      position: "relative", overflow: "hidden",
      padding: "5rem clamp(1rem, 7vw, 6rem)",
      background: "#8B0A1F",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "30%",
        transform: "translate(-50%,-50%)",
        width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(232,89,26,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        className="family-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div variants={fadeUp}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "0.8rem",
            fontWeight: 600,
          }}>Now Serving</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            color: "#fff",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
          }}>
            Family<br />Meals
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
            lineHeight: 1.75,
            maxWidth: 400,
            marginTop: "1.2rem",
          }}>
            Feed the whole table with our curated family platters — rice, mains, sides and dessert all in one glorious spread.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <motion.button
            onClick={() => setPage && setPage("Menu")}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "#fff", color: "#C8102E",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "1rem 2.5rem",
              border: "none", borderRadius: "2px", cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >View Family Menu</motion.button>
          <motion.button
            onClick={() => setPage && setPage("Reservation")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "transparent", color: "#fff",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "calc(1rem - 2px) calc(2.5rem - 2px)",
              border: "2px solid rgba(255,255,255,0.45)",
              borderRadius: "2px", cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >Book A Table</motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: ABOUT TEASER
───────────────────────────────────────── */
function AboutTeaser({ setPage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{
      background: "#0A0A0A",
      padding: "6rem clamp(1rem, 7vw, 6rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", left: "-3rem", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Noto Serif SC', serif",
        fontSize: "clamp(8rem, 18vw, 16rem)",
        fontWeight: 900, color: "rgba(200,16,46,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>火</div>

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div variants={fadeUp}>
          <SectionEyebrow>Our Story</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 5.5vw, 5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
            marginBottom: "1.5rem",
          }}>
            Two Traditions.<br /><span style={{ color: "#C8102E" }}>One Fire.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#6B6B6B",
            fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
            lineHeight: 1.85,
            marginBottom: "1.2rem",
          }}>
            Wokin was born from a simple belief — that Pakistani and Chinese cuisines share a profound common language: the language of spice, heat, and communal warmth.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#6B6B6B",
            fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
            lineHeight: 1.85,
            marginBottom: "2rem",
          }}>
            We took classic Pan-Asian recipes and elevated them — bolder flavours, premium ingredients, and a dining space that feels like a journey through Asia itself.
          </p>
          <motion.button
            onClick={() => setPage && setPage("About")}
            whileHover={{ x: 6 }}
            style={{
              background: "none", border: "none",
              color: "#C8102E",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10,
              padding: 0,
            }}
          >
            Read Our Full Story <span style={{ fontSize: "1.1rem" }}>→</span>
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.06)",
            borderLeft: "3px solid #C8102E",
            padding: "2.5rem",
            borderRadius: "0 4px 4px 0",
            position: "relative",
            marginBottom: "1.5rem",
          }}>
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
              color: "rgba(245,240,232,0.85)",
              lineHeight: 1.9,
              fontStyle: "italic",
              marginBottom: "1.5rem",
            }}>
              "Food is not merely sustenance — it is memory, identity, and a bridge between worlds. At Wokin, we cook with fire and serve with heart."
            </p>
            <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C9952A",
                fontWeight: 600,
              }}>— Chef Tariq Mehmood, Founder</p>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "4px",
            overflow: "hidden",
          }}>
            {[{ n: "50+", l: "Dishes" }, { n: "3 Yrs", l: "Serving Isb" }, { n: "100%", l: "Halal" }].map((s) => (
              <div key={s.l} style={{ background: "#141414", padding: "1.3rem", textAlign: "center" }}>
                <p style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.9rem",
                  color: "#E8163A",
                  lineHeight: 1,
                }}>{s.n}</p>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6B6B6B",
                  marginTop: 5,
                  fontWeight: 600,
                }}>{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: REVIEWS
───────────────────────────────────────── */
function ReviewsSection({ setPage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{
      background: "#141414",
      padding: "6rem clamp(1rem, 7vw, 6rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "40%", height: "1px",
        background: "linear-gradient(90deg, transparent, #C9952A, transparent)",
      }} />

      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={staggerContainer}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionEyebrow center>What Guests Say</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
          }}>
            Voices of<br /><span style={{ color: "#C9952A" }}>Wokin</span>
          </h2>
        </motion.div>

        <div className="reviews-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}>
          {REVIEWS.map((r) => (
            <motion.div
              key={r.name}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: "rgba(201,149,42,0.35)" }}
              style={{
                background: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                padding: "2rem",
                transition: "border-color 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: "0.8rem", right: "1.2rem",
                fontFamily: "'Noto Serif SC', serif",
                fontSize: "4.5rem", color: "rgba(200,16,46,0.07)",
                lineHeight: 1, userSelect: "none",
              }}>"</div>
              <StarRow n={r.rating} />
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#B0A898",
                fontSize: "1rem",
                lineHeight: 1.85,
                marginTop: "1rem",
                marginBottom: "1.5rem",
              }}>"{r.text}"</p>
              <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#F5F0E8",
                  letterSpacing: "0.04em",
                }}>{r.name}</p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: "#6B6B6B",
                  marginTop: 4,
                }}>{r.location} · {r.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
          <motion.button
            onClick={() => setPage && setPage("Reviews")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "transparent",
              border: "2px solid rgba(201,149,42,0.5)",
              color: "#C9952A",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "1rem 3rem",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >See All Reviews</motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: RESERVATION CTA
───────────────────────────────────────── */
function ReservationCTA({ setPage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      background: "#0A0A0A",
      padding: "7rem clamp(1rem, 7vw, 6rem)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
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

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div variants={fadeUp}>
          <SectionEyebrow center>Reserve Your Seat</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            color: "#F5F0E8",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
            marginBottom: "1rem",
          }}>
            Come Dine With<br /><span style={{ color: "#C8102E" }}>Us Tonight</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#6B6B6B",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            lineHeight: 1.75,
            maxWidth: 420,
            margin: "0 auto 2.5rem",
          }}>
            Gulberg Greens, Islamabad. Open daily for lunch and dinner. Walk-ins welcome — reservations recommended on weekends.
          </p>
        </motion.div>

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
              boxShadow: "0 4px 30px rgba(200,16,46,0.35)",
            }}
          >Book A Table</motion.button>
          <motion.button
            onClick={() => setPage && setPage("Contact")}
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
          >Get Directions</motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ROOT + RESPONSIVE STYLES
───────────────────────────────────────── */
export default function Home({ setPage }) {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <style>{`
        /* ── Signatures grid ── */
        .sig-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        /* ── Experience grid ── */
        .exp-grid {
          grid-template-columns: 1fr 1fr;
        }
        /* ── About grid ── */
        .about-grid {
          grid-template-columns: 1fr 1fr;
        }
        /* ── Reviews grid ── */
        .reviews-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        /* ── Stats ── */
        .stats-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        /* ── Family banner ── */
        .family-grid {
          grid-template-columns: 1fr auto;
        }

        /* ── Tablet (≤1024px) ── */
        @media (max-width: 1024px) {
          .sig-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .exp-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          .sig-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
          .family-grid {
            grid-template-columns: 1fr !important;
          }
          .exp-grid > div:first-child {
            display: none;
          }
        }

        /* ── Small mobile (≤480px) ── */
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      <Hero/>
      <StatsSection />
      <DishCarousel onSlideChange={(index) => console.log("Slide:", index)} />
      {/* <SignaturesSection setPage={setPage} /> */}

      {/* Fire divider */}
      {/* <div style={{ background: "#141414", padding: "0 clamp(1rem, 7vw, 6rem)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "3rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(200,16,46,0.4))" }} />
          <span style={{ fontSize: "1.4rem" }}>🔥</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(200,16,46,0.4))" }} />
        </div>
      </div> */}

      <ExperienceSection />
      <FamilyMealsBanner setPage={setPage} />
      <AboutTeaser setPage={setPage} />
      <ReviewsSection setPage={setPage} />
      <ReservationCTA setPage={setPage} />
    </div>
  );
}