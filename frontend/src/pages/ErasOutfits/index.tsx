import React from "react";
import { useTheme } from "src/components/ThemeContext";
import Lover from "./ErasSVGs/Lover";
import Red from "./ErasSVGs/Red";
import Fearless from "./ErasSVGs/Fearless";

const data: any = [
  {
    id: 0,
    eras: {
      lover: {
        outfits: {
          bodysuit: ["blue", "pink"],
          guitar: "purple",
          jacket: "black",
        },
      },
      fearless: { outfits: { dress: "gold" } },
      red: { outfits: { colors: ["black", "red"], shirt: "EW" } },
    },
  },
  {
    id: 1,
    eras: {
      lover: {
        outfits: {
          bodysuit: ["blue", "gold"],
          guitar: "pink",
          jacket: "silver",
        },
      },
      fearless: { outfits: { dress: "gold" } },
      red: { outfits: { colors: ["black", "red"], shirt: "EW" } },
    },
  },
];

const ErasOutfits: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`bg-${theme}-panel text-${theme}-panelText rounded-md p-4 m-4 space-y-2 z-20 md:w-2/3`}
    >
      {data.map((element: any) => (
        <div key={element.id} className="flex space-y-4">
          <p>ID: {element.id}</p>
          {Object.entries(element.eras).map(([era, details]: any) => {
            console.log(details)
            return (
              <div key={era} className="space-y-2">
                {era === "lover" && (
                  <Lover
                    id={element.id}
                    roof={details.outfits.jacket}
                    house={details.outfits.bodysuit}
                    heart={details.outfits.guitar}
                  />
                )}
                {era === "fearless" && (
                  <Fearless id={element.id} color={details.outfits.dress} />
                )}
                {era === "red" && <Red />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ErasOutfits;
