import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU } from "../data/constants";

/* ─────────────────────────────────────────
   CATEGORY METADATA
───────────────────────────────────────── */
const CATEGORY_META = {
  Starters: {
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1400&auto=format&fit=crop",
    desc: "Bold beginnings — wok-kissed bites that awaken the palate with spice and crunch.",
    icon: "🥢",
    accentColor: "#C8102E",
  },
  Soups: {
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1400&auto=format&fit=crop",
    desc: "Slow-simmered broths with depth — each bowl a story of warmth and tradition.",
    icon: "🍜",
    accentColor: "#E8591A",
  },
  Mains: {
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop",
    desc: "The heart of the kitchen — wok-charred, flame-kissed, and deeply spiced.",
    icon: "🍛",
    accentColor: "#C8102E",
  },
  Rice: {
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1400&auto=format&fit=crop",
    desc: "Fragrant, perfectly seasoned — the foundation of every great meal.",
    icon: "🍚",
    accentColor: "#C9952A",
  },
  Noodles: {
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=1400&auto=format&fit=crop",
    desc: "Hand-tossed, wok-fried — tangled in sauces that linger long after the last bite.",
    icon: "🍝",
    accentColor: "#E8591A",
  },
  Desserts: {
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1400&auto=format&fit=crop",
    desc: "Sweet finales — delicate, indulgent, and worth every morsel.",
    icon: "🍮",
    accentColor: "#C9952A",
  },
};

const DISH_IMAGES = {
  "Chicken Manchurian Dry":   "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600&auto=format&fit=crop",
  "Spring Rolls":              "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
  "Crispy Wontons":            "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
  "Chicken Satay":             "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=600&auto=format&fit=crop",
  "Hot & Sour Soup":           "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop",
  "Manchow Soup":              "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop",
  "Sweet Corn Soup":           "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?q=80&w=600&auto=format&fit=crop",
  "Mongolian Lamb":            "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
  "Szechuan Prawns":           "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
  "Kung Pao Chicken":          "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop",
  "Beef in Black Bean Sauce":  "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&auto=format&fit=crop",
  "Egg Fried Rice":            "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop",
  "Yang Chow Fried Rice":      "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=600&auto=format&fit=crop",
  "Chicken Fried Rice":        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
  "Chow Mein":                 "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=600&auto=format&fit=crop",
  "Singapore Noodles":         "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=600&auto=format&fit=crop",
  "Mango Pudding":             "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&auto=format&fit=crop",
  "Fried Ice Cream":           "https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=600&auto=format&fit=crop",
};

const CHEF_NOTES = {
  Starters: "Every great meal begins with anticipation. Our starters are designed to awaken — bold spice, perfect texture, and the promise of what's to come.",
  Soups:    "A soup must speak quietly but deeply. We simmer our broths for hours so that every sip carries the full weight of tradition.",
  Mains:    "The wok is not a pan — it is an instrument. High heat, precise timing, and decades of instinct go into every main we serve.",
  Rice:     "Perfect rice is an art form. Washed three times, rested, and cooked with restraint — it is the canvas on which everything else is painted.",
  Noodles:  "Noodles carry memory. Whether tossed in our Szechuan oil or wok-fried with vegetables, each strand holds a piece of two traditions.",
  Desserts: "We believe a meal isn't finished until the last note is sweet. Our desserts are small in portion but generous in pleasure.",
};

const getFallback = (cat) =>
  CATEGORY_META[cat]?.image ||
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600&auto=format&fit=crop";

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────
   DISH CARD
