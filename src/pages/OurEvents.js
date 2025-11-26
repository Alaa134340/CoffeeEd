import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import bookclubImage from "../assets/bookclub.jpg";
import latteArt from "../assets/latteArt.jpg";
import potterypaint from "../assets/potterypaint.jpg";

function OurEvents() {
  return (
    <div style={{ backgroundColor: "#F5EDE2", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container">
        <h1 className="text-center mb-5" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36", fontWeight: "bold" }}>
          Our Events
        </h1>

        
        <div className="card mb-4 shadow-lg border-0" style={{ backgroundColor: "#E8D7C5" }}>
          <div className="row g-0">

            
            <div className="col-md-4">
              <img
                src={bookclubImage}
                className="img-fluid rounded-start"
                alt="Book club meeting"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>

            
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}>Event1:Book Club</h4>
                <p className="card-text" style={{ color: "#3D2C27" }}>
                 Sign up now for our weekly book club going every Saturday at 12 pm. 
                 Enjoy a discounted cup of coffee while discussing the latest reads with fellow book enthusiasts.
                </p>
                <Link to="/eventsignup"  className="btn btn-dark">
                  Sign Up
                </Link>
              </div>
            </div>

          </div>
        </div>

        
        <div className="card mb-4 shadow-lg border-0" style={{ backgroundColor: "#E1CBB7" }}>
          <div className="row g-0">

            
            <div className="col-md-4 order-md-2">
              <img
                src={latteArt}
                className="img-fluid rounded-end"
                alt="latte art workshop"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>

         
            <div className="col-md-8 order-md-1">
              <div className="card-body">
                <h4 className="card-title" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}>Event2: Latte Art Workshop</h4>
                <p className="card-text" style={{ color: "#3D2C27" }}>
                  Join us every Wednesday at 5 pm for our Latte Art Workshop.
                  Learn the techniques of creating beautiful latte art from our expert baristas,
                  and you'll get your latte for free every session.
                  All skill levels are welcome!
                </p>
                <Link 
                  to="/eventsignup" 
                  className="btn btn-dark"
                >
                  Sign Up
                </Link>
              </div>
            </div>

          </div>
        </div>

      
        <div className="card mb-4 shadow-lg border-0" style={{ backgroundColor: "#DCC3A1" }}>
          <div className="row g-0">

            <div className="col-md-4">
              <img
                src={potterypaint}
                className="img-fluid rounded-start"
                alt="pottery painting class"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title" style={{ fontFamily: "'Lobster', cursive", color: "#5A3E36" }}>Event3: Art Classes</h4>
                <p className="card-text" style={{ color: "#3D2C27" }}>
                 You can choose to paint your own mug or tableware!.
                 Our art classes are held every Friday at 6 pm.
                 All materials are provided, and no prior experience is necessary and you'll get a free drink of your choice!.
                 
                </p>
                <Link 
                  to="/eventsignup" 
                  className="btn btn-dark"
                >
                  Sign Up
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default OurEvents;
