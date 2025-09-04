import React, { useState, useEffect, useRef } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
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

  // Gallery categories
  const categories = [
    { id: "all", name: "All Photos", icon: "📸" },
    { id: "drones", name: "Drones", icon: "🚁" },
    { id: "workshops", name: "Workshops", icon: "🔧" },
    { id: "competitions", name: "Competitions", icon: "🏆" },
    { id: "events", name: "Events", icon: "🎉" },
    { id: "team", name: "Team", icon: "👥" },
    { id: "projects", name: "Projects", icon: "🔬" },
  ];

  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      src: "/gallery/drones/drone1.jpg",
      alt: "Custom Racing Drone",
      category: "drones",
      title: "Custom Racing Drone",
      description: "High-performance racing drone built by our team",
    },
    {
      id: 2,
      src: "/gallery/workshops/workshop1.jpg",
      alt: "Drone Building Workshop",
      category: "workshops",
      title: "Drone Building Workshop",
      description: "Students learning to build their first quadcopter",
    },
    {
      id: 3,
      src: "/gallery/competitions/competition1.jpg",
      alt: "National Drone Championship",
      category: "competitions",
      title: "National Championship Victory",
      description: "Our team winning the national drone racing championship",
    },
    {
      id: 4,
      src: "/gallery/events/event1.jpg",
      alt: "AeroExpo 2024",
      category: "events",
      title: "AeroExpo 2024",
      description: "Showcasing our innovations at AeroExpo",
    },
    {
      id: 5,
      src: "/gallery/team/team1.jpg",
      alt: "Team Photo",
      category: "team",
      title: "AeroClub Team",
      description: "Our passionate team of aerospace enthusiasts",
    },
    {
      id: 6,
      src: "/gallery/projects/project1.jpg",
      alt: "Autonomous Navigation System",
      category: "projects",
      title: "Autonomous Navigation",
      description: "AI-powered autonomous navigation system development",
    },
    {
      id: 7,
      src: "/gallery/drones/drone2.jpg",
      alt: "Payload Delivery Drone",
      category: "drones",
      title: "Payload Delivery System",
      description: "Eco-friendly drone for humanitarian aid missions",
    },
    {
      id: 8,
      src: "/gallery/workshops/workshop2.jpg",
      alt: "Electronics Workshop",
      category: "workshops",
      title: "Electronics Workshop",
      description: "Hands-on training with flight controllers and sensors",
    },
    {
      id: 9,
      src: "/gallery/competitions/competition2.jpg",
      alt: "Design Competition",
      category: "competitions",
      title: "Design Competition",
      description: "Presenting our innovative drone design",
    },
    {
      id: 10,
      src: "/gallery/events/event2.jpg",
      alt: "Tech Symposium",
      category: "events",
      title: "Tech Symposium 2024",
      description: "Sharing knowledge at the aerospace symposium",
    },
    {
      id: 11,
      src: "/gallery/team/team2.jpg",
      alt: "Research Team",
      category: "team",
      title: "Research Division",
      description: "Our dedicated research and development team",
    },
    {
      id: 12,
      src: "/gallery/projects/project2.jpg",
      alt: "Swarm Intelligence",
      category: "projects",
      title: "Swarm Intelligence",
      description: "Multi-drone coordination and swarm behavior research",
    },
  ];

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div ref={containerRef} className="gallery-container">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-content animate-on-scroll">
          <h1 className="hero-title">Our Gallery</h1>
          <p className="hero-description">
            Explore the visual journey of AeroClub IITD through our drone
            innovations, competitions, workshops, and team achievements.
          </p>
        </div>
        <div className="floating-elements">
          <div className="floating-element element-1">📷</div>
          <div className="floating-element element-2">🚁</div>
          <div className="floating-element element-3">🎯</div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container animate-on-scroll">
          <h2 className="filter-title">Browse by Category</h2>
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

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="gallery-grid animate-on-scroll">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(image)}
            >
              <div className="image-container">
                <img
                  src={image.src}
                  alt={image.alt}
                  onError={(e) => (e.target.src = "/api/placeholder/400/300")}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3 className="image-title">{image.title}</h3>
                    <p className="image-description">{image.description}</p>
                    <div className="view-btn">
                      <span>View Full Image</span>
                      <span className="arrow">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              onError={(e) => (e.target.src = "/api/placeholder/800/600")}
            />
            <div className="lightbox-info">
              <h3 className="lightbox-title">{selectedImage.title}</h3>
              <p className="lightbox-description">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="gallery-stats">
        <div className="stats-container animate-on-scroll">
          <h2 className="stats-title">Gallery Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Photos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Events Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Drone Models</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Workshop Sessions</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
