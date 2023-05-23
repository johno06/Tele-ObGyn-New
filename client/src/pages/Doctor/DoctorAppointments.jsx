import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import toast from "react-hot-toast";
import Main from "../../layouts/Main";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';



function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const {user} = useSelector (state => state.user);
  const [doctor, setDoctor] = useState (null);
  const idVal = "6332d5898231d41a72504a14";


//   const getDoctorData = async () => {
//   try {
//     dispatch (showLoading ());
//     const response = await axios.post (
//       '/api/doctor/get-doctor-info-by-user-id',
//       {
//         userId: user._id,
//       },
    
//     );
//     // dispatch (hideLoading ());

//     if (response.data.success) {
//       setDoctor(response.data.data);
//     }
//   } catch (error) {
//     console.log (error);
//   }
// };

  const getAppointmentsData = async () => {
    try {
    dispatch (showLoading ());
    const response = await axios.post (
      '/api/doctor/get-doctor-info-by-user-id',
      {
        userId: user._id,
      },
    
    );
    // dispatch (hideLoading ());

    if (response.data.success) {
      setDoctor(response.data.data);
    try {
      dispatch(showLoading());

      const response1 = await axios.post(
        "/api/doctor/get-appointments-by-doctor-id",
        {
          doctorId: response.data.data._id,
        }, 
      );
      dispatch(hideLoading());
      if (response1.data.success) {
        setAppointments(response1.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }

    }
  } catch (error) {
    console.log (error);
  }
  };

  useEffect(() => {
    // getDoctorData();
    getAppointmentsData();
  }, []);

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor status");
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Patient",
      dataIndex: "name",
      //req.body.userInfo.name
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.userInfo.phone}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD/MM/YYYY")} {" : "+record.time}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <h1 className="anchor px-2" onClick={() => changeAppointmentStatus(record, "approved")}>
                Approve
              </h1>
              <h1 className="anchor" onClick={() => changeAppointmentStatus(record, "rejected")}>
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Main>
      <h1 className="page-title">Appointments</h1>
      <hr/>
      <Table columns={columns} dataSource={appointments} />
      </Main>
  );
}

export default DoctorAppointments;
