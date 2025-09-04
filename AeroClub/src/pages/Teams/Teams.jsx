import React, { useState, useEffect } from "react";
import "./Teams.css";
import teamData from "./teamData.json";

const Teams = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && systemDark));

    // Listen for theme changes
    const handleThemeChange = () => {
      const newTheme = localStorage.getItem("theme");
      setIsDarkMode(newTheme === "dark");
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  // Helper function to get image path based on member position
  const getImagePath = (member, isAlt = false) => {
    const photoKey = isAlt ? "altPhoto" : "originalPhoto";
    const filename = member[photoKey];

    // Determine folder based on member's position
    if (member.position === "Overall Coordinator") {
      return `/OverallCoordinator/${filename}`;
    } else if (
      [
        "President",
        "Vice President",
        "Secretary",
        "Treasurer",
        "Executive Member",
      ].includes(member.position)
    ) {
      const folder = isAlt ? "Alt" : "Original";
      return `/Executive/${folder}/${filename}`;
    } else {
      // Coordinators
      const folder = isAlt ? "Alt" : "Original";
      return `/Coordinator/${folder}/${filename}`;
    }
  };

  const TeamCard = ({ member }) => (
    <div className="team-card">
      <div className="card-inner">
        {/* Front of card - Show Name and Position */}
        <div className="card-front">
          <div className="card-image-container">
            <img
              src={getImagePath(member, false)}
              alt={member.name}
              className="card-image"
              onError={(e) => {
                e.target.src = "/Logo/Aeroclub.png";
              }}
            />
            <div className="card-overlay">
              <div className="card-content">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-position">{member.position}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card - Show Alt Image with Funny Liner */}
        <div className="card-back">
          <div className="card-image-container">
            <img
              src={getImagePath(member, true)}
              alt={member.name}
              className="card-image"
              onError={(e) => {
                e.target.src = "/Logo/Aeroclub.png";
              }}
            />
            <div className="card-overlay card-overlay-back">
              <div className="card-content">
                <h3 className="member-name">{member.name}</h3>
                <p className="informal-title">"{member.informalTitle}"</p>
                <p className="funny-liner">"{member.description}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`teams-container ${isDarkMode ? "dark" : "light"}`}>
      {/* Animated Background */}
      <div className="teams-bg">
        <div className="floating-drone drone-1">✈️</div>
        <div className="floating-drone drone-2">🛩️</div>
        <div className="floating-drone drone-3">📄</div>
        <div className="paper-plane plane-1">✈️</div>
        <div className="paper-plane plane-2">📄</div>
      </div>

      {/* Header */}
      <div className="teams-header">
        <h1 className="teams-title">Meet Our Team</h1>
        <p className="teams-subtitle">
          The passionate pilots behind AeroClub IITD
        </p>
        <div className="title-drone">🚁</div>
      </div>

      {/* Overall Coordinator */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">Overall Coordinator</h2>
          <div className="section-line"></div>
        </div>
        <div className="team-grid single-member">
          {teamData.overallCoordinator.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Coordinators */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">Coordinators</h2>
          <div className="section-line"></div>
        </div>
        <div className="team-grid">
          {teamData.coordinators.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Executive Team */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">Executive Team</h2>
          <div className="section-line"></div>
        </div>
        <div className="team-grid">
          {teamData.executive.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Teams;
