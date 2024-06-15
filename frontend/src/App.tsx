import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Writers from "./pages/Writers";
import Bracelets from "./pages/Bracelets";
import LyricsTable from "./pages/Lyrics";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { ThemeLoader } from "./components/ThemeContext/components/ThemeLoader";
import ShimmeringStars from "./components/ShimmeringStars";
import About from "./pages/About";
import Typewriter from "./components/Typewriter";
import RandomTypewriterBackground from "./components/RandomTypewriterBackground";
import { Theme } from "./components/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ThemeLoader />
      <Router>
        <ThemeWrapper />
      </Router>
    </ThemeProvider>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ThemeWrapper() {
  const { theme, toggleTheme } = useTheme();
  const [dropDownClicked, setDropDownClicked] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const queryTheme = query.get("theme") as Theme;
    if (queryTheme && queryTheme !== theme) {
      toggleTheme(queryTheme);
    }
  }, [query, theme, toggleTheme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme && storedTheme !== theme) {
      toggleTheme(storedTheme);
    }
  }, [toggleTheme, theme]);


  const ThemeToggle = () => {
    const items: Theme[] = ["midnights", "ttpd", "reputation", "lover"];

    const dropdownItems = items.map((item) => ({
      value: item,
    }));

    function handleThemeChange(newTheme: string) {
      const theme = newTheme as Theme;
      toggleTheme(theme);
      setDropDownClicked(true);
      navigate(`${location.pathname}?theme=${theme}`);
    }

    return (
      <div className="mx-4 ml-8 my-2 w-full md:w-2/3 lg:w-1/2 flex justify-start items-start">
        <Dropdown
          items={dropdownItems}
          theme={theme}
          handleThemeChange={handleThemeChange}
        />{" "}
        {!dropDownClicked ? (
          <Typewriter
            size={"sm"}
            duration={1000}
            text={"< Pick a theme here..."}
          />
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${
        ["lover"].includes(theme)
          ? `bg-gradient-to-r from-lover-pink to-lover-blue`
          : `bg-${theme}-background`
      }  flex flex-col justify-center items-center min-h-screen`}
    >
      <Header />
      <Navbar />
      <ThemeToggle />
      <AppContent />
      <Footer />
      <ShimmeringStars />
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/writers" element={<Writers />} />
      <Route path="/bracelets" element={<Bracelets />} />
      <Route path="/lyrics" element={<LyricsTable />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
