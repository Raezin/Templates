import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Reservation from "./pages/Reservation";
import ContactLocation from "./pages/ContactLocation";
import Reviews from "./pages/Reviews";
import "./style/global.css";

const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');`;

export default function App() {
  const [page, setPage] = useState("Home");
  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const render = () => {
    switch (page) {
      case "Home":
        return <Home setPage={go} />;
      case "Menu":
        return <Menu />;
      case "About":
        return <About />;
      case "Reservation":
        return <Reservation />;
      case "Contact & Location":
        return <ContactLocation />;
      case "Reviews":
        return <Reviews />;
      default:
        return <Home setPage={go} />;
    }
  };

  return (
    <>
      <style>{FONT_LINK}</style>
      <Navbar page={page} setPage={go} />
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {render()}
        </motion.main>
      </AnimatePresence>
      <Footer setPage={go} />
    </>
  );
}