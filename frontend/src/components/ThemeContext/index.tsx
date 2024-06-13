import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "midnights" | "ttpd" | "reputation" | "lover";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: (theme?: Theme | undefined) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("midnights");

  const toggleTheme = (theme?: Theme) => {
    if (theme) {
      setTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      setTheme("midnights");
      document.documentElement.setAttribute("data-theme", "midnights");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
