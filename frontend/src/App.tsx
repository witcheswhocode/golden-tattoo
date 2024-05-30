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
import ShimmeringStars from "./components/ShimmeringStars";

function App() {

  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}

function ThemeWrapper() {
  const { theme } = useTheme();

  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const items = ["theme", "lover", "folklore", "reputation", "midnights"];
    
    const dropdownItems = items.map((item) => ({
      value: item,
    }));

    function handleThemeChange(theme:any) {
      toggleTheme(theme);
    }

    return (
      <Dropdown
        items={dropdownItems}
        theme={theme}
        handleThemeChange={handleThemeChange}
      />
    );
  };

  return (
    <div className={`bg-${theme}-background min-h-screen`}>
      <Router>
        <Header />
        <ThemeToggle />
        <Navbar />
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
