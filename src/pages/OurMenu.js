import React, { useEffect, useState } from 'react';
import "../styles/MainMenu.css";
import API_URL from '../config';
import { isAdminLoggedIn } from "../utils/auth";
import { Link } from "react-router-dom";
function Menu({ addToOrder }) {

  const [menuData, setMenuData] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch menu');
        return res.json();
      })
      .then((data) => {
        // Group items by category and fix image paths
        const grouped = {};
        data.forEach(item => {
          if (!grouped[item.category]) grouped[item.category] = [];
          // Ensure image path is absolute
          const imagePath = item.image_path ? 
            (item.image_path.startsWith('http') ? item.image_path : `${API_URL}${item.image_path}`) 
            : null;
          grouped[item.category].push({ ...item, image_path: imagePath });
        });
        setMenuData(grouped);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToOrder = (item, category) => {
    if (!isAdminLoggedIn()) {
      addToOrder({ ...item, category });
      alert(`${item.name} added to order!`);
    }
  };

  const handleDelete = (itemId, category) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    setDeletingId(itemId);
    fetch(`/api/menu/${itemId}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete item');
        // Remove item from UI
        setMenuData(prev => {
          const updated = { ...prev };
          updated[category] = updated[category].filter(item => item.id !== itemId);
          if (updated[category].length === 0) delete updated[category];
          return updated;
        });
        setDeletingId(null);
      })
      .catch(() => {
        alert('Failed to delete item.');
        setDeletingId(null);
      });
  };

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu-container">
      {Object.keys(menuData).length === 0 ? (
        <div>No menu items available.</div>
      ) : (
        Object.keys(menuData).map((category) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="items-grid">
              {menuData[category].map((item, index) => (
                <div className="menu-card" key={item.id || index}>
                  <img src={item.image_path || 'https://via.placeholder.com/150'} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${parseFloat(item.price).toFixed(2)}</p>
                  {!isAdminLoggedIn() && (
                    <button 
                      className="add-to-order-btn"
                      onClick={() => handleAddToOrder(item, category)}
                    >
                      Add to Order
                    </button>
                  )}
                  {isAdminLoggedIn() && (
                    <>
                      <Link
                        to={`/admin/menu/update/${item.id}`}
                        className="update-item-btn"
                        style={{ marginTop: 8, display: 'block', textAlign: 'center' }}
                      >
                        Update
                      </Link>
                      <button
                        className="delete-item-btn"
                        style={{ background: '#b23b3b', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', marginTop: 8, display: 'block', width: '100%' }}
                        onClick={() => handleDelete(item.id, category)}
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Menu;
