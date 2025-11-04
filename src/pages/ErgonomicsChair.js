import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Shop.css";

// Import with exact folder name and casing:
import D_L0095 from "../assets/ErgonomicsChairs/5D_L0095.JPG";

const ErgonomicsChairProducts = [
  {
    id: "2",
    name: "CyberSit Alpha",
    price: 11499,
    imageUrl: D_L0095,
    description: "Sleek modern chair for dynamic living spaces.",
    chairType: "Boss Chair",
    color: "Black",   // Added default color for filtering
    inStock: true,    // Added stock status for filtering
  },
  // You can add more BossChair products here with similar properties for robust filtering
];

// Extract colors for color filters dynamically
const COLOR_OPTIONS = [...new Set(ErgonomicsChairProducts.map(p => p.color))];

const MIN_PRICE = 0;
const MAX_PRICE = Math.max(...ErgonomicsChairProducts.map(p => p.price));

const ErgonomicChair = () => {
  const navigate = useNavigate();

  // Filter drawer state
  const [showFilter, setShowFilter] = React.useState(false);
  const [showAvail, setShowAvail] = React.useState(true);
  const [showPrice, setShowPrice] = React.useState(true);
  const [showColor, setShowColor] = React.useState(true);

  // Filter states
  const [filterAvail, setFilterAvail] = React.useState({ in: false, out: false });
  const [filterPrice, setFilterPrice] = React.useState({ min: MIN_PRICE, max: MAX_PRICE });
  const [filterColor, setFilterColor] = React.useState("");

  // Reset filters when drawer opens
  const resetFilters = () => {
    setFilterAvail({ in: false, out: false });
    setFilterPrice({ min: MIN_PRICE, max: MAX_PRICE });
    setFilterColor("");
  };

  const onDrawerOpen = () => {
    resetFilters();
    setShowAvail(true);
    setShowPrice(true);
    setShowColor(true);
    setShowFilter(true);
  };

  // Filter toggle handlers
  const handleDropdown = (name) => {
    if (name === "avail") setShowAvail(s => !s);
    if (name === "price") setShowPrice(s => !s);
    if (name === "color") setShowColor(s => !s);
  };

  const handleAvail = (key) => {
    setFilterAvail(f => ({ ...f, [key]: !f[key] }));
  };

  const handlePriceChange = (key, value) => {
    setFilterPrice(f => ({
      ...f,
      [key]: value === "" ? MIN_PRICE : Math.max(0, Number(value))
    }));
  };

  const handleColor = (color) => {
    setFilterColor(c => c === color ? "" : color);
  };

  // Filter products based on current filters
  const filteredProducts = ErgonomicsChairProducts.filter(p => {
    // Availability filter
    if (filterAvail.in && !p.inStock) return false;
    if (filterAvail.out && p.inStock) return false;

    // Price filter
    if (p.price < filterPrice.min || p.price > filterPrice.max) return false;

    // Color filter
    if (filterColor && p.color !== filterColor) return false;

    return true;
  });

  return (
    <div className="shop-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Ergonomic Chair</span>
      </div>
      <h1 className="shop-header">Ergonomic Chairs</h1>

      <div className="features-bar-unique">
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Luxury">👑</span>
          Executive Luxury
          <br />
          <span className="feature-unique-desc">Sophisticated design for leaders</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Support">🛋️</span>
          Max Support
          <br />
          <span className="feature-unique-desc">Extra cushioning for long hours</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Premium">💼</span>
          Premium Materials
          <br />
          <span className="feature-unique-desc">Genuine leather and metal finish</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Warranty">📜</span>
          Extended Warranty
          <br />
          <span className="feature-unique-desc">3-year coverage for peace of mind</span>
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
          {ErgonomicsChairProducts.length} product{ErgonomicsChairProducts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filter Drawer */}
      {showFilter && (
        <div className="filter-drawer-overlay" onClick={() => setShowFilter(false)}>
          <div className="filter-drawer" onClick={e => e.stopPropagation()}>
            <div className="filter-drawer-header">
              <span className="filter-drawer-title">Filters</span>
              <button className="filter-drawer-close" onClick={() => setShowFilter(false)} aria-label="Close">×</button>
            </div>

            {/* Availability accordion */}
            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("avail")}>
              Availability
              <span className={`drawer-dropdown-arrow${showAvail ? " open" : ""}`}>▼</span>
            </button>
            {showAvail && (
              <div className="drawer-dropdown-section">
                <label className="filter-checkbox">
                  <input type="checkbox" checked={filterAvail.in} onChange={() => handleAvail("in")} />
                  In stock ({ErgonomicsChairProducts.filter(p => p.inStock).length})
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" checked={filterAvail.out} onChange={() => handleAvail("out")} />
                  Out of stock ({ErgonomicsChairProducts.filter(p => !p.inStock).length})
                </label>
              </div>
            )}

            <hr className="filter-hr" />

            {/* Price accordion */}
            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("price")}>
              Price
              <span className={`drawer-dropdown-arrow${showPrice ? " open" : ""}`}>▼</span>
            </button>
            {showPrice && (
              <div className="drawer-dropdown-section">
                <div className="filter-price-row" style={{ margin: "10px 0 16px 0" }}>
                  <span className="filter-rs">₹</span>
                  <input type="number"
                    value={filterPrice.min}
                    min={MIN_PRICE}
                    max={filterPrice.max || MAX_PRICE}
                    onChange={e => handlePriceChange("min", e.target.value)}
                    style={{ marginRight: 4 }}
                  />
                  <span className="filter-to">to</span>
                  <span className="filter-rs">₹</span>
                  <input type="number"
                    value={filterPrice.max}
                    min={filterPrice.min || MIN_PRICE}
                    max={MAX_PRICE}
                    onChange={e => handlePriceChange("max", e.target.value)}
                  />
                </div>
                {/* Fake slider for demo */}
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

            {/* Color accordion */}
            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("color")}>
              Color
              <span className={`drawer-dropdown-arrow${showColor ? " open" : ""}`}>▼</span>
            </button>
            {showColor && (
              <div className="drawer-dropdown-section">
                <div style={{ display: 'flex', gap: 10, marginTop: 8, marginBottom: 3 }}>
                  {COLOR_OPTIONS.map(c => (
                    <span key={c}
                      className={`drawer-color-circle${filterColor === c ? " selected" : ""}`}
                      style={{ background: c.toLowerCase() }}
                      onClick={() => handleColor(c)}
                      title={c}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            <button className="filter-drawer-apply-btn" style={{ marginTop: "24px" }} onClick={() => setShowFilter(false)}>
              VIEW RESULTS
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <div style={{ color: "#8a6c58", fontWeight: 500, padding: "50px 0", textAlign: "center" }}>
            No products match your filter.
          </div>
        ) : filteredProducts.map(prod => (
          <div key={prod.id} className="product-card">
            <img src={prod.imageUrl} alt={prod.name} className="product-img" />
            <h3 className="product-title">{prod.name}</h3>
            <p className="product-desc">{prod.description}</p>
            <span className="product-price">₹{prod.price.toLocaleString()}</span>
            <div className="product-actions">
              <button className="btn-neon" onClick={() => navigate(`/product/${prod.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErgonomicChair;
