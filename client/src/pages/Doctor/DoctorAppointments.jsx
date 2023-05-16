import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import toast from "react-hot-toast";
import Main from "../../layouts/Main";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/doctor/get-appointments-by-doctor-id");
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
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
          {moment(record.date).format("DD/MM/YYYY")} {moment(record.time).format("HH:00")}
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
