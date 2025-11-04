import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Shop.css";

// Import local images from your assets folder
import D_L0095 from "../assets/ErgonomicsChairs/5D_L0095.JPG";
import D_L0097 from "../assets/ErgonomicsChairs/5D_L0097.JPG";
import D_L0098 from "../assets/ErgonomicsChairs/5D_L0098.JPG";
import D_L0099 from "../assets/ErgonomicsChairs/5D_L0099.JPG";
import D_L0002 from "../assets/ExecutiveChairs/5D_L0002.JPG";
import D_L0004 from "../assets/ExecutiveChairs/5D_L0004.JPG";
// Add more imports as needed

const localProducts = [
  {
    id: "1",
    name: "NeoGlow Recliner",
    chairType: "Office Chair",
    price: 14999,
    description: "Futuristic recliner with ergonomic support.",
    imageUrl: D_L0095,
  },
  {
     id: "2",
     name: "CyberSit Alpha",
     price: 11499,
     imageUrl: D_L0097,
     description: "Sleek modern chair for dynamic living spaces.",
     chairType: "Boss Chair",
  },
  {
      id: "3",
      name: "Quantum Comfort",
      price: 16299,
      imageUrl: D_L0098,
      description: "Premium chair engineered for all-day comfort.",
      chairType: "Dining Chair",
  },
  {
      id: "4",
      name: "Study Master Pro",
      price: 12999,
      imageUrl: D_L0099,
      description: "Ergonomic study chair designed for long hours.",
      chairType: "Study Chair",
     },
     {
        id: "5",
        name: "Elegant Dining Chair",
        price: 8999,
        imageUrl: D_L0002,
        description: "Stylish chair perfect for modern dining rooms.",
        chairType: "Dining Chair",
     },
     {
        id: "6",
        name: "Classic Wooden Chair",
        price: 7499,
        imageUrl: D_L0004,
        description: "Timeless wooden chair with a rustic finish.",
        chairType: "Dining Chair",
    }
  // Add more products if you wish
];

function Shop() {
  const navigate = useNavigate();

  if (localProducts.length === 0)
    return (
      <div className="shop-container">
        <h2>No products available.</h2>
      </div>
    );

  return (
    <div className="shop-container">
      <h1 className="shop-header">Shop Our Collection</h1>
      <div className="product-list">
        {localProducts.map((prod) => (
          <div key={prod.id} className="product-card">
            <img src={prod.imageUrl} alt={prod.name} className="product-img" />
            <h3 className="product-title">{prod.name}</h3>
            <p className="product-desc">{prod.description}</p>
            <span className="product-price">₹{prod.price}</span>
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
}

export default Shop;
