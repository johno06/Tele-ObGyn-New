import React from "react";
import Main from "../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DoctorForm } from "../../components";
import moment from 'moment';

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const changeDoctorStatus = async (status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-status",
        // { doctorId: user._id, userId: user.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        // getDoctorData();
      }
    } catch (error) {
      toast.error("Error changing doctor status");
      dispatch(hideLoading());
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/activate-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:00"),
            (values.timings[1]).format("HH:00"),
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

        // changeDoctorStatus();
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong", error);
    }
  };

  return (
    <Main>
      <h1 className="page-title">Activate Account</h1>
      <hr />

      <DoctorForm onFinish={onFinish} />
    </Main>
  );
}

export default ApplyDoctor;
