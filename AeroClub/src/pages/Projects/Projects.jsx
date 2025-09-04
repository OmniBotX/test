import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
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

  // Project categories
  const categories = [
    { id: "all", name: "All Projects", icon: "🚀" },
    { id: "autonomous", name: "Autonomous Systems", icon: "🤖" },
    { id: "racing", name: "Racing Drones", icon: "🏁" },
    { id: "research", name: "Research & Development", icon: "🔬" },
    { id: "commercial", name: "Commercial Applications", icon: "📦" },
    { id: "ai", name: "AI Integration", icon: "🧠" },
    { id: "swarm", name: "Swarm Intelligence", icon: "🐝" },
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Autonomous Navigation System",
      category: "autonomous",
      status: "completed",
      image: "/projects/autonomous/nav-system.jpg",
      shortDescription:
        "AI-powered autonomous navigation for complex environments",
      fullDescription:
        "Advanced autonomous navigation system using computer vision and machine learning algorithms. Features real-time obstacle detection, path planning, and dynamic route optimization. Successfully tested in various environments including urban areas, forests, and indoor spaces.",
      technologies: ["Python", "OpenCV", "TensorFlow", "ROS", "LIDAR"],
      teamSize: 8,
      duration: "18 months",
      achievements: [
        "95% navigation accuracy in complex environments",
        "Winner of National Robotics Championship 2024",
        "Published in IEEE Robotics Conference",
      ],
      github: "https://github.com/aeroclub-iitd/autonomous-nav",
      demo: "https://demo.aeroclub.com/nav-system",
    },
    {
      id: 2,
      title: "High-Speed Racing Drone",
      category: "racing",
      status: "active",
      image: "/projects/racing/speed-drone.jpg",
      shortDescription:
        "Ultra-lightweight racing drone with 200+ km/h top speed",
      fullDescription:
        "Custom-built racing drone designed for maximum speed and agility. Features carbon fiber frame, high-performance motors, and advanced flight control systems. Optimized for competitive drone racing with superior maneuverability.",
      technologies: [
        "Carbon Fiber",
        "Betaflight",
        "FPV Systems",
        "Custom ESCs",
      ],
      teamSize: 5,
      duration: "12 months",
      achievements: [
        "Top speed: 220 km/h",
        "1st place in Inter-IIT Drone Racing",
        "Custom frame design patent pending",
      ],
      github: "https://github.com/aeroclub-iitd/racing-drone",
      demo: "https://demo.aeroclub.com/racing",
    },
    {
      id: 3,
      title: "Swarm Intelligence Platform",
      category: "swarm",
      status: "research",
      image: "/projects/swarm/swarm-platform.jpg",
      shortDescription:
        "Multi-drone coordination system for collaborative tasks",
      fullDescription:
        "Revolutionary swarm intelligence platform enabling multiple drones to work together seamlessly. Implements advanced algorithms for distributed decision-making, task allocation, and coordinated movement patterns.",
      technologies: [
        "Python",
        "ROS2",
        "Multi-Agent Systems",
        "Mesh Networking",
      ],
      teamSize: 12,
      duration: "24 months",
      achievements: [
        "Coordinated 50+ drones simultaneously",
        "Published 3 research papers",
        "Collaboration with DRDO",
      ],
      github: "https://github.com/aeroclub-iitd/swarm-intelligence",
      demo: "https://demo.aeroclub.com/swarm",
    },
    {
      id: 4,
      title: "Medical Supply Delivery System",
      category: "commercial",
      status: "completed",
      image: "/projects/commercial/medical-delivery.jpg",
      shortDescription:
        "Automated drone system for medical supply delivery in remote areas",
      fullDescription:
        "Life-saving drone delivery system designed for transporting medical supplies to remote and inaccessible areas. Features temperature-controlled cargo bay, GPS precision landing, and emergency communication systems.",
      technologies: [
        "Custom Hardware",
        "GPS Systems",
        "IoT Sensors",
        "Mobile App",
      ],
      teamSize: 10,
      duration: "15 months",
      achievements: [
        "Delivered 500+ medical packages",
        "Partnership with local hospitals",
        "Featured in National Geographic",
      ],
      github: "https://github.com/aeroclub-iitd/medical-delivery",
      demo: "https://demo.aeroclub.com/medical",
    },
    {
      id: 5,
      title: "AI-Powered Object Detection",
      category: "ai",
      status: "active",
      image: "/projects/ai/object-detection.jpg",
      shortDescription:
        "Real-time object detection and classification system for drones",
      fullDescription:
        "Advanced AI system for real-time object detection, classification, and tracking from drone cameras. Utilizes deep learning models optimized for edge computing on drone hardware.",
      technologies: ["PyTorch", "YOLO", "Edge Computing", "Raspberry Pi"],
      teamSize: 6,
      duration: "10 months",
      achievements: [
        "98% object detection accuracy",
        "Real-time processing at 30fps",
        "Deployed on 20+ drone models",
      ],
      github: "https://github.com/aeroclub-iitd/ai-detection",
      demo: "https://demo.aeroclub.com/ai-detection",
    },
    {
      id: 6,
      title: "Environmental Monitoring System",
      category: "research",
      status: "planning",
      image: "/projects/research/env-monitoring.jpg",
      shortDescription:
        "Autonomous environmental data collection and analysis platform",
      fullDescription:
        "Comprehensive environmental monitoring system using autonomous drones equipped with various sensors to collect air quality, temperature, humidity, and pollution data across large geographical areas.",
      technologies: ["IoT Sensors", "Data Analytics", "Cloud Computing", "GIS"],
      teamSize: 9,
      duration: "20 months",
      achievements: [
        "Monitoring 1000+ sq km area",
        "Partnership with Environmental Ministry",
        "Real-time pollution tracking",
      ],
      github: "https://github.com/aeroclub-iitd/env-monitoring",
      demo: "https://demo.aeroclub.com/env-monitor",
    },
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "var(--neon-green)";
      case "active":
        return "var(--neon-blue)";
      case "research":
        return "var(--neon-purple)";
      case "planning":
        return "var(--neon-orange)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "active":
        return "In Progress";
      case "research":
        return "Research Phase";
      case "planning":
        return "Planning";
      default:
        return "Unknown";
    }
  };

  return (
    <div ref={containerRef} className="projects-container">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="hero-content animate-on-scroll">
          <h1 className="hero-title">Our Projects</h1>
          <p className="hero-description">
            Explore our cutting-edge drone projects that push the boundaries of
            technology. From autonomous systems to AI integration, discover how
            we're shaping the future of aerospace.
          </p>
        </div>
        <div className="floating-elements">
          <div className="floating-element element-1">🔧</div>
          <div className="floating-element element-2">⚡</div>
          <div className="floating-element element-3">🚁</div>
          <div className="floating-element element-4">🎯</div>
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

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="projects-grid animate-on-scroll">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(project)}
            >
              <div className="card-header">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => (e.target.src = "/api/placeholder/400/250")}
                />
                <div
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {getStatusText(project.status)}
                </div>
              </div>

              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {project.shortDescription}
                </p>

                <div className="project-meta">
                  <div className="meta-item">
                    <span className="meta-icon">👥</span>
                    <span>{project.teamSize} members</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span>{project.duration}</span>
                  </div>
                </div>

                <div className="tech-stack">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-more">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="card-overlay">
                <div className="overlay-content">
                  <h3>{project.title}</h3>
                  <p>Click to view details</p>
                  <div className="view-btn">
                    <span>View Project</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-header">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                onError={(e) => (e.target.src = "/api/placeholder/600/300")}
              />
              <div
                className="modal-status"
                style={{
                  backgroundColor: getStatusColor(selectedProject.status),
                }}
              >
                {getStatusText(selectedProject.status)}
              </div>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">
                {selectedProject.fullDescription}
              </p>

              <div className="modal-details">
                <div className="detail-group">
                  <h4>Project Information</h4>
                  <div className="detail-item">
                    <span className="detail-label">Team Size:</span>
                    <span>{selectedProject.teamSize} members</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span>{selectedProject.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span
                      style={{ color: getStatusColor(selectedProject.status) }}
                    >
                      {getStatusText(selectedProject.status)}
                    </span>
                  </div>
                </div>

                <div className="detail-group">
                  <h4>Technologies Used</h4>
                  <div className="tech-list">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-group">
                  <h4>Key Achievements</h4>
                  <ul className="achievements-list">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="modal-actions">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn github-btn"
                  >
                    <span>View Code</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn demo-btn"
                  >
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="projects-stats">
        <div className="stats-container animate-on-scroll">
          <h2 className="stats-title">Project Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Completed Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <div className="stat-label">Active Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">80+</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Research Papers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
