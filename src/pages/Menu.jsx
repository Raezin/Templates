import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../utils/animations";
import { MENU } from "../data/constants";

// Category metadata: hero image, description, icon
const CATEGORY_META = {
  Starters: {
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1400&auto=format&fit=crop",
    desc: "Bold beginnings — wok-kissed bites that awaken the palate with spice and crunch.",
    icon: "🥢",
    color: "#B8935A",
  },
  Soups: {
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1400&auto=format&fit=crop",
    desc: "Slow-simmered broths with depth — each bowl a story of warmth and tradition.",
    icon: "🍜",
    color: "#8B6914",
  },
  Mains: {
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop",
    desc: "The heart of the kitchen — wok-charred, flame-kissed, and deeply spiced.",
    icon: "🍛",
    color: "#7A3B2E",
  },
  Rice: {
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1400&auto=format&fit=crop",
    desc: "Fragrant, perfectly seasoned — the foundation of every great meal.",
    icon: "🍚",
    color: "#5A7A3A",
  },
  Noodles: {
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=1400&auto=format&fit=crop",
    desc: "Hand-tossed, wok-fried — tangled in sauces that linger long after the last bite.",
    icon: "🍝",
    color: "#6B4C9A",
  },
  Desserts: {
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1400&auto=format&fit=crop",
    desc: "Sweet finales — delicate, indulgent, and worth every morsel.",
    icon: "🍮",
    color: "#9A4C6B",
  },
};

// Per-dish images keyed by dish name — fallback to category image
const DISH_IMAGES = {
  "Chicken Manchurian Dry":    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600&auto=format&fit=crop",
  "Spring Rolls":               "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
  "Crispy Wontons":             "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
  "Chicken Satay":              "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=600&auto=format&fit=crop",
  "Hot & Sour Soup":            "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop",
  "Manchow Soup":               "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop",
  "Sweet Corn Soup":            "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?q=80&w=600&auto=format&fit=crop",
  "Mongolian Lamb":             "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
  "Szechuan Prawns":            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
  "Kung Pao Chicken":           "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop",
  "Beef in Black Bean Sauce":   "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&auto=format&fit=crop",
  "Egg Fried Rice":             "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop",
  "Yang Chow Fried Rice":       "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=600&auto=format&fit=crop",
  "Chicken Fried Rice":         "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
  "Chow Mein":                  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=600&auto=format&fit=crop",
  "Singapore Noodles":          "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=600&auto=format&fit=crop",
  "Mango Pudding":              "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&auto=format&fit=crop",
  "Fried Ice Cream":            "https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=600&auto=format&fit=crop",
};

const getFallbackImage = (cat) =>
  CATEGORY_META[cat]?.image ||
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600&auto=format&fit=crop";

