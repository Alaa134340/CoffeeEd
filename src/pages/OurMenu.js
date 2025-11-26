import React from 'react';
import "../styles/MainMenu.css";
import espresso from "../assets/espresso.jpg";
import americano from "../assets/americano.jpg";
import vanillaLatte from "../assets/vanillalatte.jpg";
import caffelatte from "../assets/caffelatte.jpg";
import matchalatte from "../assets/matchalatte.jpg";
import cappuccino from "../assets/cappucino.jpg";
import macchiato from "../assets/macchiato.jpg";
import mocha from "../assets/mocha.jpg";
import flatwhite from "../assets/flatwhite.jpg";
import coldbrew from "../assets/coldbrew.jpg";
import strawberrySmoothie from "../assets/strawberrySmoothie.jpg";
import tropicalMangoSmoothie from "../assets/mangoSmoothie.jpg";
import berryBlastSmoothie from "../assets/berryBlast.jpg";
import greenDetoxSmoothie from "../assets/greenDetox.jpg";
import croissant from "../assets/croissant.jpg";
import chocolateCroissant from "../assets/chococroissant.jpg";
import cinnamonRoll from "../assets/cinnamoroll.jpg";
import muffin from "../assets/muffin.jpg";
import donut from "../assets/donuts.jpg";  
import acaii from "../assets/acaii.jpg";
import berryAcai from "../assets/berryacaii.jpg";
import proteinAcai from "../assets/proteinacaii.jpg";
import tropicalAcai from "../assets/tropicalAcaii.webp";
function Menu({ addToOrder }) {

  const handleAddToOrder = (item, category) => {
    addToOrder({ ...item, category });
    alert(`${item.name} added to order!`);
  };

const menuData = {
  coffee: [
    {
      name: "Espresso",
      description: "Rich, bold single or double shots according to your preference",
      price: "$2.00",
      image: espresso
    },
     {
      name: "Americano",
      description: "Espresso with water.You have the option to have it hot or iced.",
      price: "$3.00",
      image: americano
    },
    {
      name: "Vanilla Latte",
      description: "Espresso with steamed milk with art on top if you have it hot.",
      price: "$4.00",
      image: vanillaLatte
    },
     {
      name: "Caffe Latte",
      description: "Espresso with steamed milk.You have the option to have it hot or iced.",
      price: "$4.25",
      image: caffelatte
    },
     {
      name: "Matcha Latte",
      description: "Espresso with steamed milk.You have the option to have it hot or iced.",
      price: "$4.00",
      image: matchalatte
    },
    {
      name: "Cappuccino",
      description: "Espresso, steamed milk & foam",
      price: "$4.5",
      image: cappuccino
    },
     {
      name: "Macchiato",
      description: "Espresso with steamed milk.You have the option to have it hot or iced.",
      price: "$3.75",
      image: macchiato
    },
     {
      name: "Mocha",
      description: "Espresso with steamed milk and chocolate.You have the option to have it hot or iced.",
      price: "$4.75",
      image: mocha
    },
     {
      name: "Flat white",
      description: "Espresso with steamed milk.You have the option to have it hot or iced.",
      price: "$3.50",
      image: flatwhite
    },
     {
      name: "Cold brew",
      description: "Slow-steeped cold coffee, served chilled.",
      price: "$3.00",
      image: coldbrew
    },
  ],
  smoothies: [
    {
      name: "Strawberry Banana",
      description: "Fresh strawberries, ripe bananas, and creamy yogurt blended to perfection",
      price: "$5.00",
      image: strawberrySmoothie
    },
    {
      name: "Tropical Mango",
      description: "Sweet mango, tropical pineapple, and smooth coconut milk for a paradise taste",
      price: "$5.50",
      image: tropicalMangoSmoothie
    },
     {
      name: "Berry Blast",
      description: "Blueberries, raspberries, strawberries, and blackberries with a hint of honey",
      price: "$5.25",
      image: berryBlastSmoothie
    },
     {
      name: "Green Detox",
      description: "Spinach, kale, green apple, cucumber, and lemon for a refreshing cleanse",
      price: "$5.75",
      image: greenDetoxSmoothie
    },
  ],
  pastry: [
    {
      name: "Croissant",
      description: "Classic buttery, flaky French croissant baked fresh daily",
      price: "$2.50",
      image: croissant
    },
    {
      name: "Chocolate Croissant",
      description: "Buttery croissant filled with rich dark chocolate",
      price: "$3.00",
      image: chocolateCroissant
    },
     {
      name: "Cinnamon Roll",
      description: "Warm, gooey cinnamon roll topped with cream cheese frosting",
      price: "$3.50",
      image: cinnamonRoll
    },
     {
      name: "Muffin",
      description: "Freshly baked muffin in your choice of blueberry, chocolate chip, or banana nut",
      price: "$2.75",
      image: muffin
    },
     {
      name: "Donut",
      description: "Assorted glazed, chocolate, and specialty donuts made fresh each morning",
      price: "$2.25",
      image: donut
    },
  ],
  acaiBowls: [
    {
      name: "Classic Açaí Bowl",
      description: "Açaí blend topped with granola, banana, strawberry, blueberries, and honey",
      price: "$6.00",
      image: acaii
    },
    {
      name: "Berry Açaí",
      description: "Açaí base with mixed berries, crunchy granola, and toasted almond flakes",
      price: "$6.50",
      image: berryAcai
    },
       {
      name: "Protein Açaí",
      description: "Açaí blend with protein powder, peanut butter, granola, banana, and chia seeds",
      price: "$7.00",
      image: proteinAcai
    },   {
      name: "Tropical Açaí",
      description: "Açaí topped with mango, pineapple, coconut flakes, granola, and passion fruit",
      price: "$6.75",
      image: tropicalAcai
    },

  ]
};

return (
    <div className="menu-container">
      {Object.keys(menuData).map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="items-grid">
            {menuData[category].map((item, index) => (
              <div className="menu-card" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">{item.price}</p>
                <button 
                  className="add-to-order-btn"
                  onClick={() => handleAddToOrder(item, category)}
                >
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Menu;