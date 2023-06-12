import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import verifyGif from "../../assets/images/verify.gif";

function Reset() {
  const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop();

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .get(`https://fuentes-clinic.onrender.com/api/user/verify?token=${token}`)
        .then((res) => {
          console.log(res);
          setVerified(true);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);

  //add a 404 page
  if (!token) {
    return <p>Invalid token</p>;
  }

  return (
    <div>
      <div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="row">
            <div className="col-md-5 d-flex flex-column align-items-center justify-content-center form"></div>
            <div className="p-5">
            <h1 className="fw-bolder text-center text-muted">
                {verified && !error ? "You are now Verified" : error ? error : "Verifying..."}
              </h1>
              <img src={verifyGif} alt="wait until the page loads" />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
