import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
/*import chair1 from "../assets/OfficeChairs/chair1.jpeg";
import chair2 from "../assets/BossChairs/chair2.jpeg";
import chair3 from "../assets/DiningChairs/chair3.jpeg";
import chair4 from "../assets/StudyChairs/chair4.jpeg";
import chair5 from "../assets/DiningChairs/chair5.jpeg";
import chair6 from "../assets/DiningChairs/chair6.jpeg";*/

import D_L0095 from "../assets/ErgonomicsChairs/5D_L0095.JPG";
import D_L0097 from "../assets/ErgonomicsChairs/5D_L0097.JPG";
import D_L0098 from "../assets/ErgonomicsChairs/5D_L0098.JPG";
import D_L0099 from "../assets/ErgonomicsChairs/5D_L0099.JPG";
import D_L0002 from "../assets/ExecutiveChairs/5D_L0002.JPG";
import D_L0004 from "../assets/ExecutiveChairs/5D_L0004.JPG";

const featuredChairs = [
  {
    id: "1",
    name: "NeoGlow Recliner",
    price: 14999,
    image: D_L0095,
    description: "Futuristic recliner with ergonomic support.",
  },
  {
    id: "2",
    name: "CyberSit Alpha",
    price: 11499,
    image: D_L0097,
    description: "Sleek modern chair for dynamic living spaces.",
  },
  {
    id: "3",
    name: "Quantum Comfort",
    price: 16299,
    image: D_L0098,
    description: "Premium chair engineered for all-day comfort.",
  },
  {
    id: "4",
    name: "Study Master Pro",
    price: 12999,
    image: D_L0099,
    description: "Ergonomic study chair with adjustable features.",
  },
  {
    id: "5",
    name: "Elegant Dining Chair",
    price: 8999,
    image: D_L0002,
    description: "Stylish chair perfect for modern dining rooms.",
  },
  {
    id: "6",
    name: "Classic Wooden Chair",
    price: 7499,
    image: D_L0004,
    description: "Timeless wooden chair with a rustic finish.",
  }
];

const SLIDE_INTERVAL_MS = 2000;

const benefitsList = [
  {
    icon: "🩺",
    title: "Posture Support",
    desc: "Engineered to reduce fatigue and encourage perfect posture."
  },
  {
    icon: "⚡",
    title: "Boost Focus",
    desc: "Stay refreshed and motivated during your work or study hours."
  },
  {
    icon: "🛠️",
    title: "Multi-Use Design",
    desc: "Versatile for office, home, or lounge environments."
  },
  {
    icon: "🌬️",
    title: "Breathable Comfort",
    desc: "Stay cool with advanced materials that resist heat."
  },
  {
    icon: "💎",
    title: "Lasting Durability",
    desc: "Premium components built to stand the test of time."
  },
  {
    icon: "💡",
    title: "Smart Value",
    desc: "A wise choice for lasting comfort and style."
  }
];

