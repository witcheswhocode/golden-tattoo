import React, { useEffect } from "react";
import { useTheme } from "../..";

const hrefDictionary: { [key: string]: string } = {
  folklore:
    "https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica:ital@1&display=swap",
  evermore:
    "https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica:ital@1&display=swap",
  red: "https://fonts.googleapis.com/css2?family=Anton",
  reputation: "https://fonts.googleapis.com/css2?family=UnifrakturMaguntia",
  lover: "https://fonts.googleapis.com/css2?family=Satisfy",
  ttpd: "https://fonts.googleapis.com/css2?family=Satisfy",
  midnights: "https://fonts.googleapis.com/css?family=Monoton",
  mommy: "https://fonts.googleapis.com/css?family=Monoton",
};
export const ThemeLoader = () => {
  const { theme } = useTheme();

  const loadThemeText = (theme: string) => {
    const existingLink = document.querySelector(
      `link[href="${hrefDictionary[theme]}"]`
    );

    if (!existingLink) {
      const link = document.createElement("link");
      link.href = hrefDictionary[theme];
      link.rel = "stylesheet";
      document.head.appendChild(link);
      console.log(`Loading... ${theme}`);
    }
  };

  useEffect(() => {
    loadThemeText(theme);
  }, [theme]);

  return null; // This component doesn't render anything
};
