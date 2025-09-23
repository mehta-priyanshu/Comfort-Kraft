import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Shop.css";

// Import with exact folder name and casing:
import chair4 from "../assets/StudyChairs/chair4.jpeg";

const StudyChairProducts = [
  {
    id: "4",
    name: "Study Master Pro",
    price: 12999,
    imageUrl: chair4,
    description: "Ergonomic study chair designed for long hours.",
    chairType: "Study Chair",
    color: "Black",
    inStock: true,
  },
  // Add more products here if needed for filtering demo
];

// Colors from products dynamically
const COLOR_OPTIONS = [...new Set(StudyChairProducts.map(p => p.color))];

// Price limits
const MIN_PRICE = 0;
const MAX_PRICE = Math.max(...StudyChairProducts.map(p => p.price));

const StudyChair = () => {
  const navigate = useNavigate();

  // Drawer and accordion states
  const [showFilter, setShowFilter] = React.useState(false);
  const [showAvail, setShowAvail] = React.useState(true);
  const [showPrice, setShowPrice] = React.useState(true);
  const [showColor, setShowColor] = React.useState(true);

  // Filters state
  const [filterAvail, setFilterAvail] = React.useState({ in: false, out: false });
  const [filterPrice, setFilterPrice] = React.useState({ min: MIN_PRICE, max: MAX_PRICE });
  const [filterColor, setFilterColor] = React.useState("");

  // Reset filters on drawer open
  const resetFilters = () => {
    setFilterAvail({ in: false, out: false });
    setFilterPrice({ min: MIN_PRICE, max: MAX_PRICE });
    setFilterColor("");
  };

  // Open drawer and reset filters
  const onDrawerOpen = () => {
    resetFilters();
    setShowAvail(true);
    setShowPrice(true);
    setShowColor(true);
    setShowFilter(true);
  };

  // Handle dropdown accordion toggles
  const handleDropdown = (name) => {
    if (name === "avail") setShowAvail(s => !s);
    if (name === "price") setShowPrice(s => !s);
    if (name === "color") setShowColor(s => !s);
  };

  // Toggle availability selections
  const handleAvail = (key) => {
    setFilterAvail(f => ({ ...f, [key]: !f[key] }));
  };

  // Handle price input changes
  const handlePriceChange = (key, value) => {
    setFilterPrice(f => ({
      ...f,
      [key]: value === "" ? "" : Math.max(0, Number(value))
    }));
  };

  // Toggle color filter
  const handleColor = (color) => {
    setFilterColor(c => c === color ? "" : color);
  };

  // Filter products based on selected filters
  const filteredProducts = StudyChairProducts.filter(p => {
    if (filterAvail.in && !p.inStock) return false;
    if (filterAvail.out && p.inStock) return false;
    if (p.price < filterPrice.min || p.price > filterPrice.max) return false;
    if (filterColor && p.color !== filterColor) return false;
    return true;
  });

  return (
    <div className="shop-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Study Chair</span>
      </div>

      <h1 className="shop-header">Study Chairs</h1>

      <div className="features-bar-unique">
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Support">📚</span>
          Study-Ready Support
          <br />
          <span className="feature-unique-desc">Keeps you focused during long sessions</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Lightweight">💡</span>
          Lightweight Design
          <br />
          <span className="feature-unique-desc">Easy to move anywhere in your space</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Breathable">💨</span>
          Breathable Mesh
          <br />
          <span className="feature-unique-desc">Airflow keeps you cool while studying</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Durable">🛡️</span>
          Built to Last
          <br />
          <span className="feature-unique-desc">Sturdy frame for daily use</span>
        </div>
      </div>

      {/* Filter button */}
      <div className="filter-row">
        <button className="filter-row-btn" onClick={onDrawerOpen}>
          <span className="filter-row-icon" aria-label="Show filters">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20" style={{ marginRight: 7 }}>
              <path d="M3.25 5.5h13.5M5.75 10h8.5M8.25 14.5h3.5" stroke="#2567a8" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="filter-row-label">Search Filter</span>
        </button>
        <span className="filter-row-products">
          {StudyChairProducts.length} product{StudyChairProducts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Drawer */}
      {showFilter && (
        <div className="filter-drawer-overlay" onClick={() => setShowFilter(false)}>
          <div className="filter-drawer" onClick={e => e.stopPropagation()}>
            <div className="filter-drawer-header">
              <span className="filter-drawer-title">Filters</span>
              <button className="filter-drawer-close" onClick={() => setShowFilter(false)} aria-label="Close">×</button>
            </div>

            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("avail")}>
              Availability
              <span className={`drawer-dropdown-arrow${showAvail ? " open" : ""}`}>▼</span>
            </button>
            {showAvail && (
              <div className="drawer-dropdown-section">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filterAvail.in}
                    onChange={() => handleAvail("in")}
                  /> In stock ({StudyChairProducts.filter(p => p.inStock).length})
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filterAvail.out}
                    onChange={() => handleAvail("out")}
                  /> Out of stock ({StudyChairProducts.filter(p => !p.inStock).length})
                </label>
              </div>
            )}

            <hr className="filter-hr" />

            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("price")}>
              Price
              <span className={`drawer-dropdown-arrow${showPrice ? " open" : ""}`}>▼</span>
            </button>
            {showPrice && (
              <div className="drawer-dropdown-section">
                <div className="filter-price-row" style={{ margin: "10px 0 16px 0" }}>
                  <span className="filter-rs">₹</span>
                  <input
                    type="number"
                    value={filterPrice.min}
                    min={MIN_PRICE}
                    max={filterPrice.max || MAX_PRICE}
                    onChange={e => handlePriceChange("min", e.target.value)}
                    style={{ marginRight: 4 }}
                  />
                  <span className="filter-to">to</span>
                  <span className="filter-rs">₹</span>
                  <input
                    type="number"
                    value={filterPrice.max}
                    min={filterPrice.min || MIN_PRICE}
                    max={MAX_PRICE}
                    onChange={e => handlePriceChange("max", e.target.value)}
                  />
                </div>
                {/* Fake slider for demo only */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: "0 0 7px 0" }}>
                  <span style={{
                    width: 16, height: 16, border: "3px solid #5ca2da",
                    borderRadius: "50%", background: "#fff", display: "inline-block", marginRight: 2
                  }}></span>
                  <div style={{
                    flex: 1, height: 5, background: "#5ca2da",
                    borderRadius: 2
                  }}></div>
                  <span style={{
                    width: 16, height: 16, border: "3px solid #5ca2da",
                    borderRadius: "50%", background: "#fff", display: "inline-block", marginLeft: 2
                  }}></span>
                </div>
              </div>
            )}

            <hr className="filter-hr" />

            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("color")}>
              Color
              <span className={`drawer-dropdown-arrow${showColor ? " open" : ""}`}>▼</span>
            </button>
            {showColor && (
              <div className="drawer-dropdown-section">
                <div style={{ display: 'flex', gap: 10, marginTop: 8, marginBottom: 3 }}>
                  {COLOR_OPTIONS.map((c) => (
                    <span
                      key={c}
                      className={`drawer-color-circle${filterColor === c ? " selected" : ""}`}
                      style={{ background: c.toLowerCase() }}
                      onClick={() => handleColor(c)}
                      title={c}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            <button
              className="filter-drawer-apply-btn"
              style={{ marginTop: "24px" }}
              onClick={() => setShowFilter(false)}
            >
              VIEW RESULTS
            </button>
          </div>
        </div>
      )}

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <div style={{ color: "#8a6c58", fontWeight: 500, padding: "50px 0", textAlign: "center" }}>
            No products match your filter.
          </div>
        ) : filteredProducts.map((prod) => (
          <div key={prod.id} className="product-card">
            <img src={prod.imageUrl} alt={prod.name} className="product-img" />
            <h3 className="product-title">{prod.name}</h3>
            <p className="product-desc">{prod.description}</p>
            <span className="product-price">₹{prod.price.toLocaleString()}</span>
            <div className="product-actions">
              <button
                className="btn-neon"
                onClick={() => navigate(`/product/${prod.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyChair;
