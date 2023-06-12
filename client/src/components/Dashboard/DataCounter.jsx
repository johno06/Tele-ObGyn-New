import { Card, Col, Row, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export default function DataCounter() {
  const { Title } = Typography;

  const appointment = [
    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="#fff" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"/></svg>
  ]

  const doctor = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      width="22"
      viewBox="0 0 448 512"
      fill="#fff"
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
    </svg>,
  ];

  const profile = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      width="22"
      fill="#fff"
      viewBox="0 0 640 512"
    >
      <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
    </svg>,
  ];

  const admin = [
    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="#fff" viewBox="0 0 448 512">
      <path d="M96 128V70.2c0-13.3 8.3-25.3 20.8-30l96-36c7.2-2.7 15.2-2.7 22.5 0l96 36c12.5 4.7 20.8 16.6 20.8 30V128h-.3c.2 2.6 .3 5.3 .3 8v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V136c0-2.7 .1-5.4 .3-8H96zm48 48c0 44.2 35.8 80 80 80s80-35.8 80-80V160H144v16zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6zM208 48V64H192c-4.4 0-8 3.6-8 8V88c0 4.4 3.6 8 8 8h16v16c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V96h16c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8H240V48c0-4.4-3.6-8-8-8H216c-4.4 0-8 3.6-8 8z" />
    </svg>,
  ];

  var [totalPatient, setTotalPatient] = useState();
  var [totalDoctor, setTotalDoctor] = useState();
  var [totalAdmin, setTotalAdmin] = useState();
  var [totalPendingAppointment, setTotalPending] = useState ();
var [totalCompleted, setTotalCompleted] = useState ();
var [totalApproved, setTotalApproved] = useState ();

  const dispatch = useDispatch();

  const getApprovedAppointment = async () => {
  try {
    dispatch (showLoading ());
    await axios
      .get ('https://fuentes-clinic.onrender.com/api/doctor/get-all-approved-appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem ('token')}`,
        },
      })
      .then (res => {
        dispatch (hideLoading ());
        // setUsers(res.data.data);
        totalApproved = res.data.data;
        setTotalApproved (totalApproved);
      });
    // dispatch(hideLoading());
    // if (response.data.success) {
    //   setUsers(response.data.data);
    // }
  } catch (error) {
    dispatch (hideLoading ());
  }
};

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("https://fuentes-clinic.onrender.com/api/user/get-all-verified-patients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          // setUsers(res.data.data);
          totalPatient = res.data.data;
          setTotalPatient(totalPatient);
        });
      // dispatch(hideLoading());
      // if (response.data.success) {
      //   setUsers(response.data.data);
      // }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("https://fuentes-clinic.onrender.com/api/user/get-all-verified-doctors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          totalDoctor = res.data.data;
          setTotalDoctor(totalDoctor);
        });
      // dispatch(hideLoading());
      // if (response.data.success) {
      //   setUsers(response.data.data);
      // }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getAdminData = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("https://fuentes-clinic.onrender.com/api/user/get-all-verified-admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          totalAdmin = res.data.data;
          setTotalAdmin(totalAdmin);
        });
      // dispatch(hideLoading());
      // if (response.data.success) {
      //   setUsers(response.data.data);
      // }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
    getDoctorData();
    getAdminData();
    getApprovedAppointment();
  }, []);

  const count = [
    {
      today: "Users",
      title: totalPatient,
      // persent: "+30%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Doctors",
      title: totalDoctor,
      // persent: "+20%",
      icon: doctor,
      bnb: "bnb2",
    },
    {
      today: "Admin",
      title: totalAdmin,
      // persent: "-20%",
      icon: admin,
      bnb: "redtext",
    },
    {
      today: "Appointments",
      title: totalApproved,
      title: "7",
      // persent: "10%",
      icon: appointment,
      bnb: "bnb2",
    },
  ];

  return (
    <>
      {count.map((c, index) => (
        <Col
          key={index}
          xs={24}
          sm={24}
          md={12}
          lg={6}
          xl={6}
          className="mb-24"
        >
          <Card bordered={false} className="criclebox ">
            <div className="number">
              <Row align="middle" gutter={[24, 0]}>
                <Col xs={18}>
                  <span>{c.today}</span>
                  <Title level={3}>
                    {c.title} <small className={c.bnb}>{c.persent}</small>
                  </Title>
                </Col>
                <Col xs={6}>
                  <div className="icon-box">{c.icon}</div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
}
