import React from "react";
import { useTheme } from "src/components/ThemeContext";

interface LetterCountProps {
  availableLetters: { [key: string]: number };
  letterTotal: number;
  lettersLeft: number;
}

const LetterCount: React.FC<LetterCountProps> = ({
  availableLetters,
  letterTotal,
  lettersLeft,
}) => {
  const { theme } = useTheme();
  return (
    <div className={`p-1 mb-3 border-4 border-${theme}-scoreBoardBorder bg-${theme}-scoreBoard m-auto`}>
      <div className={`w-full flex p-1 justify-between`}>
        <p className={`text-sm font-semibold text-${theme}-scoreBoardTextHeader`}>LETTERS LEFT</p>
        {/*<p className={`text-sm`}>
          (<span className={`text-${theme}-scoreBoardTextNumber`}> {lettersLeft}</span><span className={`text-${theme}-scoreBoardTextHeader`}> / {letterTotal} </span>)
        </p>*/}
      </div>
      <div className={`flex w-full border border-r-2 border-${theme}-scoreBoardBorder`}>
        {availableLetters &&
          Object.entries(availableLetters)
            .slice(0, 13)
            .map(([id, quantity], index) => (
              <div className={`w-full border border-t-2 border-${theme}-scoreBoardBorder`} key={`${id}-count`}>
                <div
                  className={`flex justify-center items-center text-sm text-${theme}-scoreBoardTextHeader`}
                  key={`${id}-letter`}
                >
                  {id.toUpperCase()}
                </div>
                <div
                  className={`flex justify-center items-center text-sm text-${theme}-scoreBoardTextNumber`}
                  key={`${id}-quantity`}
                >
                  {quantity}
                </div>
              </div>
            ))}
      </div>
      <div className={`flex w-full border border-r-2 border-${theme}-scoreBoardBorder`}>
        {availableLetters &&
          Object.entries(availableLetters)
            .slice(13, 26)
            .map(([id, quantity], index) => (
              <div className={`w-full border border-${theme}-scoreBoardBorder`} key={`${id}-count`}>
                <div
                  className={`flex justify-center items-center text-sm text-${theme}-scoreBoardTextHeader`}
                  key={`${id}-letter`}
                >
                  {id.toUpperCase()}
                </div>
                <div
                  className={`flex justify-center items-center text-sm text-${theme}-scoreBoardTextNumber`}
                  key={`${id}-quantity`}
                >
                  {quantity}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LetterCount;
