import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    // Add click animation
    setLogoClicked(true);
    setTimeout(() => setLogoClicked(false), 200);

    // Navigate to home
    if (location.pathname === "/") {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page
      navigate("/");
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path, sectionId = null) => {
    if (path === "/" && sectionId && location.pathname === "/") {
      // If we're on home page and clicking a section link, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (path === "/" && sectionId && location.pathname !== "/") {
      // If we're on another page and want to go to home section, navigate then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Regular navigation to different pages
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo - Clickable to navigate home */}
        <div
          className={`navbar-logo ${logoClicked ? "clicked" : ""}`}
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleLogoClick();
            }
          }}
        >
          <span className="logo-text">AeroClub IITD</span>
          <div className="logo-drone">🚁</div>
          <div className="logo-ripple"></div>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-menu">
          <li>
            <button
              onClick={() => handleNavClick("/", "hero")}
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              <span className="nav-text">Home</span>
              <div className="nav-ripple"></div>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("/gallery")}
              className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
            >
              <span className="nav-text">Gallery</span>
              <div className="nav-ripple"></div>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("/teams")}
              className={`nav-link ${isActive("/teams") ? "active" : ""}`}
            >
              <span className="nav-text">Teams</span>
              <div className="nav-ripple"></div>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("/projects")}
              className={`nav-link ${isActive("/projects") ? "active" : ""}`}
            >
              <span className="nav-text">Projects</span>
              <div className="nav-ripple"></div>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("/events")}
              className={`nav-link ${isActive("/events") ? "active" : ""}`}
            >
              <span className="nav-text">Events</span>
              <div className="nav-ripple"></div>
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <div className="mobile-btn-ripple"></div>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <button
            onClick={() => handleNavClick("/", "hero")}
            className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
          >
            <span>Home</span>
            <div className="mobile-nav-ripple"></div>
          </button>
          <button
            onClick={() => handleNavClick("/gallery")}
            className={`mobile-nav-link ${
              isActive("/gallery") ? "active" : ""
            }`}
          >
            <span>Gallery</span>
            <div className="mobile-nav-ripple"></div>
          </button>
          <button
            onClick={() => handleNavClick("/teams")}
            className={`mobile-nav-link ${isActive("/teams") ? "active" : ""}`}
          >
            <span>Teams</span>
            <div className="mobile-nav-ripple"></div>
          </button>
          <button
            onClick={() => handleNavClick("/projects")}
            className={`mobile-nav-link ${
              isActive("/projects") ? "active" : ""
            }`}
          >
            <span>Projects</span>
            <div className="mobile-nav-ripple"></div>
          </button>
          <button
            onClick={() => handleNavClick("/events")}
            className={`mobile-nav-link ${isActive("/events") ? "active" : ""}`}
          >
            <span>Events</span>
            <div className="mobile-nav-ripple"></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
