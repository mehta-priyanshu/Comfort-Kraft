// not in use currently, but kept for future reference
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Shop.css";
import chair1 from "../assets/OfficeChairs/chair1.jpeg";

// For demonstration, add more products for filtering
const officeChairProducts = [
  {
    id: "1",
    name: "NeoGlow Recliner",
    chairType: "Office Chair",
    price: 14999,
    color: "Black",
    inStock: true,
    description: "Futuristic recliner with ergonomic support.",
    imageUrl: chair1,
  },
  {
    id: "2",
    name: "PureMesh Comfort",
    chairType: "Office Chair",
    price: 7990,
    color: "Blue",
    inStock: false,
    description: "Breathable mesh and ultra-ergonomic design.",
    imageUrl: chair1,
  },
  {
    id: "3",
    name: "EcoErgo Seat",
    chairType: "Office Chair",
    price: 5990,
    color: "Grey",
    inStock: true,
    description: "Eco-friendly office chair with support.",
    imageUrl: chair1,
  }
];

// All colors in products
const COLOR_OPTIONS = [...new Set(officeChairProducts.map(p => p.color))];
// Price range demo
const MIN_PRICE = 0;
const MAX_PRICE = Math.max(...officeChairProducts.map(p => p.price));

const OfficeChair = () => {
  const navigate = useNavigate();

  // Drawer and accordion state
  const [showFilter, setShowFilter] = React.useState(false);
  const [showAvail, setShowAvail] = React.useState(true);
  const [showPrice, setShowPrice] = React.useState(true);
  const [showColor, setShowColor] = React.useState(true);

  // Filter state with initial empty values for resetting on open
  const [filterAvail, setFilterAvail] = React.useState({ in: false, out: false });
  const [filterPrice, setFilterPrice] = React.useState({ min: "", max: "" });
  const [filterColor, setFilterColor] = React.useState(""); // single color for demo

  // Reset filters on drawer open
  const resetFilters = () => {
    setFilterAvail({ in: false, out: false });
    setFilterPrice({ min: "", max: "" });
    setFilterColor("");
  };

  // On drawer open reset everything to default empty and open drawer
  const onDrawerOpen = () => {
    resetFilters();
    setShowAvail(true);
    setShowPrice(true);
    setShowColor(true);
    setShowFilter(true);
  };

  // Filtering logic: apply filters only if values are set
  const filteredProducts = officeChairProducts.filter(p => {
    // Availability filter: apply only if exactly one checkbox is selected
    if (filterAvail.in !== filterAvail.out) {
      if (filterAvail.in && !p.inStock) return false;
      if (filterAvail.out && p.inStock) return false;
    }

    // Price filter: require both min and max to be set and valid numbers
    const minPrice = Number(filterPrice.min);
    const maxPrice = Number(filterPrice.max);
    if (
      filterPrice.min !== "" &&
      filterPrice.max !== "" &&
      !isNaN(minPrice) &&
      !isNaN(maxPrice)
    ) {
      if (p.price < minPrice || p.price > maxPrice) return false;
    }

    // Color filter: only if color selected
    if (filterColor && p.color !== filterColor) return false;

    return true;
  });

  // Handlers for dropdown toggles
  const handleDropdown = (name) => {
    if (name === "avail") setShowAvail(s => !s);
    if (name === "price") setShowPrice(s => !s);
    if (name === "color") setShowColor(s => !s);
  };

  // Toggle availability filters
  const handleAvail = (key) => {
    setFilterAvail(f => ({ ...f, [key]: !f[key] }));
  };

  // Handle price input changes
  const handlePriceChange = (key, value) => {
    setFilterPrice(f => ({
      ...f, [key]: value === "" ? "" : Math.max(0, Number(value))
    }));
  };

  // Select or deselect color filter
  const handleColor = (color) => {
    setFilterColor(c => c === color ? "" : color);
  };

  return (
    <div className="shop-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Office Chair</span>
      </div>

      <h1 className="shop-header">Office Chairs</h1>

      {/* Vergo feature bar */}
      <div className="features-bar-unique">
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Posture">🪑</span>
          Improved Posture
          <br />
          <span className="feature-unique-desc">Scientifically contoured seat and backrest</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Eco Friendly">🌱</span>
          Eco-Friendly Materials
          <br />
          <span className="feature-unique-desc">Made from recycled & sustainable resources</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Custom Fit">✨</span>
          Personalized Comfort
          <br />
          <span className="feature-unique-desc">Adjustable design for every body type</span>
        </div>
        <div className="feature-unique">
          <span className="feature-unique-icon" aria-label="Returns">🔄</span>
          14-Day Easy Returns
          <br />
          <span className="feature-unique-desc">Risk-free trial with easy refunds</span>
        </div>
      </div>

      {/* Filter button positioned at left corner */}
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
          {officeChairProducts.length} product{officeChairProducts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Drawer */}
      {showFilter && (
        <div className="filter-drawer-overlay" onClick={() => setShowFilter(false)}>
          <div className="filter-drawer" onClick={e => e.stopPropagation()}>
            <div className="filter-drawer-header">
              <span className="filter-drawer-title">Filters</span>
              <button
                className="filter-drawer-close"
                onClick={() => setShowFilter(false)}
                aria-label="Close"
              >×</button>
            </div>

            {/* Accordion Dropdown: Availability */}
            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("avail")}>
              Availability
              <span className={`drawer-dropdown-arrow${showAvail ? " open" : ""}`}>▼</span>
            </button>
            {showAvail && (
              <div className="drawer-dropdown-section">
                <label className="filter-checkbox">
                  <input type="checkbox"
                         checked={filterAvail.in}
                         onChange={() => handleAvail("in")}
                  /> In stock ({officeChairProducts.filter(p => p.inStock).length})
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox"
                         checked={filterAvail.out}
                         onChange={() => handleAvail("out")}
                  /> Out of stock ({officeChairProducts.filter(p => !p.inStock).length})
                </label>
              </div>
            )}

            <hr className="filter-hr" />

            {/* Accordion Dropdown: Price */}
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

            {/* Accordion Dropdown: Color */}
            <button className="drawer-dropdown-btn" onClick={() => handleDropdown("color")}>
              Color
              <span className={`drawer-dropdown-arrow${showColor ? " open" : ""}`}>▼</span>
            </button>
            {showColor && (
              <div className="drawer-dropdown-section">
                <div style={{ display: 'flex', gap: 10, marginTop: 8, marginBottom: 3 }}>
                  {COLOR_OPTIONS.map((c) => (
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

            {/* View Results */}
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

      {/* Product cards */}
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

export default OfficeChair;
