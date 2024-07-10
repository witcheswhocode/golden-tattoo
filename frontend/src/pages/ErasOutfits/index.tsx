import React from "react";
import { useTheme } from "src/components/ThemeContext";

const data: any = [
  {
    id: 0,
    eras: {
      lover: { outfits: ["blue", "pink", "purple"] },
      fearless: { outfits: ["gold", "pink"] },
    },
  },
  {
    id: 1,
    eras: {
      lover: { outfits: ["blue", "pink"] },
      fearless: { outfits: ["gold", "pink"] },
    },
  },
];

const ErasOutfits: React.FC = () => {
  const { theme } = useTheme();

  const createGradientId = (id: number, era: string) => `gradient-${id}-${era}`;

  return (
    <div className={`bg-${theme}-panel text-${theme}-panelText rounded-md p-4 m-4 space-y-2 z-20 md:w-2/3`}>
      {data.map((element: any) => (
        <div key={element.id} className="flex space-y-4">
          <p>ID: {element.id}</p>
          {Object.entries(element.eras).map(([era, details]: any) => {
            const gradientId = createGradientId(element.id, era);

            return (
              <div key={era} className="space-y-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-16 h-16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                      {details.outfits.map((color: string, index: number) => (
                        <stop key={index} offset={`${(index / (details.outfits.length - 1)) * 100}%`} style={{ stopColor: color }} />
                      ))}
                    </linearGradient>
                  </defs>
                  {era === "lover" && (
                    <path
                      fill={`url(#${gradientId})`}
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  )}
                  {era === "fearless" && (
                    <path
                      fill={`url(#${gradientId})`}
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  )}
                </svg>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ErasOutfits;
