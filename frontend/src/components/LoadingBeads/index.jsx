import React from "react";
import "./LoadingBeads.css"; // Import the CSS file

const LoadingBeads = () => {
  const reversedText = "♥LOADING♥".split("").join("");

  return (
    <>
      <div className="flex items-center justify-center h-96">
        <div className="bead-container">
          {reversedText.split("").map((char, index) => (
            <div
              key={index}
              className={`bead group-1 bg-white ${
                char.match(/^[A-Z]+$/) ? "text-black" : "text-red"
              }`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>{" "}
      <p className="w-3/4 m-auto text-center text-sm">
        This may take a minute or so depending on the number of beads and if
        you're including acronyms.
      </p>
    </>
  );
};

export default LoadingBeads;
