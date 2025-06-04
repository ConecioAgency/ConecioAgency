import { motion } from 'framer-motion';
import { useState } from 'react';

const DevMeme = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm p-4 rounded-lg border border-white/10 shadow-lg"
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? [0, -2, 2, -2, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">👨‍💻</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white/90">
              Me: "Let me just fix this one small bug..."
            </p>
            <p className="text-xs text-white/60 mt-1">
              *3 hours later* "Why is everything broken?"
            </p>
          </div>
        </div>
        <motion.div
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          Relatable
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DevMeme; 