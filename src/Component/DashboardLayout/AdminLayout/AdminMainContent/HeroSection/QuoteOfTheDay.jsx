import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const QuoteOfTheDay = () => {
  const quotes = [
    {
      title: "The only way to do great work is to love what you do.",
      description: "- Steve Jobs",
    },
    {
      title:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      description: "- Winston Churchill",
    },
    {
      title:
        "The future belongs to those who believe in the beauty of their dreams.",
      description: "- Eleanor Roosevelt",
    },
    {
      title: "It does not matter how slowly you go as long as you do not stop.",
      description: "- Confucius",
    },
    {
      title: "Your time is limited, don't waste it living someone else's life.",
      description: "- Steve Jobs",
    },
    {
      title: "The best way to predict your future is to create it.",
      description: "- Abraham Lincoln",
    },
    {
      title:
        "You are never too old to set another goal or to dream a new dream.",
      description: "- C.S. Lewis",
    },
    {
      title: "It always seems impossible until it’s done.",
      description: "- Nelson Mandela",
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="h-full hidden md:block overflow-hidden relative border border-gray-400 dark:border-darkDevider p-4">
      <motion.div
        className="absolute bottom-12 text-start"
        key={currentQuoteIndex}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title (h3) */}
        <motion.h3
          className="dark:text-darkAccent3 font-Work font-normal dark:font-light leading-tight w-[70%]"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {quotes[currentQuoteIndex].title}
        </motion.h3>

        {/* Description (p) with a delay */}
        <motion.p
          className="dark:text-darkAccent3 font-Work font-normal dark:font-light text-[12px]  mt-2 w-[80%]"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {quotes[currentQuoteIndex].description}
        </motion.p>
      </motion.div>

      {/* Dot Indicator */}
      <div className="absolute bottom-4 left-16 transform -translate-x-1/2 flex space-x-2">
        {quotes.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 rounded-full bg-gray-800 dark:bg-darkAccent3 ${
              currentQuoteIndex === index ? "opacity-100" : "opacity-50"
            }`}
            style={{
              transition: "opacity 0.3s ease",
            }}
          />
        ))}
      </div>
      <span className="absolute -top-[6rem] -right-[10rem] h-60 w-60 rounded-full outline dark:outline-darkAccent2 outline-gray-200"></span>
      <span className="absolute -top-[8rem] -right-[8rem] h-60 w-60 rounded-full outline dark:outline-darkAccent outline-gray-600"></span>
    </div>
  );
};

export default QuoteOfTheDay;
