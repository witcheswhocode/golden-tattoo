import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import Typewriter from "../Typewriter";

const getRandomValue = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

interface Position {
  top: number;
  left: number;
}

const generatePositions = (
  numItems: number,
  viewportWidth: number,
  viewportHeight: number
): Position[] => {
  const positions: Position[] = [];
  for (let i = 0; i < numItems; i++) {
    const top = getRandomValue(0, viewportHeight);
    const left = getRandomValue(0, viewportWidth);
    positions.push({ top, left });
  }
  return positions;
};

interface RandomTypewriterBackgroundProps {
  strings: string[];
  duration?: number;
  speed?: number;
}

const RandomTypewriterBackground: React.FC<RandomTypewriterBackgroundProps> = ({
  strings,
  duration = 3000,
  speed = 300,
}) => {
  const { theme } = useTheme();
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      const newPositions = generatePositions(
        strings.length,
        viewportWidth,
        viewportHeight
      );
      setPositions(newPositions);
    };

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      updatePositions();
    };

    window.addEventListener("resize", handleResize);
    updatePositions(); // Initial position update

    return () => window.removeEventListener("resize", handleResize);
  }, [viewportWidth, viewportHeight, strings.length]);

  // Update positions when theme changes to or from 'ttpd'
  useEffect(() => {
    const newPositions = generatePositions(
      strings.length,
      viewportWidth,
      viewportHeight
    );
    setPositions(newPositions);
  }, [theme, viewportWidth, viewportHeight, strings.length]);

  return (
    <div className={`${theme === "ttpd" ? "" : "hidden"} fixed w-full min-h-screen z-0`}>
      {positions.map((position, index) => (
        <div
          key={`${theme}-${index}`} // Update key to force re-render on theme change
          className={`absolute flex flex-nowrap w-fit text-sm`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            animationDelay: `${getRandomValue(0, 10000)}ms`,
            whiteSpace: "nowrap", // Ensure text does not wrap
            overflow: "visible", // Allow overflow
            transform: `translate(-100%, -100%)`, // Center the text
          }}
        >
          <Typewriter text={strings[index]} size="sm" duration={duration} speed={speed} fade={index === strings.length - 1} />
        </div>
      ))}
    </div>
  );
};

export default RandomTypewriterBackground;
