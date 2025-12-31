
import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import "../styles/Admin.css";


function AddMenuItem({ onAdd }) {
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "coffee" });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    await axios.post(`${API_URL}/api/menu`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setForm({ name: "", description: "", price: "", category: "coffee" });
    setImageFile(null);
    if (onAdd) onAdd();
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="coffee">Coffee</option>
        <option value="smoothies">Smoothies</option>
        <option value="pastry">Pastry</option>
        <option value="acaiBowls">Acai Bowl</option>
      </select>
      <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddMenuItem;
