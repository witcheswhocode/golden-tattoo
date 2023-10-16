
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './components/Home';
import Bracelets from './components/Bracelets';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bracelets' element={<Bracelets/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
