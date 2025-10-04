import React, { useContext } from 'react';
import CartContext from '../Context/CartContext';
import API from '../api/api';


function CartPage() {
  const { cartItems, removeFromCart, totalPrice, clearCart } =
    useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <h2 className="text-2xl font-semibold text-center mt-10">
        Your cart is empty 
      </h2>
    );
  }

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first!");
      return;
    }

    let userId;
    try {
      const decoded = jwt_decode(token);
      userId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDZhM2FlNTYzYjI5ZjE4MjUwMTY4NiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4ODk3MTI5LCJleHAiOjE3NTg5MDA3Mjl9.SK17eDylmisNL8YxIgeqQyBievu084TA9uIDEG3BA3E";;
    } catch (err) {
      console.error("Invalid token", err);
      return;
    }

    try {
      await API.post(
        "/api/orders",
        { userId, products: cartItems, total: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Cart
      </h2>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item._id || item.id}
            className="flex justify-between items-center border rounded p-4 shadow"
          >
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p className="font-bold">Price: ₹{item.price * item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <h3 className="text-2xl font-bold mt-6">Total: ₹{totalPrice}</h3>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded transition"
      >
        Checkout
      </button>
    </div>
  );
}

export default CartPage;