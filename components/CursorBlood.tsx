import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

const CursorBlood: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const addParticles = useCallback((x: number, y: number) => {
    const newParticles = Array.from({ length: 3 }).map(() => ({
      id: Math.random(),
      x,
      y,
      size: Math.random() * 6 + 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
    }));
    setParticles((prev) => [...prev, ...newParticles].slice(-20)); // Limit count for performance
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      addParticles(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addParticles(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [addParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, x: p.x, y: p.y, scale: 1 }}
            animate={{
              opacity: 0,
              x: p.x + p.vx * 2,
              y: p.y + p.vy * 2 + 50, // Gravity effect
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full bg-red-700 blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              boxShadow: '0 0 5px rgba(185, 28, 28, 0.5)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorBlood;