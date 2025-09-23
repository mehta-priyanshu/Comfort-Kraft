import React from "react";
import "../styles/About.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-banner">
        <h1>About Comfort-Kraft</h1>
        <p>Where Comfort Meets Craftsmanship</p>
      </div>

      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded with a vision to redefine living spaces, Comfort-Kraft blends
          artistic elegance with ergonomic design to bring you timeless
          furniture. Our passion lies in crafting chairs and furniture that not
          only elevate interiors but enhance everyday comfort.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To deliver premium-quality, sustainably crafted furniture that
          transforms your house into a home. We believe in thoughtful design,
          ethical sourcing, and innovation that stands the test of time.
        </p>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>🪑 Expertly Designed, Ergonomically Perfect</li>
          <li>🌱 Sustainable Materials</li>
          <li>🛠️ Handcrafted by Skilled Artisans</li>
          <li>🚛 Fast & Secure Delivery</li>
          <li>⭐ 5-Star Customer Experience</li>
        </ul>
      </div>

      <div className="about-footer-quote">
        <p>“Comfort is not a luxury, it’s a lifestyle. Live it with Comfort-Kraft.”</p>
      </div>
    </div>
  );
};

export default AboutUs;
