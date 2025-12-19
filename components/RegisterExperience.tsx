import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import UpsideDownParticles from './UpsideDownParticles';

export default function RegisterExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- SCROLL LOGIC ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 50,
    restDelta: 0.0001
  });

  // --- TRANSFORMS ---
  
  // 1. Intro Sequence (0% - 15%)
  const initialTextOpacity = useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]);
  const initialTextScale = useTransform(smoothProgress, [0, 0.12], [1, 1.1]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.04], [1, 0]);

  // 2. Pre-Horror Quote (12% - 25%)
  const quote1Opacity = useTransform(smoothProgress, [0.10, 0.14, 0.22, 0.25], [0, 1, 1, 0]);
  const quote1Y = useTransform(smoothProgress, [0.12, 0.25], ["20px", "-20px"]);

  // 3. ELEGANT HORROR SEQUENCE (25% - 45%)
  const horrorOpacity = useTransform(smoothProgress, [0.24, 0.28, 0.42, 0.46], [0, 1, 1, 0]);
  const clockRotation = useTransform(smoothProgress, [0.25, 0.45], [0, 120]);
  const clockOpacity = useTransform(smoothProgress, [0.25, 0.30, 0.40, 0.45], [0, 0.12, 0.12, 0]);
  
  const horrorText1Opacity = useTransform(smoothProgress, [0.26, 0.29, 0.32, 0.35], [0, 1, 1, 0]);
  const horrorText2Opacity = useTransform(smoothProgress, [0.36, 0.39, 0.42, 0.45], [0, 1, 1, 0]);
  
  const lightningOpacity = useTransform(smoothProgress, 
    [0.28, 0.285, 0.29, 0.34, 0.345, 0.35, 0.39, 0.395, 0.40], 
    [0, 0.3, 0, 0, 0.2, 0, 0, 0.4, 0] 
  );
  
  const veinScale = useTransform(smoothProgress, [0.25, 0.46], [1, 1.8]);

  // 4. Atmosphere
  const fogIntensity = useTransform(smoothProgress, [0.1, 0.2, 0.8, 0.9], [0, 0.95, 0.95, 0]);
  const bgRedness = useTransform(smoothProgress, 
    [0.25, 0.32, 0.40, 0.48, 0.85], 
    ["#000000", "#150505", "#200505", "#000000", "#100505"] 
  );

  // 5. Visual Anchor (The Rift)
  const gateScale = useTransform(smoothProgress, [0.1, 0.42], [0.8, 2.5]);
  const gateOpacity = useTransform(smoothProgress, [0.10, 0.18, 0.40, 0.48], [0, 1, 1, 0]); 
  const gateBlur = useTransform(smoothProgress, [0.40, 0.48], ["0px", "25px"]);
  const gateShake = useTransform(smoothProgress, [0.28, 0.42], ["0px", "8px"]);

  // 6. MAP SEQUENCE LOGIC (48% - 88%)
  const mapOpacity = useTransform(smoothProgress, [0.46, 0.50, 0.88, 0.92], [0, 1, 1, 0]);
  const mapTranslateX = useTransform(smoothProgress, [0.50, 0.88], ["0%", "-75%"]); 

  // 7. Post-Map Quote (90% - 95%)
  const quote2Opacity = useTransform(smoothProgress, [0.88, 0.91, 0.94, 0.96], [0, 1, 1, 0]);
  const quote2Scale = useTransform(smoothProgress, [0.90, 0.96], [0.95, 1.05]);

  // 8. FINAL DECISION & CREDITS (96% - 100%)
  const finalUiOpacity = useTransform(smoothProgress, [0.95, 0.985], [0, 1]);
  const finalUiScale = useTransform(smoothProgress, [0.95, 0.985], [0.98, 1]);

  const locations = [
    { title: "PRE-EVENT TALK", time: "31 DEC | 15:30 – 16:00", desc: "BRIEFING BEFORE ENTRY", sub: "VENUE UNDISCLOSED", img: "brightness-50 grayscale" },
    { title: "HACK BEGINS", time: "16:00 – 17:15", desc: "LOGIC IS TESTED", sub: "VENUE UNDISCLOSED", img: "brightness-75 hue-rotate-15" },
    { title: "FINAL EPISODE", time: "17:15 – 19:30", desc: "INDIA PREMIERE WINDOW", sub: "VENUE UNDISCLOSED", img: "brightness-50 contrast-125 sepia" },
    { title: "RESULTS", time: "19:30", desc: "OUTCOMES REVEALED", sub: "VENUE UNDISCLOSED", img: "brightness-50 invert-[.10]" }
  ];

  return (
    <motion.div 
      ref={containerRef} 
      className="h-[2000vh] relative" 
      style={{ backgroundColor: bgRedness }}
    >
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        
        <UpsideDownParticles />

        {/* --- 1. Intro --- */}
        <motion.div 
          className="absolute z-30 text-center px-4"
          style={{ opacity: initialTextOpacity, scale: initialTextScale }}
        >
          <h1 className="text-gray-600 font-lab tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4">
            Subject #011
          </h1>
          <p className="text-gray-300 font-cinematic text-xl md:text-3xl tracking-[0.2em] mb-2">
            THE VOID IS CALLING
          </p>
          <p className="text-red-600 font-lab text-[10px] md:text-xs tracking-widest uppercase animate-pulse">
            SCROLL TO ENTER HAWKINS
          </p>
          <motion.div style={{ opacity: scrollIndicatorOpacity }} className="flex flex-col items-center mt-8 md:mt-12">
            <div className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-red-600 to-transparent" />
            <span className="text-[10px] text-gray-500 font-mono mt-4 tracking-widest uppercase">Proceed</span>
          </motion.div>
        </motion.div>

        {/* --- 2. Pre-Horror Quote --- */}
        <motion.div 
          className="absolute z-40 text-center px-4 w-full max-w-2xl"
          style={{ opacity: quote1Opacity, y: quote1Y }}
        >
          <h2 className="text-2xl md:text-4xl font-stranger text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]">
            "DO YOU COPY?"
          </h2>
          <p className="mt-4 md:mt-6 font-lab text-gray-400 tracking-[0.3em] text-xs md:text-sm uppercase">
            The gate is thinning. Silence is the only answer.
          </p>
        </motion.div>

        {/* --- 3. ELEGANT HORROR SEQUENCE --- */}
        <motion.div
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
            style={{ opacity: horrorOpacity }}
        >
            <motion.div className="absolute inset-0 bg-red-900 mix-blend-multiply" style={{ opacity: lightningOpacity }} />
            <motion.div 
                className="absolute w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] border border-red-900/20 rounded-full flex items-center justify-center opacity-10"
                style={{ rotate: clockRotation, opacity: clockOpacity }}
            >
                <div className="absolute w-1 h-[40%] bg-gradient-to-t from-red-600 to-transparent bottom-1/2 origin-bottom transform -translate-x-1/2" />
                <span className="absolute top-4 font-stranger text-red-900 text-4xl md:text-6xl">XII</span>
                <span className="absolute bottom-4 font-stranger text-red-900 text-4xl md:text-6xl">VI</span>
            </motion.div>
            <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_110%)] mix-blend-darken" style={{ scale: veinScale }} />

            {/* Perfect Centering Fix: Use grid and absolute positioning to avoid drift */}
            <div className="relative z-50 w-full h-full">
                <motion.div style={{ opacity: horrorText1Opacity }} className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-6xl font-cinematic text-red-800 tracking-[0.3em] italic text-center w-full">
                      Can you hear it?
                    </h1>
                </motion.div>
                <motion.div style={{ opacity: horrorText2Opacity }} className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-7xl font-stranger text-red-600 tracking-normal drop-shadow-[0_0_20px_rgba(220,38,38,0.5)] text-center w-full">
                      THE TICKING.
                    </h1>
                    <p className="text-red-900 font-lab tracking-[1em] text-[10px] md:text-xs mt-6 md:mt-8 uppercase text-center w-full">
                        It's almost time.
                    </p>
                </motion.div>
            </div>
        </motion.div>

        {/* --- 4. The Rift --- */}
        <motion.div
          className="absolute z-20 flex items-center justify-center"
          style={{ scale: gateScale, opacity: gateOpacity, filter: `blur(${gateBlur})`, x: gateShake }}
        >
          <div className="relative w-[280px] h-[480px] md:w-[450px] md:h-[650px]">
            <div className="absolute inset-0 bg-transparent border-l-8 border-r-8 border-red-600/30 blur-xl transform rotate-12 scale-125 rounded-[100%] animate-pulse" />
            <div className="absolute inset-0 bg-black shadow-[0_0_150px_rgba(220,38,38,0.6)] border border-red-500/20" 
                 style={{ clipPath: "polygon(50% 0, 60% 35%, 100% 50%, 60% 65%, 50% 100%, 40% 65%, 0 50%, 40% 35%)" }}>
              <div className="w-full h-full bg-gradient-to-b from-black via-red-950/30 to-black animate-[pulse_0.2s_infinite]"></div>
            </div>
          </div>
        </motion.div>

        {/* --- 5. The Map Sequence --- */}
        <motion.div 
          className="absolute inset-0 z-40 flex items-center left-0 top-0 h-full w-[400vw] pointer-events-none"
          style={{ opacity: mapOpacity, x: mapTranslateX }}
        >
          <div className="absolute top-1/2 left-0 w-full h-[1px] md:h-[2px] bg-gradient-to-r from-transparent via-red-600/10 to-transparent transform -translate-y-1/2" />
          {locations.map((loc, index) => (
            <div key={index} className="w-[100vw] h-full flex flex-col items-center justify-center relative px-4 md:px-8">
              <div className={`absolute inset-0 opacity-20 ${loc.img} z-0`} style={{ background: `radial-gradient(circle, rgba(100,0,0,0.1) 0%, rgba(0,0,0,1) 85%)` }} />
              <div className="relative z-10 text-center">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-red-700 rounded-full mx-auto mb-12 md:mb-16 shadow-[0_0_40px_#ff0000] relative">
                   <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-60" />
                </div>
                <div className="border-l-2 border-red-700/40 pl-6 md:pl-10 text-left backdrop-blur-xl bg-black/60 p-8 md:p-14 rounded-r-2xl md:rounded-r-3xl border-y border-y-red-950/20 shadow-2xl max-w-[90vw] md:max-w-none">
                  <h3 className="text-red-500 font-lab text-[10px] md:text-xs tracking-[0.5em] mb-3 md:mb-4 uppercase">{loc.time}</h3>
                  <h2 className="text-3xl md:text-8xl font-stranger text-gray-100 mb-4 md:mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] uppercase tracking-tighter">{loc.title}</h2>
                  <p className="text-gray-400 font-lab uppercase tracking-[0.4em] text-[10px] md:text-base border-b border-red-800/30 pb-3 md:pb-4 inline-block">{loc.desc}</p>
                  <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#ff0000]" />
                    <p className="text-red-800 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">COORDINATES: {loc.sub}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* --- 6. Post-Map Quote --- */}
        <motion.div className="absolute z-40 text-center px-4 w-full max-w-2xl" style={{ opacity: quote2Opacity, scale: quote2Scale }}>
          <h2 className="text-xl md:text-4xl font-stranger text-gray-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">"FRIENDS DON'T LIE."</h2>
          <p className="mt-4 md:mt-6 font-lab text-red-600 tracking-[0.4em] text-[10px] md:text-sm uppercase animate-pulse">The hack is inevitable. The gate is wide open.</p>
        </motion.div>

        <motion.div style={{ opacity: fogIntensity }} className="absolute bottom-0 w-full h-[50vh] md:h-[60vh] bg-gradient-to-t from-black via-black/95 to-transparent z-25 pointer-events-none" />

        {/* --- 7. Final Decision & Credits --- */}
        <motion.div
          className="absolute z-50 flex flex-col items-center justify-center w-full h-full bg-black/95 backdrop-blur-3xl"
          style={{ opacity: finalUiOpacity, scale: finalUiScale }}
        >
          {/* Main Layout Container - Ensuring No Clipping */}
          <div className="flex-1 flex flex-col justify-center items-center w-full px-4 pt-12 max-h-screen overflow-hidden">
            <div className="mb-8 md:mb-16 text-center w-full max-w-[90vw] md:max-w-4xl mx-auto">
              <h1 className="text-[14vw] md:text-[10rem] font-stranger text-red-600 tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.7)] border-t-2 md:border-t-4 border-red-600/60 pt-4 md:pt-8 leading-[0.8] pb-4">
                HAWKINS<br/>HACK
              </h1>
              <div className="flex items-center justify-center gap-4 md:gap-8 mt-6 md:mt-10">
                <div className="h-[1px] w-6 md:w-16 bg-red-950" />
                <p className="text-gray-500 font-lab tracking-[0.3em] md:tracking-[0.7em] uppercase text-[8px] md:text-lg">
                    BELGAVI • 2025
                </p>
                <div className="h-[1px] w-6 md:w-16 bg-red-950" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-12 items-center w-full justify-center">
              <motion.a 
                href="#"
                whileHover={{ 
                  scale: 1.08, 
                  backgroundColor: "rgba(220, 38, 38, 1)", 
                  boxShadow: "0 0 40px rgba(220, 38, 38, 0.6)",
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.92 }}
                className="group relative px-10 py-4 md:px-16 md:py-7 overflow-hidden bg-red-700 text-white font-cinematic font-black tracking-[0.2em] md:tracking-[0.3em] shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-3 text-lg md:text-2xl">REGISTER</span>
                <motion.div 
                   className="absolute inset-0 bg-white/20"
                   initial={{ x: "-100%" }}
                   whileHover={{ x: "100%" }}
                   transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </motion.a>

              <motion.a 
                href="#"
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "rgba(255, 255, 255, 0.8)", 
                  color: "white",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 md:px-14 md:py-7 overflow-hidden border border-red-900/40 md:border-2 bg-transparent text-red-800 font-lab uppercase tracking-[0.2em] transition-all rounded-sm"
              >
                <span className="relative z-10 text-[10px] md:text-sm font-bold">Watch Trailer</span>
              </motion.a>
            </div>
          </div>

          <div className="w-full text-center pb-8 md:pb-16 bg-gradient-to-t from-black via-black/80 to-transparent px-4">
            <p className="text-[9px] md:text-xs font-lab text-gray-500 uppercase tracking-[0.4em] mb-6 border-t border-red-900/20 pt-6 inline-block">
              Designed and Developed by <span className="text-red-700 font-black">Yash B Koparde</span>
            </p>
            <div className="flex justify-center gap-6 md:gap-10 items-center">
              <motion.a whileHover={{ y: -5, color: "white" }} href="#" className="text-gray-500 transition-all duration-300"><svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></motion.a>
              <motion.a whileHover={{ y: -5, color: "white" }} href="#" className="text-gray-500 transition-all duration-300"><svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg></motion.a>
              <motion.a whileHover={{ y: -5, color: "#E1306C" }} href="#" className="text-gray-500 transition-all duration-300"><i className="bi bi-instagram text-xl md:text-2xl"></i></motion.a>
              <motion.a whileHover={{ y: -5, color: "#25D366" }} href="#" className="text-gray-500 transition-all duration-300"><i className="bi bi-whatsapp text-xl md:text-2xl"></i></motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}