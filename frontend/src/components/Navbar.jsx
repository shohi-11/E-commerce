import React, { useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import CartContext from '../Context/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let username = null;
if (token) {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    username = decoded.name;
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token"); // cleanup if bad
  }
}


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="flex items-center space-x-6">
        <Link className="font-bold text-xl hover:text-gray-200" to="/">
          E-Shop
        </Link>
        <Link className="hover:text-gray-200" to="/products">
          Products
        </Link>
        <Link className="hover:text-gray-200 relative" to="/cart">
          Cart
          {cartItems.length > 0 && (
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 text-xs absolute -top-2 -right-4">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <span className="font-semibold">{username || "User"}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;