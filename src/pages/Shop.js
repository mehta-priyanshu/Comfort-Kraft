import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Shop.css";

// Import local images from your assets folder
import chair1 from "../assets/OfficeChairs/chair1.jpeg";
import chair2 from "../assets/BossChairs/chair2.jpeg";
import chair3 from "../assets/DiningChairs/chair3.jpeg"; 
import chair4 from "../assets/StudyChairs/chair4.jpeg";
import chair5 from "../assets/DiningChairs/chair5.jpeg";
import chair6 from "../assets/DiningChairs/chair6.jpeg";
// Add more imports as needed

const localProducts = [
  {
    id: "1",
    name: "NeoGlow Recliner",
    chairType: "Office Chair",
    price: 14999,
    description: "Futuristic recliner with ergonomic support.",
    imageUrl: chair1,
  },
  {
     id: "2",
     name: "CyberSit Alpha",
     price: 11499,
     imageUrl: chair2,
     description: "Sleek modern chair for dynamic living spaces.",
     chairType: "Boss Chair",
  },
  {
      id: "3",
      name: "Quantum Comfort",
      price: 16299,
      imageUrl: chair3,
      description: "Premium chair engineered for all-day comfort.",
      chairType: "Dining Chair",
  },
  {
      id: "4",
      name: "Study Master Pro",
      price: 12999,
      imageUrl: chair4,
      description: "Ergonomic study chair designed for long hours.",
      chairType: "Study Chair",
     },
     {
        id: "5",
        name: "Elegant Dining Chair",
        price: 8999,
        imageUrl: chair5,
        description: "Stylish chair perfect for modern dining rooms.",
        chairType: "Dining Chair",
     },
     {
        id: "6",
        name: "Classic Wooden Chair",
        price: 7499,
        imageUrl: chair6,
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
