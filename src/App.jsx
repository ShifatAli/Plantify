import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Infobanner from "./component/Infobanner";
import Steps from "./component/Steps";
import Footer from "./component/Footer";
import Results from "./component/Resultss";
import About from "./component/About"; // About page

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main landing page */}
        <Route
          path="/"
          element={
            <div className="w-full overflow-x-hidden">
              <Navbar />
              <Hero />      
              <Infobanner />
              <Steps />
              <Footer />
            </div>
          }
        />

        {/* Results page */}
        <Route
          path="/results"
          element={
            <div className="w-full overflow-x-hidden">
              <Navbar />
              <Results />
              <Footer />
            </div>
          }
        />

        {/* About page */}
        <Route
          path="/about"
          element={
            <div className="w-full overflow-x-hidden">
              <Navbar />
              <About />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
