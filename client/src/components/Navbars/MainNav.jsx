import React from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/services">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="#">
              Tele-ObGyn
            </NavLink>

            <NavLink to="/login" className="btn btn-outline-danger ms-auto px-4 rounded-pill">
              Login
            </NavLink>
            {/* <NavLink to="/register " className="btn btn-outline-danger ms-2 px-4 rounded-pill">
              Register
            </NavLink> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNav;
