import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Main from "../../layouts/Main";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import moment from "moment";
import toast from "react-hot-toast";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const user = useSelector((state) => state.user);
  //const [user1, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  //const [consultationType, setConsultationType] = useState("Online");

  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  // const getUserData = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "/get-patient-info-by-user-id",
  //       {
  //         userId: params.userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       setUser(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(hideLoading());
  //   }
  // };

  const bookAppointment = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
          //consultationType: consultationType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error while booking appointment");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error while booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
    // getUserData();
  }, []);

  return (
    <Main>
      <>
        {doctor && (
          <div>
            <h1 className="page-title">
              {doctor.firstName} {doctor.lastName}
            </h1>
            <hr />
            <Row gutter={20} className="mt-5" align="middle">
              <Col span={8} sm={24} xs={24} lg={8}>
                <h1 className="normal-text">
                  <b>Consultation Hours: </b> {doctor.timings[0]} -{" "}
                  {doctor.timings[1]}
                </h1>
                <h1 className="normal-text text-danger ">
                  <b>Every Wednesday and Saturday </b>
                </h1>
                {/* <p>
                  <b>Phone Number: </b>
                  {doctor.phoneNumber}
                </p> */}
                <p>
                  <b>Address: </b>
                  {doctor.address}
                </p>
                <div className="d-flex flex-column">
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    onChange={(values) => {
                      setDate(moment(values).format("DD-MM-YYYY"));
                      setIsAvailable(false);
                    }}
                  />

                  <TimePicker
                    style={{ width: "100%" }}
                    format="HH:00"
                    className="mt-3"
                    onChange={(values) => {
                      setIsAvailable(false);
                      setTime(moment(values).format("HH:00"));
                    }}
                  />

                  {/* <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Button
                        className="primary-button mt-3 full-width-button"
                        onClick={() => {
                          setConsultationType("Online");
                          //console.log(consultationType);
                        }}
                      >
                        Online Appointment
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        className="primary-button mt-3 full-width-button"
                        onClick={() => {
                          setConsultationType("Clinic");
                          // console.log(consultationType);
                        }}
                      >
                        Clinic Appointment
                      </Button>
                    </Col>
                  </Row> */}

                  {!isAvailable && (
                    <Button
                      type="danger"
                      className="primary-button mt-3 full-width-button"
                      onClick={checkAvailability}
                      style={{ width: "100%" }}
                    >
                      Check Availability
                    </Button>
                  )}

                  {isAvailable && (
                    <Button
                      className="primary-button mt-3 full-width-button"
                      onClick={bookAppointment}
                    >
                      Book Appointment
                    </Button>
                  )}
                </div>
              </Col>
              <Col span={8} sm={24} xs={24} lg={8}></Col>
            </Row>
          </div>
        )}
      </>
    </Main>
  );
}

export default BookAppointment;
