import React from "react";
import axios from "axios";
import API_URL from "../config";
import "../styles/Admin.css";

function DeleteMenuItem({ id, onDelete }) {
  const handleDelete = async () => {
    await axios.delete(`${API_URL}/api/menu/${id}`);
    if (onDelete) onDelete();
  };

  return (
    <button className="admin-form" style={{background:'#c0392b',color:'#fff'}} onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteMenuItem;
