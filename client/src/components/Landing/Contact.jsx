import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import contact from "../../assets/images/Contact.png"
import toast from "react-hot-toast";

export default function Contact() {

  const [msg, setMsg] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setMsg({ ...msg, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, message } = msg;

    try {
      const res = await fetch("/api/utility/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      console.log(res.status);
      if (res.status === 400 || !res) {
        toast.error("Message not sent");
      } else {
        toast.success("Message sent");
        setMsg({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section id="contact">
        <div className="container my-5 py-5">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">Need Questions To Be Answered?</h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src={contact} alt="Contact" className="w-75" />
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={msg.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    name="email"
                    value={msg.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    name="message"
                    value={msg.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-outline-danger rounded-pill px-4">
                  Send Message <FaPaperPlane size={14} className="ms-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
