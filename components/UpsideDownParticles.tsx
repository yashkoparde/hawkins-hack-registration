import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UpsideDownParticles: React.FC = () => {
  // Use state to ensure random values are consistent after hydration
  const [particles, setParticles] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-gray-400 rounded-full opacity-30 blur-[1px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            top: '110%',
          }}
          animate={{
            top: '-10%',
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default UpsideDownParticles;