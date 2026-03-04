import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrolled } from "../utils/animations";
import { NAV_ITEMS } from "../data/constants";

export default function Navbar({ page, setPage }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const dark = page === "Home" && !scrolled;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={dark ? "nav-dark" : "nav-light"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: dark
          ? "transparent"
          : "rgba(253,250,246,.97)",
        backdropFilter: dark ? "none" : "blur(14px)",
        borderBottom: dark ? "none" : "1px solid var(--border)",
        transition: "background .35s, border-color .35s",
        padding: "0 clamp(1rem,5vw,4rem)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <button
          onClick={() => setPage("Home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span
            className="logo-name"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              lineHeight: 1,
              transition: "color .3s",
            }}
          >
            Wokin
          </span>
          <span
            style={{
              fontSize: ".57rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginTop: 2,
            }}
          >
            Pakistani · Chinese Cuisine
          </span>
        </button>

        <div
          className="desktop-nav"
          style={{ gap: "2rem", alignItems: "center" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`nav-link ${page === item ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          className="hamburger-btn"
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: 5,
            padding: "6px",
          }}
        >
          <span
            className="hbar"
            style={{
              width: 24,
              height: 1.5,
              display: "block",
              transition: "background .3s",
            }}
          />
          <span
            className="hbar"
            style={{
              width: 16,
              height: 1.5,
              display: "block",
              transition: "background .3s",
            }}
          />
          <span
            className="hbar"
            style={{
              width: 24,
              height: 1.5,
              display: "block",
              transition: "background .3s",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid var(--border)",
              background: "var(--ivory)",
            }}
          >
            <div
              style={{
                padding: "1rem 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setPage(item);
                    setOpen(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: ".7rem 0",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: ".8rem",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color:
                      page === item ? "var(--gold)" : "var(--charcoal)",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}