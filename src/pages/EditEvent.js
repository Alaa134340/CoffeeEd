import React, { useState } from "react";
import axios from "axios";
import "../styles/Admin.css";

function EditEvent({ event, onUpdate, onCancel }) {
  const [form, setForm] = useState(event || { name: "", description: "", date: ""});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/events/${event.id}`, form);
    if (onUpdate) onUpdate();
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="date" placeholder="Date" value={form.date} onChange={handleChange} required />
      
      <button type="submit">Update Event</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default EditEvent;
