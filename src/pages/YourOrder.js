import React, { useState } from "react";
import '../styles/YourOrder.css';

function YourOrder({ orderItems, removeFromOrder }) {
  
  const emptyItem = {
    category: "",      
    coffeeType: "",
    size: "",
    milk: "",
    sweetness: "",
    addons: "",
    temp: "",
    fruit: "",
    pastryType: "",
    acaiAddons: "",
    cupMessage: false,
  };

  const [items, setItems] = useState([ { ...emptyItem } ]);

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    pickupTime: "",
    instructions: "",
  });

  
  const handleOrderInfoChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updated = [...items];

    updated[index][name] = type === "checkbox" ? checked : value;
    setItems(updated);
  };

  const addItem = () => {
    setItems((prev) => [...prev, { ...emptyItem }]);
  };

  
  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your pickup order has been placed! Thank you");
    //console.log({ orderInfo, items });
  };

  return (
    <div className="form-container" > 
     <div style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}><h1>Your Order</h1></div>

      {/* Items from Menu */}
      {orderItems.length > 0 && (
        <div className="menu-items-section">
          <h2>Items from Menu</h2>
          <div className="menu-items-list">
            {orderItems.map((item) => (
              <div key={item.id} className="menu-order-item">
                <img src={item.image} alt={item.name} className="order-item-img" />
                <div className="order-item-details">
                  <h4>{item.name}</h4>
                  <p className="order-item-category">{item.category}</p>
                  <p className="order-item-price">{item.price}</p>
                </div>
                <button
                  type="button"
                  className="remove-menu-item-btn"
                  onClick={() => removeFromOrder(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <hr />
        </div>
      )}

    
      <form onSubmit={handleSubmit}>
     
        <label>Name:</label>
        <input
          type="text"
          name="name"
          required
          value={orderInfo.name}
          onChange={handleOrderInfoChange}
        />

        
        <label>Pickup Time:</label>
        <input
          type="time"
          name="pickupTime"
          required
          value={orderInfo.pickupTime}
          onChange={handleOrderInfoChange}
        />

        
        <label>General Instructions:</label>
        <textarea
          name="instructions"
          placeholder="Optional: Light ice, no foam..."
          value={orderInfo.instructions}
          onChange={handleOrderInfoChange}
        />

        <hr />

        
        {items.map((item, index) => (
          <div className="option-group" key={index}>
            <h4>
              Item {index + 1}
              <button
                type="button"
                id={`remove-item-btn-${index}`}
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                remove item from your order
              </button>
            </h4>

            {/* Category */}
            <label>Category:</label>
            <select
              name="category"
              required
              value={item.category}
              onChange={(e) => handleItemChange(index, e)}
            >
              <option value="">Select Type</option>
              <option value="coffee">Coffee</option>
              <option value="smoothie">Smoothie</option>
              <option value="pastry">Pastry</option>
              <option value="acai">Açaí Bowl</option>
            </select>

            {/* If Coffee */}
            {item.category === "coffee" && (
              <>
                <label>Coffee Type:</label>
                <select
                  name="coffeeType"
                  required
                  value={item.coffeeType}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="">Select Coffee</option>
                  <option>Espresso</option>
                  <option>Americano</option>
                  <option>Latte</option>
                  <option>Cappuccino</option>
                  <option>Mocha</option>
                  <option>Macchiato</option>
                  <option>Cold Brew</option>
                </select>

                <label>Size:</label>
                <select
                  name="size"
                  required
                  value={item.size}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="">Select Size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>

                <label>Milk:</label>
                <select
                  name="milk"
                  value={item.milk}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="">No Milk</option>
                  <option>Whole Milk</option>
                  <option>Skim Milk</option>
                  <option>Almond Milk</option>
                  <option>Oat Milk</option>
                  <option>Soy Milk</option>
                </select>

                <label>Sweetness:</label>
                <select
                  name="sweetness"
                  value={item.sweetness}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option>No Sugar</option>
                  <option>Less Sweet</option>
                  <option>Normal</option>
                  <option>Extra Sweet</option>
                </select>

                <label>Temperature:</label>
                <select
                  name="temp"
                  required
                  value={item.temp}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="">Select</option>
                  <option>Hot</option>
                  <option>Iced</option>
                  <option>Extra Hot</option>
                </select>

                <label>Add-ons:</label>
                <input
                  type="text"
                  name="addons"
                  placeholder="Extra caramel, 2 shots..."
                  value={item.addons}
                  onChange={(e) => handleItemChange(index, e)}
                />

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="cupMessage"
                    checked={item.cupMessage}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                  Write a message on the cup?
                </label>
              </>
            )}

            {item.category === "smoothie" && (
              <>
                <label>Fruit Type:</label>
                <select
                  name="fruit"
                  required
                  value={item.fruit}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="">Select Fruit</option>
                  <option>Strawberry</option>
                  <option>Mango</option>
                  <option>Banana</option>
                  <option>Blueberry</option>
                  <option>Peach</option>
                </select>

                <label>Add-ons:</label>
                <input
                  type="text"
                  name="addons"
                  placeholder="Honey, chia seeds..."
                  value={item.addons}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </>
            )}

           
            {item.category === "pastry" && (
              <>
                <label>Pastry Type:</label>
                <select
                  name="pastryType"
                  required
                  value={item.pastryType}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="">Select Pastry</option>
                  <option>Croissant</option>
                  <option>Muffin</option>
                  <option>Chocolate Cake</option>
                  <option>Cheesecake</option>
                  <option>Cookies</option>
                </select>
              </>
            )}

          
            {item.category === "acai" && (
              <>
                <label>Açaí Add-ons:</label>
                <input
                  type="text"
                  name="acaiAddons"
                  placeholder="Granola, banana, honey..."
                  value={item.acaiAddons}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </>
            )}
          </div>
        ))}

        
        <button
          type="button"
          id="add-item-btn"
          className="add-btn"
          onClick={addItem}
        >
           Add Another Item
        </button>

        
        <button type="submit" id="submit-order-btn" className="submit-btn">
          Place Pickup Order
        </button>
      </form>
    </div>
  );
}

export default YourOrder;
