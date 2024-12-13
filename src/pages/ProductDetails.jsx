import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../config/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        // First, try to get the product from cached data
        const cachedData = sessionStorage.getItem("groceries");
        if (cachedData) {
          const groceries = JSON.parse(cachedData);
          const cachedProduct = groceries.find(
            item => item.id === parseInt(id) || item.id === id
          );
          if (cachedProduct) {
            setProduct(cachedProduct);
            setLoading(false);
            return;
          }
        }

        // If not in cache, try to fetch from API
        const response = await api.get(`/groceries/${id}.json`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
}
