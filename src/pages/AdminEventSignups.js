import React, { useState, useEffect } from "react";
import "../styles/Orders.css";
import API_URL from "../config";

function AdminEventSignups() {
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventSignups();
  }, []);

  const fetchEventSignups = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Admin authentication required");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/event/signups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event signups. Access denied.");
      }

      const data = await response.json();
      setSignups(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading event signups...</div>
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
      <h1>Event Signups</h1>
      <button className="refresh-btn" onClick={fetchEventSignups}>
        Refresh
      </button>
      
      {signups.length === 0 ? (
        <div className="empty-state">
          
          <p>No event signups yet.</p>
        </div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
              <th>Event</th>
              <th>Signup Date</th>
            </tr>
          </thead>
          <tbody>
            {signups.map((signup) => (
              <tr key={signup.id}>
                <td data-label="ID">{signup.id}</td>
                <td data-label="Username">{signup.username}</td>
                <td data-label="Email">{signup.email}</td>
                <td data-label="Age">{signup.age}</td>
                <td data-label="Event">{signup.event_name}</td>
                <td data-label="Signup Date">{new Date(signup.signup_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminEventSignups;
