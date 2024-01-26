import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../service.json";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Add an error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${config.local_url}/api/product/get-products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products"); // Set the error state
      }
    };

    fetchProducts();
  }, []);

  // Check for errors
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleUpdate = (productId) => {
    // Handle update logic, e.g., navigate to the update page
    console.log("Update product with ID:", productId);
    navigate(`/update-product/${productId}`);
  };

  const handleDelete = (productId) => {
    axios
      .delete(`${config.local_url}/api/product/delete-product/${productId}`)
      .then(() => {
        // Deletion successful, now refresh the product list
        handleRefresh();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleRefresh = async () => {
    try {
      const response = await axios.get(`${config.local_url}/api/product/get-products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add-product">
        <button>Add Product</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleUpdate(product._id)}>
                  Update
                </button>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
