import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Admin.css";
import API_URL from "../config";

function AdminMenuManagement() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/menu`)
      .then(res => {
        setMenu(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch menu items");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    setDeletingId(id);
    axios.delete(`${API_URL}/api/menu/${id}`)
      .then(() => {
        setMenu(menu.filter(item => item.id !== id));
        setDeletingId(null);
      })
      .catch(() => {
        alert("Failed to delete item.");
        setDeletingId(null);
      });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Menu Management</h2>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
        <Link to="/admin/menu/add" className="btn btn-dark">Add Menu Item</Link>
      </div>
      {loading ? (
        <div>Loading menu items...</div>
      ) : error ? (
        <div style={{color:'red'}}>{error}</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${parseFloat(item.price).toFixed(2)}</td>
                <td>{item.category}</td>
                <td>
                  {item.image ? (
                    <img src={item.image.startsWith('http') ? item.image : `/uploads/${item.image}`} alt={item.name} style={{maxWidth:60, maxHeight:60}} />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td>
                  <Link to={`/admin/menu/update/${item.id}`} className="update-item-btn" style={{marginRight:8}}>Update</Link>
                  <button
                    className="delete-item-btn"
                    style={{background:'#b23b3b', color:'#fff', border:'none', borderRadius:6, padding:'6px 14px', cursor:'pointer'}}
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminMenuManagement;
