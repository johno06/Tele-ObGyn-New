import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/Forms/DoctorForm";
import moment from 'moment'
import Main from "../../layouts/Main";
import BgProfile from "../../assets/images/pinkBg.jpg";
import profilavatar from "../../assets/images/face-1.jpg";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          userId: params.userId,
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

  useEffect(() => {
    getDoctorData();
  }, []);

  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  const FN = doctor?.firstName;
  const LN = doctor?.lastName;

  return (
    <Main>
      <div className="profile-nav-bg" style={{ backgroundImage: "url(" + BgProfile + ")" }} />
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={55} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{FN} {LN}</h4>
                  <p>{role}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      />
      {/* <h1 className="page-title">Doctor Profile</h1>
      <hr /> */}
      {/* if doctor is not null, then render the form */}
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Main>
  );
}

export default Profile;
