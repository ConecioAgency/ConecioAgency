import { motion, useReducedMotion } from 'framer-motion';

// Configuration ultra-optimisée des bulles avec des valeurs statiques
const BUBBLES = Object.freeze([
  Object.freeze({ 
    id: 0, 
    size: 30, 
    x: 30, 
    y: 40, 
    color: 'from-indigo-500/1.5 to-purple-500/1.5',
    delay: 0
  }),
  Object.freeze({ 
    id: 1, 
    size: 20, 
    x: 60, 
    y: 60, 
    color: 'from-blue-500/1.5 to-cyan-500/1.5',
    delay: 0.1
  })
]);

// Animation ultra-légère avec valeurs optimisées
const bubbleAnimation = Object.freeze({
  y: [0, -10, 0],
  x: [0, 5, 0],
  scale: [1, 1.005, 1],
  opacity: [0.04, 0.06, 0.04],
  rotate: [0, 10, 20]
});

// Transition ultra-optimisée
const bubbleTransition = Object.freeze({
  duration: 3.5,
  repeat: Infinity,
  ease: "linear",
  repeatType: "loop" as const,
  type: "tween" as const
});

// Styles optimisés avec des valeurs calculées
const containerStyle = Object.freeze({
  contain: 'strict',
  willChange: 'transform',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  perspective: '1000px',
  isolation: 'isolate',
  mixBlendMode: 'multiply',
  filter: 'blur(0.3px)',
  opacity: 0.8
});

// Composant de bulle optimisé
const Bubble = motion.div;

const AnimatedBubbles = () => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) return null;

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      style={containerStyle}
    >
      {BUBBLES.map((bubble) => (
        <Bubble
          key={bubble.id}
          className={`absolute rounded-full bg-gradient-to-r ${bubble.color}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            ...containerStyle
          }}
          animate={bubbleAnimation}
          transition={{
            ...bubbleTransition,
            delay: bubble.delay
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBubbles; 