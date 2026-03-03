import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  :root {
    --cream:         #F7F3EE;
    --ivory:         #FDFAF6;
    --charcoal:      #1C1C1C;
    --charcoal-soft: #2E2E2E;
    --gold:          #B8935A;
    --gold-light:    #D4A96A;
    --red-acc:       #8B2E2E;
    --muted:         #7A7068;
    --border:        #E2DAD0;
  }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; background:var(--ivory); color:var(--charcoal); line-height:1.6; }
  h1,h2,h3,h4 { font-family:'Playfair Display',serif; }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:var(--cream); }
  ::-webkit-scrollbar-thumb { background:var(--gold); border-radius:2px; }

  /* ─── Nav links ─── */
  .nav-link {
    font-size:.78rem; font-weight:500; letter-spacing:.12em;
    text-transform:uppercase; position:relative;
    background:none; border:none; cursor:pointer; padding:0;
    transition:color .25s;
  }
  .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; transition:width .3s; }
  .nav-link:hover::after, .nav-link.active::after { width:100%; }

  .nav-dark .nav-link          { color:rgba(247,243,238,.88); }
  .nav-dark .nav-link:hover,
  .nav-dark .nav-link.active   { color:var(--gold-light); }
  .nav-dark .nav-link::after   { background:var(--gold-light); }
  .nav-dark .logo-name         { color:var(--cream) !important; }
  .nav-dark .hbar              { background:var(--cream) !important; }

  .nav-light .nav-link         { color:var(--charcoal); }
  .nav-light .nav-link:hover,
  .nav-light .nav-link.active  { color:var(--gold); }
  .nav-light .nav-link::after  { background:var(--gold); }
  .nav-light .logo-name        { color:var(--charcoal) !important; }
  .nav-light .hbar             { background:var(--charcoal) !important; }

  /* ─── Misc ─── */
  .section-label { font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); font-family:'DM Sans',sans-serif; font-weight:500; }
  .divider       { width:40px; height:1px; background:var(--gold); margin:1rem 0; }
  .divider-center { margin:1rem auto; }
  .card-hover { transition:transform .3s, box-shadow .3s; }
  .card-hover:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,.08); }
  .menu-tag { display:inline-block; font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; padding:2px 8px; border:1px solid var(--gold); color:var(--gold); border-radius:2px; }
  .star { color:var(--gold); }
  .input-field { width:100%; padding:12px 16px; border:1px solid var(--border); background:transparent; font-family:'DM Sans',sans-serif; font-size:.9rem; color:var(--charcoal); outline:none; transition:border-color .2s; }
  .input-field:focus { border-color:var(--gold); }
  .input-field::placeholder { color:var(--muted); }
  select.input-field option { background:var(--ivory); }

  /* ─── Responsive ─── */
  .desktop-nav   { display:flex !important; }
  .hamburger-btn { display:none !important; }
  @media (max-width:900px) {
    .desktop-nav   { display:none !important; }
    .hamburger-btn { display:flex !important; }
  }
  @media (max-width:768px) {
    .hero-layout   { flex-direction:column !important; }
    .two-col       { grid-template-columns:1fr !important; }
    .three-col     { grid-template-columns:1fr !important; }
    .stats-grid    { grid-template-columns:1fr 1fr !important; }
    .footer-grid   { grid-template-columns:1fr !important; gap:2rem !important; }
    .form-grid     { grid-template-columns:1fr !important; }
    .rating-row    { flex-direction:column !important; gap:1.5rem !important; }
  }
  @media (max-width:520px) {
    .hero-btns button { display:block; width:100% !important; }
    .menu-tabs button { font-size:.66rem !important; padding:.9rem .6rem !important; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["Home","Menu","About","Reservation","Contact & Location","Reviews"];

// Six food dishes for the wheel
const WHEEL_FOODS = [
  { emoji:"🍗", name:"Chicken Manchurian", label:"Starter" },
  { emoji:"🍲", name:"Hot & Sour Soup",    label:"Soup"    },
  { emoji:"🌶️", name:"Kung Pao Chicken",   label:"Main"    },
  { emoji:"🥩", name:"Mongolian Lamb",     label:"Main"    },
  { emoji:"🍜", name:"Chow Mein",          label:"Noodles" },
  { emoji:"🍮", name:"Gulab Jamun",        label:"Dessert" },
];

const MENU = {
  "Starters":[
    {name:"Chicken Manchurian Dry",desc:"Crispy chicken tossed in tangy manchurian sauce",price:"PKR 850",  tag:"Bestseller"},
    {name:"Spring Rolls",          desc:"Golden fried rolls with spiced vegetables",       price:"PKR 550",  tag:null},
    {name:"Chilli Chicken Wings",  desc:"Marinated wings in Sichuan-inspired chilli glaze",price:"PKR 750",  tag:"Spicy"},
    {name:"Honey Garlic Prawns",   desc:"Succulent prawns in sweet-savory glaze",          price:"PKR 1,100",tag:null},
    {name:"Vegetable Dumplings",   desc:"Steamed dumplings with seasoned mixed vegetables",price:"PKR 650",  tag:"Veg"},
  ],
  "Soups":[
    {name:"Hot & Sour Soup",  desc:"Classic tangy broth with mushrooms, tofu and bamboo",price:"PKR 450",tag:"Signature"},
    {name:"Chicken Corn Soup",desc:"Silky sweet corn soup with shredded chicken",         price:"PKR 400",tag:null},
    {name:"Tom Yum Soup",     desc:"Aromatic lemongrass broth with mushrooms and prawns", price:"PKR 600",tag:null},
  ],
  "Main Course":[
    {name:"Kung Pao Chicken",    desc:"Diced chicken with peanuts and chilies",           price:"PKR 1,200",tag:"Spicy"},
    {name:"Beef Black Bean",     desc:"Tender beef in rich fermented black bean sauce",   price:"PKR 1,400",tag:"Signature"},
    {name:"Sweet & Sour Fish",   desc:"Crispy fish fillet in vibrant sweet and sour sauce",price:"PKR 1,300",tag:null},
    {name:"Mongolian Lamb",      desc:"Wok-tossed lamb with scallions and hoisin",        price:"PKR 1,600",tag:"Chef's Pick"},
    {name:"Mapo Tofu",           desc:"Silky tofu in spiced bean sauce with ground beef", price:"PKR 950",  tag:"Veg Available"},
    {name:"Ginger Chilli Prawns",desc:"Stir-fried prawns with fresh ginger and green chilli",price:"PKR 1,500",tag:null},
  ],
  "Rice & Noodles":[
    {name:"Egg Fried Rice",    desc:"Wok-tossed rice with scrambled egg and scallions",price:"PKR 550",  tag:null},
    {name:"Chicken Chow Mein",desc:"Stir-fried noodles with chicken and vegetables",   price:"PKR 900",  tag:"Bestseller"},
    {name:"Szechuan Noodles",  desc:"Bold numbing-spicy noodles in Szechuan sauce",    price:"PKR 850",  tag:"Spicy"},
    {name:"Seafood Fried Rice",desc:"Aromatic rice with mixed seafood and herbs",      price:"PKR 1,200",tag:null},
  ],
  "Desserts":[
    {name:"Date Halwa",   desc:"Rich Pakistani halwa with dates and cardamom", price:"PKR 450",tag:"Traditional"},
    {name:"Mango Pudding",desc:"Silky Chinese-style mango pudding",            price:"PKR 400",tag:null},
    {name:"Gulab Jamun",  desc:"Classic soft dumplings in rose-scented syrup", price:"PKR 350",tag:"Traditional"},
  ],
};

const REVIEWS = [
  {name:"Ayesha Khan",    rating:5,text:"Wokin has completely redefined what Chinese-Pakistani fusion can be. The Kung Pao Chicken had that perfect balance of heat and sweetness. The ambiance is warm and the service is impeccable.",date:"February 2025",location:"Lahore"},
  {name:"Omar Farooq",    rating:5,text:"Visited for a family dinner and everyone was thoroughly impressed. The Hot & Sour Soup is absolutely outstanding — rich, bold, perfectly balanced. Will be returning.",date:"January 2025",location:"Karachi"},
  {name:"Sarah Ahmed",    rating:4,text:"Elegant setting, thoughtful menu. The Mongolian Lamb was tender and perfectly cooked. Love that they've incorporated Pakistani sensibilities into every dish.",date:"March 2025",location:"Islamabad"},
  {name:"Bilal Mirza",    rating:5,text:"Finally a Chinese restaurant in Pakistan that doesn't compromise. The Manchurian Dry is worth every rupee. Clean, classy, and genuinely excellent food.",date:"December 2024",location:"Lahore"},
  {name:"Farah Siddiqui", rating:5,text:"The interiors are beautiful and the food matches the aesthetic. We tried the seafood fried rice and the Honey Garlic Prawns — both extraordinary. A perfect evening.",date:"February 2025",location:"Islamabad"},
  {name:"Zain ul Abideen",rating:4,text:"Smooth reservation process, friendly staff, and the food arrived hot and beautifully presented. The Date Halwa for dessert was an unexpected delight.",date:"January 2025",location:"Karachi"},
];

// ─── ANIMATION HELPERS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden:{ opacity:0, y:28 },
  show:  { opacity:1, y:0, transition:{ duration:.6, ease:[.22,1,.36,1] } },
};
const stagger = { show:{ transition:{ staggerChildren:.1 } } };

function useScrolled(thr=60){
  const [s,set]=useState(false);
  useEffect(()=>{
    const fn=()=>set(window.scrollY>thr);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[thr]);
  return s;
}

function InView({children,className,delay=0,style}){
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-80px"});
  return(
    <motion.div ref={ref} initial="hidden" animate={inView?"show":"hidden"}
      variants={fadeUp} transition={{delay}} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function Stars({n}){
  return(
    <span>
      {Array.from({length:5}).map((_,i)=>(
        <span key={i} className="star" style={{opacity:i<n?1:.2}}>★</span>
      ))}
    </span>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({page,setPage}){
  const scrolled=useScrolled();
  const [open,setOpen]=useState(false);
  const dark = page==="Home" && !scrolled;

  return(
    <motion.nav
      initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}}
      transition={{duration:.7,ease:[.22,1,.36,1]}}
      className={dark?"nav-dark":"nav-light"}
      style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background:dark?"transparent":"rgba(253,250,246,.97)",
        backdropFilter:dark?"none":"blur(14px)",
        borderBottom:dark?"none":"1px solid var(--border)",
        transition:"background .35s, border-color .35s",
        padding:"0 clamp(1rem,5vw,4rem)",
      }}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:72}}>
        <button onClick={()=>setPage("Home")}
          style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
          <span className="logo-name" style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,lineHeight:1,transition:"color .3s"}}>Wokin</span>
          <span style={{fontSize:".57rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginTop:2}}>Pakistani · Chinese Cuisine</span>
        </button>

        <div className="desktop-nav" style={{gap:"2rem",alignItems:"center"}}>
          {NAV_ITEMS.map(item=>(
            <button key={item} onClick={()=>setPage(item)} className={`nav-link ${page===item?"active":""}`}>{item}</button>
          ))}
        </div>

        <button className="hamburger-btn" onClick={()=>setOpen(o=>!o)}
          style={{background:"none",border:"none",cursor:"pointer",flexDirection:"column",gap:5,padding:"6px"}}>
          <span className="hbar" style={{width:24,height:1.5,display:"block",transition:"background .3s"}}/>
          <span className="hbar" style={{width:16,height:1.5,display:"block",transition:"background .3s"}}/>
          <span className="hbar" style={{width:24,height:1.5,display:"block",transition:"background .3s"}}/>
        </button>
      </div>

      <AnimatePresence>
        {open&&(
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
            exit={{height:0,opacity:0}} transition={{duration:.28}}
            style={{overflow:"hidden",borderTop:"1px solid var(--border)",background:"var(--ivory)"}}>
            <div style={{padding:"1rem 0",display:"flex",flexDirection:"column"}}>
              {NAV_ITEMS.map(item=>(
                <button key={item} onClick={()=>{setPage(item);setOpen(false);}}
                  style={{background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:".7rem 0",fontFamily:"'DM Sans',sans-serif",fontSize:".8rem",letterSpacing:".12em",textTransform:"uppercase",color:page===item?"var(--gold)":"var(--charcoal)",fontWeight:500}}>
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

// ─── WHEEL CAROUSEL ──────────────────────────────────────────────────────────
//
// EXACT replication of the GSAP MotionPath wheel, in pure React + CSS:
//
//  • All N cards sit on an invisible circle (radius R).
//  • The WRAPPER div rotates continuously (like the GSAP tl.to('.wrapper',{rotation:360})).
//  • Each CARD counter-rotates by the same amount so it stays upright (like tl.to(items,{rotation:"-=360"})).
//  • Active slot = 3 o'clock (right side of circle, angle 0°).
//    When the wrapper rotates CCW (negative degrees), the next card below sweeps
//    upward into the active slot → item EMERGES FROM RIGHT, EXITS UPWARD.
//  • A fixed rectangular clip window in the hero right column shows ONLY the
//    active card at the 3 o'clock position. Everything else is overflow:hidden.
//  • No controls, no indicators — fully automatic, 3 s interval.

const ITEMS   = WHEEL_FOODS;
const N_ITEMS = ITEMS.length;
const RADIUS  = 180;                        // orbit radius px
const CARD    = 200;                        // card diameter px
const STEP    = 360 / N_ITEMS;              // degrees per step

// Clip window dimensions — only the 3-o'clock card is visible
const CLIP_W  = CARD + 24;
const CLIP_H  = CARD + 24;

function WheelCarousel(){
  // wrapAngle tracks the wrapper's current rotation (degrees, going negative = CCW)
  const wrapAngle = useRef(0);
  const targetAngle = useRef(0);
  const rafRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const activeRef = useRef(0);

  // Smoothly animate wrapAngle → targetAngle each frame (lerp)
  const tick = useCallback(()=>{
    const diff = targetAngle.current - wrapAngle.current;
    if(Math.abs(diff) > 0.05){
      wrapAngle.current += diff * 0.08;   // ease factor
    } else {
      wrapAngle.current = targetAngle.current;
    }

    const wa = wrapAngle.current;

    // Rotate wrapper
    if(wrapperRef.current){
      wrapperRef.current.style.transform = `rotate(${wa}deg)`;
    }
    // Counter-rotate each card
    cardRefs.current.forEach(el=>{
      if(el) el.style.transform = `rotate(${-wa}deg)`;
    });

    rafRef.current = requestAnimationFrame(tick);
  },[]);

  useEffect(()=>{
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[tick]);

  // Auto-advance every 3 s
  useEffect(()=>{
    const t = setInterval(()=>{
      activeRef.current = (activeRef.current + 1) % N_ITEMS;
      // Each advance = one step CCW (negative)
      targetAngle.current -= STEP;
    }, 3000);
    return ()=>clearInterval(t);
  },[]);

  // Position of item i on the circle (angle 0 = 3 o'clock)
  function cardPos(i){
    const angleDeg = i * STEP;   // evenly spaced, item 0 starts at 3 o'clock
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: RADIUS * Math.cos(rad),
      y: RADIUS * Math.sin(rad),
    };
  }

  // Total size of the wrapper div (must contain the full orbit)
  const WRAP_SIZE = (RADIUS + CARD/2) * 2;

  return(
    // Outer clip — shows only the 3-o'clock slot
    // We position it so the circle centre is at left:-(RADIUS + CARD/2 - CLIP_W/2 - margin)
    // and vertically centred.
    <div style={{
      // The clip window is CLIP_W × CLIP_H, right-aligned
      width:  CLIP_W,
      height: CLIP_H,
      overflow:"hidden",
      position:"relative",
      flexShrink:0,
    }}>
      {/* 
        The wrapper is positioned so that the 3-o'clock card
        (at x = +RADIUS from the centre) lands exactly inside the clip window.
        Centre of circle must be at:  left = CLIP_W/2 - RADIUS
                                      top  = CLIP_H/2
        Since that's likely negative left, we use a wrapper offset.
      */}
      <div style={{
        position:"absolute",
        // x: place circle centre so the right rim lands in the clip window
        left: CLIP_W/2 - RADIUS - CARD/2,
        top:  CLIP_H/2 - WRAP_SIZE/2,
        width:  WRAP_SIZE,
        height: WRAP_SIZE,
        // Rotate around the centre of this wrapper
        transformOrigin:"center center",
      }}
        ref={wrapperRef}>

        {ITEMS.map((food, i)=>{
          const {x,y} = cardPos(i);
          // Place each card centred at (cx + x, cy + y) where cx=cy=WRAP_SIZE/2
          const cx = WRAP_SIZE/2 + x - CARD/2;
          const cy = WRAP_SIZE/2 + y - CARD/2;

          return(
            <div
              key={i}
              ref={el=>cardRefs.current[i]=el}
              style={{
                position:"absolute",
                left: cx,
                top:  cy,
                width:  CARD,
                height: CARD,
                borderRadius:"50%",
                transformOrigin:"center center",
                // visual card
                background: i%2===0
                  ? "linear-gradient(145deg,#1C1C1C 0%,#2E2E2E 100%)"
                  : "linear-gradient(145deg,#2a1808 0%,#3d2410 100%)",
                border:"1px solid rgba(184,147,90,0.3)",
                boxShadow:"0 16px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(184,147,90,0.15)",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                gap:"0.4rem",
                overflow:"hidden",
              }}>
              {/* Inner ring */}
              <div style={{position:"absolute",inset:"12%",borderRadius:"50%",border:"1px solid rgba(184,147,90,0.12)",pointerEvents:"none"}}/>
              {/* Slash accent */}
              <div style={{position:"absolute",width:"130%",height:1,background:"rgba(184,147,90,0.06)",top:"40%",left:"-15%",transform:"rotate(-20deg)"}}/>

              <div style={{fontSize:"2.8rem",lineHeight:1,position:"relative",zIndex:1,filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.5))"}}>{food.emoji}</div>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:".78rem",fontWeight:600,color:"var(--cream)",textAlign:"center",padding:"0 14%",lineHeight:1.3,position:"relative",zIndex:1}}>{food.name}</p>
              <p style={{fontSize:".55rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",position:"relative",zIndex:1}}>{food.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function Home({setPage}){
  return(
    <div>
      {/* ── Hero ── */}
      <section style={{
        minHeight:"100vh",background:"var(--charcoal)",
        position:"relative",overflow:"hidden",display:"flex",alignItems:"center",
      }}>
        <div style={{position:"absolute",inset:0,opacity:.06,backgroundImage:"radial-gradient(circle at 20% 30%,#B8935A 0%,transparent 55%),radial-gradient(circle at 80% 70%,#8B2E2E 0%,transparent 55%)"}}/>
        <div style={{position:"absolute",inset:0,opacity:.025,backgroundImage:"linear-gradient(var(--cream) 1px,transparent 1px),linear-gradient(90deg,var(--cream) 1px,transparent 1px)",backgroundSize:"70px 70px"}}/>

        <div style={{
          position:"relative",zIndex:3,width:"100%",
          padding:"0 clamp(1rem,7vw,7rem)",paddingTop:92,paddingBottom:60,
        }}>
          <div className="hero-layout" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem"}}>

            {/* Left text */}
            <motion.div initial="hidden" animate="show" variants={stagger}
              style={{flex:"1 1 280px",minWidth:0,maxWidth:560}}>
              <motion.div variants={fadeUp} style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1.3rem"}}>
                <div style={{width:28,height:1,background:"var(--gold)"}}/>
                <p className="section-label" style={{marginBottom:0,color:"var(--gold-light)"}}>Est. 2023 · Lahore, Pakistan</p>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{fontSize:"clamp(2.8rem,6.5vw,5.5rem)",fontWeight:700,color:"var(--cream)",lineHeight:1.06,marginBottom:"1.3rem"}}>
                Where<br/>Pakistan<br/><em style={{color:"var(--gold)",fontStyle:"italic"}}>Meets</em> China
              </motion.h1>

              <motion.div variants={fadeUp} style={{width:46,height:1,background:"var(--gold)",marginBottom:"1.4rem"}}/>

              <motion.p variants={fadeUp} style={{fontSize:"clamp(.88rem,1.5vw,1rem)",color:"rgba(247,243,238,.5)",maxWidth:400,lineHeight:1.9}}>
                A curated dining experience fusing the bold spice traditions of Pakistan with the nuanced artistry of Chinese cuisine.
              </motion.p>

              <motion.div variants={fadeUp} className="hero-btns" style={{display:"flex",gap:"1rem",marginTop:"2.5rem",flexWrap:"wrap"}}>
                <button onClick={()=>setPage("Menu")} style={{
                  padding:"14px 36px",background:"var(--gold)",border:"none",
                  color:"var(--charcoal)",fontFamily:"'DM Sans',sans-serif",
                  fontSize:".77rem",letterSpacing:".12em",textTransform:"uppercase",
                  fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"background .2s",
                }}
                  onMouseEnter={e=>e.target.style.background="var(--gold-light)"}
                  onMouseLeave={e=>e.target.style.background="var(--gold)"}>
                  View Menu
                </button>
                <button onClick={()=>setPage("Reservation")} style={{
                  padding:"14px 36px",background:"transparent",
                  border:"1px solid rgba(184,147,90,.4)",color:"var(--cream)",
                  fontFamily:"'DM Sans',sans-serif",fontSize:".77rem",
                  letterSpacing:".12em",textTransform:"uppercase",
                  fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",transition:"border-color .2s,color .2s",
                }}
                  onMouseEnter={e=>{e.target.style.borderColor="var(--gold)";e.target.style.color="var(--gold)";}}
                  onMouseLeave={e=>{e.target.style.borderColor="rgba(184,147,90,.4)";e.target.style.color="var(--cream)";}}>
                  Reserve a Table
                </button>
              </motion.div>
            </motion.div>

            {/* Right: wheel carousel */}
            <motion.div
              initial={{opacity:0,x:60}} animate={{opacity:1,x:0}}
              transition={{duration:.9,delay:.5,ease:[.22,1,.36,1]}}
              style={{flexShrink:0,display:"flex",justifyContent:"flex-end",
                // Pull right so the clip right-edge bleeds into the hero edge
                marginRight:"clamp(-48px,-4vw,-16px)",
              }}>
              <WheelCarousel/>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
          style={{position:"absolute",bottom:26,left:"50%",transform:"translateX(-50%)",textAlign:"center"}}>
          <motion.div animate={{y:[0,7,0]}} transition={{repeat:Infinity,duration:2}}>
            <div style={{width:1,height:28,background:"rgba(184,147,90,.35)",margin:"0 auto"}}/>
          </motion.div>
          <p style={{fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(184,147,90,.4)",marginTop:5}}>Scroll</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{background:"var(--cream)",padding:"3.5rem clamp(1rem,7vw,7rem)",borderBottom:"1px solid var(--border)"}}>
        <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stagger}
          className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2rem"}}>
          {[
            {num:"50+",   label:"Menu Items"},
            {num:"4.9",   label:"Average Rating"},
            {num:"2,000+",label:"Happy Guests"},
            {num:"3",     label:"Years of Excellence"},
          ].map(item=>(
            <motion.div key={item.label} variants={fadeUp} style={{textAlign:"center"}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:"var(--gold)",lineHeight:1}}>{item.num}</p>
              <p style={{fontSize:".68rem",letterSpacing:".13em",textTransform:"uppercase",color:"var(--muted)",marginTop:5}}>{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Signatures */}
      <section style={{padding:"6rem clamp(1rem,7vw,7rem)",background:"var(--ivory)"}}>
        <InView>
          <p className="section-label">From the Kitchen</p>
          <div className="divider"/>
          <h2 style={{fontSize:"clamp(1.6rem,4vw,2.5rem)",fontWeight:600,maxWidth:420}}>House Signatures</h2>
        </InView>
        <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem",marginTop:"3rem"}}>
          {[
            {name:"Chicken Manchurian Dry",desc:"Our most-loved starter — crispy chicken in tangy manchurian glaze",tag:"Bestseller"},
            {name:"Hot & Sour Soup",       desc:"A signature bowl of depth, warmth and perfect acidity",           tag:"Signature"},
            {name:"Mongolian Lamb",         desc:"Wok-charred lamb with scallions, hoisin and sesame",              tag:"Chef's Pick"},
          ].map((dish,i)=>(
            <InView key={dish.name} delay={i*.1}>
              <div className="card-hover" style={{border:"1px solid var(--border)",padding:"2rem",background:"var(--cream)",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:"var(--gold)"}}/>
                <span className="menu-tag" style={{marginBottom:"1rem",display:"inline-block"}}>{dish.tag}</span>
                <h3 style={{fontSize:"1.05rem",fontWeight:600,marginBottom:".5rem"}}>{dish.name}</h3>
                <p style={{color:"var(--muted)",fontSize:".84rem",lineHeight:1.75}}>{dish.desc}</p>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section style={{background:"var(--charcoal)",padding:"6rem clamp(1rem,7vw,7rem)"}}>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
          <InView>
            <p className="section-label" style={{color:"var(--gold-light)"}}>Our Story</p>
            <div className="divider"/>
            <h2 style={{fontSize:"clamp(1.6rem,3.5vw,2.4rem)",fontWeight:600,color:"var(--cream)",lineHeight:1.3}}>
              Two Culinary Traditions,<br/><em style={{color:"var(--gold)"}}>One Vision</em>
            </h2>
            <p style={{color:"rgba(247,243,238,.45)",marginTop:"1.5rem",lineHeight:1.95,fontSize:".92rem"}}>
              Wokin was born from a simple belief: that Pakistani and Chinese cuisines share a profound common language — the language of spice, heat, and communal warmth.
            </p>
          </InView>
          <InView delay={.2}>
            <div style={{background:"var(--charcoal-soft)",borderLeft:"2px solid var(--gold)",padding:"2.5rem",position:"relative"}}>
              <div style={{position:"absolute",top:-8,right:-8,left:8,bottom:8,border:"1px solid rgba(184,147,90,.1)",zIndex:-1}}/>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontStyle:"italic",color:"var(--cream)",lineHeight:1.9}}>
                "Food is not merely sustenance — it is memory, identity, and a bridge between worlds."
              </p>
              <p style={{marginTop:"1.2rem",fontSize:".68rem",letterSpacing:".15em",textTransform:"uppercase",color:"var(--gold)"}}>
                — Chef Tariq Mehmood, Founder
              </p>
            </div>
          </InView>
        </div>
      </section>

      {/* Reviews teaser */}
      <section style={{padding:"6rem clamp(1rem,7vw,7rem)",background:"var(--cream)"}}>
        <InView style={{textAlign:"center",marginBottom:"3rem"}}>
          <p className="section-label" style={{textAlign:"center"}}>What Guests Say</p>
          <div className="divider divider-center"/>
          <h2 style={{fontSize:"clamp(1.6rem,4vw,2.4rem)",fontWeight:600}}>Voices of Wokin</h2>
        </InView>
        <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
          {REVIEWS.slice(0,3).map((r,i)=>(
            <InView key={r.name} delay={i*.1}>
              <div style={{background:"var(--ivory)",border:"1px solid var(--border)",padding:"2rem",height:"100%"}}>
                <Stars n={r.rating}/>
                <p style={{marginTop:"1rem",color:"var(--charcoal-soft)",lineHeight:1.85,fontSize:".87rem"}}>"{r.text}"</p>
                <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:"1px solid var(--border)"}}>
                  <p style={{fontWeight:600,fontSize:".84rem"}}>{r.name}</p>
                  <p style={{fontSize:".7rem",color:"var(--muted)",marginTop:2}}>{r.location} · {r.date}</p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── MENU ────────────────────────────────────────────────────────────────────

function Menu(){
  const [active,setActive]=useState("Starters");
  const cats=Object.keys(MENU);
  return(
    <div style={{paddingTop:72}}>
      <section style={{background:"var(--charcoal)",padding:"5rem clamp(1rem,7vw,7rem) 4rem"}}>
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="section-label" style={{color:"var(--gold-light)"}}>Explore</motion.p>
          <motion.div variants={fadeUp} className="divider"/>
          <motion.h1 variants={fadeUp} style={{fontSize:"clamp(2rem,6vw,4rem)",fontWeight:700,color:"var(--cream)"}}>Our Menu</motion.h1>
          <motion.p variants={fadeUp} style={{color:"rgba(247,243,238,.4)",maxWidth:460,marginTop:"1rem",lineHeight:1.85}}>
            Every dish crafted from seasonal ingredients, inspired by the streets of Lahore and the kitchens of Shanghai.
          </motion.p>
        </motion.div>
      </section>

      <div style={{background:"var(--cream)",borderBottom:"1px solid var(--border)",padding:"0 clamp(1rem,7vw,7rem)",position:"sticky",top:72,zIndex:50,overflowX:"auto"}}>
        <div className="menu-tabs" style={{display:"flex"}}>
          {cats.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)} style={{
              padding:"1.2rem 1.1rem",background:"none",border:"none",
              borderBottom:active===cat?"2px solid var(--gold)":"2px solid transparent",
              color:active===cat?"var(--gold)":"var(--muted)",
              fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",
              letterSpacing:".13em",textTransform:"uppercase",
              fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      <section style={{padding:"3rem clamp(1rem,7vw,7rem)",background:"var(--ivory)"}}>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            transition={{duration:.25}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1px",background:"var(--border)"}}>
              {MENU[active].map(item=>(
                <div key={item.name}
                  style={{background:"var(--ivory)",padding:"1.75rem",transition:"background .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--cream)"}
                  onMouseLeave={e=>e.currentTarget.style.background="var(--ivory)"}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"1rem"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".4rem",flexWrap:"wrap"}}>
                        <h3 style={{fontSize:".95rem",fontWeight:600}}>{item.name}</h3>
                        {item.tag&&<span className="menu-tag">{item.tag}</span>}
                      </div>
                      <p style={{color:"var(--muted)",fontSize:".82rem",lineHeight:1.7}}>{item.desc}</p>
                    </div>
                    <p style={{fontFamily:"'Playfair Display',serif",fontWeight:600,color:"var(--gold)",whiteSpace:"nowrap",fontSize:".95rem"}}>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About(){
  return(
    <div style={{paddingTop:72}}>
      <section style={{background:"var(--charcoal)",padding:"5rem clamp(1rem,7vw,7rem) 4rem"}}>
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="section-label" style={{color:"var(--gold-light)"}}>Our Story</motion.p>
          <motion.div variants={fadeUp} className="divider"/>
          <motion.h1 variants={fadeUp} style={{fontSize:"clamp(2rem,6vw,4rem)",fontWeight:700,color:"var(--cream)"}}>
            About <em style={{color:"var(--gold)"}}>Wokin</em>
          </motion.h1>
        </motion.div>
      </section>

      <section style={{padding:"6rem clamp(1rem,7vw,7rem)",background:"var(--ivory)"}}>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start",maxWidth:1060,margin:"0 auto"}}>
          <InView>
            <p className="section-label">Origin</p>
            <div className="divider"/>
            <h2 style={{fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:600,lineHeight:1.35,marginBottom:"1.4rem"}}>
              A Culinary Bridge Between Two Great Traditions
            </h2>
            <p style={{color:"var(--muted)",lineHeight:1.95,marginBottom:"1.1rem",fontSize:".92rem"}}>
              Wokin was founded in 2023 by Chef Tariq Mehmood, who spent two decades studying Chinese cooking — first in Karachi's Chinatown, then across the kitchens of Beijing and Chengdu.
            </p>
            <p style={{color:"var(--muted)",lineHeight:1.95,fontSize:".92rem"}}>
              Every dish tells a story of cultural convergence, where bold Pakistani spice meets the precision and restraint of Chinese culinary art.
            </p>
          </InView>
          <InView delay={.15}>
            <div style={{background:"var(--cream)",padding:"2.5rem",border:"1px solid var(--border)",borderLeft:"2px solid var(--gold)",position:"relative"}}>
              <div style={{position:"absolute",top:-7,left:-7,right:7,bottom:7,border:"1px solid var(--border)",zIndex:-1}}/>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.08rem",fontStyle:"italic",lineHeight:1.9}}>
                "The wok is a unifying tool. In Pakistan, we cook with bold fire. In China, they cook with precise fire. At Wokin, we cook with both."
              </p>
              <div style={{marginTop:"1.5rem",display:"flex",alignItems:"center",gap:"1rem"}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:"white",fontSize:".95rem"}}>T</span>
                </div>
                <div>
                  <p style={{fontWeight:600,fontSize:".86rem"}}>Chef Tariq Mehmood</p>
                  <p style={{fontSize:".7rem",color:"var(--muted)"}}>Founder & Executive Chef</p>
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>

      <section style={{background:"var(--cream)",padding:"6rem clamp(1rem,7vw,7rem)"}}>
        <InView style={{textAlign:"center",marginBottom:"3rem"}}>
          <p className="section-label" style={{textAlign:"center"}}>What We Stand For</p>
          <div className="divider divider-center"/>
          <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:600}}>Our Principles</h2>
        </InView>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:"1.5rem"}}>
          {[
            {title:"Authenticity",icon:"◈",desc:"Every recipe traces its roots. We don't compromise origin for convenience."},
            {title:"Craft",       icon:"◉",desc:"Each dish is prepared with deliberate technique — nothing half-done."},
            {title:"Hospitality", icon:"◎",desc:"Pakistani warmth defines our service. You are a guest in our home."},
            {title:"Freshness",   icon:"◇",desc:"Seasonal, local produce forms the backbone of our daily menu."},
          ].map((v,i)=>(
            <InView key={v.title} delay={i*.1}>
              <div style={{padding:"2rem",background:"var(--ivory)",border:"1px solid var(--border)"}}>
                <span style={{fontSize:"1.3rem",color:"var(--gold)"}}>{v.icon}</span>
                <h3 style={{fontSize:".96rem",fontWeight:600,margin:".75rem 0 .4rem"}}>{v.title}</h3>
                <p style={{color:"var(--muted)",fontSize:".83rem",lineHeight:1.7}}>{v.desc}</p>
              </div>
            </InView>
          ))}
        </div>
      </section>

      <section style={{padding:"6rem clamp(1rem,7vw,7rem)",background:"var(--ivory)"}}>
        <InView>
          <p className="section-label">Meet the Team</p>
          <div className="divider"/>
          <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:600,marginBottom:"3rem"}}>The People Behind Wokin</h2>
        </InView>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.5rem"}}>
          {[
            {name:"Chef Tariq Mehmood",role:"Founder & Executive Chef",  note:"20 years across Pakistan and China"},
            {name:"Li Wei",            role:"Head Wok Chef",             note:"Trained in Shanghai and Sichuan province"},
            {name:"Nadia Iqbal",       role:"Pastry & Desserts",         note:"Blending Eastern sweets with Chinese technique"},
            {name:"Ahmed Raza",        role:"Restaurant Manager",        note:"Ensuring every visit feels effortless"},
          ].map((p,i)=>(
            <InView key={p.name} delay={i*.1}>
              <div style={{textAlign:"center",padding:"2rem 1.5rem",border:"1px solid var(--border)"}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:"var(--charcoal)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:"var(--gold)",fontSize:"1.2rem"}}>{p.name[0]}</span>
                </div>
                <h3 style={{fontSize:".88rem",fontWeight:600}}>{p.name}</h3>
                <p style={{fontSize:".67rem",color:"var(--gold)",letterSpacing:".08em",textTransform:"uppercase",marginTop:4}}>{p.role}</p>
                <p style={{fontSize:".78rem",color:"var(--muted)",marginTop:".6rem",lineHeight:1.6}}>{p.note}</p>
              </div>
            </InView>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── RESERVATION ─────────────────────────────────────────────────────────────

function Reservation(){
  const [form,setForm]=useState({name:"",email:"",phone:"",date:"",time:"",guests:"",occasion:"",requests:""});
  const [submitted,setSubmitted]=useState(false);
  const upd=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  return(
    <div style={{paddingTop:72}}>
      <section style={{background:"var(--charcoal)",padding:"5rem clamp(1rem,7vw,7rem) 4rem"}}>
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="section-label" style={{color:"var(--gold-light)"}}>Book a Table</motion.p>
          <motion.div variants={fadeUp} className="divider"/>
          <motion.h1 variants={fadeUp} style={{fontSize:"clamp(2rem,6vw,4rem)",fontWeight:700,color:"var(--cream)"}}>Reservations</motion.h1>
          <motion.p variants={fadeUp} style={{color:"rgba(247,243,238,.4)",maxWidth:440,marginTop:"1rem",lineHeight:1.85}}>
            Reserve your table and let us prepare an exceptional evening for you.
          </motion.p>
        </motion.div>
      </section>

      <section style={{padding:"5rem clamp(1rem,7vw,7rem)",background:"var(--ivory)"}}>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:"4rem",maxWidth:1060,margin:"0 auto",alignItems:"start"}}>
          <InView>
            {submitted?(
              <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
                style={{padding:"3rem",border:"1px solid var(--gold)",textAlign:"center"}}>
                <span style={{fontSize:"2rem",color:"var(--gold)"}}>✓</span>
                <h3 style={{fontSize:"1.3rem",fontWeight:600,margin:"1rem 0 .5rem"}}>Reservation Received</h3>
                <p style={{color:"var(--muted)",lineHeight:1.7}}>Thank you, {form.name}. We'll confirm at {form.email} within 24 hours.</p>
              </motion.div>
            ):(
              <div>
                <h2 style={{fontSize:"1.3rem",fontWeight:600,marginBottom:"2rem"}}>Your Details</h2>
                <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                  {[
                    {k:"name", label:"Full Name",    type:"text",  ph:"Your name"},
                    {k:"email",label:"Email",        type:"email", ph:"your@email.com"},
                    {k:"phone",label:"Phone",        type:"tel",   ph:"+92 300 0000000"},
                    {k:"date", label:"Date",         type:"date",  ph:""},
                  ].map(f=>(
                    <div key={f.k}>
                      <label style={{fontSize:".67rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:7}}>{f.label}</label>
                      <input type={f.type} className="input-field" placeholder={f.ph} value={form[f.k]} onChange={upd(f.k)}/>
                    </div>
                  ))}
                  <div>
                    <label style={{fontSize:".67rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:7}}>Preferred Time</label>
                    <select className="input-field" value={form.time} onChange={upd("time")}>
                      <option value="">Select time</option>
                      {["12:00 PM","12:30 PM","1:00 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"].map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:".67rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:7}}>Guests</label>
                    <select className="input-field" value={form.guests} onChange={upd("guests")}>
                      <option value="">Number of guests</option>
                      {[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n} {n===1?"guest":"guests"}</option>)}
                    </select>
                  </div>
                  <div style={{gridColumn:"1/-1"}}>
                    <label style={{fontSize:".67rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:7}}>Occasion</label>
                    <select className="input-field" value={form.occasion} onChange={upd("occasion")}>
                      <option value="">None</option>
                      {["Birthday","Anniversary","Business Dinner","Family Gathering","Date Night","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div style={{gridColumn:"1/-1"}}>
                    <label style={{fontSize:".67rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:7}}>Special Requests</label>
                    <textarea className="input-field" rows={4} placeholder="Dietary requirements, seating preferences..." value={form.requests} onChange={upd("requests")} style={{resize:"vertical"}}/>
                  </div>
                </div>
                <button onClick={()=>setSubmitted(true)} style={{marginTop:"1.5rem",padding:"14px 38px",background:"var(--charcoal)",border:"none",color:"var(--cream)",fontFamily:"'DM Sans',sans-serif",fontSize:".77rem",letterSpacing:".13em",textTransform:"uppercase",fontWeight:600,cursor:"pointer"}}>
                  Request Reservation
                </button>
              </div>
            )}
          </InView>

          <InView delay={.2}>
            <div style={{background:"var(--cream)",border:"1px solid var(--border)",borderTop:"2px solid var(--gold)",padding:"2.25rem"}}>
              <h3 style={{fontSize:".9rem",fontWeight:600,marginBottom:"1.4rem"}}>Reservation Info</h3>
              {[
                {label:"Lunch",    value:"12:00 PM – 3:00 PM"},
                {label:"Dinner",   value:"7:00 PM – 11:00 PM"},
                {label:"Days",     value:"Monday – Sunday"},
                {label:"Phone",    value:"+92 42 3500 0000"},
                {label:"Email",    value:"reservations@wokin.pk"},
              ].map(item=>(
                <div key={item.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".75rem 0",borderBottom:"1px solid var(--border)",gap:"1rem"}}>
                  <span style={{fontSize:".7rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".07em",whiteSpace:"nowrap"}}>{item.label}</span>
                  <span style={{fontSize:".82rem",fontWeight:500,textAlign:"right"}}>{item.value}</span>
                </div>
              ))}
              <p style={{marginTop:"1.25rem",fontSize:".74rem",color:"var(--muted)",lineHeight:1.7,padding:".9rem",background:"var(--ivory)",border:"1px solid var(--border)"}}>
                Reservations held 15 min past booking. For parties of 8+, call us directly.
              </p>
            </div>
          </InView>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function ContactLocation(){
  return(
    <div style={{paddingTop:72}}>
      <section style={{background:"var(--charcoal)",padding:"5rem clamp(1rem,7vw,7rem) 4rem"}}>
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="section-label" style={{color:"var(--gold-light)"}}>Get In Touch</motion.p>
          <motion.div variants={fadeUp} className="divider"/>
          <motion.h1 variants={fadeUp} style={{fontSize:"clamp(2rem,6vw,4rem)",fontWeight:700,color:"var(--cream)"}}>Contact & Location</motion.h1>
        </motion.div>
      </section>

      <section style={{padding:"6rem clamp(1rem,7vw,7rem)",background:"var(--ivory)"}}>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",maxWidth:1060,margin:"0 auto"}}>
          <InView>
            <p className="section-label">Contact Us</p>
            <div className="divider"/>
            <h2 style={{fontSize:"1.4rem",fontWeight:600,marginBottom:"2rem"}}>We'd Love to Hear From You</h2>
            {[
              {icon:"📍",label:"Address",value:"12 Liberty Market Road\nGulberg III, Lahore\nPunjab, Pakistan"},
              {icon:"📞",label:"Phone",  value:"+92 42 3500 0000\n+92 300 000 0000"},
              {icon:"✉️",label:"Email",  value:"hello@wokin.pk\nreservations@wokin.pk"},
              {icon:"🕐",label:"Hours",  value:"Mon–Sun: 12:00 PM – 11:00 PM\nLunch 12–3 PM  ·  Dinner 7–11 PM"},
            ].map(item=>(
              <div key={item.label} style={{display:"flex",gap:"1.25rem",marginBottom:"1.75rem"}}>
                <span style={{fontSize:"1rem",marginTop:2}}>{item.icon}</span>
                <div>
                  <p style={{fontSize:".67rem",letterSpacing:".15em",textTransform:"uppercase",color:"var(--gold)",marginBottom:4}}>{item.label}</p>
                  {item.value.split("\n").map((l,i)=><p key={i} style={{color:"var(--muted)",fontSize:".86rem",lineHeight:1.8}}>{l}</p>)}
                </div>
              </div>
            ))}
          </InView>

          <InView delay={.15}>
            <div style={{background:"var(--cream)",border:"1px solid var(--border)",height:200,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"2rem",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,opacity:.12}}>
                {[33,66].map(y=><div key={y} style={{position:"absolute",left:0,right:0,top:`${y}%`,height:1,background:"var(--muted)"}}/>)}
                {[20,40,60,80].map(x=><div key={x} style={{position:"absolute",top:0,bottom:0,left:`${x}%`,width:1,background:"var(--muted)"}}/>)}
              </div>
              <div style={{position:"relative",textAlign:"center"}}>
                <div style={{width:12,height:12,background:"var(--red-acc)",borderRadius:"50%",margin:"0 auto 7px",boxShadow:"0 0 0 5px rgba(139,46,46,.2)"}}/>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:".86rem"}}>Wokin Restaurant</p>
                <p style={{fontSize:".72rem",color:"var(--muted)",marginTop:3}}>Gulberg III, Lahore</p>
              </div>
            </div>
            <h3 style={{fontSize:".92rem",fontWeight:600,marginBottom:"1.2rem"}}>Send a Message</h3>
            <div style={{display:"flex",flexDirection:"column",gap:".85rem"}}>
              <input type="text"  className="input-field" placeholder="Your name"/>
              <input type="email" className="input-field" placeholder="Email address"/>
              <textarea className="input-field" rows={4} placeholder="Your message..." style={{resize:"vertical"}}/>
              <button style={{padding:"13px",background:"var(--gold)",border:"none",color:"var(--charcoal)",fontFamily:"'DM Sans',sans-serif",fontSize:".77rem",letterSpacing:".13em",textTransform:"uppercase",fontWeight:600,cursor:"pointer"}}>
                Send Message
              </button>
            </div>
          </InView>
        </div>
      </section>
    </div>
  );
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

function Reviews(){
  return(
    <div style={{paddingTop:72}}>
      <section style={{background:"var(--charcoal)",padding:"5rem clamp(1rem,7vw,7rem) 4rem"}}>
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="section-label" style={{color:"var(--gold-light)"}}>Guest Experiences</motion.p>
          <motion.div variants={fadeUp} className="divider"/>
          <motion.h1 variants={fadeUp} style={{fontSize:"clamp(2rem,6vw,4rem)",fontWeight:700,color:"var(--cream)"}}>Reviews</motion.h1>
          <motion.div variants={fadeUp} style={{display:"flex",alignItems:"center",gap:".9rem",marginTop:"1.2rem"}}>
            <Stars n={5}/>
            <span style={{color:"rgba(247,243,238,.4)",fontSize:".86rem"}}>4.9 average across 2,000+ guests</span>
          </motion.div>
        </motion.div>
      </section>

      <section style={{background:"var(--cream)",padding:"3rem clamp(1rem,7vw,7rem)",borderBottom:"1px solid var(--border)"}}>
        <div className="rating-row" style={{display:"flex",gap:"3rem",flexWrap:"wrap"}}>
          {[{label:"Food Quality",pct:97},{label:"Service",pct:95},{label:"Ambiance",pct:94},{label:"Value",pct:91}].map(item=>(
            <div key={item.label} style={{flex:"1 1 130px",minWidth:120}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:".7rem",letterSpacing:".08em",textTransform:"uppercase",color:"var(--muted)"}}>{item.label}</span>
                <span style={{fontSize:".7rem",fontWeight:600,color:"var(--gold)"}}>{item.pct}%</span>
              </div>
              <div style={{height:2,background:"var(--border)",borderRadius:2}}>
                <motion.div initial={{width:0}} whileInView={{width:`${item.pct}%`}} transition={{duration:.8,ease:"easeOut"}} viewport={{once:true}}
                  style={{height:"100%",background:"var(--gold)",borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"5rem clamp(1rem,7vw,7rem)",background:"var(--ivory)"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1.5rem"}}>
          {REVIEWS.map((r,i)=>(
            <InView key={r.name} delay={(i%3)*.1}>
              <div style={{border:"1px solid var(--border)",padding:"2rem",background:"var(--cream)",height:"100%"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem",flexWrap:"wrap",gap:".5rem"}}>
                  <Stars n={r.rating}/>
                  <span style={{fontSize:".67rem",color:"var(--muted)"}}>{r.date}</span>
                </div>
                <p style={{color:"var(--charcoal-soft)",lineHeight:1.85,fontSize:".86rem"}}>"{r.text}"</p>
                <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".5rem"}}>
                  <div>
                    <p style={{fontWeight:600,fontSize:".84rem"}}>{r.name}</p>
                    <p style={{fontSize:".7rem",color:"var(--gold)",marginTop:2}}>{r.location}</p>
                  </div>
                  <div style={{fontSize:".6rem",background:"rgba(184,147,90,.08)",color:"var(--gold)",padding:"3px 9px",border:"1px solid rgba(184,147,90,.28)",letterSpacing:".07em",textTransform:"uppercase"}}>Verified Guest</div>
                </div>
              </div>
            </InView>
          ))}
        </div>
        <InView>
          <div style={{marginTop:"3rem",padding:"3rem clamp(1rem,4vw,3rem)",background:"var(--charcoal)",textAlign:"center"}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"var(--cream)",marginBottom:".7rem"}}>Dined with us recently?</p>
            <p style={{color:"rgba(247,243,238,.4)",fontSize:".86rem",marginBottom:"1.5rem"}}>We'd love to hear about your experience.</p>
            <button style={{padding:"12px 30px",background:"var(--gold)",border:"none",color:"var(--charcoal)",fontFamily:"'DM Sans',sans-serif",fontSize:".77rem",letterSpacing:".13em",textTransform:"uppercase",fontWeight:600,cursor:"pointer"}}>Write a Review</button>
          </div>
        </InView>
      </section>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({setPage}){
  return(
    <footer style={{background:"#111",color:"#888",padding:"4rem clamp(1rem,7vw,7rem) 2rem",borderTop:"1px solid #1e1e1e"}}>
      <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"3rem",marginBottom:"3rem"}}>
        <div>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.35rem",fontWeight:700,color:"#F7F3EE",marginBottom:5}}>Wokin</p>
          <p style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"1.2rem"}}>Pakistani · Chinese Cuisine</p>
          <p style={{fontSize:".8rem",lineHeight:1.9,maxWidth:285}}>12 Liberty Market Road, Gulberg III, Lahore, Punjab, Pakistan</p>
          <p style={{fontSize:".8rem",marginTop:".5rem"}}>+92 42 3500 0000</p>
        </div>
        <div>
          <p style={{fontSize:".62rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"1rem"}}>Navigate</p>
          {NAV_ITEMS.map(item=>(
            <button key={item} onClick={()=>setPage(item)}
              style={{display:"block",background:"none",border:"none",color:"#666",fontSize:".8rem",padding:"3px 0",cursor:"pointer",textAlign:"left",transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color="var(--gold)"}
              onMouseLeave={e=>e.target.style.color="#666"}>
              {item}
            </button>
          ))}
        </div>
        <div>
          <p style={{fontSize:".62rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"1rem"}}>Hours</p>
          <p style={{fontSize:".8rem",lineHeight:1.9}}>Monday – Sunday</p>
          <p style={{fontSize:".8rem"}}>Lunch: 12 PM – 3 PM</p>
          <p style={{fontSize:".8rem"}}>Dinner: 7 PM – 11 PM</p>
          <p style={{fontSize:".62rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--gold)",marginTop:"1.5rem",marginBottom:".7rem"}}>Social</p>
          <div style={{display:"flex",gap:".5rem"}}>
            {["IG","FB","TT"].map(s=>(
              <div key={s} style={{width:28,height:28,border:"1px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".64rem",color:"#555"}}>{s}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{borderTop:"1px solid #1e1e1e",paddingTop:"1.75rem",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
        <p style={{fontSize:".7rem"}}>© 2025 Wokin Restaurant. All rights reserved.</p>
        <p style={{fontSize:".7rem"}}>Crafted with care in Lahore, Pakistan</p>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App(){
  const [page,setPage]=useState("Home");
  const go=p=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"});};

  const render=()=>{
    switch(page){
      case "Home":               return <Home setPage={go}/>;
      case "Menu":               return <Menu/>;
      case "About":              return <About/>;
      case "Reservation":        return <Reservation/>;
      case "Contact & Location": return <ContactLocation/>;
      case "Reviews":            return <Reviews/>;
      default:                   return <Home setPage={go}/>;
    }
  };

  return(
    <>
      <style>{FONT_LINK+CSS}</style>
      <Navbar page={page} setPage={go}/>
      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}}>
          {render()}
        </motion.main>
      </AnimatePresence>
      <Footer setPage={go}/>
    </>
  );
}
