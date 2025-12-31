import React, { useState } from "react";
import axios from "axios";
import "../styles/Admin.css";
import API_URL from "../config";

function AddEvent({ onAdd }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (image) formData.append('image', image);
      
      const userId = localStorage.getItem('userId');
      await axios.post(`${API_URL}/api/events`, formData, { 
        headers: { 
          'Content-Type': 'multipart/form-data',
          'user-id': userId
        } 
      });
      
      setForm({ name: "", description: "" });
      setImage(null);
      setImagePreview(null);
      setLoading(false);
      if (onAdd) onAdd();
      alert('Event added successfully!');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Event</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Event Name</label>
          <input 
            name="name" 
            placeholder="Enter event name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            placeholder="Enter event description" 
            value={form.description} 
            onChange={handleChange} 
            required 
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Event Image</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <p>Image selected: {image?.name}</p>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Event...' : 'Add Event'}
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
