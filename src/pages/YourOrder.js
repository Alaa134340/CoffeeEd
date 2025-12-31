import React, { useState } from "react";
import "../styles/YourOrder.css";
import API_URL from "../config";

/* ===============================
   PRICING CONFIG
================================ */
const PRICES = {
  coffee: 4.0,
  smoothie: 5.5,
  pastry: 3.5,
  acai: 6.5
};

const ADDON_PRICE = 0.75;

/* Count comma-separated add-ons */
const countAddons = (text) => {
  if (!text) return 0;
  return text.split(",").filter(a => a.trim() !== "").length;
};

function YourOrder({ orderItems = [], removeFromOrder }) {

  const defaultItem = {
    category: "coffee",
    coffeeType: "Latte",
    size: "Medium",
    milk: "Whole Milk",
    sweetness: "Normal",
    temp: "Hot",
    addons: "",
    cupMessage: false,
    fruit: "",
    pastryType: "",
    acaiAddons: ""
  };

  const [items, setItems] = useState([{ ...defaultItem }]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    pickupTime: "",
    instructions: ""
  });

  /* ===============================
     HANDLERS
  ================================ */
  const handleOrderInfoChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, name, value) => {
    const updated = [...items];
    updated[index][name] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems(prev => [...prev, { ...prev[prev.length - 1] }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  /* ===============================
     PRICE CALCULATIONS
  ================================ */
  const calculateItemPrice = (item) => {
    const base = PRICES[item.category] || 0;

    const addonsCount =
      countAddons(item.addons) +
      countAddons(item.acaiAddons);

    return base + addonsCount * ADDON_PRICE;
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  };

  /* ===============================
     SUBMIT
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please sign in first to place an order");
      return;
    }

    try {
      // Send each item as an order to the backend
      for (const item of items) {
        const itemDescription = `${item.category.toUpperCase()} - ${
          item.category === "coffee" ? item.coffeeType :
          item.category === "smoothie" ? item.smoothie :
          item.category === "pastry" ? item.pastryType :
          item.category === "acai" ? "Acai Bowl" : "Item"
        }`;

        const response = await fetch(`${API_URL}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": userId,
          },
          body: JSON.stringify({
            item: itemDescription,
            quantity: 1,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to place order");
        }
      }

      alert("Your order has been placed successfully! ☕");
      setItems([{ ...defaultItem }]);
      setOrderInfo({ name: "", pickupTime: "", instructions: "" });
    } catch (error) {
      console.error(error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="form-container">

      <h1 style={{ fontFamily: "Lobster, cursive", color: "#5A3E36" }}>
        Your Order
      </h1>

      {/* ===============================
          MENU ITEMS
      ================================ */}
      {orderItems.length > 0 && (
        <div className="menu-items-section">
          <h3>From Menu</h3>
          {orderItems.map(item => (
            <div key={item.id} className="menu-order-item">
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <p>{item.price}</p>
              </div>
              <button onClick={() => removeFromOrder(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* ===============================
            ORDER INFO
        ================================ */}
        <label>Name</label>
        <input
          name="name"
          required
          value={orderInfo.name}
          onChange={handleOrderInfoChange}
        />

        <label>Pickup Time</label>
        <input
          type="time"
          name="pickupTime"
          required
          value={orderInfo.pickupTime}
          onChange={handleOrderInfoChange}
        />

        <label>Instructions (optional)</label>
        <textarea
          name="instructions"
          placeholder="Light ice, no foam..."
          value={orderInfo.instructions}
          onChange={handleOrderInfoChange}
        />

        {/* ===============================
            ORDER ITEMS
        ================================ */}
        {items.map((item, index) => (
          <div className="order-card" key={index}>

            <div className="card-header">
              <h4>Item {index + 1}</h4>
              <button type="button" onClick={() => removeItem(index)}>✕</button>
            </div>

            {/* CATEGORY TABS */}
            <div className="category-tabs">
              {["coffee", "smoothie", "pastry", "acai"].map(cat => (
                <button
                  type="button"
                  key={cat}
                  className={item.category === cat ? "active" : ""}
                  onClick={() => handleItemChange(index, "category", cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* COFFEE */}
            {item.category === "coffee" && (
              <>
                <label>Coffee</label>
                <select
                  value={item.coffeeType}
                  onChange={e =>
                    handleItemChange(index, "coffeeType", e.target.value)
                  }
                >
                  <option>Latte</option>
                  <option>Espresso</option>
                  <option>Americano</option>
                  <option>Cappuccino</option>
                  <option>Mocha</option>
                  <option>Cold Brew</option>
                </select>

                <label>Size</label>
                <select
                  value={item.size}
                  onChange={e =>
                    handleItemChange(index, "size", e.target.value)
                  }
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>

                <label>Temperature</label>
                <select
                  value={item.temp}
                  onChange={e =>
                    handleItemChange(index, "temp", e.target.value)
                  }
                >
                  <option>Hot</option>
                  <option>Iced</option>
                  <option>Extra Hot</option>
                </select>

                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? "Hide Options" : "Customize"}
                </button>

                {showAdvanced && (
                  <>
                    <label>Milk</label>
                    <select
                      value={item.milk}
                      onChange={e =>
                        handleItemChange(index, "milk", e.target.value)
                      }
                    >
                      <option>Whole Milk</option>
                      <option>Skim Milk</option>
                      <option>Oat Milk</option>
                      <option>Almond Milk</option>
                    </select>

                    <label>Sweetness</label>
                    <select
                      value={item.sweetness}
                      onChange={e =>
                        handleItemChange(index, "sweetness", e.target.value)
                      }
                    >
                      <option>No Sugar</option>
                      <option>Less Sweet</option>
                      <option>Normal</option>
                      <option>Extra Sweet</option>
                    </select>

                    <label>Add-ons ($0.75 each)</label>
                    <input
                      placeholder="Extra shot, caramel..."
                      value={item.addons}
                      onChange={e =>
                        handleItemChange(index, "addons", e.target.value)
                      }
                    />
                  </>
                )}
              </>
            )}

            {/* SMOOTHIE */}
            {item.category === "smoothie" && (
              <>
                <label>Fruit</label>
                <select
                  value={item.fruit}
                  onChange={e =>
                    handleItemChange(index, "fruit", e.target.value)
                  }
                >
                  <option>Strawberry</option>
                  <option>Mango</option>
                  <option>Banana</option>
                  <option>Blueberry</option>
                </select>

                <label>Add-ons ($0.75 each)</label>
                <input
                  placeholder="Chia seeds, honey..."
                  value={item.addons}
                  onChange={e =>
                    handleItemChange(index, "addons", e.target.value)
                  }
                />
              </>
            )}

            {/* PASTRY */}
            {item.category === "pastry" && (
              <>
                <label>Pastry</label>
                <select
                  value={item.pastryType}
                  onChange={e =>
                    handleItemChange(index, "pastryType", e.target.value)
                  }
                >
                  <option>Croissant</option>
                  <option>Muffin</option>
                  <option>Cookies</option>
                  <option>Cheesecake</option>
                </select>
              </>
            )}

            {/* ACAI */}
            {item.category === "acai" && (
              <>
                <label>Add-ons ($0.75 each)</label>
                <input
                  placeholder="Granola, banana..."
                  value={item.acaiAddons}
                  onChange={e =>
                    handleItemChange(index, "acaiAddons", e.target.value)
                  }
                />
              </>
            )}

          </div>
        ))}

        {/* ===============================
            ORDER SUMMARY
        ================================ */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {items.map((item, index) => (
            <div className="summary-row" key={index}>
              <span>
                {item.category === "coffee" && item.coffeeType}
                {item.category === "smoothie" && `${item.fruit} Smoothie`}
                {item.category === "pastry" && item.pastryType}
                {item.category === "acai" && "Açaí Bowl"}
              </span>
              <span>${calculateItemPrice(item).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <strong>Total</strong>
            <strong>${calculateTotal().toFixed(2)}</strong>
          </div>

          <p className="addons-note">
            * Each add-on costs $0.75
          </p>
        </div>

        <button type="button" className="add-btn" onClick={addItem}>
          + Add Another Item
        </button>

        <button type="submit" className="submit-btn">
          Place Pickup Order 
        </button>
      </form>
    </div>
  );
}

export default YourOrder;
