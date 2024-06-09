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
    <div className="mx-auto w-full h-32 overflow-hidden bg-white">
      <div className="relative w-full h-full">
        <div
          className={`flex items-center bg-center bg-cover bg-curtain ${
            isChecked ? "animate-curtainsLeft" : ""
          }  text-white float-left w-1/2 h-full z-20 justify-end`}
        >
          <h1 className="p-2">female rage:</h1>
        </div>

        <div
          className={`flex items-center text-white p-4 h-full justify-center absolute text-center z-10 w-full transition-opacity duration-1000 ease-out ${
            isChecked ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="pr-4 text-black">golden</h2>
          <img
            loading="lazy"
            src={"/assets/ttpd-header.png"}
            className="w-1/5 shadow-custom-light rounded-full"
            alt={
              "Taylor screaming into microphone during Who's Afraid of Little Old Me? on the Era's tour."
            }
          />
          <h2 className="pl-4 text-black">tattoo</h2>
        </div>

        <div
          className={`flex items-center  bg-center bg-cover bg-curtain ${
            isChecked ? "animate-curtainsRight" : ""
          }  text-white w-1/2 h-full z-20 justify-start`}
        >
          <h1 className="p-2"> the musical</h1>
        </div>
      </div>
    </div>
  );
};

export default Curtains;
