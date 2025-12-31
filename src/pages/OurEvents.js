
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";

function OurEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = () => {
    setLoading(true);
    fetch("/api/events")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch events");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ backgroundColor: "#F5EDE2", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container">
        <h1 className="text-center mb-5" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36", fontWeight: "bold" }}>
          Our Events
        </h1>
        {loading ? (
          <div>Loading events...</div>
        ) : error ? (
          <div style={{color:'red'}}>{error}</div>
        ) : events.length === 0 ? (
          <div>No events available.</div>
        ) : (
          events.map(event => (
            <div className="card mb-4 shadow-lg border-0" style={{ backgroundColor: "#E8D7C5" }} key={event.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  {/* Optionally add an image field to events and display here */}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}>{event.name}</h4>
                    <p className="card-text" style={{ color: "#3D2C27" }}>{event.description}</p>
                    
                    {!isAdminLoggedIn() && (
                      <Link to="/eventsignup" className="btn btn-dark">Sign Up</Link>
                    )}
                    {isAdminLoggedIn() && (
                      <span style={{color:'#888'}}><Link to="/AdminEventManagement" className="btn btn-dark">Manage</Link></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OurEvents;
