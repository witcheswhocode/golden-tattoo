import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
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
    <div className="typewriter-container">
      <span className="typewriter-text">{displayedText}</span>
      <span className="typewriter-cursor">|</span>
    </div>
  );
};

export default Typewriter;
