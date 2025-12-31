import React, { useState } from "react";
import axios from "axios";
import "../styles/Admin.css";


function AddEvent({ onAdd }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append('image', image);
    await axios.post("/api/events", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setForm({ name: "", description: "" });
    setImage(null);
    if (onAdd) onAdd();
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEvent;
