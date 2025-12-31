import React, { useState, useEffect } from "react";
import "../styles/Orders.css";
import API_URL from "../config";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const userId = localStorage.getItem("userId"); // Assuming admin user_id is stored
      
      if (!adminToken || !userId) {
        setError("Admin authentication required");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders. Access denied.");
      }

      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      setSuccessMessage("Order deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading orders...</div>
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
      <h1>All Orders</h1>
      {successMessage && <div className="success-message">✓ {successMessage}</div>}
      <button className="refresh-btn" onClick={fetchAllOrders}>
         Refresh Orders
      </button>
      {orders.length === 0 ? (
        <div className="empty-state">
         
          <p>No orders found.</p>
        </div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td data-label="Order ID">{order.id}</td>
                <td data-label="User ID">{order.user_id}</td>
                <td data-label="Item">{order.item}</td>
                <td data-label="Quantity">{order.quantity}</td>
                <td data-label="Order Date">{new Date(order.order_date).toLocaleDateString()}</td>
                <td data-label="Actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteOrder(order.id)}
                  >
                     Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
