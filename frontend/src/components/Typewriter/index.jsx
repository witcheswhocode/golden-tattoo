import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const Typewriter = ({ text, speed = 100 }) => {
  const { theme } = useTheme();
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [index, text, speed]);
  
  return (
    <div className="inline-block">
      <span className={`text-4xl font-${theme} text-${theme}-text`}>
        {displayedText}
      </span>
      <span className={`typewriter-cursor text-4xl font-${theme} text-${theme}-text`}>
        |
      </span>
    </div>
  );
};

export default Typewriter;
