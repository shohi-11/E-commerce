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
      <nav style={{ background: "#333", padding: "10px" }}>
     <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
     <Link to="/login" style={{ color: "white", marginRight: "10px" }}>Login</Link>
     <Link to="/register" style={{ color: "white", marginRight: "10px" }}>Register</Link>
     <Link to="/products" style={{ color: "white" }}>Products</Link>
</nav>
      <Navbar />
      <div style={{ padding: "20px" }}>
      <Routes>
        <Route path="/" 
        element={
      <div style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20230716/pngtree-3d-rendering-of-mobile-e-commerce-shopping-image_3879119.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}>
      <h2 style={{ color: "white", fontSize: "4rem" }}>
        Welcome to E-Commerce App
      </h2>
      <p style={{ color: "",fontSize : "2rem" }}>Shop your favorite products here!</p>
      </div> }
     />
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