import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Product.css";

// Import images from your assets folder (update paths & imports as needed)
import chair1 from "../assets/OfficeChairs/chair1.jpeg";
// Uncomment following lines only if you have these images in your assets
import chair2 from "../assets/BossChairs/chair2.jpeg";
import chair3 from "../assets/DiningChairs/chair3.jpeg";
import chair4 from "../assets/StudyChairs/chair4.jpeg";
import chair5 from "../assets/DiningChairs/chair5.jpeg";
import chair6 from "../assets/DiningChairs/chair6.jpeg";

// Local product data array
const products = [
  {
    id: "1",
    name: "NeoGlow Recliner",
    price: 14999,
    imageUrl: chair1,
    description: "Futuristic recliner with ergonomic support.",
    chairType: "Office Chair",
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
];

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by id from local array
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="product-detail-container">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")} className="btn-neon">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">
            ₹{product.price.toLocaleString()}
          </p>
          <h3>Description:</h3>
          <p className="product-detail-description">{product.description}</p>
          {product.chairType && (
            <div className="product-detail-more">
              <h3>Chair Type:</h3>
              <p>{product.chairType}</p>
            </div>
          )}
          <button
            onClick={() => navigate("/")}
            className="btn-neon"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