───────────────────────────────────────── */
function DishCard({ item, cat, index, accentColor }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = DISH_IMAGES[item.name] || getFallback(cat);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#141414",
        border: `1px solid ${hovered ? "rgba(200,16,46,0.3)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "4px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,16,46,0.15)" : "none",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.35s",
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={imgSrc}
          alt={item.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,20,20,0.88) 0%, rgba(20,20,20,0.1) 55%, transparent 100%)",
        }} />

        {/* Tag */}
        {item.tag && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            background: accentColor, color: "#fff",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "4px 12px", borderRadius: "2px",
          }}>{item.tag}</div>
        )}

        {/* Dietary */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          display: "flex", gap: 5, flexDirection: "column", alignItems: "flex-end",
        }}>
          {item.spicy && <span style={{ fontSize: "1rem" }}>🌶️</span>}
          {item.vegetarian && (
            <span style={{
              background: "rgba(90,122,58,0.9)", color: "#fff",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "3px 8px", borderRadius: "2px",
            }}>Veg</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.4rem 1.5rem 1.7rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Name + price */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.6rem",
        }}>
          <h3 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1.2rem", fontWeight: 700,
            color: "#F5F0E8", letterSpacing: "0.03em",
            lineHeight: 1.25, flex: 1,
          }}>{item.name}</h3>
          <p style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.3rem", letterSpacing: "0.06em",
            color: "#C9952A", whiteSpace: "nowrap", flexShrink: 0,
          }}>{item.price}</p>
        </div>

        {/* Desc */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#6B6B6B", fontSize: "0.95rem",
          lineHeight: 1.75, flex: 1,
        }}>{item.desc}</p>

        {/* Bottom row */}
        <div style={{
          marginTop: "1.1rem", paddingTop: "0.9rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.72rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#3D3D3D", fontWeight: 600,
          }}>🌿 Halal</span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: hovered ? accentColor : "transparent",
              border: `1px solid ${hovered ? accentColor : "rgba(255,255,255,0.12)"}`,
              color: hovered ? "#fff" : "#6B6B6B",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.78rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "0.4rem 1.1rem", borderRadius: "2px",
              cursor: "pointer", transition: "all 0.25s",
            }}
          >Order Now</motion.button>
        </div>
      </div>

      {/* Hover accent bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: hovered ? 2 : 0,
        background: `linear-gradient(90deg, ${accentColor}, #E8591A)`,
        transition: "height 0.3s ease",
      }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN MENU PAGE
───────────────────────────────────────── */
export default function Menu() {
  const [active, setActive] = useState("Starters");
  const cats = Object.keys(MENU);
  const meta = CATEGORY_META[active] || {};
  const accentColor = meta.accentColor || "#C8102E";

  return (
    <>
      <style>{`
        /* ── Category tabs scrollbar hide ── */
        .menu-tabs-bar::-webkit-scrollbar { display: none; }

        /* ── Menu grid responsive ── */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .menu-stats-row {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .menu-grid {
            grid-template-columns: 1fr !important;
          }
          .menu-stats-row {
            gap: 1.5rem !important;
          }
          .menu-chef-note {
            flex-direction: column !important;
            gap: 1rem !important;
          }
        }
      `}</style>

      <div style={{ paddingTop: 76, background: "#0A0A0A", minHeight: "100vh" }}>

        {/* ── Page Hero ── */}
        <section style={{
          background: "#0A0A0A",
          padding: "5rem clamp(1rem, 7vw, 6rem) 4rem",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Watermark */}
          <div style={{
            position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(8rem, 20vw, 18rem)",
            fontWeight: 900, color: "rgba(200,16,46,0.04)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>菜单</div>

          {/* Top line glow */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "60%", height: "1px",
            background: "linear-gradient(90deg, transparent, #C8102E, transparent)",
          }} />

          <motion.div
            initial="hidden" animate="show" variants={stagger}
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: "1.2rem",
            }}>
              <span style={{ display: "block", width: 36, height: 2, background: "#C8102E" }} />
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8163A",
              }}>Explore</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              color: "#F5F0E8", lineHeight: 0.88,
              letterSpacing: "0.04em", marginBottom: "1.4rem",
            }}>
              Our<br /><span style={{ color: "#C8102E" }}>Menu</span>
            </motion.h1>

            {/* Desc */}
            <motion.p variants={fadeUp} style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6B6B6B",
              fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
              maxWidth: 440, lineHeight: 1.85, marginBottom: "2.5rem",
            }}>
              Every dish crafted from premium ingredients, inspired by the streets of Lahore and the kitchens of Shanghai.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="menu-stats-row">
              {[["50+", "Dishes"], ["6", "Categories"], ["Daily", "Fresh Prep"], ["100%", "Halal"]].map(([n, l]) => (
                <div key={l}>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                    color: "#E8163A", lineHeight: 1, letterSpacing: "0.04em",
                  }}>{n}</p>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.78rem", letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "#3D3D3D",
                    marginTop: 5, fontWeight: 600,
                  }}>{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Sticky Category Tabs ── */}
        <div
          className="menu-tabs-bar"
          style={{
            background: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            padding: "0 clamp(1rem, 7vw, 6rem)",
            position: "sticky", top: 76, zIndex: 50,
            overflowX: "auto", scrollbarWidth: "none",
          }}
        >
          <div style={{ display: "flex", minWidth: "max-content" }}>
            {cats.map((cat) => {
              const m = CATEGORY_META[cat];
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: "1.1rem 1.4rem",
                    background: "none", border: "none",
                    borderBottom: isActive
                      ? `2px solid ${m?.accentColor || "#C8102E"}`
                      : "2px solid transparent",
                    color: isActive ? "#F5F0E8" : "#3D3D3D",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.9rem",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    fontWeight: 700, cursor: "pointer",
                    whiteSpace: "nowrap", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#6B6B6B"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#3D3D3D"; }}
                >
                  <span style={{ fontSize: "1rem" }}>{m?.icon}</span>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Category Banner ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`banner-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "relative", height: "clamp(180px, 28vw, 280px)", overflow: "hidden" }}
          >
            <img
              src={meta.image} alt={active}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center 40%", display: "block",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.3) 100%)",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
              background: "linear-gradient(to top, #0A0A0A, transparent)",
            }} />

            {/* Banner content */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center",
              padding: "0 clamp(1rem, 7vw, 6rem)",
            }}>
              <div>
                <div style={{
                  display: "flex", alignItems: "center",
                  gap: "0.9rem", marginBottom: "0.7rem",
                }}>
                  <span style={{ fontSize: "2.2rem" }}>{meta.icon}</span>
                  <h2 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.2rem, 5vw, 4rem)",
                    color: "#F5F0E8", lineHeight: 1, letterSpacing: "0.06em",
                  }}>{active}</h2>
                </div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(245,240,232,0.65)",
                  fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                  maxWidth: 420, lineHeight: 1.7,
                }}>{meta.desc}</p>
                <p style={{
                  marginTop: "0.7rem",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.82rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", color: accentColor, fontWeight: 700,
                }}>{MENU[active]?.length} dishes available</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Menu Grid ── */}
        <section style={{
          padding: "3rem clamp(1rem, 7vw, 6rem) 6rem",
          background: "#0A0A0A",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="menu-grid">
                {(MENU[active] || []).map((item, i) => (
                  <DishCard
                    key={item.name}
                    item={item}
                    cat={active}
                    index={i}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Chef's Note ── */}
          <motion.div
            key={`note-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="menu-chef-note"
            style={{
              marginTop: "4rem",
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.06)",
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: "0 4px 4px 0",
              padding: "2.2rem 2.8rem",
              display: "flex",
              gap: "1.5rem",
              alignItems: "flex-start",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* BG watermark */}
            <div style={{
              position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)",
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "7rem", color: "rgba(200,16,46,0.05)",
              lineHeight: 1, userSelect: "none", pointerEvents: "none",
            }}>廚</div>

            <span style={{ fontSize: "2rem", flexShrink: 0 }}>👨‍🍳</span>

            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.82rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: accentColor,
                marginBottom: "0.7rem", fontWeight: 700,
              }}>Chef's Note · {active}</p>
              <p style={{
                fontFamily: "'Noto Serif SC', serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                color: "rgba(245,240,232,0.65)",
                lineHeight: 1.9, maxWidth: 640,
              }}>
                "{CHEF_NOTES[active] || "Every dish on this menu has been tasted, refined, and tasted again — until it meets the standard we set for ourselves and for you."}"
              </p>
              <p style={{
                marginTop: "1rem",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.82rem", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#C9952A", fontWeight: 700,
              }}>— Chef Tariq Mehmood, Founder</p>
            </div>
          </motion.div>

          {/* ── Allergen Note ── */}
          <p style={{
            marginTop: "2rem",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem", color: "#3D3D3D",
            lineHeight: 1.75, maxWidth: 620,
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}>
            🌿 All dishes are prepared in a Halal-certified kitchen. Please inform your server of any allergies or dietary requirements. Menu items and prices may change seasonally.
          </p>
        </section>
      </div>
    </>
  );
}