export default function Menu() {
  const [active, setActive] = useState("Starters");
  const [hoveredItem, setHoveredItem] = useState(null);
  const cats = Object.keys(MENU);
  const meta = CATEGORY_META[active] || {};

  return (
    <div style={{ paddingTop: 72, background: "var(--ivory)" }}>

      {/* ── Page Hero ── */}
      <section style={{ background: "var(--charcoal)", padding: "5rem clamp(1rem,7vw,7rem) 4rem", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 80% 50%, rgba(184,147,90,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", top: "-20%", right: "5%", width: "45%", height: "140%", background: "rgba(184,147,90,0.03)", transform: "rotate(15deg)", borderRadius: "80px", pointerEvents: "none" }} />

        <motion.div initial="hidden" animate="show" variants={stagger} style={{ position: "relative", zIndex: 1 }}>
          <motion.p variants={fadeUp} className="section-label" style={{ color: "var(--gold-light)" }}>
            Explore
          </motion.p>
          <motion.div variants={fadeUp} className="divider" />
          <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: 700, color: "var(--cream)" }}>
            Our Menu
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: "rgba(247,243,238,.4)", maxWidth: 460, marginTop: "1rem", lineHeight: 1.85 }}>
            Every dish crafted from seasonal ingredients, inspired by the streets of Lahore and the kitchens of Shanghai.
          </motion.p>

          {/* Quick stats row */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
            {[["50+", "Dishes"], ["6", "Categories"], ["Daily", "Fresh Ingredients"], ["Halal", "Certified"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{n}</p>
                <p style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(247,243,238,.35)", marginTop: 4 }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Sticky Category Tabs ── */}
      <div style={{
        background: "var(--cream)",
        borderBottom: "1px solid var(--border)",
        padding: "0 clamp(1rem,7vw,7rem)",
        position: "sticky", top: 72, zIndex: 50, overflowX: "auto",
      }}>
        <div className="menu-tabs" style={{ display: "flex" }}>
          {cats.map((cat) => {
            const m = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: "1.1rem 1.2rem",
                  background: "none",
                  border: "none",
                  borderBottom: active === cat ? "2px solid var(--gold)" : "2px solid transparent",
                  color: active === cat ? "var(--gold)" : "var(--muted)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: ".72rem",
                  letterSpacing: ".13em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all .2s",
                  display: "flex",
                  alignItems: "center",
                  gap: ".4rem",
                }}
              >
                <span style={{ fontSize: ".85rem" }}>{m?.icon}</span>
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
          style={{
            position: "relative",
            height: "220px",
            overflow: "hidden",
          }}
        >
          <img
            src={meta.image}
            alt={active}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
          />
          {/* Dark overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(28,28,28,0.85) 0%, rgba(28,28,28,0.5) 50%, rgba(28,28,28,0.2) 100%)",
          }} />
          {/* Gold bottom fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
            background: "linear-gradient(to top, var(--ivory), transparent)",
          }} />

          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center",
            padding: "0 clamp(1rem,7vw,7rem)",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".5rem" }}>
                <span style={{ fontSize: "1.8rem" }}>{meta.icon}</span>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem,4vw,2.6rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  lineHeight: 1,
                }}>
                  {active}
                </h2>
              </div>
              <p style={{
                color: "rgba(247,243,238,.65)",
                fontSize: ".85rem",
                maxWidth: 400,
                lineHeight: 1.7,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {meta.desc}
              </p>
              <p style={{
                marginTop: ".6rem",
                fontSize: ".62rem",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}>
                {MENU[active]?.length} dishes available
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Menu Grid ── */}
      <section style={{ padding: "2.5rem clamp(1rem,7vw,7rem) 5rem", background: "var(--ivory)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}>
              {(MENU[active] || []).map((item, i) => {
                const imgSrc = DISH_IMAGES[item.name] || getFallbackImage(active);
                const isHovered = hoveredItem === `${active}-${i}`;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    onMouseEnter={() => setHoveredItem(`${active}-${i}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      background: isHovered ? "var(--cream)" : "var(--ivory)",
                      border: "1px solid var(--border)",
                      borderTop: isHovered ? `2px solid var(--gold)` : "2px solid transparent",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: isHovered ? "0 16px 48px rgba(0,0,0,0.08)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "default",
                    }}
                  >
                    {/* Dish image */}
                    <div style={{ width: "100%", height: "180px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                      <img
                        src={imgSrc}
                        alt={item.name}
                        style={{
                          width: "100%", height: "100%", objectFit: "cover",
                          transition: "transform 0.5s ease",
                          transform: isHovered ? "scale(1.07)" : "scale(1)",
                        }}
                      />
                      {/* Gradient fade into card */}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "70px",
                        background: `linear-gradient(to top, ${isHovered ? "var(--cream)" : "var(--ivory)"}, transparent)`,
                        transition: "background 0.3s",
                      }} />
                      {/* Tag badge on image */}
                      {item.tag && (
                        <div style={{
                          position: "absolute", top: "0.75rem", right: "0.75rem",
                          background: "var(--charcoal)",
                          border: "1px solid var(--gold)",
                          padding: "2px 10px",
                          fontSize: ".6rem",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                        }}>
                          {item.tag}
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "1.25rem 1.5rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Name + price row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: ".5rem" }}>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--charcoal)",
                          lineHeight: 1.3,
                          flex: 1,
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          color: "var(--gold)",
                          whiteSpace: "nowrap",
                          fontSize: "1rem",
                          flexShrink: 0,
                        }}>
                          {item.price}
                        </p>
                      </div>

                      {/* Description */}
                      <p style={{
                        color: "var(--muted)",
                        fontSize: ".82rem",
                        lineHeight: 1.75,
                        flex: 1,
                      }}>
                        {item.desc}
                      </p>

                      {/* Bottom row */}
                      <div style={{
                        marginTop: "1.1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid var(--border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        {/* Spice / dietary indicators */}
                        <div style={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
                          {item.spicy && (
                            <span title="Spicy" style={{ fontSize: ".75rem" }}>🌶️</span>
                          )}
                          {item.vegetarian && (
                            <span title="Vegetarian" style={{
                              fontSize: ".55rem", letterSpacing: ".08em", textTransform: "uppercase",
                              color: "#5A7A3A", border: "1px solid #5A7A3A", padding: "1px 6px",
                              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                            }}>Veg</span>
                          )}
                          {!item.spicy && !item.vegetarian && (
                            <span style={{
                              fontSize: ".55rem", letterSpacing: ".08em", textTransform: "uppercase",
                              color: "var(--muted)", fontFamily: "'DM Sans', sans-serif",
                            }}>Halal</span>
                          )}
                        </div>

                        {/* Order CTA */}
                        <button style={{
                          background: "none",
                          border: "1px solid var(--border)",
                          color: isHovered ? "var(--gold)" : "var(--muted)",
                          borderColor: isHovered ? "var(--gold)" : "var(--border)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: ".62rem",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          padding: ".35rem .85rem",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}>
                          Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Chef's Note ── */}
        <motion.div
          key={`note-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            marginTop: "4rem",
            background: "var(--charcoal)",
            borderLeft: "2px solid var(--gold)",
            padding: "2rem 2.5rem",
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>👨‍🍳</span>
          <div>
            <p style={{
              fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase",
              color: "var(--gold)", marginBottom: ".5rem", fontFamily: "'DM Sans', sans-serif",
            }}>
              Chef's Note · {active}
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: ".95rem",
              color: "rgba(247,243,238,.7)",
              lineHeight: 1.85,
              maxWidth: 620,
            }}>
              {active === "Starters" && "\"Every great meal begins with anticipation. Our starters are designed to awaken — bold spice, perfect texture, and the promise of what's to come.\""}
              {active === "Soups" && "\"A soup must speak quietly but deeply. We simmer our broths for hours so that every sip carries the full weight of tradition.\""}
              {active === "Mains" && "\"The wok is not a pan — it is an instrument. High heat, precise timing, and decades of instinct go into every main we serve.\""}
              {active === "Rice" && "\"Perfect rice is an art form. Washed three times, rested, and cooked with restraint — it is the canvas on which everything else is painted.\""}
              {active === "Noodles" && "\"Noodles carry memory. Whether tossed in our Szechuan oil or wok-fried with vegetables, each strand holds a piece of two traditions.\""}
              {active === "Desserts" && "\"We believe a meal isn't finished until the last note is sweet. Our desserts are small in portion but generous in pleasure.\""}
              {!["Starters","Soups","Mains","Rice","Noodles","Desserts"].includes(active) && "\"Every dish on this menu has been tasted, refined, and tasted again — until it meets the standard we set for ourselves and for you.\""}
            </p>
            <p style={{
              marginTop: "1rem", fontSize: ".62rem", letterSpacing: ".15em",
              textTransform: "uppercase", color: "var(--gold-light)",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              — Chef Tariq Mehmood
            </p>
          </div>
        </motion.div>

        {/* ── Allergen note ── */}
        <p style={{
          marginTop: "2rem",
          fontSize: ".7rem",
          color: "var(--muted)",
          lineHeight: 1.7,
          maxWidth: 600,
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
        }}>
          🌿 All dishes are prepared in a Halal-certified kitchen. Please inform your server of any allergies or dietary requirements. Menu items and prices may change seasonally.
        </p>
      </section>
    </div>
  );
}