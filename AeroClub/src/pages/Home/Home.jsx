import React, { useEffect, useRef } from "react";
import "./Home.css";

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements =
      containerRef.current?.querySelectorAll(".animate-on-scroll");

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const focusAreas = [
    {
      icon: "🚁",
      title: "Drone Design & Fabrication",
      description:
        "Dive deep into the mechanics and aerodynamics of drones. From conceptualization to flight testing, learn to build robust aerial platforms.",
    },
    {
      icon: "📸",
      title: "Aerial Photography & Videography",
      description:
        "Master the art of capturing breathtaking visuals from the sky. Explore advanced camera settings, flight paths, and post-production techniques.",
    },
    {
      icon: "🧭",
      title: "Autonomous Navigation Systems",
      description:
        "Develop intelligent systems for drones to navigate complex environments independently. Focus on AI, sensor integration, and path planning.",
    },
    {
      icon: "🤖",
      title: "Robotics & AI Integration",
      description:
        "Integrate robotic components and artificial intelligence into drone systems for advanced functionality and autonomous operation.",
    },
    {
      icon: "🔬",
      title: "Aerospace Research & Development",
      description:
        "Contribute to cutting-edge research in aerospace engineering, pushing the boundaries of drone technology and innovation.",
    },
    {
      icon: "🏆",
      title: "Competitive Drone Racing",
      description:
        "Join our elite team and compete in high-stakes drone racing events. Enhance your piloting skills and precision control.",
    },
  ];

  const achievements = [
    {
      icon: "⚡",
      title: "National Drone Championship",
      description:
        "Secured first place in the national collegiate drone racing championship, showcasing superior design and piloting skills.",
    },
    {
      icon: "🚁",
      title: "Innovative Payload Delivery System",
      description:
        "Developed and successfully tested a novel, eco-friendly drone payload delivery system for humanitarian aid missions.",
    },
    {
      icon: "🏆",
      title: "Best Design Award - AeroExpo",
      description:
        "Awarded 'Best Drone Design' at AeroExpo for our modular and customizable drone platform, recognized for its versatility and efficiency.",
    },
  ];

  return (
    <div ref={containerRef} className="home-container">
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content animate-on-scroll">
          <h1 className="hero-title">
            Elevate Your Vision
            <br />
            <span className="hero-subtitle">with IITD AeroClub</span>
          </h1>
          <p className="hero-description">
            Pioneering the future of aviation through innovation, design, and
            flight. Join us in shaping tomorrow's skies.
          </p>
          <button className="hero-btn neon-btn">Explore Our Work</button>
        </div>
        <div className="hero-bg-overlay"></div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="mission-section">
        <div className="mission-content">
          <div className="mission-text animate-on-scroll">
            <h2 className="section-title">
              Our Mission: Innovate, Educate, Inspire
            </h2>
            <p className="mission-description">
              The IITD AeroClub is dedicated to fostering a community passionate
              about aerospace and drone technology. We empower students to
              explore, design, and build cutting-edge aerial systems, driving
              innovation through hands-on projects, workshops, and competitive
              challenges. Our goal is to cultivate the next generation of
              aerospace engineers and visionaries.
            </p>
          </div>
          <div className="mission-visual animate-on-scroll">
            <div className="drone-image-container">
              <img
                src="/api/placeholder/400/300"
                alt="Advanced Drone Technology"
                className="mission-drone-img"
              />
              <div className="drone-overlay-effects">
                <div className="scanning-line"></div>
                <div className="hologram-grid"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section id="focus" className="focus-section">
        <h2 className="section-title animate-on-scroll">Our Focus Areas</h2>
        <div className="focus-grid">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className="focus-card neon-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-icon">{area.icon}</div>
              <h3 className="card-title">{area.title}</h3>
              <p className="card-description">{area.description}</p>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements-section">
        <h2 className="section-title animate-on-scroll">Our Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card neon-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-icon">{achievement.icon}</div>
              <h3 className="card-title">{achievement.title}</h3>
              <p className="card-description">{achievement.description}</p>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="cta-section">
        <div className="cta-content animate-on-scroll">
          <h2 className="cta-title">Ready to Soar?</h2>
          <p className="cta-description">
            Join our community of innovators, builders, and dreamers. Shape the
            future of aerospace technology with us.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn primary-btn neon-btn">
              Join AeroClub
            </button>
            <button className="cta-btn secondary-btn">View Events</button>
          </div>
        </div>
        <div className="floating-elements">
          <div className="paper-plane plane-1">✈️</div>
          <div className="paper-plane plane-2">🛩️</div>
          <div className="paper-plane plane-3">🚁</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
