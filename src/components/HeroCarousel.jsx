import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    rank: "#1 Most Loved Dish",
    titleTop: "Chicken",
    titleBottom: "Manchurian",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    chef: "Chef Tariq Mehmood",
    review: "A perfect harmony of bold Pakistani spices and the delicate wok technique that defines our kitchen.",
    likes: 128,
    tag: "Bestseller",
  },
  {
    id: 2,
    rank: "#2 Most Loved Dish",
    titleTop: "Hot & Sour",
    titleBottom: "Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    chef: "Chef Ayesha Raza",
    review: "Every bowl tells a story — depth, warmth, and the kind of acidity that lingers beautifully.",
    likes: 94,
    tag: "Signature",
  },
  {
    id: 3,
    rank: "#3 Most Loved Dish",
    titleTop: "Mongolian",
    titleBottom: "Lamb",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    chef: "Chef Tariq Mehmood",
    review: "Wok-charred to perfection. The hoisin glaze with scallions is something truly unforgettable.",
    likes: 76,
    tag: "Chef's Pick",
  },
  {
    id: 4,
    rank: "#4 Most Loved Dish",
    titleTop: "Szechuan",
    titleBottom: "Prawns",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    chef: "Chef Ayesha Raza",
    review: "The numbing heat of Szechuan peppercorn meets the richness of desi spice — a revelation.",
    likes: 61,
    tag: "New",
  },
];

