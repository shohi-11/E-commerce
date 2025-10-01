import React, { createContext, useState } from 'react';

// 1. Create context
const CartContext = createContext();

// 2. Create provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    // Check if product is already in cart
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      // Increase quantity if already exists
      setCartItems(cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  // Clear cart after checkout
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;