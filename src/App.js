import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Bracelets from "./components/Bracelets";
import LyricsTable from "./components/LyricsTable";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";

function App() {
  const dropdownItems = [
    { value: "folklore", label: "folklore" },
    { value: "reputation", label: "reputation" },
    { value: "midnights", label: "midnights" },
  ];
  const [theme, setTheme] = useState('theme');

  function handleThemeChange(theme){
    console.log(theme);
    setTheme(theme);
  }

  return (
    <Router>
      <Header theme={theme} />
      <Navbar />
      <Dropdown items={dropdownItems} theme={theme} handleThemeChange={handleThemeChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bracelets" element={<Bracelets />} />
        <Route path="/lyrics" element={<LyricsTable />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
