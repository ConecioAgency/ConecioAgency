import { motion } from 'framer-motion';

const bubbles = [
  { size: 220, top: '10%', left: '5%', color: 'bg-blue-200', delay: 0, x: 40, y: 60 },
  { size: 120, top: '60%', left: '10%', color: 'bg-orange-100', delay: 0.5, x: 30, y: -40 },
  { size: 80, top: '30%', left: '80%', color: 'bg-purple-200', delay: 1, x: -40, y: 30 },
  { size: 180, top: '70%', left: '60%', color: 'bg-pink-100', delay: 1.5, x: -30, y: -50 },
  { size: 100, top: '80%', left: '30%', color: 'bg-blue-100', delay: 2, x: 50, y: 20 },
  { size: 160, top: '20%', left: '60%', color: 'bg-green-100', delay: 1.2, x: -50, y: 40 },
];

export default function AnimatedBubblesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${b.color}`}
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            opacity: 0.5,
          }}
          animate={{
            x: [0, b.x, 0],
            y: [0, b.y, 0],
            scale: [1, 1.12, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: b.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
} 