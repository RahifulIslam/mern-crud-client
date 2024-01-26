import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../service.json";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config.local_url}/api/product/get-product/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product for update:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${config.local_url}/api/product/update-product/${id}`,
        product
      );
      // Optionally, you can navigate to another page or perform other actions after update
      console.log("Product updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