export default function HeroCarousel({ onSlideChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef(null);
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % SLIDES.length;
      if (onSlideChange) onSlideChange(next);
      return next;
    });
  }, [onSlideChange]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + SLIDES.length) % SLIDES.length;
      if (onSlideChange) onSlideChange(next);
      return next;
    });
  }, [onSlideChange]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (onSlideChange) onSlideChange(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, nextSlide]);

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > minSwipeDistance) nextSlide();
    else if (dist < -minSwipeDistance) prevSlide();
    setTouchStart(null); setTouchEnd(null);
  };

  const slide = SLIDES[currentIndex];

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--charcoal)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Radial gold glow per slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "radial-gradient(ellipse at 68% 42%, rgba(184,147,90,0.09) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
      </AnimatePresence>

      {/* Diagonal decorative shape */}
      <div style={{
        position: "absolute",
        top: "-15%",
        right: "10%",
        width: "40%",
        height: "90%",
        background: "rgba(184,147,90,0.03)",
        transform: "rotate(12deg)",
        borderRadius: "60px",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Vertical dot indicators */}
      <div style={{
        position: "absolute",
        left: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "0.55rem",
        alignItems: "center",
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: "4px",
              height: i === currentIndex ? "28px" : "4px",
              borderRadius: "4px",
              background: i === currentIndex ? "var(--gold)" : "rgba(247,243,238,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* Main layout */}
      <div
        className="hero-layout"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
          padding: "5rem 3rem 1rem 4rem",
          gap: "2rem",
        }}
      >
        {/* LEFT: Title & actions */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <button
            onClick={prevSlide}
            aria-label="Previous"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(247,243,238,0.25)",
              fontSize: "1.5rem",
              padding: "0.25rem 0",
              marginBottom: "0.5rem",
              display: "block",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,238,0.25)"}
          >‹</button>

          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${currentIndex}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>
                {slide.rank}
              </p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ height: "1px", background: "var(--gold)", marginBottom: "1.2rem" }}
              />

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "var(--cream)",
                margin: 0,
              }}>
                {slide.titleTop}
                <br />
                <strong style={{ fontWeight: 700 }}>{slide.titleBottom}</strong>
              </h1>

              <div style={{
                display: "flex",
                gap: "1.75rem",
                marginTop: "1.5rem",
                alignItems: "center",
              }}>
                {["▶ Play video", "🛒 Order food"].map((label) => (
                  <button
                    key={label}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(247,243,238,0.5)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,238,0.5)"}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: Floating dish image */}
        <div style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`dish-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.82, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 6 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "clamp(180px, 26vw, 310px)",
                height: "clamp(180px, 26vw, 310px)",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: `
                  0 0 0 10px rgba(184,147,90,0.12),
                  0 0 0 20px rgba(184,147,90,0.05),
                  0 24px 64px rgba(0,0,0,0.5)
                `,
              }}
            >
              <img
                src={slide.image}
                alt={slide.titleBottom}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: Info card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${currentIndex}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              flex: "0 0 auto",
              width: "clamp(175px, 20vw, 228px)",
              background: "var(--charcoal-soft)",
              borderLeft: "2px solid var(--gold)",
              padding: "1.4rem",
              boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            {/* Tabs */}
            <div style={{
              display: "flex",
              gap: "1rem",
              borderBottom: "1px solid rgba(226,218,208,0.08)",
              paddingBottom: "0.55rem",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--gold)",
                borderBottom: "1px solid var(--gold)",
                paddingBottom: "0.15rem",
                letterSpacing: "0.06em",
              }}>Overview</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                color: "rgba(247,243,238,0.25)",
                letterSpacing: "0.06em",
              }}>Ingredients</span>
            </div>

            {/* Rating + chef */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "46px",
                height: "46px",
                background: "var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--charcoal)",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: "1rem",
                flexShrink: 0,
              }}>
                {slide.rating}
              </div>
              <div>
                <span className="menu-tag" style={{ marginBottom: "0.3rem", display: "block" }}>
                  {slide.tag}
                </span>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  color: "var(--cream)",
                }}>
                  {slide.chef}
                </p>
              </div>
            </div>

            {/* Review */}
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.72rem",
              fontStyle: "italic",
              color: "rgba(247,243,238,0.4)",
              lineHeight: 1.7,
              margin: 0,
            }}>
              "{slide.review}"
            </p>

            {/* Likes */}
            <div style={{
              display: "flex",
              gap: "0.55rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid rgba(226,218,208,0.06)",
            }}>
              <button style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                background: "rgba(184,147,90,0.1)",
                border: "1px solid rgba(184,147,90,0.2)",
                padding: "0.28rem 0.6rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.67rem",
                fontWeight: 600,
                color: "var(--gold-light)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(184,147,90,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(184,147,90,0.1)"}
              >
                👍 {slide.likes} likes
              </button>
              <button style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "0.28rem 0.5rem",
                fontSize: "0.67rem",
                cursor: "pointer",
                color: "rgba(247,243,238,0.3)",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
              >
                👎
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(247,243,238,0.25)",
            fontSize: "1.5rem",
            zIndex: 10,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,238,0.25)"}
        >›</button>
      </div>

      {/* Bottom: Thumbnails + icon nav */}
      <div style={{
        position: "relative",
        zIndex: 5,
        padding: "0 4rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
      }}>
        {/* Thumbnail strip */}
        <div style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlide(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
                outline: i === currentIndex ? "1px solid var(--gold)" : "1px solid transparent",
                transition: "outline 0.3s",
              }}
            >
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                opacity: i === currentIndex ? 1 : 0.3,
                transition: "opacity 0.3s",
                boxShadow: i === currentIndex ? "0 0 0 2px var(--gold)" : "none",
              }}>
                <img src={s.image} alt={s.titleBottom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.56rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: i === currentIndex ? "var(--gold)" : "rgba(247,243,238,0.25)",
                fontWeight: i === currentIndex ? 600 : 400,
                textAlign: "center",
                maxWidth: "64px",
                lineHeight: 1.3,
                transition: "color 0.3s",
              }}>
                {s.titleTop} {s.titleBottom}
              </span>
            </button>
          ))}
        </div>

        {/* Icon nav */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.75rem",
          borderTop: "1px solid rgba(226,218,208,0.07)",
          paddingTop: "0.75rem",
        }}>
          {[["🍴", "Menu"], ["🍷", "Drinks"], ["💬", "Reviews"], ["👤", "Profile"]].map(([icon, label]) => (
            <button
              key={label}
              title={label}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(247,243,238,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.2rem",
                padding: "0.25rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,238,0.3)"}
            >
              <span style={{ fontSize: "1rem" }}>{icon}</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.48rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>{label}</span>
            </button>
          ))}

          <button style={{
            background: "var(--gold)",
            border: "none",
            cursor: "pointer",
            color: "var(--charcoal)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            boxShadow: "0 4px 16px rgba(184,147,90,0.35)",
            transition: "background 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--gold-light)"; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "scale(1)"; }}
          >🎤</button>
        </div>
      </div>

      {/* Slide counter */}
      <div style={{
        position: "absolute",
        bottom: "1.5rem",
        right: "2rem",
        zIndex: 10,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.68rem",
        letterSpacing: "0.15em",
        color: "rgba(247,243,238,0.25)",
      }}>
        {String(currentIndex + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}