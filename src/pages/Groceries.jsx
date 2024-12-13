// src/pages/Groceries.jsx
import { useState, useEffect } from "react";
import GroceryList from "../components/GroceryList";
import api from '../config/axios';

export default function Groceries() {
  const [groceries, setGroceries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroceries() {
      try {
        setLoading(true);
        // Update the endpoint to match your server route
        const response = await api.get('/find/ProductsDB/Products');
        setGroceries(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching groceries:", err);
        setError("Failed to load groceries. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    // Try to get cached data first
    const cachedData = sessionStorage.getItem("groceries");
    if (cachedData) {
      setGroceries(JSON.parse(cachedData));
      setLoading(false);
    }

    // Fetch fresh data
    fetchGroceries();
  }, []);

  // Update session storage when groceries change
  useEffect(() => {
    if (groceries.length > 0) {
      sessionStorage.setItem("groceries", JSON.stringify(groceries));
    }
  }, [groceries]);

  if (loading) {
    return <div>Loading groceries...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h1>Groceries</h1>
      <GroceryList items={groceries} />
    </div>
  );
}