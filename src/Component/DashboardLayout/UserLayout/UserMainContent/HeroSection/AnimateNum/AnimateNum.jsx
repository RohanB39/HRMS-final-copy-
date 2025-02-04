import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedNumber = ({ targetNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    let start = 0;
    let end = targetNumber;
    let duration = 2000;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const newNumber = Math.min(Math.floor((progress / duration) * end), end);
      setCurrentNumber(newNumber);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetNumber]);

  return (
    <div className="relative inline-block">
      <motion.span
        className="text-4xl font-Work text-darkmainBg dark:text-darkPrimaryText"
        key={currentNumber}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {currentNumber}
      </motion.span>
    </div>
  );
};

export default AnimatedNumber;
