import React from "react";
import BloodMoon from "src/components/BloodMoon";
import Curtains from "src/components/Curtains";
import LoadingBeads from "src/components/LoadingBeads";
import { useTheme } from "src/components/ThemeContext";

const Showcase: React.FC = ({}) => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full p-4 bg-gray-100 rounded-lg shadow-md z-20`}
    >
      <h2 className={`text-2xl font-bold mb-4`}>Animation Showcase</h2>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full`}
      >
        <div>
          <div className="w-full h-full flex justify-center items-center">
            <span className={`text-midnights-text font-midnights z-20`}>
              golden
              <span
                className={`${
                  theme === "midnights" ? "" : "hidden"
                } font-${theme}`}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span
                className={`${
                  theme === "midnights" ? "" : "hidden"
                } font-${theme}`}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>{" "}
              tattoo
            </span>
            <BloodMoon theme={"midnights"} />
          </div>
        </div>
        <Curtains theme={"ttpd"} />
        <LoadingBeads />
      </div>
    </div>
  );
};

export default Showcase;
