
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const closeNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarToggler.classList.contains('show')) {
      navbarToggler.classList.remove('show');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">

       
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ fontFamily: "Lobster, cursive" }}
        >
          Coffee Eden
        </Link>

       
        <button
          className="navbar-toggler"
          type="button"
          
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                Our Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/menu" onClick={closeNavbar}>
                Our Menu
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/order" onClick={closeNavbar}>
                Your Order
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                Our Story
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/events" onClick={closeNavbar}>
                Our Events
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
