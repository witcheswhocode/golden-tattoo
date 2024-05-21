import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Writers from "./pages/Writers";
import Bracelets from "./pages/Bracelets";
import LyricsTable from "./pages/Lyrics";
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
        <Route path="/writers" element={<Writers />} />
        <Route path="/bracelets" element={<Bracelets />} />
        <Route path="/lyrics" element={<LyricsTable />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
