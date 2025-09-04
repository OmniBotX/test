import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Teams from "./pages/Teams/Teams";
import Events from "./pages/Events/Events";
import Projects from "./pages/Projects/Projects";
import "./App.css";

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    // Check if preloader has been shown before
    return !sessionStorage.getItem("preloaderShown");
  });

  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.classList.toggle("light", savedTheme === "light");
  }, []);

  const handlePreloaderFinish = () => {
    setShowPreloader(false);
    // Mark preloader as shown for this session
    sessionStorage.setItem("preloaderShown", "true");
  };

  // If preloader is active, show only preloader
  if (showPreloader) {
    return <Preloader onFinish={handlePreloaderFinish} />;
  }

  // After preloader, show main app with fade-in
  return (
    <div className="app animate-fadein">
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
