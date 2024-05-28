import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Writers from "./pages/Writers";
import Bracelets from "./pages/Bracelets";
import LyricsTable from "./pages/Lyrics";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown/Dropdown";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { DropdownItem } from "./components/Dropdown/Dropdown";

function App() {
  const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const items = ["theme", "lover", "folklore", "reputation", "midnights"];

    const dropdownItems: DropdownItem[] = items.map(item => ({ value: item }));
    
    function handleThemeChange(theme: any) {
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
    <ThemeProvider>
      <Router>
        <Header />
        <Navbar />
        <ThemeToggle />
        <Routes>
          <Route path="/writers" element={<Writers />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/lyrics" element={<LyricsTable />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
