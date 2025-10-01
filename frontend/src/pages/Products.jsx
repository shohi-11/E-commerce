import React, { useEffect, useState, useContext} from 'react'
import API from "../api/api";
import CartContext from '../Context/CartContext';

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-center col-span-full">No products found</p>
        ) : (
          products.map((p, i) => (
            <div
              key={p._id || p.id || i}
              className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between"
            >
              <img
                src={p.image || "https://via.placeholder.com/200"}
                alt={p.name}
                className="w-full h-65 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{p.name}</h3>
              <p className="text-gray-600 mt-2">{p.description}</p>
              <p className="font-bold mt-2">₹{p.price}</p>
              <button
                onClick={() => addToCart(p)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;