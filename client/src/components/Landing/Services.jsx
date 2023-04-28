import React from "react";
import { FaCalendarCheck, FaVideo, FaFilePrescription } from "react-icons/fa";
import NormalBirth from "../../assets/images/normal-birth.png"
import Cesarean from "../../assets/images/cesarian.png"
import Checkup from "../../assets/images/checkup.png"
import Raspa from "../../assets/images/raspa.png"
import Other from "../../assets/images/other.png"

export default function Services() {
  return (
    <div>
      <section id="services">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Our Services</h3>
              <h1 className="display-6 text-center mb-4">
                <b>Fuentes</b> Clinic's Services
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <FaCalendarCheck size={56} className="mb-4 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Appointment Booking</h5>
                  <p className="card-text lead">
                  You can book, schedule, or cancel your appointments through our web and mobile based systems.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <FaVideo size={56} className="mb-4 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Tele-consultations</h5>
                  <p className="card-text lead">
                  You can interact with your ob-gyn for the purpose of providing diagnostic or therapeutic advice through electronic means.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <FaFilePrescription size={56} className="mb-4 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Online Prescriptions</h5>
                  <p className="card-text lead">
                  Your Ob-Gyne can write and send prescriptions to patients electronically instead of using handwritten or faxed notes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 pt-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <img src={NormalBirth} alt="" className="mb-4 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Normal Birth</h5>
                  <p className="card-text lead">
                    
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <img src={Checkup} alt="" className="mb-4 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Pre-natal Check-ups</h5>
                  <p className="card-text lead">
                    
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <img src={Cesarean} alt="" className="mb-4 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Cesarean Section</h5>
                  <p className="card-text lead">
                    
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <img src={Raspa} alt="" className="mb-4 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">RASPA</h5>
                  <p className="card-text lead">
                   
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-4">
              <div className="card p-3">
                <div className="card-body text-center">
                  <img src={Other} alt="" className="mb-2 text-danger" />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Other Services</h5>
                  <p className="card-text lead fw-bold">
                    Myoma, Ectopic Pregnancy, Pre-eclampsia, Twin Pregnancy, Infertility, and Abnormal Mens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
