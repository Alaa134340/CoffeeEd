import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";

import { useParams, useNavigate } from "react-router-dom";

function UpdateMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/menu/${id}`)
      .then(res => {
        // If backend returns an array, use res.data[0], else res.data
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setForm({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          image: data.image || "",
          category: data.category || ""
        });
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch menu item");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/menu/${id}`, form);
      navigate('/admin/menu');
    } catch (err) {
      setError("Failed to update menu item");
    }
  };

  if (loading) return <div>Loading item...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <button type="submit" className="update-item-btn">Update Item</button>
    </form>
  );
}

export default UpdateMenuItem;
