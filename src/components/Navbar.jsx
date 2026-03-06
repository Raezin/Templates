import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "../data/constants";

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function WokinLogo({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <div style={{
        width: 44,
        height: 44,
        background: "#C8102E",
        borderRadius: "50% 50% 40% 40%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.4rem",
        flexShrink: 0,
        boxShadow: "0 0 20px rgba(200,16,46,0.55)",
      }}>
        🔥
      </div>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "2.2rem",
        lineHeight: 1,
        letterSpacing: "0.08em",
        color: "#F5F0E8",
      }}>
        W<span style={{ color: "#C8102E" }}>O</span>KIN
      </span>
    </button>
  );
}

function Hamburger({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        justifyContent: "center",
      }}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7, width: 28 } : { rotate: 0, y: 0, width: 28 }}
        transition={{ duration: 0.25 }}
        style={{ display: "block", height: 2.5, background: "#F5F0E8", transformOrigin: "center", borderRadius: 2 }}
      />
      <motion.span
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: "block", height: 2.5, width: 18, background: "#F5F0E8", borderRadius: 2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7, width: 28 } : { rotate: 0, y: 0, width: 28 }}
        transition={{ duration: 0.25 }}
        style={{ display: "block", height: 2.5, background: "#F5F0E8", transformOrigin: "center", borderRadius: 2 }}
      />
    </button>
  );
}

export default function Navbar({ page, setPage }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const isHero = page === "Home" && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          background: isHero ? "transparent" : "rgba(10,10,10,0.96)",
          backdropFilter: isHero ? "none" : "blur(20px)",
          WebkitBackdropFilter: isHero ? "none" : "blur(20px)",
          borderBottom: isHero ? "none" : "1px solid rgba(200,16,46,0.2)",
          boxShadow: isHero ? "none" : "0 4px 30px rgba(0,0,0,0.6)",
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          padding: "0 clamp(1rem, 5vw, 4rem)",
        }}
      >
        {!isHero && (
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, #C8102E 30%, #E8591A 70%, transparent 100%)",
          }} />
        )}

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: isHero ? 88 : 76,
          transition: "height 0.35s ease",
        }}>
          <WokinLogo onClick={() => { setPage("Home"); setOpen(false); }} />

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {NAV_ITEMS.map((item) => {
              const isActive = page === item;
              return (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.6rem 1rem",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isActive ? "#E8163A" : isHero ? "rgba(255,255,255,0.85)" : "rgba(245,240,232,0.7)",
                    position: "relative",
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#F5F0E8"; }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = isHero
                      ? "rgba(255,255,255,0.85)" : "rgba(245,240,232,0.7)";
                  }}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-line"
                      style={{
                        position: "absolute",
                        bottom: 0, left: "1rem", right: "1rem",
                        height: 2,
                        background: "#C8102E",
                        borderRadius: 1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            <motion.button
              onClick={() => setPage("Reservation")}
              whileHover={{ scale: 1.04, boxShadow: "0 6px 28px rgba(200,16,46,0.5)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginLeft: "1rem",
                background: "#C8102E",
                color: "#fff",
                border: "none",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "0.65rem 1.6rem",
                borderRadius: "2px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(200,16,46,0.3)",
              }}
            >
              Reserve
            </motion.button>
          </div>

          <div className="mobile-nav-btn">
            <Hamburger open={open} onClick={() => setOpen(o => !o)} />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 198,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(4px)",
              }}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed",
                top: 0, right: 0, bottom: 0,
                width: "min(340px, 88vw)",
                zIndex: 199,
                background: "#0A0A0A",
                borderLeft: "1px solid rgba(200,16,46,0.25)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div style={{ height: 3, background: "linear-gradient(90deg, #C8102E, #E8591A)", flexShrink: 0 }} />

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.3rem 1.6rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}>
                <WokinLogo onClick={() => { setPage("Home"); setOpen(false); }} />
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "none", color: "#F5F0E8", cursor: "pointer",
                    width: 36, height: 36, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0,
                  }}
                >✕</button>
              </div>

              <div style={{
                flex: 1, padding: "1.5rem",
                display: "flex", flexDirection: "column", gap: "0.2rem",
                overflowY: "auto",
              }}>
                {NAV_ITEMS.map((item, i) => {
                  const isActive = page === item;
                  return (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      onClick={() => { setPage(item); setOpen(false); }}
                      style={{
                        background: isActive ? "rgba(200,16,46,0.12)" : "none",
                        border: "none",
                        borderLeft: isActive ? "3px solid #C8102E" : "3px solid transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: "1rem 1.2rem",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: isActive ? "#E8163A" : "rgba(245,240,232,0.75)",
                        borderRadius: "0 3px 3px 0",
                        transition: "background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                          e.currentTarget.style.color = "#F5F0E8";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = "none";
                          e.currentTarget.style.color = "rgba(245,240,232,0.75)";
                        }
                      }}
                    >
                      {item}
                    </motion.button>
                  );
                })}
              </div>

              <div style={{
                padding: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}>
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.06 + 0.1 }}
                  onClick={() => { setPage("Reservation"); setOpen(false); }}
                  whileHover={{ boxShadow: "0 8px 32px rgba(200,16,46,0.45)" }}
                  style={{
                    width: "100%",
                    background: "#C8102E", color: "#fff", border: "none",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1rem", fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    padding: "1.1rem", borderRadius: "2px", cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(200,16,46,0.3)",
                  }}
                >
                  Reserve A Table
                </motion.button>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem", color: "#6B6B6B",
                  textAlign: "center", marginTop: "1rem", lineHeight: 1.6,
                }}>
                  📍 Gulberg Greens, Islamabad
                </p>
              </div>

              <div style={{
                position: "absolute", bottom: "5rem", right: "-1rem",
                fontFamily: "'Noto Serif SC', serif",
                fontSize: "8rem", fontWeight: 900,
                color: "rgba(200,16,46,0.04)", lineHeight: 1,
                userSelect: "none", pointerEvents: "none",
              }}>龙</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex; }
        }
      `}</style>
    </>
  );
}