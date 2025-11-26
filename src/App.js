//import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/OurShop";
import Menu from "./pages/OurMenu";
import Order from "./pages/YourOrder";
import About from "./pages/AboutUs";
import Events from "./pages/OurEvents";
import EventSignup from "./pages/EventSignup";





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
          <Route path="/events" element={<Events />} />
          <Route path="/eventsignup" element={<EventSignup />} />
          <Route path="/about" element={<About />} />
          
        </Routes>
      </div>
       
        <Footer />
      </div>
    </Router>
  )
}

export default App;
