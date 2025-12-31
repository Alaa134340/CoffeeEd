
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin, logoutUser } from "../utils/auth";
import "../styles/NavBar.css";

function NavBar() {
  const closeNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarToggler.classList.contains('show')) {
      navbarToggler.classList.remove('show');
    }
  };
  const isAdmin = !!localStorage.getItem("adminToken");
  const isUserLoggedIn = !!localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    logoutUser();
    navigate("/");
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
              <NavLink className="nav-link" to="/orders" onClick={closeNavbar}>
                My Orders
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

            {!isAdmin && !isUserLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link btn btn-outline-primary" to="/signin" onClick={closeNavbar} style={{marginLeft: 10}}>
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link btn btn-outline-success" to="/signup" onClick={closeNavbar} style={{marginLeft: 10}}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && isUserLoggedIn && (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {username}!</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout} style={{marginLeft: 10}}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/menu" onClick={closeNavbar}>
                    Admin Menu
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/events" onClick={closeNavbar}>
                    Admin Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/orders" onClick={closeNavbar}>
                    Admin Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/event-signups" onClick={closeNavbar}>
                    Event Signups
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout} style={{marginLeft: 10}}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
