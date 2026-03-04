import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

export function InView({ children, className, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function Stars({ n }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="star" style={{ opacity: i < n ? 1 : 0.2 }}>
          ★
        </span>
      ))}
    </span>
  );
}