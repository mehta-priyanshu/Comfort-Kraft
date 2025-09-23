import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content-wrapper">

        <div className="footer-links">
          <Link to="/faqs" className="footer-link">FAQs</Link>
          <Link to="/help-center" className="footer-link">Help Center</Link>
          {/*<Link to="/Contact" className="footer-link">Contact Us</Link>*/}
          <Link to="/About" className="footer-link">About Us</Link>
          <Link to="/shop" className="footer-link">Collections</Link>
        </div>

        <div className="footer-social" aria-label="Social media links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#a87f54" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .59 0 1.323v21.354C0 23.41.595 24 1.325 24h11.49v-9.294H9.692v-3.622h3.122v-2.672c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.92.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.59l-.467 3.622h-3.122V24h6.116c.73 0 1.324-.59 1.324-1.323V1.323c0-.732-.594-1.323-1.324-1.323z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#a87f54" viewBox="0 0 24 24"><path d="M24 4.557a9.702 9.702 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.95.564-2.005.974-3.127 1.194a4.916 4.916 0 0 0-8.373 4.482A13.949 13.949 0 0 1 1.671 3.149 4.911 4.911 0 0 0 3.195 9.75a4.897 4.897 0 0 1-2.228-.616v.06a4.917 4.917 0 0 0 3.946 4.816 4.901 4.901 0 0 1-2.224.085 4.922 4.922 0 0 0 4.588 3.414 9.867 9.867 0 0 1-6.102 2.104c-.395 0-.785-.023-1.17-.07a13.945 13.945 0 0 0 7.548 2.212c9.059 0 14.009-7.513 14.009-14.027 0-.214-.005-.425-.015-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#a87f54" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.013 4.85.07 1.366.062 2.633.34 3.608 1.315.975.975 1.253 2.243 1.315 3.608.057 1.266.07 1.647.07 4.85s-.013 3.584-.07 4.85c-.062 1.365-.34 2.633-1.315 3.608-.975.975-2.243 1.253-3.608 1.315-1.266.057-1.647.07-4.85.07s-3.584-.013-4.85-.07c-1.365-.062-2.633-.34-3.608-1.315-.975-.975-1.253-2.243-1.315-3.608C2.176 15.584 2.163 15.204 2.163 12s.013-3.584.07-4.85c.062-1.366.34-2.633 1.315-3.608.975-.975 2.243-1.253 3.608-1.315C8.416 2.176 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.014 7.052.072 5.772.13 4.628.422 3.68 1.37 2.733 2.317 2.44 3.46 2.383 4.74.014 5.972 0 6.376 0 12s.014 6.028.072 7.308c.058 1.28.351 2.423 1.298 3.372.948.947 2.092 1.239 3.372 1.297C8.344 23.986 8.748 24 12 24s3.656-.014 4.936-.072c1.28-.058 2.424-.35 3.372-1.297.947-.948 1.239-2.092 1.297-3.372C23.986 18.028 24 17.624 24 12s-.014-6.028-.072-7.308c-.058-1.28-.35-2.424-1.297-3.372-.948-.947-2.092-1.239-3.372-1.297C15.656.014 15.252 0 12 0z"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zM18.406 4.594a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#a87f54" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.413v1.561h.047c.476-.899 1.636-1.849 3.366-1.849 3.598 0 4.264 2.368 4.264 5.451v6.289zM5.337 7.433a2.072 2.072 0 1 1 0-4.142 2.072 2.072 0 0 1 0 4.142zM6.561 20.452H4.114V9h2.447v11.452zM22.225 0H1.771C.791 0 0 .771 0 1.723v20.554C0 23.229.791 24 1.771 24h20.451C23.206 24 24 23.229 24 22.277V1.723C24 .771 23.206 0 22.225 0z"/></svg>
          </a>
        </div>

        <div className="footer-brand">
          <span className="footer-logo" role="img" aria-label="Chair">🪑</span>
          Comfort Kraft &copy; {new Date().getFullYear()}
        </div>

      </div>

      <div className="footer-subtext">
        Designed with care. Made with passion for your comfort.
      </div>
    </footer>
  );
}

export default Footer;
