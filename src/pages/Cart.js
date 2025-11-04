// not in use currently, but kept for future reference
import React, { useState } from "react";
import "../styles/Cart.css";

const initialCartItems = [
  // Sample items, you can start with empty array or pre-fill for testing
  // {
  //   id: "1",
  //   name: "NeoGlow Recliner",
  //   price: 14999,
  //   quantity: 1,
  // },
];

function Cart() {
  const [cart, setCart] = useState(initialCartItems);

  // Increase quantity of an item
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity of an item (removes item if quantity reaches 0)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove an item completely
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  // Format price to include commas (₹)
  const formatPrice = (price) =>
    "₹" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{formatPrice(item.price)}</span>
                </div>

                <div className="item-qty-controls">
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="qty-btn"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="qty-btn"
                    aria-label={`Decrease quantity of ${item.name}`}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <span>Total: {formatPrice(totalPrice)}</span>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
