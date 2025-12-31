//import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";
import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Shop from "./pages/OurShop";
import AddMenuItem from "./pages/AddMenuItem";
import UpdateMenuItem from "./pages/UpdateMenuItem";
import DeleteMenuItem from "./pages/DeleteMenuItem";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import DeleteEvent from "./pages/DeleteEvent";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminMenuManagement from "./pages/AdminMenuManagement";
import AdminEventManagement from "./pages/AdminEventManagement";

import Menu from "./pages/OurMenu";
import Order from "./pages/YourOrder";
import About from "./pages/AboutUs";
import Events from "./pages/OurEvents";
import EventSignup from "./pages/EventSignup";
import UserOrders from "./pages/UserOrders";
import AdminOrders from "./pages/AdminOrders";
import AdminEventSignups from "./pages/AdminEventSignups";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";





function App() {
  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (item) => {
    setOrderItems((prev) => [...prev, { ...item, id: Date.now() }]);
  };

  const removeFromOrder = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
      <div className="container text-center mt-5">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/menu" element={<Menu addToOrder={addToOrder} />} />
          <Route path="/order" element={<Order orderItems={orderItems} removeFromOrder={removeFromOrder} />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventsignup" element={<EventSignup />} />
          <Route path="/about" element={<About />} />
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Admin Management Dashboards */}
          <Route path="/admin/menu" element={<ProtectedRoute><AdminMenuManagement /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEventManagement /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/event-signups" element={<ProtectedRoute><AdminEventSignups /></ProtectedRoute>} />
          {/* Admin Menu Item Actions */}
          <Route path="/admin/menu/add" element={<ProtectedRoute><AddMenuItem /></ProtectedRoute>} />
          <Route path="/admin/menu/update/:id" element={<ProtectedRoute><UpdateMenuItem /></ProtectedRoute>} />
          <Route path="/admin/menu/delete/:id" element={<ProtectedRoute><DeleteMenuItem /></ProtectedRoute>} />
          {/* Admin Event Actions */}
          <Route path="/admin/event/add" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
          <Route path="/admin/event/edit/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
          <Route path="/admin/event/delete/:id" element={<ProtectedRoute><DeleteEvent /></ProtectedRoute>} />
        </Routes>
      </div>
       
        <Footer />
      </div>
    </Router>
  )
}

export default App;
