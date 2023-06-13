import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Row, Col, Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useNavigate, useParams } from "react-router-dom";
import { PatientForm } from "../../components";
import Main from "../../layouts/Main";
import BgProfile from "../../assets/images/pinkBg.jpg";
import profilavatar from "../../assets/images/face-1.jpg";
import PatientFormAdmin from "../../components/Forms/PatientFormAdmin";

function ProfileViewAdmin() {
  const {user} = useSelector (state => state.user);
  const params = useParams();
  const [patient, setPatient] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = [];
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://fuentes-clinic.onrender.com/api/user/update-patient-profile",
        {
          //under construction
          ...values,
          userId: user._id,
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
        navigate("/user/profile/:userId");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong:", error);
    }
  };
  const getPatientData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://fuentes-clinic.onrender.com/api/user/get-patient-info-by-user-id",
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
        setPatient(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const role = patient?.isAdmin ? "Nurse" : patient?.isDoctor ? "Doctor" : "Patient";
  const FN = patient?.name;
  const LN = patient?.surname;
  return (
    <Main>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      />
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{FN} {LN}</h4>
                  <p>{role}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      />
      {/* if patient is not null, then render the form */}
      {patient && <PatientFormAdmin onFinish={onFinish} initialValues={patient} />}
    </Main>
  );
}

export default ProfileViewAdmin;
