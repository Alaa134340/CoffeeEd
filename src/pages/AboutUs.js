import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import coffeeSelect from "../assets/coffeeSelection.jpg";
import coffeeShared from "../assets/coffeeShared.jpg";
import barista from "../assets/barista.jpg";
function About() {
  return (
    <div style={{ backgroundColor: "#F5EDE2", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container">
        <h1 className="text-center mb-5" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36", fontWeight: "bold" }}>
          Our Story
        </h1>

        {/* CARD 1 */}
        <div className="card mb-4 shadow-lg border-0" style={{ backgroundColor: "#E8D7C5" }}>
          <div className="row g-0">

            {/* Left Photo */}
            <div className="col-md-4">
              <img
                src={coffeeShared}
                className="img-fluid rounded-start"
                alt="Coffee shared"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>

            
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}>A Passion for Coffee</h4>
                <p className="card-text" style={{ color: "#3D2C27" }}>
                  Our coffee shop is built on a love for coffee and learning to enjoy all the different flavors
                  while working, studying, dating, hanging out with friends, or simply some alone time.
                  You will experience the best brewed experience with us.Don't forget to share your experience with us.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CARD 2 */}
        <div className="card mb-4 shadow-lg border-0" style={{ backgroundColor: "#E1CBB7" }}>
          <div className="row g-0">

            
            <div className="col-md-4 order-md-2">
              <img
                src={coffeeSelect}
                className="img-fluid rounded-end"
                alt="coffee selection"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>

         
            <div className="col-md-8 order-md-1">
              <div className="card-body">
                <h4 className="card-title" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}>A Place to Feel at Home</h4>
                <p className="card-text" style={{ color: "#3D2C27" }}>
                  We built our coffee shop to be a warm and cozy escape from the outside world.
                  Every detailfrom the wooden tables to the gentle aroma of fresh coffee
                  is designed to make you feel comfortable and welcome.
                </p>
              </div>
            </div>

          </div>
        </div>

      {/* CARD 3 */}
        <div className="card mb-4 shadow-lg border-0" style={{ backgroundColor: "#DCC3A1" }}>
          <div className="row g-0">

            <div className="col-md-4">
              <img
                src={barista}
                className="img-fluid rounded-start"
                alt="barista at work"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}>Crafted With Love</h4>
                <p className="card-text" style={{ color: "#3D2C27" }}>
                  Every cup we serve is made with love, precision, and care.
                  Our baristas are trained to master every detail of the brewing process
                  from grind size to milk texture.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
