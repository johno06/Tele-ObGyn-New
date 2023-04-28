import React from "react";
import about1 from "../../assets/images/About1.jpg"
import { NavLink } from "react-router-dom";

export default function About() {
 
  return (
    <div>
      <section id="about">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-6">
              <img src={about1} alt="About" className="w-75 mt-1" />
            </div>
            <div className="col-md-6">
              <h3 className="fs-5 mb-0">About Us</h3>
              <h1 className="display-6 mb-2">
                Who <b>We</b> Are
              </h1>
              <hr className="w-50" />
              <p className="lead mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto nemo hic dicta,
                quasi iste ex explicabo quae excepturi, rem omnis sunt quidem natus temporibus
                quaerat adipisci incidunt ipsum ipsa consequuntur ipsam impedit corrupti? Qui ab
                iste, laborum consectetur rerum quisquam inventore, facilis sed, dolores minus
                blanditiis numquam soluta mollitia adipisci.
              </p>
              <NavLink to="/login" className="btn btn-danger rounded-pill px-4 py-2">Get Started</NavLink>
              <NavLink to="/contact" className="btn btn-outline-danger rounded-pill px-4 py-2 ms-4">Contact Us</NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
