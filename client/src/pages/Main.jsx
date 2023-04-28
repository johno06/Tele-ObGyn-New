import React from "react";
import { NavLink } from "react-router-dom";
import Main1 from "../assets/images/main3.png";
import { About, Services, Contact } from "../components";

export default function Main() {
  return (
    <>
      <section id="main">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-6">
              <img src={Main1} alt="About" className="w-75 " />
            </div>
            <div className="col-md-6">
              <h1 className="display-4 fw-bolder text-danger text-center mb-4">Fuentes Clinic</h1>
              <p className="lead text-center fs-5 mb-5">
                A branch of medicine that specializes in the care of pregnant women and mothers to
                be as well as the treatment of diseases of the female reproductive system. It also
                focuses on a number of issues affecting women's health, such as infertility,
                menopause, and hormonal issues.
              </p>
              <div className="buttons d-flex justify-content-center">
                <NavLink to="" className="btn btn-danger me-4 rounded-pill px-4 py-2">
                  Consult Now
                </NavLink>
                <NavLink to="/services" className="btn btn-outline-danger rounded-pill px-4 py-2">
                  Our Services
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <About /> */}
      <Services />
      <Contact />
    </>
  );
}
