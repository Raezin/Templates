import { NAV_ITEMS } from "../data/constants";

export default function Footer({ setPage }) {
  return (
    <footer
      style={{
        background: "#111",
        color: "#888",
        padding: "4rem clamp(1rem,7vw,7rem) 2rem",
        borderTop: "1px solid #1e1e1e",
      }}
    >
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "3rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#F7F3EE",
              marginBottom: 5,
            }}
          >
            Wokin
          </p>
          <p
            style={{
              fontSize: ".6rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.2rem",
            }}
          >
            Pakistani · Chinese Cuisine
          </p>
          <p style={{ fontSize: ".8rem", lineHeight: 1.9, maxWidth: 285 }}>
            12 Liberty Market Road, Gulberg III, Lahore, Punjab, Pakistan
          </p>
          <p style={{ fontSize: ".8rem", marginTop: ".5rem" }}>
            +92 42 3500 0000
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: ".62rem",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Navigate
          </p>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              style={{
                display: "block",
                background: "none",
                border: "none",
                color: "#666",
                fontSize: ".8rem",
                padding: "3px 0",
                cursor: "pointer",
                textAlign: "left",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              {item}
            </button>
          ))}
        </div>
        <div>
          <p
            style={{
              fontSize: ".62rem",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Hours
          </p>
          <p style={{ fontSize: ".8rem", lineHeight: 1.9 }}>
            Monday – Sunday
          </p>
          <p style={{ fontSize: ".8rem" }}>Lunch: 12 PM – 3 PM</p>
          <p style={{ fontSize: ".8rem" }}>Dinner: 7 PM – 11 PM</p>
          <p
            style={{
              fontSize: ".62rem",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginTop: "1.5rem",
              marginBottom: ".7rem",
            }}
          >
            Social
          </p>
          <div style={{ display: "flex", gap: ".5rem" }}>
            {["IG", "FB", "TT"].map((s) => (
              <div
                key={s}
                style={{
                  width: 28,
                  height: 28,
                  border: "1px solid #2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ".64rem",
                  color: "#555",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #1e1e1e",
          paddingTop: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: ".5rem",
        }}
      >
        <p style={{ fontSize: ".7rem" }}>
          © 2025 Wokin Restaurant. All rights reserved.
        </p>
        <p style={{ fontSize: ".7rem" }}>
          Crafted with care in Lahore, Pakistan
        </p>
      </div>
    </footer>
  );
}