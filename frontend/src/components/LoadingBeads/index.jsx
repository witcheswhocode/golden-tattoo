import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import "./LoadingBeads.css"; // Import the CSS file

const LoadingBeads = () => {
  const { theme } = useTheme();
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 2000); // 2 seconds delay before starting the animation
    return () => clearTimeout(timer);
  }, []);

  const reversedText = "♥LOADING♥".split("").join("");
  const reversedTextLength = reversedText.length;

  return (
    <>
      <div className="flex items-center justify-center h-96">
        <div className={`bead-container `}>
          {reversedText.split("").map((char, index) => {
            const animationDelay = startAnimation
              ? `${(1.2 - index * 0.2).toFixed(1)}s`
              : `${(0.8 - index * 0.2).toFixed(1)}s`;
            return (
              <div
                key={index}
                className={`bead ${
                  char.match(/^[A-Z]+$/) ? "text-black" : "text-red"
                } ${startAnimation ? "start" : "center"}`}
                style={{ animationDelay }}
              >
                {char}
              </div>
            );
          })}
        </div>
      </div>
      <p className={`w-3/4 m-auto text-center text-sm text-${theme}-panelText`}>
        This may take a minute or so depending on the number of beads and if
        you're including acronyms.
      </p>
    </>
  );
};

export default LoadingBeads;
