import React from "react";
import axios from "axios";
import "../styles/Admin.css";

function DeleteEvent({ id, onDelete }) {
  const handleDelete = async () => {
    await axios.delete(`/api/events/${id}`);
    if (onDelete) onDelete();
  };

  return (
    <button className="admin-form" style={{background:'#c0392b',color:'#fff'}} onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteEvent;
