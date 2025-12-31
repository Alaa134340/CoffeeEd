
import React, { useEffect, useState } from "react";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import "../styles/Admin.css";
import API_URL from "../config";

function AdminEventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const fetchEvents = () => {
    setLoading(true);
    fetch(`${API_URL}/api/events`)
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

  const handleAdd = () => {
    setShowAdd(false);
    fetchEvents();
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleUpdate = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  const handleDelete = () => {
    fetchEvents();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Event Management</h2>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
        <button className="btn btn-dark" onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Cancel' : 'Add Event'}</button>
      </div>
      {showAdd && <AddEvent onAdd={handleAdd} />}
      {editingEvent && <EditEvent event={editingEvent} onUpdate={handleUpdate} onCancel={() => setEditingEvent(null)} />}
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div style={{color:'red'}}>{error}</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
             
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>
                  <button className="update-item-btn" style={{marginRight:8}} onClick={() => handleEdit(event)}>Edit</button>
                  <DeleteEvent id={event.id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminEventManagement;
