import React, { useState, useEffect } from "react";
import "../styles/YourOrder.css";

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

      const response = await fetch("http://localhost:5000/api/event/signups", {
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
    return <div className="container mt-5"><p>Loading event signups...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p className="text-danger">{error}</p></div>;
  }

  return (
    <div className="container mt-5">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Event Signups</h2>
        <button className="btn btn-primary" onClick={fetchEventSignups}>
          Refresh
        </button>
      </div>
      
      {signups.length === 0 ? (
        <p>No event signups yet.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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
                <td>{signup.id}</td>
                <td>{signup.username}</td>
                <td>{signup.email}</td>
                <td>{signup.age}</td>
                <td>{signup.event_name}</td>
                <td>{new Date(signup.signup_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminEventSignups;
