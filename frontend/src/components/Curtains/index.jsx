import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

const Curtains = ({ text = "golden tattoo", speed = 100 }) => {
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    const timer = setTimeout(() => {
      setIsChecked(true);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-32 overflow-hidden">
      <div className="relative w-full h-full">
        <div
          className={`flex items-center bg-center bg-cover bg-curtain ${
            isChecked ? "animate-curtainsLeft" : ""
          } text-white absolute left-0 w-1/2 h-full z-30 justify-end`}
        >
          <p className="p-2 text-3xl">female rage:</p>
        </div>

        <div
          className={`flex items-center text-white h-full justify-center border-2 border-theme-text absolute text-center z-20 w-full transition-opacity duration-1000 ease-out ${
            isChecked ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="mx-auto text-3xl font-ttpd text-theme-text">golden</p>
          <img
            loading="lazy"
            src={"/assets/ttpd-header.png"}
            className="w-1/4 shadow-ttpd rounded-full"
            alt={
              "Taylor screaming into microphone during Who's Afraid of Little Old Me? on the Era's tour."
            }
          />
          <p className="mx-auto text-3xl font-ttpd text-theme-text">tattoo</p>
        </div>

        <div
          className={`flex items-center bg-center bg-cover bg-curtain ${
            isChecked ? "animate-curtainsRight" : ""
          } text-white absolute right-0 w-1/2 h-full z-30 justify-start`}
        >
          <p className="p-2 text-3xl">the musical</p>
        </div>
      </div>
    </div>
  );
};

export default Curtains;
