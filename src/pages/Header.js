import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";

import chair1 from "../assets/OfficeChairs/chair1.jpeg";
import chair2 from "../assets/BossChairs/chair2.jpeg";
import chair3 from "../assets/DiningChairs/chair3.jpeg";
import chair4 from "../assets/StudyChairs/chair4.jpeg";

const linkPreviews = {
  "/office-chair": {
    title: "Office Chairs",
    desc: "Ergonomically designed office chairs for all-day productivity and comfort.",
    image: chair1,
  },
  "/boss-chair": {
    title: "Boss Chairs",
    desc: "Premium boss chairs for superior support and executive presence.",
    image: chair2,
  },
  "/dining-chair": {
    title: "Dining Chairs",
    desc: "Style your dining space with crafted seats for lasting conversations.",
    image: chair3,
  },
  "/study-chair": {
    title: "Study Chairs",
    desc: "Flexible, supportive study chairs for students and home workspaces.",
    image: chair4,
  },
};

const navLinks = ["/office-chair", "/boss-chair", "/dining-chair", "/study-chair"];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const location = useLocation();

  const animationTimerRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Reset preview on route change
  useEffect(() => {
    setHoveredLink(null);
    setContentVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    if (hoveredLink && hoveredLink !== "/" && linkPreviews[hoveredLink]?.image) {
      setContentVisible(false);
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      animationTimerRef.current = setTimeout(() => {
        setContentVisible(true);
      }, 20);
      return () => {
        if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      };
    } else {
      setContentVisible(false);
    }
  }, [hoveredLink]);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Close on window blur & focus
  useEffect(() => {
    const handleBlurOrFocus = () => {
      setHoveredLink(null);
      setContentVisible(false);
    };
    window.addEventListener("blur", handleBlurOrFocus);
    window.addEventListener("focus", handleBlurOrFocus);
    return () => {
      window.removeEventListener("blur", handleBlurOrFocus);
      window.removeEventListener("focus", handleBlurOrFocus);
    };
  }, []);

  // Force-close panel
  const closePreviewNow = () => {
    setHoveredLink(null);
    setContentVisible(false);
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  };

  return (
    <>
      <nav className="header-nav">
        <div className="header-left">
          <span className="logo">
            <span className="logo-emoji">🪑</span> Comfort Kraft
          </span>
        </div>

        <button
          ref={buttonRef}
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Desktop nav - hidden on mobile */}
        <div
          className="header-center navigation"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((href) => (
            <div
              key={href}
              className="nav-item"
              onMouseEnter={() => {
                if (animationTimerRef.current) {
                  clearTimeout(animationTimerRef.current);
                  animationTimerRef.current = null;
                }
                setHoveredLink(href);
              }}
              onFocus={() => setHoveredLink(href)}
            >
              <Link
                to={href}
                onClick={() => {
                  closePreviewNow();
                  setMenuOpen(false);
                }}
                className={`nav-link${hoveredLink === href ? " nav-link-active" : ""}${
                  hoveredLink && hoveredLink !== href ? " nav-link-dimmed" : ""
                }`}
              >
                {linkPreviews[href].title}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      {/* Preview panel */}
      {hoveredLink && hoveredLink !== "/" && linkPreviews[hoveredLink]?.image && (
        <div
          className="vergo-wide-preview"
          onMouseEnter={() => setHoveredLink(hoveredLink)}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <div
            key={animKey}
            className={`vergo-wide-preview-inner ${contentVisible ? "content-visible" : ""}`}
          >
            <img
              src={linkPreviews[hoveredLink].image}
              alt={linkPreviews[hoveredLink].title}
              className={`vergo-wide-preview-img ${contentVisible ? "img-visible" : ""}`}
              draggable={false}
            />
            <div className={`vergo-wide-preview-content ${contentVisible ? "text-visible" : ""}`}>
              <div className="vergo-wide-preview-title">{linkPreviews[hoveredLink].title}</div>
              <div className="vergo-wide-preview-desc">{linkPreviews[hoveredLink].desc}</div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div ref={menuRef} className="dropdown-menu">
          {navLinks.map((href) => (
            <Link
              key={href}
              to={href}
              className="dropdown-link"
              onClick={() => {
                setMenuOpen(false);
                closePreviewNow();
              }}
            >
              {linkPreviews[href].title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Header;
