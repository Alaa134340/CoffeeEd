import React, { useState, useEffect } from "react";
import "../styles/YourOrder.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      const response = await fetch("http://localhost:5000/api/orders", {
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
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
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
      alert("Order deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading orders...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p className="text-danger">{error}</p></div>;
  }

  return (
    <div className="container mt-5">
      <h2>All Orders (Admin)</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
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
