import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      // First check local storage token
      if (!isAdminLoggedIn()) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Then verify with backend
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/user-check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.is_admin);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Error checking admin status:", err);
      // Fall back to token check
      setIsAdmin(isAdminLoggedIn());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
