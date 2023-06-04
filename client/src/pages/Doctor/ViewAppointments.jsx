import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { BiClinic } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import check from "../../assets/images/check-mark.png";
import guide from "../../assets/images/guidelines.png";
import Main from "../../layouts/Main";
import { hideLoading, showLoading } from "../../redux/alertSlice";

const { Meta } = Card;

function ViewAppointments() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Title, Text } = Typography;

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:00"),
            moment(values.timings[1]).format("HH:00"),
          ],
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
        navigate("/doctor/profile/:userId");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong:", error);
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-user-id",
        {
          _id: params.userId,
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

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-appointment-id",
        {
          _id: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        setAppointment(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    // getDoctorData();
    getAppointmentsData();
  }, []);

  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  const FN = appointment?.userInfo?.name;
  const LN = appointment?.userInfo?.surname;
  const consultationType = appointment?.consultationType;
  const date = appointment?.date;
  const time = appointment?.time;
  return (
    <Main>
      <Row gutter={[24, 0]}>
        <Col
          span={24}
          xs={24}
          md={12}
          sm={24}
          lg={12}
          xl={14}
          className="mb-24"
        >
          <Card bordered={false} className="criclebox h-full">
            <Meta
              avatar={<Avatar src={check} />}
              title={<h5 className="card-title-green">Appointment Booked!</h5>}
            />

            <hr />
            <Row gutter={16}>
              <Col span={12}>
                <div className="ant-muse">
                  <Text>Clinic</Text>
                  <br />
                  {/* change code na makukuha yung address ni doctor */}
                  <Space>
                    <BiClinic />
                    <h6 className="font-semibold m-0">Fuentes Clinic</h6>
                  </Space>
                  <br />
                  <Text>2445 Rodriguez St. Tondo Manila</Text>
                </div>
              </Col>
              <Col span={12}>
                <div className="ant-muse">
                  <Text>Consultation Type</Text>
                  <br />
                  {/* change code na makukuha yung consultation type */}

                  <h6 className="font-semibold m-0">{consultationType}</h6>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                {" "}
                <div className="ant-muse pt-3">
                  <Text>Booked by</Text>
                  <br />
                  {/* change code na makukuha yung name ni patient */}
                  <Space>
                    <AiOutlineUser />
                    <h6 className="font-semibold m-0">{FN + " " + LN}</h6>
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div className="ant-muse pt-3">
                  <Text>Appointment ID</Text>
                  <br />
                  {/* change code na makukuha yung appointment id */}

                  <h6 className="font-semibold m-0">{params.userId}</h6>
                </div>
              </Col>

              <Col span={12}>
                <div className="ant-muse pt-3">
                  {/* change code na makukuha yung date and time ng appointment */}
                  <Text>Date & Time</Text>
                  <br />
                  <Space>
                    <AiOutlineCalendar />
                    <h6 className="font-semibold m-0">{date + " & " + time}</h6>
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div className="resched-button pt-3">
                  <Button
                    type="primary"
                    style={{ width: "150px", height: "40px" }}
                    //baguhin function nung id hahaha
                    onClick={() => navigate(`/book-appointment/${params.userId}`)}
                  >
                    Reschedule
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Patient Information</h6>}
            className="header-solid h-full card-profile-information "
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions>
              {/* change code na makukuha yung data na nasa label */}
              <Descriptions.Item label="Full Name" span={3}>
                {FN + " " + LN}
              </Descriptions.Item>
              {/* change code na makukuha yung data na nasa label */}
              <Descriptions.Item label="Mobile" span={3}>
                {appointment?.userInfo?.phone}
              </Descriptions.Item>
              {/* change code na makukuha yung data na nasa label */}
              <Descriptions.Item label="Email" span={3}>
                {appointment?.userInfo?.email}
              </Descriptions.Item>
              {/* change code na makukuha yung data na nasa label */}
              {/* <Descriptions.Item label="Address" span={3}>
                119 Tolentino Manila
              </Descriptions.Item> */}
              {/* change code na makukuha yung data na nasa label */}
              {/* <Descriptions.Item label="Date of Birth" span={3}>
                1990-05-15
              </Descriptions.Item> */}
            </Descriptions>
          </Card>
        </Col>
        <Col
          span={24}
          xs={24}
          md={12}
          sm={24}
          lg={12}
          xl={14}
          className="mb-24 "
        >
          <Card bordered={false} className="header-solid h-full">
            <Meta avatar={<Avatar src={guide} />} title="Guidelines" />
            <ul className="list settings-list">
              <li className="pt-2 font-semibold" style={{ margin: "0 49px" }}>
                <BsCheckCircleFill color="#5EDD60" />
                <span>
                  Ensure that you have a reliable internet connection and any
                  necessary equipment (e.g., webcam, microphone) for virtual
                  appointments.
                </span>
              </li>
              <li className="font-semibold" style={{ margin: "0 49px" }}>
                <BsCheckCircleFill color="#5EDD60" />
                <span>
                  Provide clear instructions to patients on how to access the
                  virtual appointment platform and any necessary pre-appointment
                  preparations.
                </span>
              </li>
              <li className="font-semibold" style={{ margin: "0 49px" }}>
                <BsCheckCircleFill color="#5EDD60" />
                <span>
                  Conduct the virtual appointment in a private and secure
                  location to protect patient privacy.{" "}
                </span>
              </li>
              <li className="font-semibold" style={{ margin: "0 49px" }}>
                <BsCheckCircleFill color="#5EDD60" />
                <span>
                  Review the patient's medical records, previous test results,
                  and any relevant information before the virtual appointment.
                </span>
              </li>
              <li className="font-semibold" style={{ margin: "0 49px" }}>
                <BsCheckCircleFill color="#5EDD60" />
                <span>
                  Visual assessment: If feasible, request that the patient
                  performs certain physical assessments or self-examinations
                  during the virtual appointment while guiding them through the
                  process.
                </span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Main>
  );
}

export default ViewAppointments;