const BenefitsSection = () => (
  <section className="benefits-section-custom full-width">
    <div className="benefits-left">
      <div className="benefits-left-content">
        <h2 className="benefits-title">Change Your <br /> Everyday Comfort!</h2>
        <p className="benefits-desc">
          Discover the difference of design-led comfort built for your modern life.
        </p>
      </div>
    </div>
    <div className="benefits-right">
      <div className="benefits-grid">
        {benefitsList.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>
            <span className="benefit-icon">{benefit.icon}</span>
            <div>
              <div className="benefit-title">{benefit.title}</div>
              <div className="benefit-desc">{benefit.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredChairs.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const slide = featuredChairs[currentSlide];

  const WhyComfortKraftSection = () => (
  <section className="why-new-section full-width">
    <div className="why-new-left">
      <h2 className="why-new-title">Why Comfort-Kraft</h2>
      <p className="why-new-desc">
        Comfort-Kraft stands out with lifetime ergonomic support, premium materials, and modern style—so you get comfort that lasts and looks great.
      </p>
    </div>
    <div className="why-new-right">
      <div className="why-new-grid">
        <div className="why-new-card">
          <span className="why-new-icon">🪑</span>
          <div>
            <div className="why-new-card-title">Modern Designs</div>
            <div className="why-new-card-desc">Sleek, stylish and fits every workspace.</div>
          </div>
        </div>
        <div className="why-new-card">
          <span className="why-new-icon">💸</span>
          <div>
            <div className="why-new-card-title">Affordable Prices</div>
            <div className="why-new-card-desc">Premium quality that doesn't break the bank.</div>
          </div>
        </div>
        <div className="why-new-card">
          <span className="why-new-icon">💪</span>
          <div>
            <div className="why-new-card-title">Health Focused</div>
            <div className="why-new-card-desc">Support for better posture and lasting comfort.</div>
          </div>
        </div>
        <div className="why-new-card">
          <span className="why-new-icon">🛡️</span>
          <div>
            <div className="why-new-card-title">Durability</div>
            <div className="why-new-card-desc">Built with select materials for daily use.</div>
          </div>
        </div>
        <div className="why-new-card">
          <span className="why-new-icon">⏰</span>
          <div>
            <div className="why-new-card-title">Warranty Protected</div>
            <div className="why-new-card-desc">3 years of hassle-free protection.</div>
          </div>
        </div>
        <div className="why-new-card">
          <span className="why-new-icon">🆓</span>
          <div>
            <div className="why-new-card-title">30 Days Trial</div>
            <div className="why-new-card-desc">Try risk-free for 30 days at home.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const pageLinks = [
  {
    label: "Ergonomic Chairs",
    image: D_L0095,
    path: "/ergonomics-chair"
  },
  {
    label: "Executive Chairs",
    image: D_L0002,
    path: "/executive-chair"
  },
  /*{
    label: "Dining Chairs",
    image: chair3,
    path: "/dining-chair"
  },
  {
    label: "Study Chairs",
    image: chair4,
    path: "/study-chair"
  }*/
];

const ChairLinksSection = () => {
  const navigate = useNavigate();
  return (
    <section className="chair-links-section">
      <div className="chair-links-row">
        {pageLinks.map((link) => (
          <div className="chair-card" key={link.path}>
            <div className="card-left">
              <div className="card-title">{link.label}</div>
              <button className="visit-btn" onClick={() => navigate(link.path)}>
                Visit
              </button>
            </div>
            <div className="card-img-box">
              <img className="card-img" src={link.image} alt={link.label} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

  return (
    <div className="min-vh-100 text-dark">
      <section className="slide-showcase full-width">
        <div className="slide-details">
          <h2 className="slide-name">{slide.name}</h2>
          <p className="slide-description">{slide.description}</p>
        </div>
        <div className="slide-image-container">
          <img
            src={slide.image}
            alt={slide.name}
            className="slide-image"
            loading="lazy"
          />
        </div>
      </section>

      {/* Benefit section */}
      <BenefitsSection />

      {/* Featured Chairs Section: ONLY first 3 images */}
      <div className="section-featured container">
        <h2 className="text-neon-blue text-center">Featured Chairs</h2>
        <div className="row">
          {featuredChairs.slice(0, 3).map((chair) => (
            <div className="col-md-4 mb-4" key={chair.id}>
              <div className="card h-100 shadow-lg">
                <img
                  src={chair.image}
                  alt={chair.name}
                  className="card-img-top"
                  style={{
                    height: "300px",
                    objectFit: "contain",
                    padding: "10px",
                    backgroundColor: "#faf8f3",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{chair.name}</h5>
                  <p className="text-neon-green h5">{`₹${chair.price}`}</p>
                  <button
                    className="btn-neon mt-3"
                    onClick={() => navigate(`/product/${chair.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    <WhyComfortKraftSection />
    <ChairLinksSection />
    </div>
  );
};

export default Home;
