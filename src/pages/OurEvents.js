
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from '../config';
import { isAdminLoggedIn } from "../utils/auth";

function OurEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = () => {
    setLoading(true);
    fetch(`${API_URL}/api/events`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then(data => {
        // Fix image paths to be absolute
        const fixedData = data.map(event => ({
          ...event,
          image_path: event.image_path ? 
            (event.image_path.startsWith('http') ? event.image_path : `${API_URL}${event.image_path}`) 
            : null
        }));
        setEvents(fixedData);
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
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '18px', color: '#666' }}>No events available at the moment.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '30px' }}>
            {events.map(event => (
              <div key={event.id} style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(90, 62, 54, 0.2)",
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row"
              }}>
                {event.image_path && (
                  <div style={{
                    flex: "0 0 40%",
                    minHeight: "250px"
                  }}>
                    <img 
                      src={event.image_path} 
                      alt={event.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </div>
                )}
                <div style={{
                  flex: "1",
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <h3 style={{ 
                      fontFamily: "'Lobster', cursive", 
                      color: "#5A3E36",
                      marginBottom: "15px",
                      fontSize: "24px"
                    }}>
                      {event.name}
                    </h3>
                    <p style={{ 
                      color: "#555", 
                      lineHeight: "1.6",
                      marginBottom: "20px"
                    }}>
                      {event.description}
                    </p>
                  </div>
                  
                  <div>
                    {!isAdminLoggedIn() && (
                      <Link 
                        to="/eventsignup" 
                        style={{
                          display: "inline-block",
                          backgroundColor: "#5A3E36",
                          color: "white",
                          padding: "10px 25px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontWeight: "600",
                          transition: "background-color 0.3s"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#3D2C27"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#5A3E36"}
                      >
                        📅 Sign Up for Event
                      </Link>
                    )}
                    {isAdminLoggedIn() && (
                      <Link 
                        to="/admin/events" 
                        style={{
                          display: "inline-block",
                          backgroundColor: "#5A3E36",
                          color: "white",
                          padding: "10px 25px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontWeight: "600",
                          transition: "background-color 0.3s"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#3D2C27"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#5A3E36"}
                      >
                        ⚙️ Manage Events
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OurEvents;
