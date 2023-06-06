import React, { useEffect, useState } from "react";
import axios from "axios";
import Main from "../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  ActiveDoctor,
  DataCounter,
  Doctor,
  EChart,
  Information,
  LineChart,
} from "../components";
import card from "../assets/images/doctor-card.png";
import BgHome from "../assets/images/homebg.png";
import { FaUsers } from "react-icons/fa";
import completeAppointment from "../assets/images/appointment.png";
import pendingAppointment from "../assets/images/pendingApp.png";
import approvedAppointment from "../assets/images/approve.png";

function Home() {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctor] = useState([]);
  const dispatch = useDispatch();
  const { Paragraph } = Typography;

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  var [totalPatient, setTotalPatient] = useState();
  var [totalPendingAppointment, setTotalPending] = useState();
  var [totalCompleted, setTotalCompleted] = useState();
  var [totalApproved, setTotalApproved] = useState();
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("/api/user/get-all-verified-patients", {
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

  const getPendingAppointment = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("/api/doctor/get-all-pending-appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          // setUsers(res.data.data);
          totalPendingAppointment = res.data.data;
          setTotalPending(totalPendingAppointment);
        });
      // dispatch(hideLoading());
      // if (response.data.success) {
      //   setUsers(response.data.data);
      // }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getCompletedAppointment = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("/api/doctor/get-all-completed-appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          // setUsers(res.data.data);
          totalCompleted = res.data.data;
          setTotalCompleted(totalCompleted);
        });
      // dispatch(hideLoading());
      // if (response.data.success) {
      //   setUsers(response.data.data);
      // }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getApprovedAppointment = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("/api/doctor/get-all-approved-appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          // setUsers(res.data.data);
          totalApproved = res.data.data;
          setTotalApproved(totalApproved);
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
    getData();
    getUserData();
    getPendingAppointment();
    getCompletedAppointment();
    getApprovedAppointment();
  }, []);

  if (user?.isAdmin) {
    return (
      <Main>
        <div className="layout-content">
          <Row className="rowgap-vbox" gutter={[24, 0]}>
            <DataCounter />
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <EChart />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <LineChart />
              </Card>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <Row gutter>
                  <Col
                    xs={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={14}
                    className="mobile-24"
                  >
                    <ActiveDoctor />
                  </Col>
                  <Col
                    xs={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={10}
                    className="col-img"
                  >
                    <div className="ant-cret text-right">
                      <img src={card} alt="" className="border10" />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
              <Card bordered={false} className="criclebox card-info-2 h-full">
                <Information />
              </Card>
            </Col>
          </Row>
        </div>
      </Main>
    );
  } else {
    return (
      <Main>
        <div
          className="profile-home-bg "
          style={{ backgroundImage: "url(" + BgHome + ")" }}
        >
          <div>
            <h4 style={{ color: "#ffffff", marginLeft: "25px" }}>Welcome!</h4>
            <h3
              style={{
                color: "#ffffff",
                marginLeft: "25px",
                marginTop: "15px",
              }}
            >
              {" "}
              Dr. {user?.name} {user?.surname}
            </h3>
            <Paragraph
              style={{
                color: "#ffffff",
                marginLeft: "25px",
                marginTop: "15px",
                width: "500px",
              }}
            >
              {" "}
              Thank you for using Tele-ObGyn, We are always trying to get you a
              complete service. You can view your appointments and consult
              patients at home!
            </Paragraph>
          </div>
        </div>
        <Row style={{ marginTop: "25px" }} gutter={[24, 0]}>
          <Col xs={12} xl={6} className="mb-24">
            <Card bordered={false} className="widget-2 h-full">
              <Statistic
                title={
                  <>
                    <div className="icon">
                      <FaUsers color="#fff" size={32} />
                    </div>
                    <h6>All Patients</h6>
                  </>
                }
                value={totalPatient}
                // prefix={<PlusOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} xl={6} className="mb-24">
            <Card bordered={false} className="widget-2 h-full">
              <Statistic
                title={
                  <>
                    <div className="icon"><img src={approvedAppointment} alt="Flaticon Icon" /></div>
                    <h6>Approved Appointments</h6>
                  </>
                }
                value={totalApproved}
                // prefix={<PlusOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} xl={6} className="mb-24">
            <Card bordered={false} className="widget-2 h-full">
              <Statistic
                title={
                  <>
                    <div className="icon">
                      <img src={pendingAppointment} alt="Flaticon Icon" />
                    </div>
                    <h6>Pending Appointments</h6>
                  </>
                }
                value={totalPendingAppointment}
                // prefix={<PlusOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} xl={6} className="mb-24">
            <Card bordered={false} className="widget-2 h-full">
              <Statistic
                title={
                  <>
                    <div className="icon">
                      <img src={completeAppointment} alt="Flaticon Icon" />
                    </div>
                    <h6>Completed Appointments</h6>
                  </>
                }
                value={totalCompleted}
                // prefix={<PlusOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* <div className="layout-content">
          <Row gutter={[24, 0]}>
            {doctors.map((doctor) => (
              <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
                <Doctor doctor={doctor} />
              </Col>
            ))}
          </Row>
        </div> */}
      </Main>
    );
  }
}

export default Home;
