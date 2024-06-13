import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const Typewriter = ({ text, size = '4xl', themefont = false, duration, speed = 100 }) => {
  const { theme } = useTheme();
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (index < text.length) {
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearInterval(intervalId);
    } else {
      setIsCompleted(true);
    }
  }, [index, text, speed]);

  useEffect(() => {
    if (isCompleted) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [isCompleted, duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="inline-block ml-4">
      <span className={`text-${size} ${themefont ? `font-${theme}` : `font-mono`} text-${theme}-text`}>
        {displayedText}
      </span>
      <span className={`typewriter-cursor text-${size} ${themefont ? `font-${theme}` : `font-mono`} text-${theme}-text`}>
        |
      </span>
    </div>
  );
};

export default Typewriter;
