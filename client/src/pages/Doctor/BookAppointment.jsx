import { Avatar, Button, Card, Col, DatePicker, Row, TimePicker } from "antd";
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
  const [patient, setPatient] = useState(null);
  const [doc, setDoc] = useState(null);
  const navigate = useNavigate();
  //const [consultationType, setConsultationType] = useState("Online");

  const params = useParams();
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const getDoctorData = async (docId) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          _id: docId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoc(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  const getAppointmentData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-appointment-id",
        {
          _id: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data.doctorInfo);
        setPatient(response.data.data.userInfo);
        getDoctorData(response.data.data.doctorId);
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

  const updateAppointment = async () => {
    setIsAvailable(false);
    try {
      const data = {
        date: date.format("YYYY-MM-DD"),
        time:
          time.format("HH:mm") + " - " + time.add(1, "hour").format("HH:mm"),
      };
      const response = await axios.patch(
        `/api/doctor/updateBookingAppointment/${params.doctorId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
        
      }
      // console.log(response.data);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date.format("YYYY-MM-DD"),
          time:
            time.format("HH:mm") + " - " + time.add(1, "hour").format("HH:mm"),
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
    // getDoctorData();
    // getUserData();
    getAppointmentData();
  }, []);

  const { Meta } = Card;

  const disabledHours = () => {
    // Return an array of hours to disable
    return [0, 1, 2, 3, 4, 5, 6, 13, 14, 15, 16, 17, 18, 19, 21, 20,22, 23, 24];
  };

  const disabledDate = current => {
    // Disable all days except Wednesdays and Saturdays
    return !(current.day() === 3 || current.day() === 6);
  };

  return (
    <Main>
      <>
        {doctor && (
          <div>
            <Card
              style={{
                width: 400,
              }}
            >
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title={`${patient.name} ${patient.surname}`}
                description={`${patient.phone}`}
              />
              <Row gutter={20}  align="middle">
                <Col
                  style={{ padding: "20px" }}
                  span={8}
                  sm={24}
                  xs={24}
                  lg={24}
                >
                  <h1 className="normal-text">
                    <b>Consultation Hours: </b> {doc?.timings[0]} -{" "}
                    {doc?.timings[1]}
                  </h1>
                  <h1 className="normal-text  ">
                    <b>Every Wednesday and Saturday </b>
                  </h1>
                  <div className="d-flex flex-column">
                    <DatePicker
                      disabledDate={disabledDate}
                      selected={date}
                      style={{ width: "100%" }}
                      format="YYYY-MM-DD"
                      onChange={handleDateChange}
                    />

                    <TimePicker
                      disabledHours={disabledHours}
                      style={{ width: "100%" }}
                      format="HH:00"
                      className="mt-3"
                      onChange={handleTimeChange}
                    />

                    {!isAvailable && (
                      <Button
                        type="primary"
                        className="primary-button mt-3 full-width-button"
                        onClick={checkAvailability}
                        style={{ width: "100%" }}
                        danger
                      >
                        Check Availability
                      </Button>
                    )}

                    {isAvailable && (
                      <Button
                        type="primary"
                        danger
                        className="mt-3 "
                        onClick={updateAppointment}
                      >
                        Book Appointment
                      </Button>
                    )}
                  </div>
                </Col>
                <Col span={8} sm={24} xs={24} lg={8}></Col>
              </Row>
            </Card>
          </div>
        )}
      </>
    </Main>
  );
}

export default BookAppointment;
