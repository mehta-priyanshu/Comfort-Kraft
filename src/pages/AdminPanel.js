// not in use currently, but kept for future reference
import React, { useState, useEffect } from "react";
import "../styles/AdminPanel.css";

function AdminPanel({ isAdmin }) {
  // All hooks at the top
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    chairType: "",
    image: null,
    imagePreviewUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    avgPrice: 0,
    categories: {}
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  
  // Edit functionality states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    chairType: "",
    imageUrl: "",
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Calculate statistics
  const calculateStats = (productList) => {
    const total = productList.length;
    const revenue = productList.reduce((sum, product) => sum + product.price, 0);
    const categories = productList.reduce((acc, product) => {
      acc[product.chairType] = (acc[product.chairType] || 0) + 1;
      return acc;
    }, {});

    setStats({
      totalProducts: total,
      totalRevenue: revenue,
      avgPrice: total > 0 ? Math.round(revenue / total) : 0,
      categories
    });
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      calculateStats(data);
    } catch (e) {
      setError(e.message || "Error loading products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setForm((prev) => ({
          ...prev,
          image: file,
          imagePreviewUrl: previewUrl,
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Upload image
  const uploadImage = async (file) => {
    if (!file) throw new Error("No image file selected for upload");
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Image upload failed");
    }

    const data = await res.json();
    return data.imageUrl;
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.price || !form.description || !form.chairType || !form.image) {
      alert("Please fill in all fields including chair type and select an image.");
      return;
    }

    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImage(form.image);
      const productData = {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        chairType: form.chairType,
        imageUrl: uploadedImageUrl,
      };

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const resData = await res.json().catch(() => ({}));
        throw new Error(resData.error || "Failed to add product");
      }

      setForm({
        name: "",
        price: "",
        description: "",
        chairType: "",
        image: null,
        imagePreviewUrl: "",
      });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Edit functionality
  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
      chairType: product.chairType,
      imageUrl: product.imageUrl,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async () => {
    const { name, chairType, price, description, imageUrl } = editForm;
    if (!name || !chairType || !price || !description || !imageUrl) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, chairType, price, description, imageUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update product.");
      }

      setEditingProduct(null);
      fetchProducts(); // Refresh the products list
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || product.chairType === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Auth check
  if (!isAdmin) {
    return <p>You are not authorized</p>;
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <span className="admin-icon">⚡</span>
          Admin Dashboard
        </h1>
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'add-product' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-product')}
          >
            ➕ Add Product
          </button>
          <button 
            className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            🛠️ Manage Products
          </button>
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h3>{stats.totalProducts}</h3>
                <p>Total Products</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h3>₹{stats.avgPrice.toLocaleString()}</h3>
                <p>Average Price</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏷️</div>
              <div className="stat-info">
                <h3>{Object.keys(stats.categories).length}</h3>
                <p>Categories</p>
              </div>
            </div>
          </div>

          <div className="categories-overview">
            <h3>📊 Categories Overview</h3>
            <div className="category-list">
              {Object.entries(stats.categories).map(([category, count]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <span className="category-count">{count} products</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === 'add-product' && (
        <div className="add-product-content">
          <div className="form-container">
            <h2>➕ Add New Product</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <span className="label-icon">🏷️</span>
                  Product Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <span className="label-icon">💰</span>
                    Price (₹)
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={form.price}
                      min="0"
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-icon">🪑</span>
                    Chair Type
                    <select
                      name="chairType"
                      value={form.chairType}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Office Chair">Office Chair</option>
                      <option value="Study Chair">Study Chair</option>
                      <option value="Dining Chair">Dining Chair</option>
                      <option value="Boss Chair">Boss Chair</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">📝</span>
                  Description
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={form.description}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">📸</span>
                  Upload Image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </label>
              </div>

              {form.imagePreviewUrl && (
                <div className="image-preview">
                  <img src={form.imagePreviewUrl} alt="Preview" />
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "⏳ Adding..." : "✨ Add Product"}
              </button>

              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      )}

      {/* Manage Products Tab */}
      {activeTab === 'manage' && (
        <div className="manage-content">
          <div className="manage-header">
            <h2>🛠️ Manage Products</h2>
            <div className="manage-controls">
              <input
                type="text"
                placeholder="🔍 Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Categories</option>
                <option value="Office Chair">Office Chair</option>
                <option value="Study Chair">Study Chair</option>
                <option value="Dining Chair">Dining Chair</option>
                <option value="Boss Chair">Boss Chair</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="product-type">{product.chairType}</p>
                  <p className="product-price">₹{product.price}</p>
                  <div className="product-actions">
                    <button
                      onClick={() => openEditModal(product)}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>✏️ Edit Product</h2>
                
                <div className="edit-form">
                  <label>
                    Product Name:
                    <input 
                      type="text" 
                      name="name" 
                      value={editForm.name} 
                      onChange={handleEditChange} 
                    />
                  </label>

                  <label>
                    Chair Type:
                    <select 
                      name="chairType" 
                      value={editForm.chairType} 
                      onChange={handleEditChange}
                    >
                      <option value="Office Chair">Office Chair</option>
                      <option value="Study Chair">Study Chair</option>
                      <option value="Dining Chair">Dining Chair</option>
                      <option value="Boss Chair">Boss Chair</option>
                    </select>
                  </label>

                  <label>
                    Price:
                    <input 
                      type="number" 
                      name="price" 
                      value={editForm.price} 
                      onChange={handleEditChange} 
                    />
                  </label>

                  <label>
                    Description:
                    <textarea 
                      name="description" 
                      value={editForm.description} 
                      onChange={handleEditChange}
                      rows="4"
                    />
                  </label>

                  <label>
                    Image URL:
                    <input 
                      type="text" 
                      name="imageUrl" 
                      value={editForm.imageUrl} 
                      onChange={handleEditChange} 
                    />
                  </label>
                </div>

                <div className="modal-buttons">
                  <button className="btn-save" onClick={submitEdit}>
                    💾 Save Changes
                  </button>
                  <button className="btn-cancel" onClick={cancelEdit}>
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
