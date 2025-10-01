import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> | {" "}
        <Link to="/products">Products</Link>
      </nav>
      <Navbar />
      <div style={{ padding: "20px" }}>
      <Routes>
        <Route path="/" element={<h2>Welcome to E-Commerce App</h2>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<PrivateRoute>
          <CartPage />
        </PrivateRoute>} />
      </Routes>
      </div>
    </Router>
  )
}

export default App