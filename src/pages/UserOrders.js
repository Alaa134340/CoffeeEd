import React, { useState, useEffect } from "react";
import "../styles/Orders.css";
import API_URL from "../config";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("You must be logged in to view orders");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/myorders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      <button className="refresh-btn" onClick={fetchUserOrders}>
        Refresh Orders
      </button>
      {orders.length === 0 ? (
        <div className="empty-state">
          
          <p>You have no orders yet.</p>
          <p>Start ordering from our menu!</p>
        </div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td data-label="Order ID">{order.id}</td>
                <td data-label="Item">{order.item}</td>
                <td data-label="Quantity">{order.quantity}</td>
                <td data-label="Order Date">{new Date(order.order_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserOrders;
