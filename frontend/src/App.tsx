import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider>
      <ThemeLoader />
      <ThemeWrapper />
    </ThemeProvider>
  );
}

function ThemeWrapper() {
  const { theme } = useTheme();

  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const items = ["theme", "lover", "reputation", "midnights"];

    const dropdownItems = items.map((item) => ({
      value: item,
    }));

    function handleThemeChange(theme: any) {
      toggleTheme(theme);
    }

    return (
      <div className="mx-4 my-2 md:w-2/3 md:m-auto flex justify-start items-start">
        <Dropdown
          items={dropdownItems}
          theme={theme}
          handleThemeChange={handleThemeChange}
        />
      </div>
    );
  };

  return (
    <div
      className={`${
        ["lover"].includes(theme)
          ? `bg-gradient-to-r from-lover-pink to-lover-blue`
          : `bg-${theme}-background`
      } flex flex-col min-h-screen`}
    >
      <Router>
        <Header />
        <Navbar />
        <ThemeToggle />
        <AppContent />
        <Footer />
        <ShimmeringStars />
      </Router>
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/writers" element={<Writers />} />
      <Route path="/bracelets" element={<Bracelets />} />
      <Route path="/lyrics" element={<LyricsTable />} />
    </Routes>
  );
}

export default App;
