import React, { useState, useEffect } from "react";
import { useTheme } from "src/components/ThemeContext";

const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomDelay = (min: number, max: number) => Math.random() * (max - min) + min;

const generateStarPositions = (numStars: number, viewportWidth: number, viewportHeight: number) => {
  const starPositions = [];
  for (let i = 0; i < numStars; i++) {
    const top = getRandomValue(0, viewportHeight);
    const left = getRandomValue(0, viewportWidth);
    const delay = getRandomDelay(500, 2500); // Delay between 0 and 2000ms
    starPositions.push({ top, left, delay });
  }
  return starPositions;
};

const Stars: React.FC = () => {
  const { theme } = useTheme();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [starPositions, setStarPositions] = useState<{ top: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const updateStarPositions = () => {
      const positions = generateStarPositions(150, viewportWidth, viewportHeight); // Generate 50 stars
      setStarPositions(positions);
    };

    updateStarPositions();

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      updateStarPositions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewportWidth, viewportHeight]);

  return (
    <div className="fixed w-full h-full z-0">
      {starPositions.map((position, index) => (
        <div
          key={index}
          className={`absolute w-0.5 h-0.5 bg-white rounded-full animate-glowing-stars ${
            theme === "midnights" ? "" : "hidden"
          }`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            animationDelay: `${position.delay}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
