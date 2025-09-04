import React, { useState, useEffect, useRef } from "react";
import "./Events.css";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
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

  // Event categories
  const categories = [
    { id: "all", name: "All Events", icon: "🎉" },
    { id: "competitions", name: "Competitions", icon: "🏆" },
    { id: "workshops", name: "Workshops", icon: "🔧" },
    { id: "conferences", name: "Conferences", icon: "🎤" },
    { id: "exhibitions", name: "Exhibitions", icon: "🏢" },
    { id: "training", name: "Training Programs", icon: "📚" },
    { id: "internal", name: "Club Events", icon: "🚁" },
  ];

  // Events data
  const events = [
    {
      id: 1,
      title: "AeroFest 2025",
      category: "competitions",
      status: "upcoming",
      date: "2025-03-15",
      endDate: "2025-03-17",
      time: "09:00 AM",
      venue: "IIT Delhi Campus",
      image: "/events/competitions/aerofest2025.jpg",
      shortDescription:
        "The biggest drone competition in North India featuring multiple categories",
      fullDescription:
        "AeroFest 2025 is our flagship annual event featuring drone racing, autonomous challenges, design competitions, and innovative project showcases. Teams from across India compete in various categories including speed racing, payload delivery, and AI-powered autonomous navigation.",
      registrationLink: "https://aerofest2025.com/register",
      prizes: "₹5,00,000",
      participants: 500,
      highlights: [
        "Drone Racing Championship",
        "Autonomous Navigation Challenge",
        "Design & Innovation Contest",
        "Industry Expert Panels",
      ],
    },
    {
      id: 2,
      title: "Drone Technology Workshop",
      category: "workshops",
      status: "upcoming",
      date: "2025-02-20",
      endDate: "2025-02-22",
      time: "10:00 AM",
      venue: "Lecture Hall Complex",
      image: "/events/workshops/drone-tech-workshop.jpg",
      shortDescription:
        "Comprehensive hands-on workshop on drone design, programming, and deployment",
      fullDescription:
        "A 3-day intensive workshop covering fundamentals of drone technology, flight mechanics, control systems, and practical implementation. Participants will build their own mini-drone and learn programming for autonomous flight.",
      registrationLink: "https://aeroclub.iitd.ac.in/workshop-registration",
      prizes: "Certification",
      participants: 80,
      highlights: [
        "Build Your Own Drone",
        "Programming Flight Controllers",
        "Sensor Integration",
        "Industry Certification",
      ],
    },
    {
      id: 3,
      title: "Indo-Global Aerospace Conference",
      category: "conferences",
      status: "upcoming",
      date: "2025-04-10",
      endDate: "2025-04-12",
      time: "09:30 AM",
      venue: "Main Auditorium",
      image: "/events/conferences/aerospace-conf.jpg",
      shortDescription:
        "International conference on future of aerospace technology and innovation",
      fullDescription:
        "Premier aerospace conference bringing together industry leaders, researchers, and innovators to discuss cutting-edge developments in drone technology, space exploration, and aviation. Features keynote speakers from NASA, ISRO, and leading aerospace companies.",
      registrationLink: "https://aerospace-conf.iitd.ac.in",
      prizes: "Research Awards",
      participants: 300,
      highlights: [
        "International Keynote Speakers",
        "Research Paper Presentations",
        "Industry Networking",
        "Innovation Showcase",
      ],
    },
    {
      id: 4,
      title: "Drone Expo Delhi 2025",
      category: "exhibitions",
      status: "past",
      date: "2024-12-05",
      endDate: "2024-12-07",
      time: "10:00 AM",
      venue: "Pragati Maidan",
      image: "/events/exhibitions/drone-expo.jpg",
      shortDescription:
        "Largest drone exhibition showcasing latest technology and innovations",
      fullDescription:
        "India's premier drone exhibition featuring latest UAV technology, commercial applications, defense systems, and startup innovations. AeroClub IITD showcased 5 innovative projects and won Best Innovation Award.",
      registrationLink: "#",
      prizes: "Innovation Award",
      participants: 1000,
      highlights: [
        "Latest Drone Technology Display",
        "Commercial Applications Demo",
        "Startup Pitch Competition",
        "Government Policy Updates",
      ],
    },
    {
      id: 5,
      title: "Flight Controller Programming Bootcamp",
      category: "training",
      status: "upcoming",
      date: "2025-01-25",
      endDate: "2025-01-27",
      time: "02:00 PM",
      venue: "Computer Centre",
      image: "/events/training/programming-bootcamp.jpg",
      shortDescription:
        "Intensive bootcamp on programming flight controllers and autonomous systems",
      fullDescription:
        "Advanced training program focusing on flight controller programming, sensor fusion, and autonomous navigation algorithms. Covers PX4, ArduPilot, and custom firmware development for specialized applications.",
      registrationLink: "https://bootcamp.aeroclub.iitd.ac.in",
      prizes: "Professional Certificate",
      participants: 50,
      highlights: [
        "PX4 & ArduPilot Programming",
        "Sensor Fusion Algorithms",
        "Custom Firmware Development",
        "Real-time System Design",
      ],
    },
    {
      id: 6,
      title: "AeroClub Annual Recruitment",
      category: "internal",
      status: "ongoing",
      date: "2025-01-15",
      endDate: "2025-02-15",
      time: "06:00 PM",
      venue: "Various Venues",
      image: "/events/internal/recruitment.jpg",
      shortDescription:
        "Annual recruitment drive for new members passionate about aerospace technology",
      fullDescription:
        "Join the AeroClub family! Our comprehensive recruitment process includes technical interviews, project presentations, and hands-on challenges. Open to all IIT Delhi students with passion for aviation and drone technology.",
      registrationLink: "https://recruitment.aeroclub.iitd.ac.in",
      prizes: "Club Membership",
      participants: 200,
      highlights: [
        "Technical Interviews",
        "Project Presentations",
        "Hands-on Challenges",
        "Mentorship Program",
      ],
    },
  ];

  // Filter events based on selected category
  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "unset";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "var(--neon-green)";
      case "ongoing":
        return "var(--neon-blue)";
      case "past":
        return "var(--neon-purple)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "ongoing":
        return "Ongoing";
      case "past":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div ref={containerRef} className="events-container">
      {/* Hero Section */}
      <section className="events-hero">
        <div className="hero-content animate-on-scroll">
          <h1 className="hero-title">Our Events</h1>
          <p className="hero-description">
            Discover exciting aerospace events, competitions, workshops, and
            conferences. Join us in exploring the future of drone technology and
            aviation innovation.
          </p>
        </div>
        <div className="floating-elements">
          <div className="floating-element element-1">🎯</div>
          <div className="floating-element element-2">🏆</div>
          <div className="floating-element element-3">🚁</div>
          <div className="floating-element element-4">⚡</div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container animate-on-scroll">
          <h2 className="filter-title">Browse Events by Category</h2>
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
              >
                <span className="btn-icon">{category.icon}</span>
                <span className="btn-text">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="events-grid-section">
        <div className="events-grid animate-on-scroll">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="event-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(event)}
            >
              <div className="card-header">
                <img
                  src={event.image}
                  alt={event.title}
                  onError={(e) => (e.target.src = "/api/placeholder/400/250")}
                />
                <div
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(event.status) }}
                >
                  {getStatusText(event.status)}
                </div>
                <div className="date-badge">
                  <div className="date-day">
                    {formatDate(event.date).split(" ")[0]}
                  </div>
                  <div className="date-month">
                    {formatDate(event.date).split(" ")[1]}
                  </div>
                </div>
              </div>

              <div className="card-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.shortDescription}</p>

                <div className="event-meta">
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📍</span>
                    <span>{event.venue}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">👥</span>
                    <span>{event.participants} participants</span>
                  </div>
                </div>

                <div className="event-highlights">
                  {event.highlights.slice(0, 2).map((highlight, idx) => (
                    <span key={idx} className="highlight-tag">
                      {highlight}
                    </span>
                  ))}
                  {event.highlights.length > 2 && (
                    <span className="highlight-more">
                      +{event.highlights.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="card-overlay">
                <div className="overlay-content">
                  <h3>{event.title}</h3>
                  <p>Click to view details</p>
                  <div className="view-btn">
                    <span>View Event</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-header">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                onError={(e) => (e.target.src = "/api/placeholder/600/300")}
              />
              <div
                className="modal-status"
                style={{
                  backgroundColor: getStatusColor(selectedEvent.status),
                }}
              >
                {getStatusText(selectedEvent.status)}
              </div>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{selectedEvent.title}</h2>

              <div className="event-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <div>
                      <span className="detail-label">Date:</span>
                      <span>
                        {formatDate(selectedEvent.date)} -{" "}
                        {formatDate(selectedEvent.endDate)}
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">⏰</span>
                    <div>
                      <span className="detail-label">Time:</span>
                      <span>{selectedEvent.time}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <div>
                      <span className="detail-label">Venue:</span>
                      <span>{selectedEvent.venue}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🏆</span>
                    <div>
                      <span className="detail-label">Prizes:</span>
                      <span>{selectedEvent.prizes}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="modal-description">
                {selectedEvent.fullDescription}
              </p>

              <div className="event-highlights-full">
                <h4>Event Highlights</h4>
                <div className="highlights-grid">
                  {selectedEvent.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item">
                      <span className="highlight-icon">⚡</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                {selectedEvent.status === "upcoming" && (
                  <a
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn register-btn"
                  >
                    <span>Register Now</span>
                  </a>
                )}
                <button onClick={closeModal} className="action-btn info-btn">
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="events-stats">
        <div className="stats-container animate-on-scroll">
          <h2 className="stats-title">Event Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Events Organized</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Total Participants</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25</div>
              <div className="stat-label">Industry Partners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Awards Won</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
